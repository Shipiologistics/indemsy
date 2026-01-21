import { NextRequest, NextResponse } from 'next/server';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '19fd93fd67msh6466b78f0327077p1bed07jsnfee2a64cf949';
const RAPIDAPI_HOST = 'aerodatabox.p.rapidapi.com';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
        return NextResponse.json({ items: [] });
    }

    try {
        const response = await fetch(
            `https://aerodatabox.p.rapidapi.com/airports/search/term?q=${encodeURIComponent(query)}&limit=10`,
            {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST,
                },
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('AeroDataBox API error:', response.status, response.statusText, errorText);
            return NextResponse.json({ items: [], error: `API Error: ${response.status} ${response.statusText}` }, { status: response.status });
        }

        const data = await response.json();

        if (!data || !data.items || !Array.isArray(data.items)) {
            console.warn('Unexpected API response format:', data);
            return NextResponse.json({ items: [] });
        }

        // Transform the data into a cleaner format
        const items = data.items.map((airport: any) => ({
            iata: airport.iata || '',
            icao: airport.icao || '',
            name: airport.name || airport.shortName || '',
            municipalityName: airport.municipalityName || '',
            countryCode: airport.countryCode || '',
            location: airport.location || null,
            // Create a display label
            label: `${airport.name || airport.shortName}, ${airport.iata || airport.icao}`,
        }));

        return NextResponse.json({ items });
    } catch (error) {
        console.error('Error fetching airports:', error);
        return NextResponse.json({ items: [], error: 'Internal Server Error' }, { status: 500 });
    }
}
