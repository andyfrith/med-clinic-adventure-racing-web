---
name: changelog
description: >-
  Maintain CHANGELOG.md at the repo root with date headings. Bootstrap from git
  history when missing; append entries before merging PRs. Use when the user asks
  to update the changelog, prepare a PR for merge, or invokes the changelog skill.
disable-model-invocation: true
---

# Changelog

Keep `CHANGELOG.md` at the project root. **Invoke this skill manually before merging a PR** so the changelog ships with the change.

## File format

- **Newest dates first** (`## YYYY-MM-DD` at the top, below the intro).
- One `##` heading per calendar date (ISO 8601).
- Bullets under each date; **no sub-headings** unless the user asks for categories later.
- Write **user-facing** bullets (what changed for the product/team), not raw commit subjects.
- Optional PR link at end of bullet: `(#4)`.
- Do **not** duplicate bullets already listed for that date.
- Skip merge commits and trivial-only commits (e.g. "Merge pull request #N") when bootstrapping from git.

Template:

```markdown
# Changelog

All notable changes to this project are documented here.

## YYYY-MM-DD

- Short description of a shipped change (#PR if known)
- Another change
```

## Workflow

### 1. Check for existing changelog

Read `CHANGELOG.md` at the repo root.

### 2. If `CHANGELOG.md` is missing — bootstrap from git

```bash
git log --format='%ad|%s' --date=short --no-merges --reverse
```

1. Group commits by date.
2. Convert each meaningful commit into one user-facing bullet (combine related commits on the same day when appropriate).
3. Write sections **newest date first** (reverse chronological order of sections).
4. Create `CHANGELOG.md` using the template above.

### 3. If updating before a merge (normal case)

1. Identify changes on the current branch vs `master` (or the merge target):

   ```bash
   git log master..HEAD --format='%ad|%s' --date=short --no-merges
   git diff master...HEAD --stat
   ```

2. Determine today's date (or the date of the work if backfilling).
3. If `## YYYY-MM-DD` for that date **exists**, append new bullets under it.
4. If it **does not exist**, insert a new `## YYYY-MM-DD` section **above** all older dates (directly under the intro).
5. Summarize the PR in 1–5 bullets; prefer outcome over implementation detail.
6. Stage `CHANGELOG.md` with the rest of the PR — **do not merge without it** when this skill was invoked.

### 4. Quality bar

Each bullet should answer: *What can someone learn from this entry without reading the diff?*

| Prefer | Avoid |
|--------|--------|
| "Add mobile nav drawer for staff shell below lg breakpoint" | "Update app-shell.tsx" |
| "Fix CI pnpm setup for GitHub Actions" | "Fix stuff" |
| Grouped Phase/milestone summaries when many small commits land same day | One bullet per commit when they say the same thing |

## Examples

**Single feature PR**

```markdown
## 2026-06-02

- Complete Phase 0 responsive design pass with mobile nav and viewport E2E tests (#4)
```

**Same day, second PR — append under existing date**

```markdown
## 2026-06-02

- Complete Phase 0 responsive design pass with mobile nav and viewport E2E tests (#4)
- Add event and staff auth models with Drizzle migrations (#5)
```

**Bootstrap from history (first-time)**

```markdown
# Changelog

All notable changes to this project are documented here.

## 2026-06-02

- Implement Phase 0 foundation app, CI, and Vercel deployment
- Add responsive design standards and complete responsive shell pass
- Add project specs, tech stack, and stakeholder README
```

## Checklist (before merge)

- [ ] `CHANGELOG.md` exists at repo root
- [ ] Today's (or PR) date section present
- [ ] New work summarized in user-facing bullets
- [ ] No duplicate bullets for the same change
- [ ] File included in the PR commit(s)
