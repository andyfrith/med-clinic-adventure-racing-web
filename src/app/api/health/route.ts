import { sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { getDb } from '@/db';
import { healthCheckSchema } from '@/lib/validations/health-check';

/**
 * Health check for CI, preview, and ops. Verifies DB connectivity when configured.
 */
export async function GET() {
  const payload = healthCheckSchema.parse({
    service: 'med-clinic-adventure-racing-web',
    status: 'ok',
  });

  let database: 'connected' | 'unconfigured' | 'error' = 'unconfigured';

  if (process.env.DATABASE_URL) {
    try {
      await getDb().execute(sql`SELECT 1`);
      database = 'connected';
    } catch {
      database = 'error';
      return NextResponse.json(
        { ...payload, status: 'degraded', database },
        { status: 503 },
      );
    }
  }

  return NextResponse.json({ ...payload, database });
}
