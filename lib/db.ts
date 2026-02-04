import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

// Optimized for Vercel serverless - single connection per invocation
const pool = new Pool({
    connectionString: (connectionString || '').replace('sslmode=require', 'sslmode=verify-full'),
    max: 1, // Limit to 1 connection for serverless
    idleTimeoutMillis: 120000, // 2 minutes idle timeout
    connectionTimeoutMillis: 10000, // 10 second connection timeout
});

export const db = drizzle(pool, { schema });
