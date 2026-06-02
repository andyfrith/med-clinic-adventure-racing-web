# Phase 0 — Foundation: Validation

How we know implementation succeeded and the phase PR can merge.

**Merge policy:** All **CI checks required** + **manual demo checklist** below (reviewer or author signs off).

---

## Automated checks (CI — must pass)

| Check            | Command / source                              | Pass criteria                                              |
| ---------------- | --------------------------------------------- | ---------------------------------------------------------- |
| **Lint**         | ESLint via CI                                 | Zero errors on changed code                                |
| **Typecheck**    | `tsc --noEmit` and/or `next build` type phase | No type errors                                             |
| **Unit / smoke** | Vitest                                        | All tests green; at least one meaningful smoke test exists |
| **E2E**          | Playwright in CI                              | Smoke spec passes (app serves; key page reachable)         |
| **Build**        | Next.js production build                      | Succeeds in CI                                             |

GitHub Actions workflow runs on PR; merge blocked if any required job fails. `master` requires a PR and passing checks (branch protection).

**Playwright (CI):** E2E runs against `pnpm start` after `pnpm build`. **Local:** `pnpm test:e2e` uses `pnpm dev` with `reuseExistingServer`.

---

## Deployment & database (preview)

| Check                 | How to verify                                                                 | Pass criteria                                                                |
| --------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Vercel preview**    | Open PR preview URL                                                           | App shell loads (no 5xx)                                                     |
| **Neon connectivity** | Preview env uses Neon `DATABASE_URL`; optional DB health route or migrate job | Preview can reach DB (connection succeeds; migrations applied or documented) |
| **Local parity**      | Follow README from clean clone                                                | `docker compose up`, migrate, `dev` works                                    |

---

## Functional / UX (manual — Phase 0 placeholders)

- [ ] Home or staff shell renders on desktop width.
- [ ] Placeholder routes exist and are reachable: **clinician**, **doctor**, **ops**, **racer**.
- [ ] **Kiosk / waiting-area** route: read-only feel, large readable text, minimal navigation chrome.
- [ ] Layout remains usable at tablet width (clinician) and wide kiosk width.
- [ ] No secrets in client bundle (env only server-side where applicable).

---

## Documentation & spec alignment

- [ ] `.env.example` lists all required variables with short comments.
- [ ] README: Docker, migrate, dev, test, deploy (Vercel + Neon).
- [ ] `specs/tech-stack.md` updated: **Auth.js** recorded (Phase 0 auth no longer TBD).
- [ ] **Zod**, **React Hook Form** (+ resolver), and **TanStack Query** installed; `QueryClientProvider` in root layout; shadcn Form available for later phases.
- [ ] Compliance/data-access **not** required in README this phase (Phase 1).
- [ ] This folder (`specs/2026-06-02-phase-0-foundation/`) reflects what was built; note intentional deviations in PR description.

---

## Security & hygiene (light pass)

- [ ] `.env` gitignored; no credentials committed.
- [ ] `AUTH_SECRET` (or equivalent) documented for preview/prod only via platform env.
- [ ] Dependencies: no critical known vulnerabilities ignored without note.

---

## Demo script (stakeholder / reviewer)

**Local (~5 min)**

1. Clone branch; copy `.env.example` → `.env.local`.
2. `docker compose up -d` → run migrations → start dev server.
3. Visit staff shell and each placeholder role route + kiosk route.
4. Run `pnpm test` (or documented equivalent) and `pnpm test:e2e` locally.

**Preview (~3 min)**

1. Open Vercel PR preview URL.
2. Confirm same routes load as local.
3. If DB health check exists, confirm healthy response on preview.

---

## Merge checklist (sign-off)

| Item                                              | Owner             | Done |
| ------------------------------------------------- | ----------------- | ---- |
| CI green on PR                                    | Author            | ☐    |
| Manual demo (local)                               | Author            | ☐    |
| Preview URL + Neon verified                       | Author / reviewer | ☐    |
| `tech-stack.md` auth updated                      | Author            | ☐    |
| Roadmap Phase 0 items reflected in PR description | Author            | ☐    |

**Not required for merge:** Real login, domain models, HIPAA controls, README compliance paragraph.

---

## Post-merge

- Mark Phase 0 items complete in `roadmap.md` (separate PR or same if policy allows).
- Begin Phase 1 spec using Auth.js implementation against documented adapter choice.
