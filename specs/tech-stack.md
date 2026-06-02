# Tech stack

Constitutional technical choices for Adventure Racing Med Clinic. Deviations require an explicit decision recorded in this file or an ADR under `specs/` (when introduced).

## Stakeholder decisions

Captured via constitution questionnaire.

| Decision                    | Choice                                                                                          |
| --------------------------- | ----------------------------------------------------------------------------------------------- |
| **ORM**                     | **Drizzle**                                                                                     |
| **UI**                      | **Tailwind CSS + shadcn/ui**                                                                    |
| **Server / client state**   | **TanStack Query**                                                                              |
| **Forms**                   | **React Hook Form** + **Zod** (`@hookform/resolvers`)                                           |
| **Validation**              | **Zod** (shared schemas, client + server)                                                       |
| **Auth**                    | **Auth.js** (credentials + sessions + Drizzle adapter)                                          |
| **Local development**       | **Docker** + **PostgreSQL** (local)                                                             |
| **Production**              | **Vercel** (app) + **Neon** (Postgres)                                                          |
| **Connectivity (v1)**       | **Online-only** — reliable venue Wi‑Fi assumed                                                  |
| **Compliance tooling**      | **Deferred** — no HIPAA-specific stack requirements in Phase 0–7                                |
| **In-app data access (v1)** | **All authenticated users** — full racer/visit data; no field-level RBAC until post–first event |

---

## Goals

- **Reliable & testable** — Strict TypeScript, CI on every change, integration tests for visit flows.
- **Stakeholder-aligned UX** — Responsive dashboard per `responsive-design.md`; shadcn/ui for accessible, consistent components.
- **Ship for next race** — Simple deploy path (Vercel + Neon); local parity via Docker.

## Core stack

| Layer                     | Choice                               | Rationale                                                                    |
| ------------------------- | ------------------------------------ | ---------------------------------------------------------------------------- |
| **Language**              | TypeScript (strict)                  | End-to-end types for clinical workflows                                      |
| **Framework**             | Next.js (App Router)                 | README stakeholder requirement; Server Actions / Route Handlers              |
| **UI**                    | React + **Tailwind** + **shadcn/ui** | Fast, attractive, responsive UI                                              |
| **Database**              | **PostgreSQL**                       | README requirement; relational visits, racers, sessions                      |
| **ORM**                   | **Drizzle**                          | SQL-first, migrations, strong typing                                         |
| **Validation**            | **Zod**                              | Single source of truth for input/API shapes; parse on server; infer TS types |
| **Forms**                 | **React Hook Form**                  | Performant forms; pairs with shadcn `Form` + Zod resolver                    |
| **Server state (client)** | **TanStack Query**                   | Cache, refetch, and mutations for queue/kiosk live data and dashboards       |
| **Auth**                  | **Auth.js** (NextAuth v5)            | Credentials + sessions; Drizzle adapter in Phase 1                           |
| **Local**                 | **Docker Compose** → Postgres        | Matches prod schema; easy onboarding                                         |
| **Production**            | **Vercel** + **Neon**                | Preview deploys; managed Postgres                                            |

## Data, forms & validation

| Library             | Role                                                                                                                                                                         | Conventions                                                                                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Zod**             | Define schemas in shared modules (e.g. `lib/validations/`). **Always re-validate on the server** (Server Actions, Route Handlers) even when the client uses the same schema. | Prefer `z.infer<typeof schema>` for types; avoid duplicating interfaces.                                                                                                   |
| **React Hook Form** | All interactive forms (check-in, visit notes, session booking, admin). Use `@hookform/resolvers/zod` with shadcn/ui `Form` components.                                       | Default values from server data; minimal controlled re-renders.                                                                                                            |
| **TanStack Query**  | Client-side **server state**: queue lists, kiosk polling, dashboards. Use `QueryClientProvider` in the root layout.                                                          | Prefer Server Actions or Route Handlers as fetch/mutation targets; set `staleTime` / `refetchInterval` for live queue (Phase 3+). Mutations invalidate related query keys. |

- **Not replaced by TanStack Query:** Drizzle persistence, auth sessions, or one-off server rendering—those stay server-first per architecture below.
- **shadcn/ui:** Form primitives assume RHF + Zod; follow [shadcn Form](https://ui.shadcn.com/docs/components/form) patterns.

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

- **Server-first** — Validation and persistence on server (Zod parse in actions/handlers; never trust client-only checks).
- **Client server-state** — TanStack Query for live/refetched reads after hydration; forms via RHF + Zod.
- **Multi-tenant by event** — `event_id` on core entities.
- **v1 access model** — Authentication required; authorized users see full racer/visit records (see `mission.md`).

## Quality & operations

| Concern              | Approach                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Testing**          | Unit (domain); integration (API + DB); E2E (check-in → notes → cleared)                                      |
| **Linting / format** | ESLint + Prettier; CI on every PR                                                                            |
| **CI/CD**            | GitHub Actions → Vercel preview → production                                                                 |
| **Migrations**       | Drizzle Kit migrations only                                                                                  |
| **Observability**    | Structured logging; error tracking before first race (minimize sensitive data in logs until compliance pass) |

## UX & client requirements

- Evergreen browsers (current + previous major)
- **Responsive design (required):** All UI follows [`specs/responsive-design.md`](./responsive-design.md)
  - Mobile-first Tailwind breakpoints; no horizontal scroll at target viewports
  - **Desktop (`lg+`):** ops and doctor dashboards with persistent sidebar
  - **Tablet (`md`–`lg`):** clinician workflows; collapsible nav; touch-friendly controls
  - **Phone (`< md`):** racer self-service; single-column layouts; 44px min tap targets
  - **Kiosk (`/kiosk`):** large-type, read-only, landscape-friendly waiting-area display
  - Playwright viewport tests at 375, 768, 1024, and 1920px for changed routes
- Target WCAG 2.1 AA over time

## Compliance (deferred)

Formal HIPAA/regulatory requirements are **not** implemented in initial phases. Before storing production PHI at scale:

- Legal/compliance review
- BAA with vendors (Neon, Vercel, etc.) if required
- Audit logging, retention, and role-based access refinements

## Phase 0 auth decision (locked)

**Auth.js** (NextAuth v5) with credentials provider and **Drizzle adapter** for sessions/users.

- Phase 0: config scaffold only (`src/auth.ts`, `/api/auth/[...nextauth]`); no route protection.
- Phase 1: implement login, Drizzle tables, and middleware for staff/racer routes.

## Explicitly out of scope for v1 stack

- Offline-first / PWA sync (online-only per roadmap)
- Native mobile apps
- Clerk/Auth0 unless Phase 0 review prefers hosted auth

## References

- README: TypeScript, Next.js, React, Postgres, tested architecture, responsive UX
- `specs/mission.md`
- `specs/responsive-design.md`
- `specs/roadmap.md`
