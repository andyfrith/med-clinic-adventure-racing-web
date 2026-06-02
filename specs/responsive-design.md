# Responsive design standards

Cross-cutting UI requirements for Adventure Racing Med Clinic. All phases that ship UI must follow this document unless a feature spec records an explicit, reviewed exception.

**Guides:** [mission.md](./mission.md) · [tech-stack.md](./tech-stack.md) · [roadmap.md](./roadmap.md)

---

## Goals

- **Mobile-first** — Layouts scale up from small viewports; avoid desktop-only assumptions.
- **Role-appropriate surfaces** — Each workflow targets the device mix used onsite (see viewport targets below).
- **Kiosk clarity** — Waiting-area display readable at distance on large landscape screens.
- **Touch-friendly** — Primary actions usable on tablets and phones without precision pointer.
- **No horizontal scroll** — Content reflows; tables and dense data get mobile-specific patterns when needed.

---

## Viewport targets

| Surface | Primary roles | Typical device | Tailwind range | Notes |
| ------- | ------------- | -------------- | -------------- | ----- |
| **Staff ops / doctor** | Ops, doctor | Laptop / desktop | `lg` (1024px) and up | Multi-column dashboards, sidebar always visible |
| **Clinician** | Clinician | Tablet (landscape) | `md`–`lg` (768–1023px) | Sidebar collapses or becomes drawer; forms full-width |
| **Racer self-service** | Racer | Phone / small tablet | `< md` (< 768px) | Single column; large tap targets; minimal chrome |
| **Kiosk** | Waiting area | TV / large monitor | `lg`+ landscape, often 1920×1080 | Read-only; oversized type; minimal navigation |

Use Tailwind’s default breakpoints unless a feature spec documents a custom token:

| Token | Min width |
| ----- | --------- |
| `sm`  | 640px     |
| `md`  | 768px     |
| `lg`  | 1024px    |
| `xl`  | 1280px    |
| `2xl` | 1536px    |

---

## Layout patterns

### App shell (staff routes)

- **Mobile (`< md`):** Sidebar hidden by default; hamburger or equivalent opens a sheet/drawer. Header stays fixed or sticky with title truncated if needed.
- **Tablet (`md`–`lg`):** Collapsible sidebar or icon rail; main content uses full remaining width.
- **Desktop (`lg+`):** Persistent sidebar (`w-56`–`w-64`); main content with responsive padding (`p-4 md:p-6 lg:p-8`).
- **Max width:** Optional `max-w-*` on dense forms; dashboards may use full width.

### Kiosk route (`/kiosk`)

- Full viewport height (`min-h-svh`); centered content with `max-w-[1920px]` container.
- Typography scales with breakpoints (e.g. `text-5xl md:text-7xl lg:text-8xl` for primary status).
- No staff navigation chrome; high contrast; safe-area padding for mounted displays.
- Assume landscape; portrait should still be readable (stacked layout, no clipped text).

### Grids and lists

- Default single column; add columns at breakpoints (`grid-cols-1 sm:grid-cols-2 xl:grid-cols-3`).
- Queue and visit lists: card layout on mobile; table layout on `md+` when columns are essential.
- Avoid fixed pixel widths on content; prefer `min-w-0`, `flex-1`, and `truncate` in flex/grid children.

### Forms

- Full-width inputs on mobile; multi-column field groups only at `md+`.
- Labels above inputs on narrow viewports; inline labels only when space allows.
- Submit actions sticky or visible without scrolling on short viewports when practical.

---

## Touch and interaction

- **Minimum tap target:** 44×44 CSS pixels for primary actions (buttons, nav items, check-in controls).
- **Spacing:** Adequate gap between adjacent tap targets on touch surfaces (racer, clinician tablet).
- **Hover-only affordances:** Do not rely on hover for critical information; use visible labels or icons.

---

## Typography and density

- Base body text: readable at arm’s length on tablet (`text-sm md:text-base` or equivalent).
- Kiosk: step up 2–3 scale levels from staff UI for status and “now serving” values.
- Use `tabular-nums` for queue numbers, bib IDs, and timers.
- Respect user font scaling (use `rem` / Tailwind scale; avoid locking critical UI in fixed `px` heights without overflow handling).

---

## Images and media

- Responsive images via Next.js `Image` where used; explicit `sizes` for layout breakpoints.
- Icons: scale with text (`size-4`, `size-5`) rather than fixed layout-breaking dimensions.

---

## Implementation conventions

- **Mobile-first CSS:** Unprefixed utilities for smallest layout; prefix `sm:`, `md:`, `lg:` for larger.
- **shadcn/ui:** Use responsive variants on `Sheet` (mobile nav), `Dialog`, and `DropdownMenu` instead of cramming desktop patterns into narrow viewports.
- **Container queries:** Optional for component-level responsiveness; not required in v1.
- **Print / export:** Out of scope until Phase 6 export features; do not block responsive layouts for print.

---

## Testing requirements

Every phase that adds or changes UI must include:

| Check | How |
| ----- | --- |
| **No overflow** | Manual or Playwright at 375px, 768px, 1024px, 1920px widths |
| **Kiosk route** | Playwright at 1920×1080 landscape; primary heading visible |
| **Staff shell** | Sidebar/drawer behavior at `< md` and persistent sidebar at `lg+` |
| **Touch targets** | Spot-check primary buttons on racer/clinician flows |

Document viewport sizes in Playwright specs (e.g. `page.setViewportSize({ width: 375, height: 667 })`).

CI: extend E2E beyond desktop-only smoke tests as routes gain real UI (Phase 0 responsive pass onward).

---

## Phase applicability

| Phase | Responsive focus |
| ----- | ---------------- |
| **0** | App shell, placeholder routes, kiosk stub — baseline compliance with this doc |
| **1** | Login and role hubs usable on phone (racer) and desktop (ops) |
| **2** | Check-in search and visit open on tablet + phone |
| **3** | Queue dashboard + kiosk live data at all target widths |
| **4** | Visit documentation forms on clinician tablet; doctor read view on desktop |
| **5** | Session calendar/list responsive; booking from mobile racer flow |
| **6** | Doctor dashboard and exports usable on desktop and tablet |
| **7** | E2E and load tests include kiosk + mobile racer paths |

---

## References

- [Tailwind CSS responsive design](https://tailwindcss.com/docs/responsive-design)
- [shadcn/ui Sidebar / Sheet patterns](https://ui.shadcn.com/docs/components/sidebar)
- WCAG 2.1 AA — target over time (`tech-stack.md`); focus order and contrast apply at all breakpoints
