const https = require('https');

const API_KEY = 'd5af0d6911mshadbc192b04a79dbp161180jsnb10fda4d9795';
const HOST = 'aerodatabox.p.rapidapi.com';

// Test DEL -> DXB for a specific date (e.g., today 2026-01-15)
const AIRPORT = 'DEL';
const WINDOW_START = '2026-01-15T00:00';
const WINDOW_END = '2026-01-15T11:59'; // First half of day

const url = `https://${HOST}/flights/airports/iata/${AIRPORT}/${WINDOW_START}/${WINDOW_END}?direction=Departure&withCancelled=false&withCargo=false&withPrivate=false`;

console.log(`Querying: ${url}`);

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': HOST
    }
};

const req = https.request(url, options, (res) => {
    let chunks = [];

    res.on('data', (chunk) => {
        chunks.push(chunk);
    });

    res.on('end', () => {
        const body = Buffer.concat(chunks);
        try {
            const data = JSON.parse(body.toString());
            console.log('Status:', res.statusCode);

            if (data.departures) {
                console.log(`Found ${data.departures.length} total departures.`);

                // Look for DXB
                const dxbFlights = data.departures.filter(f =>
                    f.arrival && f.arrival.airport &&
                    (f.arrival.airport.iata === 'DXB' || f.arrival.airport.name.toLowerCase().includes('dubai'))
                );

                console.log(`Found ${dxbFlights.length} flights to Dubai (DXB).`);

                if (dxbFlights.length > 0) {
                    console.log('Sample DXB Flight:', JSON.stringify(dxbFlights[0], null, 2));
                } else {
                    console.log('Sample random flight to check structure:', JSON.stringify(data.departures[0], null, 2));
                }
            } else {
                console.log('No departures field in response:', JSON.stringify(data, null, 2));
            }
        } catch (e) {
            console.error('Error parsing JSON:', e);
            console.log('Raw body:', body.toString());
        }
    });
});

req.on('error', (e) => {
    console.error('Request error:', e);
});

req.end();
