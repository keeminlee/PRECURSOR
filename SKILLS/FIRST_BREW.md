# SKILL: FIRST_BREW

> **Type:** Reusable task spec
> **Trigger:** First working session after BOOTSTRAP
> **Invocation:** "Run FIRST_BREW"

---

## Purpose

Walk a new user through their first operational session after BOOTSTRAP has been completed. By the end, the user will have: invoked `@Start` and understood the MORNING_COFFEE output, verified their project registry, created a custom agent, and learned the daily operational loop.

**Prerequisite:** BOOTSTRAP must have been run successfully. All skills are installed in `SKILLS/` and all agents are registered in `.github/agents/`.

---

## Phase A — First @Start Invocation

Open VS Code Copilot chat and type:

```
@Start
```

This invokes the Precursor Start agent. Here is what happens behind the scenes:

1. **Context rehydration** — `@Start` reads `PROJECTS.md` to discover all projects and their key files. If `PROJECTS.md` does not exist yet, `@Start` automatically runs CONFIG_PROJECTS first (see Phase B).
2. **MORNING_COFFEE generation** — `@Start` produces today's orientation doc at `docs/week_N/{date}/MORNING_COFFEE.md`. If it already exists, `@Start` reads the existing one instead of overwriting it.
3. **State summary** — `@Start` delivers a concise chat summary: active projects, top priorities, blockers, and readiness.

### Understanding the MORNING_COFFEE output

MORNING_COFFEE is a 6-section daily orientation doc. Here is what each section gives you:

| # | Section | What it tells you |
|---|---|---|
| 1 | **Where We Are** | 2-day synthesis — current state across active projects, live risks, and stable foundation. Sourced from yesterday's retrospective and project key files. |
| 2 | **Today's Priority Stack** | Ranked task list with priority level (HIGH/MEDIUM/LOW), one-sentence goal, file anchors to open, and project label. This is your work order for the day. |
| 3 | **Open Items (Not Today Unless Fast)** | Deferred and blocked items with their trigger conditions. Things to be aware of but not act on unless quick. |
| 4 | **Quick Reference** | Startup commands for active projects — copied from the most recent runbook or retro. Ready to paste into the terminal. |
| 5 | **EOD Checklist** | What must be true for today to close successfully. Always includes writing the RETROSPECTIVE; adds task-specific items from the priority stack. |
| 6 | **Suggested Tasks** | Auto-ranked candidate tasks pulled from three sources: carryover from yesterday's retro, open plan steps with met dependencies, and git activity signals (momentum, staleness, dirty state). |

If this is truly your first session, several sections will be sparse — no previous retro exists, git history may be minimal. That is normal. The doc fills in naturally as you work.

---

## Phase B — Build Your Project Registry

If `@Start` triggered CONFIG_PROJECTS automatically during Phase A, your registry already exists. Skip to the verification step below.

If CONFIG_PROJECTS did not run (e.g., `PROJECTS.md` already existed from a prior attempt), you can run it explicitly:

```
Run CONFIG_PROJECTS
```

### What is PROJECTS.md?

`PROJECTS.md` is the centralized inventory of every project and subrepo in your workspace. It contains:

- **Project Inventory table** — ID, name, path, status (ACTIVE / STUB / ARCHIVED / DATA), and one-line description for every discovered project
- **Project Detail blocks** — for each project: README path, priority stack, implementation log, entry points, frontend path, CI config. Slots that weren't found during scanning are marked `MISSING`.

This file is the single source of truth that `@Start`, MORNING_COFFEE, and other skills use to discover what exists and what is active. If it is wrong, everything downstream is wrong.

### Verify the output

After CONFIG_PROJECTS runs, it will prompt you with a verification checklist:

- [ ] Project list is complete — no active projects are missing
- [ ] Statuses are correct (ACTIVE / STUB / ARCHIVED / DATA)
- [ ] Key file paths are accurate — check any slots marked MISSING
- [ ] No infrastructure folders accidentally included

Review the output. Edit `PROJECTS.md` directly to fix anything, or re-run CONFIG_PROJECTS.

---

## Phase C — Create Your First Custom Agent

Agents in Precursor are `.agent.md` files in `.github/agents/`. Each agent is a thin wrapper: YAML frontmatter for metadata, then a markdown body with instructions.

### The pattern

```
.github/agents/{name}.agent.md
```

YAML frontmatter fields:

| Field | Required | Description |
|---|---|---|
| `name` | yes | Display name in the Copilot agent picker |
| `description` | yes | What the agent does (shown in picker and used for routing) |
| `tools` | no | Array of tool categories the agent can use (e.g., `read`, `search`, `edit`, `terminal`) |

### Minimal template

Create a file at `.github/agents/Docs.agent.md` (or any name relevant to your work):

```markdown
---
name: Docs
description: Reviews and improves documentation files. Checks for accuracy, completeness, and consistency with the codebase.
tools:
  - read
  - search
  - edit
---

You are a documentation review agent.

When invoked, read the file or folder the user points you to and:

1. Check that the content matches the current state of the codebase
2. Flag outdated references, broken links, or missing sections
3. Suggest concrete edits — prefer precision over generality

**Rules:**
- Only modify files the user explicitly asks you to edit
- If a doc references code, verify the code exists before suggesting changes
- Keep language concise and direct
```

### Key principle

Agents are thin wrappers. If a behavior is reusable across multiple contexts, put it in a skill file under `SKILLS/` and have the agent read the skill. This keeps agents lightweight and skills composable.

---

## Phase D — The Daily Loop

Precursor operates on a daily rhythm with two bookends:

### Morning: `@Start`

Invoke `@Start` at the beginning of every session. It rehydrates context and produces (or reads) MORNING_COFFEE. You get situational awareness and a priority stack without manually re-reading yesterday's work.

### During the day: work with agents

Use agents for focused tasks:

- **`@PrecursorPlan`** — decomposes a task into a step tree under `PLANS/`. Does not write code.
- **`@PrecursorExecute`** — implements a single step from a plan tree. Writes code and a PROGRESS.md audit trail.
- **`@PrecursorCloseout`** — writes a CLOSEOUT.md for a completed step and propagates status up the plan tree.
- **`@PrecursorRefocus`** — mid-session reorientation. Read-only scan of current state, outputs a summary in chat. Use when you lose track of where you are.
- **Your custom agents** — whatever you built in Phase C and beyond.

For multi-step work, the flow is: `@PrecursorPlan` → `@PrecursorExecute` (per step) → `@PrecursorCloseout` (per step).

### Evening: EOD_RETRO

At the end of each working day, run:

```
Run EOD_RETRO for date={today}, prev_date={yesterday}
```

This produces `docs/week_N/{date}/RETROSPECTIVE.md` — a 7-section retrospective:

1. **What Was Planned** — tasks sourced from MORNING_COFFEE or carryover
2. **What Was Completed** — concrete deliverables and evidence
3. **What Was Not Completed** — explicit status and reason for each
4. **Decisions Made** — numbered list with rationale
5. **Technical Inventory** — files created/modified, structural changes
6. **Quality Assessment** — what went well, what could improve
7. **Carryover to Next Day** — prioritized items that feed tomorrow's MORNING_COFFEE

The retro closes the loop. Tomorrow's `@Start` reads today's retro to generate the next MORNING_COFFEE.

---

## Completion Criteria

- [ ] `@Start` has been invoked and MORNING_COFFEE output reviewed
- [ ] `PROJECTS.md` exists and has been verified
- [ ] At least one custom agent created in `.github/agents/`
- [ ] User understands the daily loop: `@Start` → work with agents → `EOD_RETRO`
