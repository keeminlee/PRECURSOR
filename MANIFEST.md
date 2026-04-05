# Precursor — Package Manifest

Complete inventory of every file in the Precursor package.

---

## Skills (`SKILLS/`)

| Path | Description |
|---|---|
| `SKILLS/BOOTSTRAP.md` | First-time setup flow — creates directories, installs skills, registers agents |
| `SKILLS/CONFIG_PROJECTS.md` | Project registry scanner — discovers and classifies workspace projects |
| `SKILLS/FIRST_BREW.md` | Guided first session walkthrough — Plan → Execute → Closeout cycle |
| `SKILLS/MORNING_COFFEE.md` | Daily orientation and priority stack |
| `SKILLS/RECURSE_CLOSEOUT.md` | Closeout mode — writes completion records and propagates status |
| `SKILLS/RECURSE_EXECUTE.md` | Execute mode — implements single-pass steps with audit trail |
| `SKILLS/RECURSE_PLAN.md` | Plan mode — decomposes tasks into step trees with human review gates |
| `SKILLS/RECURSE_REFOCUS.md` | Mid-session reorientation — re-reads context without modifying files |

## Agents (`.github/agents/`)

| Path | Description |
|---|---|
| `.github/agents/PrecursorPlan.agent.md` | Creates a plan from a task description |
| `.github/agents/PrecursorExecute.agent.md` | Implements one step at a time with audit trail |
| `.github/agents/PrecursorCloseout.agent.md` | Closes out a step with a completion record |
| `.github/agents/PrecursorStart.agent.md` | Boots your session with context and priorities |
| `.github/agents/PrecursorRefocus.agent.md` | Mid-session reorientation (read-only) |

## Project Files (root)

| Path | Description |
|---|---|
| `README.md` | Project identity document — what Precursor is, how it differs, governance model |
| `START_HERE.md` | Quickstart guide — from clone to operational in ≤10 steps |
| `MANIFEST.md` | This file — complete file inventory for the Precursor package |


