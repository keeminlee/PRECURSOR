# SKILL: BOOTSTRAP

> **Type:** Reusable task spec
> **Trigger:** First-time setup in a new workspace
> **Invocation:** "Run BOOTSTRAP"

---

## Purpose

Scaffold a new workspace into a fully operational RECURSOR instance. Creates the directory structure, installs all skills, registers all agents, and verifies the result. If running from the bootstrap ZIP, most files are already extracted — this skill verifies and fills any gaps.

---

## Prerequisites

- The bootstrap ZIP has been extracted into the workspace root (or you are building from scratch)
- VS Code is open on the workspace folder

---

## Phase A — Create Directory Structure

Create each of these directories if they don't already exist:

| Directory | Purpose |
|---|---|
| `RECURSOR/` | Skills, project registry, and orchestration config |
| `RECURSOR/SKILLS/` | Reusable task specs read and executed by agents |
| `docs/` | Daily artifacts (morning coffee, retros, week folders) |
| `PLANS/` | Plan trees for multi-step work |
| `.github/` | GitHub configuration root |
| `.github/agents/` | Agent mode definitions for VS Code Copilot |

---

## Phase B — Install Skills

Confirm each skill file exists in `RECURSOR/SKILLS/`. If any file is missing, create it from the bootstrap source or flag it as missing.

| # | File | Description |
|---|---|---|
| 1 | `MORNING_COFFEE.md` | Daily orientation and priority stack |
| 2 | `CONFIG_PROJECTS.md` | Project registry scanner — discovers and classifies workspace projects |
| 3 | `RECURSE_PLAN.md` | Plan mode — decomposes tasks into step trees |
| 4 | `RECURSE_EXECUTE.md` | Execute mode — implements a single-pass step with audit trail |
| 5 | `RECURSE_CLOSEOUT.md` | Closeout mode — writes completion records and propagates status |
| 6 | `RECURSE_REFOCUS.md` | Mid-session reorientation — re-reads context without modifying files |
| 7 | `BOOTSTRAP.md` | This skill — first-time setup flow (already in place if running from ZIP) |
| 8 | `FIRST_BREW.md` | Guided first session walkthrough for new users |

**Expected count: 8 files.**

---

## Phase C — Register Agents

Confirm each agent file exists in `.github/agents/`. If any file is missing, create it from the bootstrap source or flag it as missing.

| # | File | Skill Used | Description |
|---|---|---|---|
| 1 | `Start.agent.md` | `MORNING_COFFEE` | Boot agent — rehydrates context and runs morning coffee |
| 2 | `PlanRecurse.agent.md` | `RECURSE_PLAN` | Creates plan trees from task descriptions |
| 3 | `ExecuteRecurse.agent.md` | `RECURSE_EXECUTE` | Implements single-pass steps from plan trees |
| 4 | `CloseoutRecurse.agent.md` | `RECURSE_CLOSEOUT` | Writes closeout records and propagates status updates |
| 5 | `Refocus.agent.md` | `RECURSE_REFOCUS` | Mid-session reorientation (read-only context refresh) |

**Expected count: 5 files.**

---

## Phase D — Verify Installation

Run through this checklist. Report each item as pass/fail:

- [ ] `RECURSOR/SKILLS/` contains all 8 skills listed in Phase B
- [ ] `.github/agents/` contains all 5 agents listed in Phase C
- [ ] `docs/` directory exists
- [ ] `PLANS/` directory exists
- [ ] No files reference absolute paths or workspace-specific names (spot-check 2–3 files)

**After verification passes**, run CONFIG_PROJECTS to build the project registry:

> "Run CONFIG_PROJECTS"

This creates `RECURSOR/PROJECTS.md`, which `@Start` and other skills depend on for project discovery.

---

## Completion Criteria

- [ ] All 6 directories from Phase A exist
- [ ] All 8 skills from Phase B are present in `RECURSOR/SKILLS/`
- [ ] All 5 agents from Phase C are present in `.github/agents/`
- [ ] Phase D checklist passes with no failures
- [ ] CONFIG_PROJECTS has been run and `RECURSOR/PROJECTS.md` exists
