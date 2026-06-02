# Phase 0 — Foundation: Requirements

**Roadmap:** [Phase 0 — Foundation](../roadmap.md#phase-0--foundation)  
**Status:** Spec approved via stakeholder questionnaire (2026-06-02)  
**Guides:** [mission.md](../mission.md) · [tech-stack.md](../tech-stack.md) · [responsive-design.md](../responsive-design.md)

## Goal

Deliver a runnable, deployable foundation: Next.js app at repo root, local Postgres via Docker, production path on Vercel + Neon, CI green, and placeholder UX for all v1 roles—without domain models or real authentication yet.

## In scope

| Area                     | Requirement                                                                                                                                                                      |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Stack**                | Next.js (App Router), TypeScript (strict), ESLint, Prettier                                                                                                                      |
| **Data & forms**         | **Zod**, **React Hook Form** (`@hookform/resolvers`), **TanStack Query** — installed and wired (providers, conventions); no production forms/queries until later phases          |
| **Database**             | Drizzle ORM + PostgreSQL; Docker Compose for local; Neon connection documented for prod/preview                                                                                  |
| **UI**                   | Tailwind CSS; shadcn/ui initialized with core primitives and layout-oriented components (sidebar, header, etc.) sized for future staff dashboard and kiosk |
| **Responsive design**    | Layouts follow [responsive-design.md](../responsive-design.md): mobile-first breakpoints, role-appropriate viewports, touch-friendly targets, kiosk typography |
| **App shell**            | Responsive layout stub; **placeholder routes/pages** for clinician, doctor, ops, and racer flows plus a **kiosk-friendly** waiting-area view (static/placeholder content only) |
| **Auth (decision only)** | **Auth.js** (credentials + sessions + Drizzle adapter) chosen and documented in `tech-stack.md`; no full login implementation required in Phase 0 unless needed for layout stubs |
| **CI/CD**                | GitHub Actions: lint, typecheck, Vitest, Playwright → Vercel preview on PR                                                                                                       |
| **Config**               | `.env.example` with local and Neon-related variables; README covers `docker compose up`, migrate, dev, deploy                                                                    |
| **Testing**              | Vitest (unit/smoke); Playwright E2E (minimal smoke, e.g. app loads / health or home)                                                                                             |
| **Repo layout**          | Single Next.js application at **repository root**                                                                                                                                |

## Out of scope (deferred)

- Domain models (`Event`, `Visit`, `Racer`, etc.) — Phase 1+
- Working authentication, route protection, or role-based data — Phase 1
- Compliance/HIPAA implementation — deferred per `mission.md`
- README compliance/data-access disclaimer — **deferred to Phase 1** (remain documented in `specs/mission.md` only for Phase 0)
- Offline/PWA, hosted auth (Clerk/Auth0), native apps — per `tech-stack.md`

## Decisions (locked for this phase)

| Decision                       | Choice                                                                             | Rationale                                                                                                   |
| ------------------------------ | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Auth (Phase 0)**             | **Auth.js** + Drizzle adapter                                                      | Aligns with tech-stack candidates; record in `tech-stack.md` before Phase 1 implementation                  |
| **Scope depth**                | Shell + **placeholder pages for all four roles** + kiosk view                      | Satisfies roadmap “kiosk-friendly layout stub” and mission “all roles from the start” without building auth |
| **Compliance note in README**  | **Skip in Phase 0**                                                                | Add when auth and data access exist (Phase 1)                                                               |
| **CI**                         | **GitHub Actions → Vercel preview**                                                | Roadmap demo target; preview must be demonstrable                                                           |
| **Preview database**           | **Vercel preview connects to Neon** (or documented preview DB with same schema)    | Stakeholder bar: preview is not static-only                                                                 |
| **Structure**                  | **Root-level Next.js app**                                                         | Simplest path to first race                                                                                 |
| **shadcn**                     | **Full init** — primitives + layout components with future dashboard/kiosk in mind | Reduces rework in Phases 3–4                                                                                |
| **Zod / RHF / TanStack Query** | **Phase 0 install + scaffold**                                                     | Aligns with `tech-stack.md`; RHF + Zod via shadcn Form; `QueryClientProvider` in root layout                |

## Context

- **North star:** Throughput for onsite care (`mission.md`); Phase 0 enables later check-in → queue → visit flow.
- **Online-only v1:** No offline sync; assume venue Wi‑Fi.
- **v1 data access (later):** Any authenticated user may view full racer/visit data; no field-level RBAC until post–first race.
- **First stakeholder demo** remains **Phase 4** (end-to-end visit); Phase 0 is infrastructure only.

## Deliverables

1. Working local dev loop (Docker Postgres, migrations, `pnpm`/`npm` dev).
2. Vercel preview deployment with DB connectivity per validation.md.
3. Updated `tech-stack.md` **Phase 0 auth** section: Auth.js selected (replace “TBD”).
4. Placeholder role/kiosk routes discoverable from app shell (no real data).
5. App shell and placeholders meet `responsive-design.md` (mobile nav, target viewports, Playwright viewport smoke tests).

## Dependencies

- GitHub repo + Vercel project + Neon project (secrets for CI/preview).
- Node LTS version pinned in `.nvmrc` or `package.json` `engines` (document in README).

## Open questions (resolve during implementation if blocked)

- Exact Neon branch/preview strategy (shared preview DB vs. per-PR) — document chosen approach in README.
- Playwright: run against `next dev` locally vs. built app in CI — pick one and document in `validation.md` execution notes.
