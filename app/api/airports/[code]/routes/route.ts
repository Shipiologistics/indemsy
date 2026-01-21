import { NextRequest, NextResponse } from 'next/server';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '19fd93fd67msh6466b78f0327077p1bed07jsnfee2a64cf949';
const RAPIDAPI_HOST = 'aerodatabox.p.rapidapi.com';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ code: string }> }
) {
    const { code } = await params;

    if (!code) {
        return NextResponse.json({ error: 'Airport code is required' }, { status: 400 });
    }

    try {
        // Determine if it's IATA (3 chars) or ICAO (4 chars)
        const codeType = code.length === 3 ? 'iata' : 'icao';

        const response = await fetch(
            `https://aerodatabox.p.rapidapi.com/airports/${codeType}/${code.toUpperCase()}/stats/routes/daily`,
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
            return NextResponse.json(
                { routes: [], error: `API error: ${response.status} ${response.statusText}` },
                { status: response.status }
            );
        }

        const data = await response.json();

        if (!data || !data.routes) {
            console.warn('Unexpected API response format for routes:', data);
        }

        // Transform routes data
        const routes = data.routes?.map((route: any) => ({
            destination: {
                iata: route.destination?.iata || '',
                icao: route.destination?.icao || '',
                name: route.destination?.name || '',
                municipalityName: route.destination?.municipalityName || '',
                countryCode: route.destination?.countryCode || '',
            },
            averageDailyFlights: route.averageDailyFlights || 0,
            operators: route.operators || [],
        })) || [];

        return NextResponse.json({
            airport: {
                code: code.toUpperCase(),
                codeType,
            },
            routes,
            totalRoutes: routes.length,
        });
    } catch (error) {
        console.error('Error fetching airport routes:', error);
        return NextResponse.json(
            { routes: [], error: 'Failed to fetch routes' },
            { status: 500 }
        );
    }
}
