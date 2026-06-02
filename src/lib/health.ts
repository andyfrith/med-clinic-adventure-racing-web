import { healthCheckSchema } from '@/lib/validations/health-check';

/**
 * Parses and normalizes a health-check payload (used by unit smoke tests).
 */
export function parseHealthCheck(input: unknown) {
  return healthCheckSchema.parse(input);
}
