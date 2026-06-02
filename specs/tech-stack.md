# Tech stack

Constitutional technical choices for Adventure Racing Med Clinic. Deviations require an explicit decision recorded in this file or an ADR under `specs/` (when introduced).

## Stakeholder decisions

Captured via constitution questionnaire.

| Decision | Choice |
|----------|--------|
| **ORM** | **Drizzle** |
| **UI** | **Tailwind CSS + shadcn/ui** |
| **Auth** | **Decide in Phase 0** (candidates: email/password + server sessions) |
| **Local development** | **Docker** + **PostgreSQL** (local) |
| **Production** | **Vercel** (app) + **Neon** (Postgres) |
| **Connectivity (v1)** | **Online-only** — reliable venue Wi‑Fi assumed |
| **Compliance tooling** | **Deferred** — no HIPAA-specific stack requirements in Phase 0–7 |
| **In-app data access (v1)** | **All authenticated users** — full racer/visit data; no field-level RBAC until post–first event |

---

## Goals

- **Reliable & testable** — Strict TypeScript, CI on every change, integration tests for visit flows.
- **Stakeholder-aligned UX** — Responsive dashboard; shadcn/ui for accessible, consistent components.
- **Ship for next race** — Simple deploy path (Vercel + Neon); local parity via Docker.

## Core stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| **Language** | TypeScript (strict) | End-to-end types for clinical workflows |
| **Framework** | Next.js (App Router) | README stakeholder requirement; Server Actions / Route Handlers |
| **UI** | React + **Tailwind** + **shadcn/ui** | Fast, attractive, responsive UI |
| **Database** | **PostgreSQL** | README requirement; relational visits, racers, sessions |
| **ORM** | **Drizzle** | SQL-first, migrations, strong typing |
| **Auth** | **TBD Phase 0** | Staff + racer flows; document choice before Phase 1 |
| **Local** | **Docker Compose** → Postgres | Matches prod schema; easy onboarding |
| **Production** | **Vercel** + **Neon** | Preview deploys; managed Postgres |

## Architecture (high level)

```
[Browser: staff dashboard, racer flows, waiting-area kiosk]
        ↓ HTTPS (online-only v1)
[Next.js on Vercel]
        ↓
[Application services: visits, queue, sessions, racers]
        ↓
[Drizzle → PostgreSQL (Neon prod / Docker local)]
```

- **Server-first** — Validation and persistence on server.
- **Multi-tenant by event** — `event_id` on core entities.
- **v1 access model** — Authentication required; authorized users see full racer/visit records (see `mission.md`).

## Quality & operations

| Concern | Approach |
|---------|----------|
| **Testing** | Unit (domain); integration (API + DB); E2E (check-in → notes → cleared) |
| **Linting / format** | ESLint + Prettier; CI on every PR |
| **CI/CD** | GitHub Actions → Vercel preview → production |
| **Migrations** | Drizzle Kit migrations only |
| **Observability** | Structured logging; error tracking before first race (minimize sensitive data in logs until compliance pass) |

## UX & client requirements

- Evergreen browsers (current + previous major)
- Responsive: desktop ops/doctors; tablet clinicians; kiosk-friendly waiting-area view
- Target WCAG 2.1 AA over time

## Compliance (deferred)

Formal HIPAA/regulatory requirements are **not** implemented in initial phases. Before storing production PHI at scale:

- Legal/compliance review
- BAA with vendors (Neon, Vercel, etc.) if required
- Audit logging, retention, and role-based access refinements

## Phase 0 auth decision (open)

Pick one before Phase 1 and record here:

1. **Auth.js** (credentials + sessions + Prisma/Drizzle adapter)
2. **Custom** sessions (cookie + Drizzle `Session` table)
3. Other (document rationale)

## Explicitly out of scope for v1 stack

- Offline-first / PWA sync (online-only per roadmap)
- Native mobile apps
- Clerk/Auth0 unless Phase 0 review prefers hosted auth

## References

- README: TypeScript, Next.js, React, Postgres, tested architecture, responsive UX
- `specs/mission.md`
- `specs/roadmap.md`
