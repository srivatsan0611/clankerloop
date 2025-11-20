import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as schema from './schema';

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create the drizzle instance with schema
export const db = drizzle(pool, { schema });

// Export pool for manual connection management if needed
export { pool };

// Helper to close the connection pool
export async function closeConnection() {
  await pool.end();
}

// Re-export schema for convenience
export * from './schema';
