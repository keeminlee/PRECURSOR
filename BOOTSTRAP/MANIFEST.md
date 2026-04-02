# RECURSOR — Package Manifest

Complete inventory of every file in the bootstrap package.

---

## Skills (`RECURSOR/SKILLS/`)

| Path | Description |
|---|---|
| `RECURSOR/SKILLS/BOOTSTRAP.md` | First-time setup flow — creates directories, installs skills, registers agents |
| `RECURSOR/SKILLS/FIRST_BREW.md` | Guided first session walkthrough for new users |
| `RECURSOR/SKILLS/MORNING_COFFEE.md` | Daily orientation and priority stack (6-section schema) |
| `RECURSOR/SKILLS/CONFIG_PROJECTS.md` | Project registry scanner — discovers and classifies workspace projects |
| `RECURSOR/SKILLS/RECURSE_PLAN.md` | Plan mode — decomposes tasks into step trees |
| `RECURSOR/SKILLS/RECURSE_EXECUTE.md` | Execute mode — implements single-pass steps with audit trail |
| `RECURSOR/SKILLS/RECURSE_CLOSEOUT.md` | Closeout mode — writes completion records and propagates status |
| `RECURSOR/SKILLS/RECURSE_REFOCUS.md` | Mid-session reorientation — re-reads context without modifying files |

## Agents (`.github/agents/`)

| Path | Description |
|---|---|
| `.github/agents/Start.agent.md` | RECURSOR boot agent — rehydrates context and runs MORNING_COFFEE |
| `.github/agents/PlanRecurse.agent.md` | Creates plan trees from task descriptions (Phase 1 of Plan→Execute→Closeout) |
| `.github/agents/ExecuteRecurse.agent.md` | Implements single-pass steps (Phase 2) |
| `.github/agents/CloseoutRecurse.agent.md` | Writes closeout records and propagates updates (Phase 3) |
| `.github/agents/Refocus.agent.md` | Mid-session reorientation (read-only) |

## Packaging (`BOOTSTRAP/`)

| Path | Description |
|---|---|
| `BOOTSTRAP/START_HERE.md` | Quickstart guide — from ZIP to operational in ≤10 steps |
| `BOOTSTRAP/MANIFEST.md` | This file — complete file inventory for the bootstrap package |
