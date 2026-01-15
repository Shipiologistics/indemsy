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
                console.log(`Total Depts: ${data.departures.length}`);
                // Check formatted date
                const sample = data.departures[0];
                console.log('Sample Time:', sample.departure.scheduledTime.local);

                const dxb = data.departures.filter(f => f.arrival?.airport?.iata === 'DXB');
                console.log(`DXB Flights: ${dxb.length}`);

                if (dxb.length === 0) {
                    console.log('First 5 dests:', data.departures.slice(0, 5).map(f => f.arrival?.airport?.iata).join(', '));
                } else {
                    console.log('Found DXB flight:', dxb[0].number);
                }
            } else {
                console.log('No departures.');
            }
        } catch (e) { console.log('Error', e); }
    });
});
req.end();
