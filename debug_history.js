const https = require('https');

const API_KEY = 'd5af0d6911mshadbc192b04a79dbp161180jsnb10fda4d9795';
const HOST = 'aerodatabox.p.rapidapi.com';

const AIRPORT = 'DEL';
// Set date to 3 days ago
const date = new Date();
date.setDate(date.getDate() - 3);
const dateStr = date.toISOString().split('T')[0];

const WINDOW_START = `${dateStr}T00:00`;
const WINDOW_END = `${dateStr}T11:59`;

console.log(`Checking history for ${dateStr}...`);

const url = `https://${HOST}/flights/airports/iata/${AIRPORT}/${WINDOW_START}/${WINDOW_END}?direction=Departure&withCancelled=false&withCargo=false&withPrivate=false`;

const req = https.request(url, {
    method: 'GET',
    headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': HOST }
}, (res) => {
    let body = '';
    res.on('data', (c) => body += c);
    res.on('end', () => {
        try {
            if (res.statusCode !== 200) {
                console.log(`Error Status: ${res.statusCode}`);
                console.log(body);
                return;
            }

            const data = JSON.parse(body);
            if (data.departures) {
                console.log(`Total Departures found: ${data.departures.length}`);
                if (data.departures.length > 0) {
                    console.log('First flight structure:', JSON.stringify(data.departures[0].movement, null, 2));
                }
            } else {
                console.log('No departures field found.');
                console.log(JSON.stringify(data, null, 2));
            }
        } catch (e) { console.log('Error parsing:', e); }
    });
});
req.end();
