const https = require('https');

const API_KEY = 'd5af0d6911mshadbc192b04a79dbp161180jsnb10fda4d9795';
const HOST = 'aerodatabox.p.rapidapi.com';

const AIRPORT = 'DEL';
const WINDOW_START = '2026-01-15T00:00';
const WINDOW_END = '2026-01-15T05:00';

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
            if (data.departures && data.departures.length > 0) {
                console.log(JSON.stringify(data.departures[0].movement, null, 2));
            }
        } catch (e) { }
    });
});
req.end();
