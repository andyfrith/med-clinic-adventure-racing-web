import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

/**
 * Placeholder table for Phase 0 migrations. Replaced by domain tables in Phase 1.
 */
export const schemaMeta = pgTable('schema_meta', {
  id: serial('id').primaryKey(),
  label: text('label').notNull().default('phase-0'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
