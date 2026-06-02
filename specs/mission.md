# Mission

## Stakeholder decisions

Captured via constitution questionnaire.

| Decision                       | Choice                                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| **v1 primary outcome**         | **Throughput** — fast queue, treatment, and return to race when medically appropriate                         |
| **v1 roles (fully supported)** | **All** — clinicians, doctors, clinic ops/admin, and racers (self-service)                                    |
| **Racer visibility in v1**     | **Shared kiosk / waiting-area display** for wait/status                                                       |
| **Health data / compliance**   | **Deferred** — HIPAA and formal compliance not addressed immediately; revisit before production scale         |
| **Data access within the app** | **Any authenticated user** may view full racer/patient and visit data in v1 (no field-level restrictions yet) |

---

## Purpose

Adventure Racing Med Clinic is an onsite clinical operations application for adventure racing events. It helps clinicians and healthcare professionals deliver treatment in a highly organized, efficient, and optimized way so racers receive adequate care and can return to the race as quickly as is medically appropriate.

**Throughput is the north star for v1.** Safety, documentation, and scheduling support that goal rather than competing with it.

## Who we serve

| Audience                            | Need                                                       | v1                                                   |
| ----------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------- |
| **Clinicians & healthcare workers** | Fast queue, visit context, minimal taps, clear disposition | Full support                                         |
| **Doctors & clinical leads**        | Oversight, holds, review without blocking frontline        | Full support                                         |
| **Clinic ops / admin**              | Event setup, dashboard, clinic flow                        | Full support                                         |
| **Racers**                          | Check-in / status; visibility while waiting                | Full support (including self-service where designed) |
| **Waiting area**                    | Shared display of queue/status                             | **Kiosk** display in v1                              |

## What success looks like

- **Throughput** — Racers move through check-in → treatment → cleared-for-race without unnecessary delay.
- **Adequate care** — Holds and doctor involvement when cases cannot be rushed.
- **Transparency for racers** — Kiosk (or equivalent) shows wait/status so staff are not the only source of updates.
- **Onsite reliability** — Stable operation on venue Wi‑Fi (online-only for v1; see `roadmap.md`).
- **Usable by all staff roles** — Clinicians, doctors, and ops each have workflows on day one of the first race.

## Product principles

1. **Speed at the point of care** — Default paths optimized for throughput; explicit hold when judgment requires it.
2. **Clarity under load** — Queue and kiosk states obvious during surges.
3. **Open access inside the app (v1)** — Logged-in users see racer/visit data needed to coordinate care; refine role-based restrictions after first event validation.
4. **Racer-facing where it helps flow** — Self-service check-in/status plus kiosk; not a consumer medical portal.
5. **Event-first** — Temporary onsite clinic, not a year-round hospital EMR.
6. **Professional UX** — Attractive, responsive, modern browsers (per README stakeholders).

## Scope (from stakeholders)

- Racers: ailments, injuries, immediate health concerns, check-in and status
- Clinic: capacity, flow, operational dashboard
- Doctors and healthcare workers: care delivery and oversight
- Booking and sessions: appointments and treatment sessions (phased after core visit flow; see `roadmap.md`)

## Non-goals (initial constitution)

- Formal HIPAA/compliance program in v1 (documented deferral; legal review before expanding PHI handling)
- Full hospital EMR replacement
- Off-event billing, insurance, or payer workflows
- Field-level PHI masking by role in v1 (planned refinement post–first race)

## Alignment with README

Dashboard on a **reliable, tested** stack (TypeScript, Next.js, React, Postgres) with strong **UX** and **responsive** design. This document guides `tech-stack.md` and `roadmap.md`.
