/**
 * TanStack Query key conventions (Phase 3+ live data).
 *
 * Pattern: ['domain', ...scopes] — e.g. ['queue', eventId], ['visit', visitId].
 * Invalidate related keys after mutations (e.g. check-in → ['queue', eventId]).
 */
export const queryKeys = {
  health: ['health'] as const,
  queue: (eventId: string) => ['queue', eventId] as const,
  visit: (visitId: string) => ['visit', visitId] as const,
};
