# SKILL: EOD_RETRO

> **Type:** Reusable task spec
> **Trigger:** End of each working day
> **Agent:** `.github/agents/PrecursorRetro.agent.md`
> **Invocation:** `@PrecursorRetro`

---

## Purpose

Produce a lightweight end-of-day retrospective. Captures what was planned vs. completed, decisions made, and carry-over for tomorrow.

This is the PRECURSOR-lane lightweight version. It has no transcript fetching, no bronze curation, no CANON/graph dependency. It reads only what exists in the workspace.

The retro's primary downstream consumer is tomorrow's MORNING_COFFEE — the Carry-Over section feeds directly into Section 3 of the next day's morning doc.

---

## Preconditions

- Day-directory layout is enabled. If `docs/week_N/` does not exist at workspace root, stop and redirect:
  > *"Daily rituals require the day-directory layout. Run `@PrecursorStart` and enable rituals in BOOTSTRAP Phase E, or create `docs/week_1/{today_MM_DD_YYYY}/` manually, then retry."*

---

## Path Resolution

1. Determine today's date in `MM_DD_YYYY` format.
2. Locate `docs/week_N/{date}/`. It should exist — if MORNING_COFFEE ran this morning, it scaffolded the day-dir.
3. Output path: `docs/week_N/{date}/EOD_RETRO.md`.

---

## Inputs

### Context Gather (required before writing)

Read in parallel:

- `docs/week_N/{date}/MORNING_COFFEE.md` — this morning's plan for the day (if exists)
- All `docs/week_N/{date}/PLANS/**/PROGRESS.md` — today's execute logs
- All `docs/week_N/{date}/PLANS/**/CLOSEOUT.md` — today's closeouts
- All `docs/week_N/{date}/PLANS/**/{slug}.md` — today's root plans for status
- `git log --oneline --since={today_ISO}T00:00 --until={today_ISO}T23:59` — today's commits
- `git status --short` — anything uncommitted at day's end

If MORNING_COFFEE.md does not exist, treat Section 1 "What was planned" as "No morning plan — unplanned work day."

---

## File Schema: `EOD_RETRO.md`

```markdown
# EOD RETRO: {date}
> **Created:** {MM_DD_YYYY}
> **Branch(es) touched:** {list}
> **Morning plan:** [MORNING_COFFEE.md](MORNING_COFFEE.md) | none

---

## 1. What Was Planned

{Lifted from MORNING_COFFEE `## 1. Today's Focus` and `## 5. Suggested Next Steps`. If no morning doc exists: "No morning plan — unplanned work day."}

---

## 2. What Was Completed

{Plans closed out today, steps completed, commits landed. Cross-reference PLANS/ status changes and git log.}

| Artifact | Path | Status | Quality Gate |
|----------|------|--------|--------------|
| `{slug}` step {n} | `{path}` | COMPLETE | GREEN/YELLOW/RED |

**Commits landed:** {count}
- `{sha}` — {subject}

---

## 3. What Was Not Completed

{Planned work that did not finish. Include reason: deferred, blocked, scope change, ran out of time.}

- {item} — {reason}

---

## 4. Decisions and Observations

{Anything worth remembering: design choices made mid-work, surprises, anti-patterns noticed, tool friction, scope changes with rationale. Be specific — "used X instead of Y because Z" not "made some decisions".}

- {decision/observation}

---

## 5. Carry-Over for Tomorrow

{Concrete items that should appear in tomorrow's MORNING_COFFEE Section 3. Each item is actionable and references a specific path or command.}

- [ ] {item with specific path/command}
- [ ] {item}

---

## 6. Notes

{Free-form catch-all: blockers surfaced, questions to ask the team, external dependencies surfaced, anything else. Default: empty.}
```

---

## Mode Behavior

**Read:** all items in the Context Gather section above, in parallel where independent.

**Write:** `docs/week_N/{date}/EOD_RETRO.md` following the schema.

**Key rules:**

- Section 1 "What Was Planned" is a faithful lift from MORNING_COFFEE — do not summarize away detail that was in the morning plan.
- Section 2 "What Was Completed" requires evidence. Cross-reference actual CLOSEOUT.md files and actual git commits. A step shown COMPLETE in a plan but missing a CLOSEOUT.md is a data inconsistency — flag it in Section 6.
- Section 3 "What Was Not Completed" must name each item and its reason. "Did not finish X" without a reason is insufficient.
- Section 4 "Decisions" should be specific enough that the next day's reader can recover the reasoning. "Used approach A because approach B had constraint C" beats "made some architectural decisions".
- Section 5 "Carry-Over" items must be actionable. Each item is something that can go directly into tomorrow's MORNING_COFFEE Section 5 "Suggested Next Steps".

**After writing:**

Display a chat-only summary:
- Count of steps completed today
- Count of items not completed
- Top carry-over item

Then:

> *"Retro written at `docs/week_N/{date}/EOD_RETRO.md`. Review and edit. Carry-over will feed tomorrow's MORNING_COFFEE."*

Output the review gate:

```
---
⏸ AWAITING YOUR REVIEW
- [ ] Review EOD_RETRO.md
- [ ] Revise carry-over items or decisions if needed
- [ ] When satisfied, commit today's work and close the session
---
```

---

## Completion Criteria

- [ ] `EOD_RETRO.md` exists at `docs/week_N/{date}/`
- [ ] All six sections populated (or explicit empty notes in Section 6)
- [ ] Section 2 "What Was Completed" cross-references evidence (paths, commits)
- [ ] Section 5 "Carry-Over" items are actionable and reference specific paths/commands
- [ ] Review gate delivered
