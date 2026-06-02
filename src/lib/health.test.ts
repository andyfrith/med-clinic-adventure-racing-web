import { describe, expect, it } from 'vitest';

import { parseHealthCheck } from '@/lib/health';

describe('parseHealthCheck', () => {
  it('parses a valid health payload', () => {
    const result = parseHealthCheck({
      service: 'med-clinic-adventure-racing-web',
      status: 'ok',
    });

    expect(result.status).toBe('ok');
    expect(result.service).toBe('med-clinic-adventure-racing-web');
  });

  it('rejects invalid status values', () => {
    expect(() => parseHealthCheck({ service: 'test', status: 'unknown' })).toThrow();
  });
});
