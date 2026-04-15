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
| `SKILLS/RECURSE_PLAN.md` | Plan mode -> decomposes tasks into step trees with governance header, Test Requirements, and coherence-verification step |
| `SKILLS/RECURSE_EXECUTE.md` | Execute mode -> implements single-pass steps with TEST MANDATE and audit trail |
| `SKILLS/RECURSE_CLOSEOUT.md` | Closeout mode -> writes completion records with Artifact Verification and Test Verification, propagates status |

## Setup Skills (`SKILLS/`)

| Path | Description |
|---|---|
| `SKILLS/BOOTSTRAP.md` | First-time setup (installation verify, project registry, optional daily rituals scaffold) |
| `SKILLS/CONFIG_PROJECTS.md` | Project registry scanner |

## Daily Ritual Skills (`SKILLS/`) — optional

| Path | Description |
|---|---|
| `SKILLS/MORNING_COFFEE.md` | Daily orientation: active plans, carry-over, git signals, suggested next steps. Output: `docs/week_N/{date}/MORNING_COFFEE.md` |
| `SKILLS/EOD_RETRO.md` | End-of-day retrospective: planned vs. completed, decisions, carry-over. Output: `docs/week_N/{date}/EOD_RETRO.md` |

## Experimental Skills (`SKILLS/`) — opt-in

| Path | Description |
|---|---|
| `SKILLS/AUTO_COPILOT.md` | EXPERIMENTAL. Chained Plan→Execute→Closeout over a whole plan tree on an isolation branch. Hard preconditions: non-main branch, Greenlight:YES, all SINGLE-PASS, tier T0–T2, CI config present. Halts on any failure. Never commits or merges. |

## Agents (`.github/agents/`)

| Path | Description |
|---|---|
| `.github/agents/PrecursorStart.agent.md` | First-time setup and session boot; daily orientation on returning sessions when rituals are enabled |
| `.github/agents/PrecursorPlan.agent.md` | Creates a plan from a task description |
| `.github/agents/PrecursorExecute.agent.md` | Implements one step at a time with audit trail |
| `.github/agents/PrecursorCloseout.agent.md` | Closes out a step with a completion record including Artifact Verification |
| `.github/agents/PrecursorMorning.agent.md` | Daily orientation agent (optional ritual) |
| `.github/agents/PrecursorRetro.agent.md` | End-of-day retrospective agent (optional ritual) |
| `.github/agents/PrecursorAuto.agent.md` | EXPERIMENTAL chained-execution agent (opt-in, human-gated at greenlight + halt + merge) |

## Demo (`demo/`)

| Path | Description |
|---|---|
| `demo/TOY_TASK.md` | Self-contained demo task for first-run walkthrough |
| `demo/EXAMPLE_PLAN.md` | Example of good planning output, including governance header and coherence-verification step |
| `demo/EXAMPLE_EXECUTE.md` | Example of good execute output, including Test Results block |
| `demo/EXAMPLE_CLOSEOUT.md` | Example of good closeout output, including Artifact Verification and Test Verification tables |
