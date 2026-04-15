# Precursor - Package Manifest

Complete inventory of the Precursor package.

---

## Identity

Precursor is the enterprise-safe `PRECURSOR` lane:
- Copilot-native
- human-gated
- markdown-first

---

## Core Skills (`SKILLS/`)

| Path | Description |
|---|---|
| `SKILLS/RECURSE_PLAN.md` | Plan mode -> decomposes tasks into step trees with human review gates |
| `SKILLS/RECURSE_EXECUTE.md` | Execute mode -> implements single-pass steps with audit trail |
| `SKILLS/RECURSE_CLOSEOUT.md` | Closeout mode -> writes completion records and propagates status |

## Setup Skills (`SKILLS/`)

| Path | Description |
|---|---|
| `SKILLS/BOOTSTRAP.md` | First-time setup |
| `SKILLS/CONFIG_PROJECTS.md` | Project registry scanner |

## Agents (`.github/agents/`)

| Path | Description |
|---|---|
| `.github/agents/PrecursorStart.agent.md` | First-time setup and session boot |
| `.github/agents/PrecursorPlan.agent.md` | Creates a plan from a task description |
| `.github/agents/PrecursorExecute.agent.md` | Implements one step at a time with audit trail |
| `.github/agents/PrecursorCloseout.agent.md` | Closes out a step with a completion record |

## Demo (`demo/`)

| Path | Description |
|---|---|
| `demo/TOY_TASK.md` | Self-contained demo task for first-run walkthrough |
| `demo/EXAMPLE_PLAN.md` | Example of good planning output, including governance header and coherence-verification step |
| `demo/EXAMPLE_EXECUTE.md` | Example of good execute output, including Test Results block |
| `demo/EXAMPLE_CLOSEOUT.md` | Example of good closeout output, including Artifact Verification and Test Verification tables |
