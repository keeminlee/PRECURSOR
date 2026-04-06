# Precursor — Package Manifest

Complete inventory of every file in the Precursor package.

---

## Core Skills (`SKILLS/`)

| Path | Description |
|---|---|
| `SKILLS/RECURSE_PLAN.md` | Plan mode — decomposes tasks into step trees with human review gates |
| `SKILLS/RECURSE_EXECUTE.md` | Execute mode — implements single-pass steps with audit trail |
| `SKILLS/RECURSE_CLOSEOUT.md` | Closeout mode — writes completion records and propagates status |

## Setup Skills (`SKILLS/`)

| Path | Description |
|---|---|
| `SKILLS/BOOTSTRAP.md` | First-time setup — verifies installation, guides project placement, builds registry |
| `SKILLS/CONFIG_PROJECTS.md` | Project registry scanner — discovers and classifies workspace projects |

## Agents (`.github/agents/`)

| Path | Description |
|---|---|
| `.github/agents/PrecursorStart.agent.md` | First-time setup and session boot — runs BOOTSTRAP on first use |
| `.github/agents/PrecursorPlan.agent.md` | Creates a plan from a task description |
| `.github/agents/PrecursorExecute.agent.md` | Implements one step at a time with audit trail |
| `.github/agents/PrecursorCloseout.agent.md` | Closes out a step with a completion record |

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


