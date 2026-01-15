const https = require('https');

const API_KEY = 'd5af0d6911mshadbc192b04a79dbp161180jsnb10fda4d9795';
const HOST = 'aerodatabox.p.rapidapi.com';

const AIRPORT = 'DEL';
const WINDOW_START = '2026-01-15T00:00';
const WINDOW_END = '2026-01-15T11:59';

const url = `https://${HOST}/flights/airports/iata/${AIRPORT}/${WINDOW_START}/${WINDOW_END}?direction=Departure&withCancelled=false&withCargo=false&withPrivate=false`;

const req = https.request(url, {
    method: 'GET',
    headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': HOST }
}, (res) => {
    let body = '';
    res.on('data', (c) => body += c);
    res.on('end', () => {
        try {
            const data = JSON.parse(body);
            if (data.departures) {
                console.log(`Total Departures: ${data.departures.length}`);

                const dests = data.departures.map(f => f.arrival?.airport?.iata).filter(Boolean);
                console.log('Unique Destinations:', [...new Set(dests)].slice(0, 10).join(', '));

                const dxb = data.departures.filter(f => f.arrival?.airport?.iata === 'DXB');
                console.log(`Flights to DXB: ${dxb.length}`);

                if (dxb.length > 0) {
                    console.log('DXB Flight Example:', JSON.stringify(dxb[0].arrival.airport, null, 2));
                }
            }
        } catch (e) { console.log('Error', e); }
    });
});
req.end();
