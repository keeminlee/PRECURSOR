# SKILL: MORNING_COFFEE

> **Type:** Reusable task spec
> **Trigger:** Start of each working day
> **Agent:** `.github/agents/PrecursorMorning.agent.md`
> **Invocation:** `@PrecursorMorning`

---

## Purpose

Produce a lightweight daily orientation document. Reads current workspace state and yesterday's retro (if any), then drafts today's focus, carry-over, and suggested next steps into a single file the human reads to start the day.

This is the PRECURSOR-lane lightweight version. It has no CANON dependency, no graph dependency, no bronze/transcript dependency. It reads only what exists in the workspace.

---

## Preconditions

- Day-directory layout is enabled. If `docs/week_N/` does not exist at workspace root, stop and redirect:
  > *"Daily rituals require the day-directory layout. Run `@PrecursorStart` and enable rituals in BOOTSTRAP Phase E, or create `docs/week_1/{today_MM_DD_YYYY}/` manually, then retry."*

---

## Path Resolution

1. Determine today's date in `MM_DD_YYYY` format.
2. List `docs/` for `week_N/` folders and pick the one that contains (or should contain) today's date directory.
3. Create `docs/week_N/{date}/` if it does not already exist.
4. Output path: `docs/week_N/{date}/MORNING_COFFEE.md`.

---

## Inputs

### Context Gather (required before writing)

Read in parallel:

- `PROJECTS.md` — active projects and key paths
- `docs/week_N/{yesterday}/EOD_RETRO.md` — yesterday's carry-over, if it exists
- All `docs/week_N/**/PLANS/**/{slug}.md` — scan for plans with Status `NOT STARTED` or `IN PROGRESS`
- `git log --oneline -5` — last 5 commits on the current branch
- `git status --short` — uncommitted changes
- `git branch --show-current` — current branch

If any input is missing or unreadable, continue with what exists and note the gap in the output file.

---

## File Schema: `MORNING_COFFEE.md`

```markdown
# MORNING COFFEE: {date}
> **Created:** {MM_DD_YYYY}
> **Branch:** {current branch}
> **Prior retro:** [../{yesterday}/EOD_RETRO.md](../{yesterday}/EOD_RETRO.md) | none found

---

## 1. Today's Focus

{One short paragraph: what the day is oriented around. Pulled from yesterday's carry-over when available, otherwise inferred from active plans and current branch name.}

**Principal intent:** {What "today went well" materially means — the human-legible success criterion for the day.}

---

## 2. Active Plans

| Plan | Location | Status | Next Step | Impact Tier |
|------|----------|--------|-----------|-------------|
| `{slug}` | `{path}` | {NOT STARTED \| IN PROGRESS} | Step {n}: {step title} | {T0–T3} |

{If no active plans: "No active plans. Start a new one with `@PrecursorPlan {task}` or continue an existing one by referencing its path."}

---

## 3. Carry-Over from Yesterday

{Bulleted list lifted from yesterday's EOD_RETRO `## Carry-over` section. If no retro exists: "No prior retro found — first day or rituals just enabled."}

- {item}

---

## 4. Git Signals

- **Branch:** `{current branch}`
- **Uncommitted changes:** {count} files ({list paths, or "none"})
- **Last 5 commits:**
  - `{sha}` — {subject}

{If the branch is `main` or `master`, include a gentle note: "Working on main/master. Consider creating a feature branch before starting implementation work."}

---

## 5. Suggested Next Steps

{2–3 concrete recommendations. Ground each in a specific active plan or carry-over item. Avoid vague suggestions like "review priorities".}

1. {Specific action with concrete path/command}
2. {…}
3. {…}

---

## 6. Notes

{Free-form section for anything the context gather surfaced that doesn't fit above — gaps in the retro, unusual git state, plans with missing Greenlight, etc. Default: empty.}
```

---

## Mode Behavior

**Read:** all items in the Context Gather section above, in parallel where independent.

**Resolve:** today's day-directory per Path Resolution.

**Write:** `docs/week_N/{date}/MORNING_COFFEE.md` following the schema.

**Key rules:**

- Section 1 "Today's Focus" is grounded — pull from yesterday's carry-over first, then active plan Principal Intents, then current branch name. Do not invent priorities.
- Section 2 "Active Plans" scans only plan roots (`{slug}.md`), not every step file. Sort by oldest creation date first so stale work surfaces.
- Section 3 "Carry-Over" is a direct copy-paste from yesterday's retro. Do not summarize or paraphrase.
- Section 4 "Git Signals" uses literal command output. Do not interpret.
- Section 5 "Suggested Next Steps" must be concrete and reference specific plan paths or commands. Vague recommendations are a quality gate failure.
- If any input is missing, note the gap in Section 6 "Notes" rather than silently skipping.

**After writing:**

Display a chat-only summary:
- Branch name and uncommitted change count
- Top suggested next step
- Number of active plans

Then:

> *"Morning coffee ready at `docs/week_N/{date}/MORNING_COFFEE.md`. Review and edit before starting the day."*

Output the review gate:

```
---
⏸ AWAITING YOUR REVIEW
- [ ] Review MORNING_COFFEE.md
- [ ] Revise focus or next steps if needed
- [ ] When satisfied, begin the day — typically with @PrecursorPlan or @PrecursorExecute
---
```

---

## Completion Criteria

- [ ] `MORNING_COFFEE.md` exists at `docs/week_N/{date}/`
- [ ] All six sections populated (or explicit gap notes in Section 6)
- [ ] Suggested Next Steps are concrete and reference specific paths/commands
- [ ] Review gate delivered
