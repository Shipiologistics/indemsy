import { NextRequest, NextResponse } from 'next/server';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || '19fd93fd67msh6466b78f0327077p1bed07jsnfee2a64cf949';
const RAPIDAPI_HOST = 'aerodatabox.p.rapidapi.com';

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
        let flights = await searchFlightsForDate(codeType, from, to, dateParam);

        // If no flights found for the requested date, try fallback dates
        if (flights.length === 0 && dateParam) {
            console.log(`[Flight Search] No flights found for ${dateParam}. Trying fallback dates...`);

            // Generate fallback dates: today, yesterday, 2 days ago
            const today = new Date();
            const fallbackDates = [];
            for (let i = 0; i <= 2; i++) {
                const d = new Date(today);
                d.setDate(d.getDate() - i);
                fallbackDates.push(d.toISOString().split('T')[0]);
            }

            // Remove the original date if it's in the fallback list
            const filteredFallbacks = fallbackDates.filter(d => d !== dateParam);

            for (const fallbackDate of filteredFallbacks) {
                console.log(`[Flight Search] Trying fallback date: ${fallbackDate}`);
                flights = await searchFlightsForDate(codeType, from, to, fallbackDate);
                if (flights.length > 0) {
                    usedDate = fallbackDate;
                    isApproximateDate = true;
                    console.log(`[Flight Search] Found ${flights.length} flights for fallback date ${fallbackDate}`);
                    break;
                }
            }
        }

        console.log(`[Flight Search] Final result: ${flights.length} flights. Date used: ${usedDate}, Approximate: ${isApproximateDate}`);

        return NextResponse.json({
            flights,
            totalFlights: flights.length,
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
    for (const data of responses) {
        if (data?.departures) {
            allFlights = [...allFlights, ...data.departures];
        }
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
        flights = flights.filter((f: any) =>
            f.arrival.airport.iata === toUpper ||
            f.arrival.airport.icao === toUpper
        );
    }

    return flights;
}

async function fetchFlightData(codeType: string, code: string, fromTime: string, toTime: string) {
    const url = `https://aerodatabox.p.rapidapi.com/flights/airports/${codeType}/${code.toUpperCase()}/${fromTime}/${toTime}?direction=Departure&withCancelled=false&withCargo=false&withPrivate=false`;

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
            return null;
        }

        return await response.json();
    } catch (err) {
        console.error(`Fetch Error (${fromTime}):`, err);
        return null;
    }
}
