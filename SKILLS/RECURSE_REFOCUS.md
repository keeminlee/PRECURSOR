# SKILL: RECURSE_REFOCUS

> **Type:** Reusable task spec
> **Trigger:** When the user feels lost, context has drifted, or a mid-session reorientation is needed
> **Agent:** `.github/agents/PrecursorRefocus.agent.md`
> **Flow:** Standalone — invoked at any point during a session
> **Related skills:** `MORNING_COFFEE.md`, `RECURSE_PLAN.md`, `RECURSE_EXECUTE.md`

---

## Purpose

Produce a concise, chat-only situational summary that reorients the user mid-session. Refocus reads the current plan tree, project registry, and recent artifacts, then outputs a structured summary directly in chat. **No files are written — output is entirely in chat.**

---

## Invocation

```
@PrecursorRefocus
```

No arguments required. Refocus scans the workspace to determine what is active.

---

## Inputs

### Required reads (perform in parallel)

1. **`PLANS/`** (legacy, root-level) — list all plan directories; for each, read the root plan file (`{slug}/{slug}.md`) to find step statuses. Skip if directory doesn't exist or is empty.
2. **Day-level `PLANS/`** — resolve today's date (`MM_DD_YYYY`), find the correct `docs/week_N/{date}/` directory, and scan `docs/week_N/{date}/PLANS/` if it exists. Also scan the previous day's `docs/week_N/{prev_date}/PLANS/` (resolve `{prev_date}` by listing date folders and picking the most recent one before today). For each plan found, read the root plan file to find step statuses.
3. **`PROJECTS.md`** — project registry for active project awareness. If this file does not exist, skip and note its absence in the output under Active Projects as "PROJECTS.md not found — run CONFIG_PROJECTS to generate."

### Conditional reads (if found)

3. **Active step specs** — for any step with Status `IN PROGRESS`, read its `PROGRESS.md` for current state
4. **`docs/week_N/`** — list the most recent `week_N/` directory under `docs/`, then list its date folders. Read the most recent date's artifacts (MORNING_COFFEE, RETROSPECTIVE) for recent context.

---

## Output — Chat Only

**This skill writes no files.** All output is delivered as a single structured chat message.

### Chat output schema

```
## Refocus — {YYYY-MM-DD HH:MM}

### Current Focus
{One sentence: what the user is most likely working on right now, inferred from
the most recent IN PROGRESS step or the last artifact written.}

### Active Plans

| Plan | Step | Status | What's Happening |
|------|------|--------|------------------|
| {slug} | {n}_{step-name} | IN PROGRESS | {one-line summary from PROGRESS.md} |
| {slug} | {n}_{step-name} | BLOCKED | {blocker description} |

{If no active plans: "No plans currently in progress."}

### Active Projects
{Bulleted list from PROJECTS.md of ACTIVE projects with their one-line description.
If PROJECTS.md is absent: "PROJECTS.md not found — run `@Start` with CONFIG_PROJECTS to generate."}

### Recent Context
{2–3 sentence summary of the most recent day's artifacts: what was done, what was
decided, what was deferred. Source from the latest MORNING_COFFEE or RETROSPECTIVE.
If no recent artifacts: "No recent daily artifacts found."}

### Suggested Next Action
{One concrete recommendation: which step to execute next, which blocker to resolve,
or which plan to advance. Include the exact invocation command if applicable
(e.g., `@PrecursorExecute execute PLANS/{slug}/{n}_{step-name}/`).}
```

---

## Key Rules

- **No file writes.** Refocus is read-only. If you find yourself about to create or edit a file, stop — that is not Refocus's job.
- **Graceful absence handling.** Any input file may not exist. Never error on a missing file — note its absence in the relevant output section and continue.
- **Brevity over completeness.** The output should be scannable in under 30 seconds. Omit completed plans and completed steps — focus only on what is active, blocked, or next.
- **Infer, don't ask.** Refocus does not ask the user clarifying questions. It reads what exists and synthesizes. If context is ambiguous, state the ambiguity rather than prompting.

---

## Completion Criteria

- [ ] Chat output covers all 5 sections of the schema (Current Focus, Active Plans, Active Projects, Recent Context, Suggested Next Action)
- [ ] No files were created or modified during the invocation
- [ ] Missing inputs (e.g., absent PROJECTS.md) are noted gracefully, not treated as errors
