import NextAuth from 'next-auth';

import { authConfig } from '@/auth.config';

/**
 * Auth.js entry point. Extend with Drizzle adapter and credentials in Phase 1.
 */
export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
