import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from './schema';

type Database = ReturnType<typeof drizzle<typeof schema>>;

let dbInstance: Database | null = null;

/**
 * Returns a Drizzle client when DATABASE_URL is configured.
 */
export function getDb(): Database {
  if (dbInstance) {
    return dbInstance;
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is not set');
  }

  const client = postgres(connectionString, { max: 1 });
  dbInstance = drizzle(client, { schema });
  return dbInstance;
}
