# SKILL: MORNING_COFFEE

> **Type:** Reusable task spec
> **Trigger:** Start of each working day
> **Invocation:** "Run MORNING_COFFEE for date={date}, prev_date={prev_date}"

---

## Purpose

Produce a concise daily orientation doc that gives the executor immediate situational awareness and a clear priority stack before touching any code.

---

## Inputs

Substitute `{date}` and `{prev_date}` with the actual folder names (e.g. `04_01_2026`, `03_31_2026`).

### Required reads (perform in parallel)
1. Previous day's RETROSPECTIVE or equivalent EOD artifact — what was done, decided, and carried over
2. `PROJECTS.md` — project registry for ACTIVE project awareness
3. For each ACTIVE project: priority stack and implementation log (latest entries)

### Git activity read (after required reads)
For each ACTIVE project listed in `PROJECTS.md`:
1. Check if the project root contains a `.git/` directory. If no `.git/` exists, **skip** that project and note it as "no git" in the output.
2. Scan recent commits (last 2 days): `git log --oneline --since="2 days ago"` (or equivalent). Capture commit count, latest commit message, and author.
3. Check current branch state: `git branch --show-current` and `git status --short` (clean vs. uncommitted changes).
4. Summarize per project: branch name, commit count (last 2 days), latest commit subject, dirty/clean state.

This data feeds the **Suggested Tasks** section in the output.

### Optional reads (check and read if present)
- Previous day's non-retrospective artifacts that weren't referenced in the retro

---

## Output — `docs/week_N/{date}/MORNING_COFFEE.md`

Resolve the correct week_N directory for {date} by listing `docs/` for `week_N/` folders.

Write the orientation doc using the following 6-section schema. Keep it scannable — this is a working document, not a narrative.

### Section schema

```
# Morning Coffee — {YYYY-MM-DD}

> Packet type, active projects, environment context (1 line)

## Where We Are
2-day synthesis in ≤150 words. Answer: what is the current state across active projects,
what is the live risk, and what is the stable foundation to build on?
Source from: prev_date RETROSPECTIVE + PROJECTS.md + any implementation logs.

## Today's Priority Stack
Ranked list of today's tasks. For each item:
- Priority level: HIGH / MEDIUM / LOW
- One-sentence goal
- File anchors: the specific files to open and work in
- Project label: which project this belongs to

## Open Items (Not Today Unless Fast)
Table: item | project | status | notes
Include deferred items with their trigger condition.
Include blocked items with their external dependency.

## Quick Reference
Startup commands for active projects (backend, frontend, tests).
Copy exactly from the most recent runbook or retro — do not paraphrase.

## EOD Checklist
Checkbox list of what must be true for today to be a successful close.
Always include:
- [ ] RETROSPECTIVE.md written
- [ ] Implementation logs updated (if any implementation happened)
Add task-specific items from Today's Priority Stack.

## Suggested Tasks
Ranked list of candidate tasks for the day. Synthesized from three sources:

**Sources:**
1. **Carryover items** — explicit carryovers from previous day's RETROSPECTIVE
2. **Open plan steps** — steps with status NOT STARTED or PARTIAL in any plan tree,
   filtered to those whose dependencies are met.
   **Scan locations (in order):**
   - `docs/week_N/{date}/PLANS/` — today's day-level plans (primary)
   - `docs/week_N/{prev_date}/PLANS/` — previous day's day-level plans (carryover)
   - `PLANS/` at workspace root — legacy plans (backward compat; skip if empty or absent)
3. **Git activity signals** — derived from the git activity read:
   - *Momentum*: projects with recent commits (≥3 in last 2 days) suggest active work worth continuing
   - *Staleness*: ACTIVE projects with 0 commits in last 2 days may need attention or explicit deferral
   - *Dirty state*: uncommitted changes suggest interrupted work worth resuming

**Ranking heuristic (highest → lowest priority):**
1. Explicit carryover from retro (user already decided these matter)
2. Open plan steps whose dependencies are all COMPLETE
3. Git-momentum items (recent commits + dirty state = interrupted active work)
4. Git-staleness items (no recent activity on ACTIVE project — flag for awareness)
