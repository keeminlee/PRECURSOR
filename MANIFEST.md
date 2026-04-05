# Precursor — Package Manifest

Complete inventory of every file in the Precursor package.

---

## Core Skills (`SKILLS/`)

| Path | Description |
|---|---|
| `SKILLS/RECURSE_PLAN.md` | Plan mode — decomposes tasks into step trees with human review gates |
| `SKILLS/RECURSE_EXECUTE.md` | Execute mode — implements single-pass steps with audit trail |
| `SKILLS/RECURSE_CLOSEOUT.md` | Closeout mode — writes completion records and propagates status |

## Supporting Skills (`SKILLS/`)

| Path | Description |
|---|---|
| `SKILLS/FIRST_BREW.md` | Guided first session walkthrough — Plan → Execute → Closeout cycle |
| `SKILLS/BOOTSTRAP.md` | First-time setup flow — verifies directory structure and file inventory |
| `SKILLS/CONFIG_PROJECTS.md` | Project registry scanner — discovers and classifies workspace projects |
| `SKILLS/MORNING_COFFEE.md` | Daily orientation and priority stack |
| `SKILLS/RECURSE_REFOCUS.md` | Mid-session reorientation — re-reads context without modifying files |

## Agents (`.github/agents/`)

| Path | Description |
|---|---|
| `.github/agents/PrecursorPlan.agent.md` | Creates a plan from a task description |
| `.github/agents/PrecursorExecute.agent.md` | Implements one step at a time with audit trail |
| `.github/agents/PrecursorCloseout.agent.md` | Closes out a step with a completion record |
| `.github/agents/PrecursorStart.agent.md` | Session boot — loads context and priorities |
| `.github/agents/PrecursorRefocus.agent.md` | Mid-session reorientation (read-only) |

## Demo (`demo/`)

| Path | Description |
|---|---|
| `demo/TOY_TASK.md` | Self-contained demo task for first-run walkthrough |
| `demo/EXAMPLE_PLAN.md` | Example of what good @PrecursorPlan output looks like |
| `demo/EXAMPLE_EXECUTE.md` | Example of what good @PrecursorExecute output looks like |

## Project Files (root)

| Path | Description |
|---|---|
| `README.md` | Project identity — what Precursor is, how it works |
| `START_HERE.md` | Quick Start — from clone to first demo run in 5 minutes |
| `MANIFEST.md` | This file — complete file inventory |


