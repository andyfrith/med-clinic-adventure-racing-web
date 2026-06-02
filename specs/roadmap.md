# Roadmap

Phased implementation for Adventure Racing Med Clinic. Small phases; each demoable before the next.

Aligned with `mission.md` and `tech-stack.md`.

## Stakeholder decisions

Captured via constitution questionnaire.

| Decision | Choice |
|----------|--------|
| **First stakeholder demo** | **End-to-end visit** — check-in → notes → cleared for race |
| **Phase order** | **Keep recommended order** (queue before sessions; doctor oversight before hardening) |
| **Offline / connectivity** | **Online-only** for v1 |
| **First live event** | **Next single race** (aggressive timeline) |
| **v1 roles** | Clinicians, doctors, ops, racers — all supported by first race |
| **Kiosk** | Waiting-area display in v1 |

---

## Phase 0 — Foundation

**Outcome:** Runnable locally and deployable to Vercel; stack locked.

- [ ] Next.js + TypeScript + ESLint/Prettier
- [ ] Drizzle + Postgres (Docker Compose local; Neon connection for prod)
- [ ] Tailwind + shadcn/ui app shell (responsive + kiosk-friendly layout stub)
- [ ] CI: GitHub Actions → Vercel preview
- [ ] `.env.example`; README: `docker compose up`, migrate, dev, deploy
- [ ] **Auth decision** documented in `tech-stack.md`
- [ ] Note in README: compliance deferred; v1 open in-app data access per `mission.md`

**Demo:** App on Vercel preview; local Docker DB; CI green.

---

## Phase 1 — Event, staff & racer access

**Outcome:** All roles can sign in; data scoped to an event.

- [ ] Models: `Event`, `StaffUser`, roles (clinician, doctor, ops), `Racer` account or racer-linked auth as designed in Phase 0
- [ ] Authentication (per Phase 0 choice)
- [ ] Route protection (authenticated app; v1 no field-level masking)
- [ ] Admin/ops: create and select active event
- [ ] Seed: sample event, users per role, sample racers

**Demo:** Login as clinician, doctor, ops, and racer; active event set.

---

## Phase 2 — Racer registry & check-in

**Outcome:** Racers identified; visits opened (staff or racer self-service per UX).

- [ ] `Racer` (bib, name, team, contact as needed)
- [ ] Search / lookup; racer self check-in if in scope for this phase
- [ ] `Visit` with status: `waiting`, `in_treatment`, `cleared`, `hold`
- [ ] Audit fields (who, when) — foundation for future compliance

**Demo:** Check-in → visit in `waiting`.

---

## Phase 3 — Queue dashboard

**Outcome:** Clinic sees live state; feeds first integrated demo with Phase 4.

- [ ] Counts: waiting, in treatment; simple wait signal
- [ ] Queue list; status transitions; assign clinician (minimal if needed)
- [ ] Polling or SSE for live updates
- [ ] **Kiosk view** — read-only waiting-area display (subset of queue/status)

**Demo:** Board updates as statuses change; kiosk reflects queue.

---

## Phase 4 — Visit documentation ⭐ First full stakeholder demo

**Outcome:** **End-to-end visit** — primary proof for stakeholders.

- [ ] Chief complaint / injury picklist + notes
- [ ] Quick assessment fields (event-configurable)
- [ ] Disposition: return to race, rest, evac, DNF-medical
- [ ] Treatment timestamps
- [ ] Doctor read access to visit summary

**Demo:** Check-in → queue → in treatment → notes → **cleared for race** (kiosk updates throughout).

---

## Phase 5 — Sessions & scheduling

**Outcome:** Booking and session management (README stakeholder item).

- [ ] Session/slot: resource, window, capacity
- [ ] Book from visit or check-in; list/calendar view
- [ ] Reschedule / cancel; prevent double-booking

**Demo:** Book session; visible on dashboard and racer/kiosk where applicable.

---

## Phase 6 — Doctor & lead oversight

**Outcome:** Oversight without blocking throughput.

- [ ] Doctor dashboard: holds, flagged visits
- [ ] Comment / approve hold release
- [ ] Event-day stats; export visit log (CSV/PDF)

**Demo:** Doctor releases hold; racer cleared.

---

## Phase 7 — Hardening for next race

**Outcome:** Ready for **next single race** (aggressive target).

- [ ] E2E: check-in → treat → clear; session path; kiosk path
- [ ] Load smoke test on queue + kiosk
- [ ] Runbook: deploy, rollback, Neon backup
- [ ] Security pass: auth, session timeout on shared devices, no secrets in client
- [ ] **Compliance backlog** ticket: legal review, RBAA, audit log requirements

**Demo:** Dry-run clinic day with all roles and kiosk.

---

## Phase 8+ — After first race

- Role-based field access (refine from “all authenticated see all data”)
- Formal compliance package (HIPAA, etc.) if required
- Offline / degraded connectivity if venue needs it
- Race registration API integration
- Personal racer status (SMS/link) if kiosk is not enough
- Multi-clinic / multi-course events

---

## How to use this roadmap

1. **First big demo = Phase 4** — Phases 2–3 are stepping stones; do not skip check-in/queue before visit notes.
2. **All roles by Phase 1** — Plan auth and UX for clinician, doctor, ops, and racer from the start.
3. **Kiosk in Phase 3** — Do not leave waiting-area display until the end.
4. **Online-only** — No offline sync scope in v1; document venue network contingency in runbook only.
5. **One phase theme per PR** when possible; update `tech-stack.md` when auth is chosen.
