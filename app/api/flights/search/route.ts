import { NextRequest, NextResponse } from 'next/server';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '67ff990603mshc60e0e9b87900b6p1c8578jsn1717dcbee687';
const RAPIDAPI_HOST = 'aerodatabox.p.rapidapi.com';

// Allow up to 60 seconds for execution (Vercel Pro/Enterprise). Hobby is capped at 10s usually.
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const dateParam = searchParams.get('date'); // YYYY-MM-DD

    if (!from) {
        return NextResponse.json({ error: 'Departure airport code is required' }, { status: 400 });
    }

    try {
        const codeType = from.length === 3 ? 'iata' : 'icao';
        let usedDate = dateParam;
        let isApproximateDate = false;
        let originalDateRequested = dateParam;

        // Try to fetch flights for the requested date
        let { flights, debug: initialDebug, error } = await searchFlightsForDate(codeType, from, to, dateParam);
        let debugHistory = [...initialDebug];

        if (error === 'RATE_LIMIT_EXCEEDED') {
            return NextResponse.json({
                error: 'External flight data provider quota exceeded. Please try again later or enter details manually.',
                code: 'RATE_LIMIT',
                debug: { apiCalls: debugHistory }
            }, { status: 429 });
        }

        // If no flights found for the requested date, try fallback dates
        if (flights.length === 0 && dateParam) {
            console.log(`[Flight Search] No flights found for ${dateParam}. Trying fallback dates...`);

            const strategies = [
                { offset: 1, label: 'Next Day' },
                { offset: -7, label: 'Same week schedule (Old Data)' }
            ];

            for (const strategy of strategies) {
                const d = new Date(dateParam);
                d.setDate(d.getDate() + strategy.offset);
                const fallbackDate = d.toISOString().split('T')[0];

                console.log(`[Flight Search] Trying fallback: ${fallbackDate} (${strategy.label})`);
                const result = await searchFlightsForDate(codeType, from, to, fallbackDate);
                // debugHistory.push(...result.debug); // Optional: accumulate debug info

                if (result.flights.length > 0) {
                    flights = result.flights;
                    usedDate = fallbackDate;
                    isApproximateDate = true;
                    console.log(`[Flight Search] Found ${flights.length} flights for fallback ${fallbackDate}`);
                    break;
                }
            }
        }

        console.log(`[Flight Search] Final result: ${flights.length} flights. Date used: ${usedDate}, Approximate: ${isApproximateDate}`);

        return NextResponse.json({
            flights,
            totalFlights: flights.length,
            debug: {
                message: "This is a debug response. Check the 'network' tab in browser developer tools to see the internal API response.",
                params: { from, to, dateParam, codeType },
                strategy: isApproximateDate ? 'fallback' : 'exact',
                usedDate,
                apiCalls: debugHistory
            },
            searchParams: {
                from: from.toUpperCase(),
                to: to?.toUpperCase() || null,
                requestedDate: originalDateRequested,
                usedDate: usedDate,
                isApproximateDate: isApproximateDate
            }
        });

    } catch (error) {
        console.error('Error searching flights:', error);
        return NextResponse.json(
            { flights: [], error: 'Failed to search flights' },
            { status: 500 }
        );
    }
}

async function searchFlightsForDate(codeType: string, from: string, to: string | null, dateParam: string | null) {
    const requests = [];

    if (dateParam) {
        // Full day search (00:00 to 23:59)
        const window1Start = `${dateParam}T00:00`;
        const window1End = `${dateParam}T11:59`;
        const window2Start = `${dateParam}T12:00`;
        const window2End = `${dateParam}T23:59`;

        requests.push(
            fetchFlightData(codeType, from, window1Start, window1End),
            fetchFlightData(codeType, from, window2Start, window2End)
        );
    } else {
        // Default: Next 12 hours from now
        const now = new Date();
        const fromTime = now.toISOString().slice(0, 16);
        const toTime = new Date(now.getTime() + 12 * 60 * 60 * 1000).toISOString().slice(0, 16);
        requests.push(fetchFlightData(codeType, from, fromTime, toTime));
    }

    const responses = await Promise.all(requests);

    // Combine results
    let allFlights: any[] = [];
    let rateLimited = false;

    for (const data of responses) {
        if (data?.departures) {
            allFlights = [...allFlights, ...data.departures];
        } else if (data?.error === 429) {
            rateLimited = true;
        }
    }

    // If no flights found but we hit a rate limit, return that info
    if (allFlights.length === 0 && rateLimited) {
        return {
            flights: [],
            debug: responses.map(r => ({ url: r?._debugUrl, count: r?._debugCount, error: r?.error })),
            error: 'RATE_LIMIT_EXCEEDED'
        };
    }

    // Deduplicate
    const uniqueFlights = Array.from(new Map(
        allFlights.map(f => [`${f.number}-${f.movement?.scheduledTimeLocal || f.movement?.scheduledTime?.local}`, f])
    ).values());

    // Transform results
    let flights = uniqueFlights.map((flight: any) => {
        try {
            if (!flight.movement) {
                if (flight.departure && flight.arrival) {
                    return {
                        flightNumber: flight.number,
                        airline: flight.airline,
                        departure: flight.departure,
                        arrival: flight.arrival,
                        status: flight.status,
                        aircraft: flight.aircraft
                    };
                }
                return null;
            }

            const destAirport = flight.movement.airport;
            const scheduledTime = flight.movement.scheduledTimeLocal
                || flight.movement.scheduledTime?.local
                || flight.movement.scheduledTime
                || '';

            const terminal = flight.movement.terminal || '';

            return {
                flightNumber: flight.number || '',
                airline: {
                    name: flight.airline?.name || '',
                    code: flight.airline?.iata || flight.airline?.icao || '',
                },
                departure: {
                    airport: {
                        iata: from.toUpperCase(),
                        name: '',
                    },
                    scheduledTime: scheduledTime,
                    terminal: terminal,
                    gate: flight.movement.gate || '',
                },
                arrival: {
                    airport: {
                        iata: destAirport?.iata || '',
                        icao: destAirport?.icao || '',
                        name: destAirport?.name || '',
                        municipalityName: destAirport?.municipalityName || '',
                    },
                    scheduledTime: '',
                    terminal: '',
                },
                status: flight.status || 'Scheduled',
                aircraft: {
                    model: flight.aircraft?.model || '',
                    registration: flight.aircraft?.reg || '',
                },
            };
        } catch (err) {
            console.error('Error mapping flight:', err, flight);
            return null;
        }
    }).filter(Boolean);

    // Filter by destination if provided
    if (to) {
        const toUpper = to.toUpperCase();
        console.log(`[Flight Search] Filtering ${flights.length} flights by destination: ${toUpper}`);

        flights = flights.filter((f: any) =>
            f.arrival.airport.iata === toUpper ||
            f.arrival.airport.icao === toUpper
        );

        console.log(`[Flight Search] After filtering: ${flights.length} flights match destination ${toUpper}`);
    } else {
        console.log(`[Flight Search] No destination filter provided. Returning all ${flights.length} departures.`);
    }

    return { flights, debug: responses.map(r => ({ url: r?._debugUrl, count: r?._debugCount, error: r?.error })) };
}

async function fetchFlightData(codeType: string, code: string, fromTime: string, toTime: string) {
    // Enabled private flights and removed other restrictions to broaden search
    const url = `https://aerodatabox.p.rapidapi.com/flights/airports/${codeType}/${code.toUpperCase()}/${fromTime}/${toTime}?direction=Departure&withPrivate=true`;

    console.log(`[RapidAPI Request] Fetching: ${url}`);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': RAPIDAPI_HOST,
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            console.error(`API Error (${fromTime}):`, response.status, await response.text());
            return { error: response.status, url };
        }

        const data = await response.json();
        const departureCount = data.departures ? data.departures.length : 0;
        console.log(`[RapidAPI Response] Found ${departureCount} departures from ${code} in window ${fromTime}`);

        // Return data with source URL for debugging
        return { ...data, _debugUrl: url, _debugCount: departureCount };
    } catch (err) {
        console.error(`Fetch Error (${fromTime}):`, err);
        return { error: err, url };
    }
}
