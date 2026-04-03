# SKILL: BOOTSTRAP

> **Type:** Reusable task spec
> **Trigger:** First-time setup in a new workspace
> **Invocation:** "Run BOOTSTRAP"

---

## Purpose

Scaffold a new workspace into a fully operational Precursor instance. Creates the directory structure, installs all skills, registers all agents, and verifies the result. If running from a cloned repo, most files are already in place — this skill verifies and fills any gaps.

---

## Prerequisites

- The repo has been cloned or extracted into the workspace root
- VS Code is open on the workspace folder

---

## Phase A — Create Directory Structure

Create each of these directories if they don't already exist:

| Directory | Purpose |
|---|---|
| `SKILLS/` | Reusable task specs read and executed by agents |
| `docs/` | Daily artifacts (morning coffee, retros, week folders) |
| `PLANS/` | Plan trees for multi-step work |
| `.github/` | GitHub configuration root |
| `.github/agents/` | Agent mode definitions for VS Code Copilot |

---

## Phase B — Install Skills

Confirm each skill file exists in `SKILLS/`. If any file is missing, create it from the bootstrap source or flag it as missing.

| # | File | Description |
|---|---|---|
| 1 | `MORNING_COFFEE.md` | Daily orientation and priority stack |
| 2 | `CONFIG_PROJECTS.md` | Project registry scanner — discovers and classifies workspace projects |
| 3 | `RECURSE_PLAN.md` | Plan mode — decomposes tasks into step trees |
| 4 | `RECURSE_EXECUTE.md` | Execute mode — implements a single-pass step with audit trail |
| 5 | `RECURSE_CLOSEOUT.md` | Closeout mode — writes completion records and propagates status |
| 6 | `RECURSE_REFOCUS.md` | Mid-session reorientation — re-reads context without modifying files |
| 7 | `BOOTSTRAP.md` | This skill — first-time setup flow (already in place if running from package) |
| 8 | `FIRST_BREW.md` | Guided first session walkthrough for new users |

**Expected count: 8 files.**

---

## Phase C — Register Agents

Confirm each agent file exists in `.github/agents/`. If any file is missing, create it from the bootstrap source or flag it as missing.

| # | File | Skill Used | Description |
|---|---|---|---|
| 1 | `PrecursorStart.agent.md` | `MORNING_COFFEE` | Boot agent — rehydrates context and runs morning coffee |
| 2 | `PrecursorPlan.agent.md` | `RECURSE_PLAN` | Creates plan trees from task descriptions |
| 3 | `PrecursorExecute.agent.md` | `RECURSE_EXECUTE` | Implements single-pass steps from plan trees |
| 4 | `PrecursorCloseout.agent.md` | `RECURSE_CLOSEOUT` | Writes closeout records and propagates status updates |
| 5 | `PrecursorRefocus.agent.md` | `RECURSE_REFOCUS` | Mid-session reorientation (read-only context refresh) |

**Expected count: 5 files.**

---

## Phase D — Verify Installation

Run through this checklist. Report each item as pass/fail:

- [ ] `SKILLS/` contains all 8 skills listed in Phase B
- [ ] `.github/agents/` contains all 5 agents listed in Phase C
- [ ] `docs/` directory exists
- [ ] `PLANS/` directory exists
- [ ] No files reference absolute paths or workspace-specific names (spot-check 2–3 files)
