# Phase 0 — Foundation: Plan

Numbered task groups. Complete in order where dependencies apply; parallelize within a group when safe.

---

## 1. Repository & toolchain

1. Initialize Next.js (App Router) + TypeScript (strict) at repo root.
2. Add ESLint + Prettier; align with Next.js defaults; add format/lint scripts.
3. Pin Node version (`engines` / `.nvmrc`); document package manager in README.
4. Add `.gitignore` entries for `.env`, build artifacts, Playwright report/output.

---

## 2. Database & Drizzle

1. Add Docker Compose service for PostgreSQL (local dev).
2. Configure Drizzle + `drizzle-kit`; initial migration (empty or minimal `schema` placeholder if required by tooling).
3. Wire `DATABASE_URL` for local (Compose) and document Neon URL for preview/prod.
4. Add npm scripts: `db:generate`, `db:migrate`, `db:studio` (optional).
5. Verify migrate against local Docker DB from README instructions.

---

## 3. UI foundation (Tailwind + shadcn)

1. Install and configure Tailwind CSS per Next.js + shadcn conventions.
2. Initialize shadcn/ui; add **core primitives** (e.g. Button, Card, Input, Badge, Separator).
3. Add shadcn **Form** primitive (React Hook Form + Zod resolver pattern per `tech-stack.md`).
4. Add **layout-oriented** shadcn/custom components: app shell, sidebar, header—structured for future staff ops and read-only kiosk.
5. Define base typography, spacing, and responsive breakpoints per [responsive-design.md](../responsive-design.md) (desktop ops/doctor, tablet clinician, phone racer, kiosk display).
6. Add global styles / CSS variables consistent with shadcn theme.
7. **Mobile staff nav:** Sheet or drawer for sidebar at `< md`; persistent sidebar at `lg+`.

---

## 3b. Data, forms & client state (Zod, RHF, TanStack Query)

1. Add dependencies: `zod`, `react-hook-form`, `@hookform/resolvers`, `@tanstack/react-query` (and devtools in dev optional).
2. Create `lib/validations/` (or equivalent) with a sample Zod schema to establish convention (e.g. shared health-check or placeholder).
3. Wrap app with **`QueryClientProvider`** in a client provider component; import from root layout.
4. Document query-key naming convention (e.g. `['queue', eventId]`) in README or inline comment for Phase 3+.
5. No live queue/check-in queries in Phase 0—scaffold only.

---

## 4. App shell & placeholder routes

1. Root layout: branding stub, nav pattern for staff vs. public/kiosk.
2. Placeholder pages (static copy only):
   - Clinician
   - Doctor
   - Ops / admin
   - Racer (self-service stub)
   - Kiosk / waiting-area (read-only layout, large type, minimal chrome)
3. Link or route structure that mirrors future roadmap areas (no API, no DB reads required for placeholders).
4. Ensure kiosk route meets `responsive-design.md`: landscape-friendly, large type, minimal chrome, readable at 1920×1080.
5. Verify staff placeholder routes at 375px (racer), 768px (clinician), and 1024px+ (ops/doctor) with no horizontal scroll.

---

## 5. Auth decision (documentation + scaffold)

1. Record **Auth.js** (credentials + sessions + Drizzle adapter) in `specs/tech-stack.md` (replace Phase 0 “TBD”).
2. Add Auth.js dependencies and minimal config scaffold if needed for project structure—or document “install in Phase 1” with file stubs only (prefer scaffold without enforcing login in Phase 0).
3. Do **not** implement full staff/racer login or route protection in this phase unless required for CI smoke tests.

---

## 6. Environment & documentation

1. Create `.env.example` (local `DATABASE_URL`, Neon, `AUTH_SECRET`, Vercel-related vars as applicable).
2. README sections:
   - Prerequisites
   - `docker compose up`
   - Install, migrate, dev
   - Deploy to Vercel + Neon connection for preview/prod
   - How to run tests (Vitest, Playwright)
3. **Omit** README compliance/data-access note (deferred to Phase 1 per requirements).

---

## 7. Testing

1. **Vitest:** configure for Next/TS; add at least one smoke test (e.g. utility or route handler health).
2. **Playwright:** configure for CI; minimal E2E (e.g. home or kiosk page loads, title/heading visible).
3. **Playwright viewports:** smoke tests at 375×667 (mobile), 768×1024 (tablet), 1024×768 (desktop), and 1920×1080 (kiosk) for staff home and `/kiosk`.
4. Document local commands: `test`, `test:e2e`, `test:e2e:ui` (optional).

---

## 8. CI/CD (GitHub Actions → Vercel)

1. Workflow on PR/push to main:
   - Install dependencies (cache)
   - Lint
   - Typecheck (`tsc --noEmit` or Next build type phase)
   - Vitest
   - Playwright (against build or `next start`—document choice)
2. Vercel Git integration or Action deploy for **preview** on PR.
3. Configure preview environment variables for **Neon** (or documented preview DB); verify migrations run or schema is current for preview.
4. Fail PR if any required check fails.

---

## 9. Production readiness check

1. Confirm Vercel production project settings (Neon `DATABASE_URL`, `AUTH_SECRET` placeholder).
2. Smoke manual: local full loop; open Vercel preview URL; confirm DB-backed path if any minimal health check uses DB.
3. Open follow-up issues only for Phase 1+ (auth, models, README compliance note).

---

## Suggested PR slicing (optional)

| PR  | Contents                                        |
| --- | ----------------------------------------------- |
| 1   | Toolchain + Docker + Drizzle + README local     |
| 2   | UI shell + shadcn + placeholder routes + responsive pass (`responsive-design.md`) |
| 3   | Vitest + Playwright + GHA + Vercel/Neon preview |

Single PR acceptable if small team and CI stays green.
