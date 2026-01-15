import { NextRequest, NextResponse } from 'next/server';

const RAPIDAPI_KEY = 'd5af0d6911mshadbc192b04a79dbp161180jsnb10fda4d9795';
const RAPIDAPI_HOST = 'aerodatabox.p.rapidapi.com';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const flightNumber = searchParams.get('number');
    const fromDate = searchParams.get('fromDate'); // YYYY-MM-DD format
    const toDate = searchParams.get('toDate'); // YYYY-MM-DD format

    if (!flightNumber) {
        return NextResponse.json({ error: 'Flight number is required' }, { status: 400 });
    }

    try {
        let url: string;

        if (fromDate && toDate) {
            // Get flight history for a date range
            url = `https://aerodatabox.p.rapidapi.com/flights/number/${encodeURIComponent(flightNumber)}/${fromDate}/${toDate}?dateLocalRole=Both`;
        } else {
            // Get the nearest flight (today)
            url = `https://aerodatabox.p.rapidapi.com/flights/number/${encodeURIComponent(flightNumber)}`;
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': RAPIDAPI_KEY,
                'x-rapidapi-host': RAPIDAPI_HOST,
            },
        });

        if (!response.ok) {
            console.error('AeroDataBox API error:', response.status, response.statusText);
            return NextResponse.json(
                { flights: [], error: `API error: ${response.status}` },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Handle both single flight and array of flights
        const flightsArray = Array.isArray(data) ? data : [data];

        const flights = flightsArray.filter(Boolean).map((flight: any) => ({
            flightNumber: flight.number || flightNumber,
            callSign: flight.callSign || '',
            airline: {
                name: flight.airline?.name || '',
                code: flight.airline?.iata || flight.airline?.icao || '',
            },
            departure: {
                airport: {
                    iata: flight.departure?.airport?.iata || '',
                    icao: flight.departure?.airport?.icao || '',
                    name: flight.departure?.airport?.name || '',
                    municipalityName: flight.departure?.airport?.municipalityName || '',
                },
                scheduledTime: flight.departure?.scheduledTime?.local || flight.departure?.scheduledTimeLocal || '',
                actualTime: flight.departure?.actualTime?.local || flight.departure?.actualTimeLocal || '',
                terminal: flight.departure?.terminal || '',
                gate: flight.departure?.gate || '',
                delay: flight.departure?.delay || 0,
            },
            arrival: {
                airport: {
                    iata: flight.arrival?.airport?.iata || '',
                    icao: flight.arrival?.airport?.icao || '',
                    name: flight.arrival?.airport?.name || '',
                    municipalityName: flight.arrival?.airport?.municipalityName || '',
                },
                scheduledTime: flight.arrival?.scheduledTime?.local || flight.arrival?.scheduledTimeLocal || '',
                actualTime: flight.arrival?.actualTime?.local || flight.arrival?.actualTimeLocal || '',
                terminal: flight.arrival?.terminal || '',
                gate: flight.arrival?.gate || '',
                delay: flight.arrival?.delay || 0,
                baggage: flight.arrival?.baggage || '',
            },
            status: flight.status || 'Unknown',
            aircraft: {
                model: flight.aircraft?.model || '',
                registration: flight.aircraft?.reg || '',
                modeS: flight.aircraft?.modeS || '',
            },
            greatCircleDistance: flight.greatCircleDistance || null,
        }));

        return NextResponse.json({
            flights,
            totalFlights: flights.length,
            searchParams: {
                flightNumber,
                fromDate: fromDate || null,
                toDate: toDate || null,
            }
        });
    } catch (error) {
        console.error('Error fetching flight history:', error);
        return NextResponse.json(
            { flights: [], error: 'Failed to fetch flight history' },
            { status: 500 }
        );
    }
}
