import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { airports } from '@/lib/schema';
import { ilike, or, sql } from 'drizzle-orm';

// Cache for 1 hour - airport data rarely changes
export const revalidate = 3600;

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
        return NextResponse.json({ items: [] });
    }

    try {
        // Simple search: matches IATA (starts with), Name (contains), or City (contains)
        const items = await db.select()
            .from(airports)
            .where(
                or(
                    ilike(airports.iata, `${query}%`),
                    ilike(airports.name, `%${query}%`),
                    ilike(airports.municipalityName, `%${query}%`)
                )
            )
            .orderBy(sql`
                CASE 
                    WHEN ${airports.iata} ILIKE ${query} THEN 1 
                    WHEN ${airports.iata} ILIKE ${query} || '%' THEN 2 
                    ELSE 3 
                END, ${airports.iata} ASC`)
            .limit(50);

        const sortedItems = items.sort((a, b) => {
            const q = query.toUpperCase();
            if (a.iata === q && b.iata !== q) return -1;
            if (b.iata === q && a.iata !== q) return 1;
            const aIataStart = a.iata?.startsWith(q);
            const bIataStart = b.iata?.startsWith(q);
            if (aIataStart && !bIataStart) return -1;
            if (bIataStart && !aIataStart) return 1;
            return 0;
        });

        const formattedItems = sortedItems.map(airport => ({
            iata: airport.iata || '',
            icao: airport.icao || '',
            name: airport.name || '',
            municipalityName: airport.municipalityName || '',
            countryCode: airport.countryCode || '',
            location: {
                lat: airport.latitude,
                lon: airport.longitude
            },
            label: `${airport.name} (${airport.iata || airport.icao})`
        }));

        // Add cache headers
        return NextResponse.json(
            { items: formattedItems },
            {
                headers: {
                    'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                },
            }
        );
    } catch (error) {
        console.error('Error fetching airports:', error);
        return NextResponse.json({ items: [], error: 'Internal Server Error' }, { status: 500 });
    }
}
