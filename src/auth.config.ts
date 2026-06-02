import type { NextAuthConfig } from 'next-auth';

/**
 * Auth.js configuration scaffold. Credentials provider and Drizzle adapter
 * are implemented in Phase 1; no login enforced in Phase 0.
 */
export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    authorized() {
      return true;
    },
  },
} satisfies NextAuthConfig;
