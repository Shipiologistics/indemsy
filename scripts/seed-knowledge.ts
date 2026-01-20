import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../lib/schema';
import { pipeline } from '@xenova/transformers';

// Load environment variables
config({ path: '.env' });
config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

// Helper to flatten JSON into chunks
function flattenJson(data: any, prefix = ''): string[] {
    let chunks: string[] = [];

    for (const key in data) {
        if (typeof data[key] === 'object' && data[key] !== null) {
            chunks = chunks.concat(flattenJson(data[key], `${prefix}${key}.`));
        } else if (typeof data[key] === 'string') {
            // Create a readable context chunk
            if (data[key].length > 10) {
                chunks.push(`Context Key: ${prefix}${key}\nContent: ${data[key]}`);
            }
        }
    }

    return chunks;
}

async function main() {
    console.log('Starting local knowledge base seeding...');

    // Initialize local embedding pipeline
    console.log('Loading local embedding model (Xenova/all-MiniLM-L6-v2)...');
    const generateEmbedding = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

    // 1. Load Messages
    const locales = ['en', 'fr'];
    const allChunks: { text: string; category: string; tags: string[] }[] = [];

    for (const locale of locales) {
        const filePath = path.join(process.cwd(), 'messages', `${locale}.json`);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(fileContent);

        console.log(`Processing ${locale}.json...`);
        const chunks = flattenJson(jsonData);

        chunks.forEach(chunk => {
            allChunks.push({
                text: chunk,
                category: 'website_content',
                tags: [locale, 'localization'],
            });
        });
    }

    console.log(`Found ${allChunks.length} chunks to process.`);

    // 2. Process and Insert
    const BATCH_SIZE = 10; // Smaller batch for local processing

    for (let i = 0; i < allChunks.length; i += BATCH_SIZE) {
        const batch = allChunks.slice(i, i + BATCH_SIZE);
        console.log(`Processing batch ${i / BATCH_SIZE + 1} of ${Math.ceil(allChunks.length / BATCH_SIZE)}...`);

        const promises = batch.map(async (item) => {
            try {
                // Generate embedding locally
                const output = await generateEmbedding(item.text, { pooling: 'mean', normalize: true });
                const embedding = Array.from(output.data);

                await db.insert(schema.knowledgeBase).values({
                    title: 'Website Localization Data',
                    content: item.text,
                    category: item.category,
                    tags: item.tags,
                    embedding: embedding,
                });
            } catch (error) {
                console.error(`Error processing chunk: ${item.text.substring(0, 50)}...`, error);
            }
        });

        await Promise.all(promises);
    }

    console.log('Seeding completed successfully with local embeddings!');
    await pool.end();
}

main().catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
});
