
const fs = require('fs');
const { Pool } = require('pg');
require('dotenv').config({ path: '.env.local' });
if (!process.env.DATABASE_URL) {
    require('dotenv').config({ path: '.env' });
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

async function seed() {
    try {
        const rawData = fs.readFileSync('airports_raw.json', 'utf8');
        const airports = JSON.parse(rawData);

        console.log(`Loaded ${Object.keys(airports).length} airports from file.`);

        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            console.log('Clearing existing airports...');
            await client.query('TRUNCATE TABLE airports RESTART IDENTITY');

            const batchSize = 1000;
            let batchValues = [];
            let batchParams = [];
            let count = 0;
            let totalInserted = 0;

            const keys = Object.keys(airports);
            for (const key of keys) {
                const airport = airports[key];

                if (airport.iata && airport.iata.length === 3) {
                    batchValues.push(airport);
                    count++;
                }

                if (batchValues.length >= batchSize || (key === keys[keys.length - 1] && batchValues.length > 0)) {
                    if (batchValues.length === 0) continue;

                    const valuesClause = batchValues.map((_, i) =>
                        `($${i * 7 + 1}, $${i * 7 + 2}, $${i * 7 + 3}, $${i * 7 + 4}, $${i * 7 + 5}, $${i * 7 + 6}, $${i * 7 + 7})`
                    ).join(',');

                    const flatParams = batchValues.flatMap(a => [
                        a.iata,
                        a.icao,
                        a.name,
                        a.city || null,
                        a.country || null,
                        a.lat || null,
                        a.lon || null
                    ]);

                    const query = `
                INSERT INTO airports (iata, icao, name, municipality_name, country_code, latitude, longitude)
                VALUES ${valuesClause}
            `;

                    await client.query(query, flatParams);
                    totalInserted += batchValues.length;
                    process.stdout.write(`Inserted ${totalInserted}...\r`);
                    batchValues = [];
                }
            }

            console.log(`\nSuccessfully inserted ${totalInserted} airports.`);
            await client.query('COMMIT');
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    } catch (err) {
        console.error('Error seeding airports:', err);
    } finally {
        await pool.end();
    }
}

seed();
