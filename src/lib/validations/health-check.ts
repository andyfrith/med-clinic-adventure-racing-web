import { z } from 'zod';

/** Sample schema establishing Zod conventions for Phase 1+ forms and APIs. */
export const healthCheckSchema = z.object({
  service: z.string().min(1).max(64),
  status: z.enum(['ok', 'degraded', 'down']),
});

export type HealthCheckInput = z.infer<typeof healthCheckSchema>;
