# Adventure Racing Med Clinic

Next.js application for onsite med clinic operations: check-in, queue, visits, and waiting-area kiosk display.

## Prerequisites

- **Node.js** 20+ (see `.nvmrc`)
- **pnpm** 10+ (`corepack enable` or `npm install -g pnpm`)
- **Docker** (local PostgreSQL)

## Quick start (local)

1. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Generate `AUTH_SECRET` for local dev:

   ```bash
   openssl rand -base64 32
   ```

2. Start PostgreSQL:

   ```bash
   docker compose up -d
   ```

3. Install dependencies and run migrations:

   ```bash
   pnpm install
   pnpm db:migrate
   ```

4. Start the dev server:

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

### Placeholder routes (Phase 0)

| Route         | Purpose                                           |
| ------------- | ------------------------------------------------- |
| `/`           | Staff home / role hub                             |
| `/clinician`  | Clinician workspace stub                          |
| `/doctor`     | Doctor workspace stub                             |
| `/ops`        | Ops / admin stub                                  |
| `/racer`      | Racer self-service stub                           |
| `/kiosk`      | Waiting-area display (large type, minimal chrome) |
| `/api/health` | App + DB health JSON                              |

## Scripts

| Command            | Description                                                      |
| ------------------ | ---------------------------------------------------------------- |
| `pnpm dev`         | Next.js dev server                                               |
| `pnpm build`       | Production build                                                 |
| `pnpm start`       | Production server                                                |
| `pnpm lint`        | ESLint                                                           |
| `pnpm format`      | Prettier write                                                   |
| `pnpm typecheck`   | `tsc --noEmit`                                                   |
| `pnpm test`        | Vitest unit/smoke tests                                          |
| `pnpm test:e2e`    | Playwright E2E (local: `next dev`; CI: `next start` after build) |
| `pnpm test:e2e:ui` | Playwright UI mode                                               |
| `pnpm db:generate` | Generate Drizzle migrations from schema                          |
| `pnpm db:migrate`  | Apply migrations                                                 |
| `pnpm db:studio`   | Drizzle Studio (optional)                                        |

## Database

- **Local:** Docker Compose Postgres (`docker-compose.yml`). Default URL in `.env.example`.
- **Preview / production:** [Neon](https://neon.tech) PostgreSQL. Set `DATABASE_URL` in Vercel project settings.

**Preview DB strategy:** Use a shared Neon database (or branch) for all PR previews with the same schema; run `pnpm db:migrate` in CI and ensure preview env vars point at that instance. Per-PR databases are optional and documented when adopted.

## TanStack Query keys

Use hierarchical keys: `['queue', eventId]`, `['visit', visitId]`. See `src/lib/query-keys.ts`.

## Deploy (Vercel + Neon)

1. Connect the GitHub repo to [Vercel](https://vercel.com).
2. Set environment variables for **Preview** and **Production**:
   - `DATABASE_URL` — Neon connection string (SSL); preview can share the same Neon DB as production
   - `AUTH_SECRET` — random secret (`openssl rand -base64 32`); use the same value for preview and production unless you prefer isolation
   - `AUTH_URL` — **Production only** (e.g. `https://med-clinic-adventure-racing-web.vercel.app`)
   - `AUTH_TRUST_HOST` — **`true` on Preview** so Auth.js accepts per-PR `*.vercel.app` URLs (Vercel sets `VERCEL_URL` automatically)
3. Push to `main` or open a PR — Vercel creates a **preview deployment** per PR.
4. Run migrations against Neon before or as part of release (CI runs migrate on PR; apply to Neon for preview/prod via your release process).

## CI

GitHub Actions (`.github/workflows/ci.yml`) on push/PR: lint, typecheck, migrate (Postgres service), Vitest, build, Playwright E2E against production build.

## Auth (Phase 0)

**Auth.js** (NextAuth v5) is scaffolded (`src/auth.ts`, `/api/auth/[...nextauth]`) without enforced login. Full credentials + Drizzle adapter lands in Phase 1. See `specs/tech-stack.md`.

## Stakeholder context

- TypeScript, Next.js, React, PostgreSQL, tested architecture, responsive UX.
- Roles: clinicians, doctors, ops, racers; waiting-area kiosk in v1.
- Compliance / HIPAA tooling deferred — see `specs/mission.md` (README compliance note arrives Phase 1).

## Specs

- [Mission](specs/mission.md)
- [Roadmap](specs/roadmap.md)
- [Tech stack](specs/tech-stack.md)
- [Phase 0 plan](specs/2026-06-02-phase-0-foundation/plan.md)
