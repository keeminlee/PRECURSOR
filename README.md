# RECURSOR

LLM-mediated execution surface for VS Code Copilot. Turns chat agents into a structured plan → execute → closeout workflow.

## What's inside

- **`RECURSOR/SKILLS/`** — 8 reusable task specs (markdown files) that define agent behaviors
- **`.github/agents/`** — 5 VS Code Copilot agent modes that read and execute the skills
- **`BOOTSTRAP/`** — Quickstart guide and package manifest

## Quick start

See [`BOOTSTRAP/START_HERE.md`](BOOTSTRAP/START_HERE.md).

## Core loop

```
@PlanRecurse {task}     →  creates a plan tree under PLANS/
@ExecuteRecurse {step}  →  implements a single step, writes PROGRESS.md
@CloseoutRecurse {step} →  writes CLOSEOUT.md, propagates status back to plan
```

## Daily loop

```
@Start                  →  rehydrates context, runs morning coffee
```

## Skills

| Skill | Purpose |
|---|---|
| `RECURSE_PLAN` | Decompose tasks into step trees |
| `RECURSE_EXECUTE` | Implement single-pass steps with audit trail |
| `RECURSE_CLOSEOUT` | Write completion records, propagate status |
| `RECURSE_REFOCUS` | Mid-session reorientation (read-only) |
| `MORNING_COFFEE` | Daily orientation and priority stack |
| `CONFIG_PROJECTS` | Scan workspace, build project registry |
| `BOOTSTRAP` | First-time setup flow |
| `FIRST_BREW` | Guided first session walkthrough |
