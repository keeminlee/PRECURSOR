# Precursor

> A structured, human-governed workflow for GitHub Copilot that enforces review between every meaningful step.

---

## What Is Precursor?

Precursor is a **Plan → Execute → Closeout** workflow for VS Code Copilot. It turns AI chat agents into a governed development pipeline where every action stops for human review before proceeding.

No agent auto-continues. No autonomous chaining. You review, you decide, you invoke the next step.

---

## What's Inside

- `SKILLS/` — Workflow specs (markdown files) that define agent behaviors
- `.github/agents/` — VS Code Copilot agent modes that read and execute the skills
- `START_HERE.md` — Quickstart guide
- `MANIFEST.md` — Complete file inventory

---

## Quick Start

See [START_HERE.md](START_HERE.md).

---

## How It Works

### The Core Loop

```
@PrecursorPlan {task}     →  breaks your task into concrete steps
    ⏸ you review the plan
@PrecursorExecute {step}  →  implements one step, writes a progress log
    ⏸ you review the work
@PrecursorCloseout {step} →  records what happened, updates the plan
    ⏸ you confirm
```

Every transition requires your explicit invocation. This is the human review gate:

```
---
⏸ AWAITING YOUR REVIEW
- [ ] Review the output above
- [ ] Revise if needed (edit files directly)
- [ ] When satisfied, invoke the next agent: @{NextAgent} {path}
---
```

### Daily Start

```
@PrecursorStart           →  rehydrates context, shows priorities
```

---

## Skills

| Skill | Purpose |
|-------|---------|
| **RECURSE_PLAN** | Break tasks into bounded steps |
| **RECURSE_EXECUTE** | Implement a single step with audit trail |
| **RECURSE_CLOSEOUT** | Record what happened, update the plan |
| RECURSE_REFOCUS | Mid-session reorientation (read-only) |
| MORNING_COFFEE | Daily orientation and priority stack |
| CONFIG_PROJECTS | Scan workspace, build project registry |
| BOOTSTRAP | First-time setup flow |
| FIRST_BREW | Guided first session walkthrough |

---

## Agents

| Agent | What it does |
|-------|-------------|
| **@PrecursorPlan** | Creates a plan from a task description |
| **@PrecursorExecute** | Implements one step at a time |
| **@PrecursorCloseout** | Closes out a step with a completion record |
| @PrecursorStart | Boots your session with context and priorities |
| @PrecursorRefocus | Quick "where am I?" summary (read-only) |

---

## Directory Structure

```
.github/agents/         ← Agent definitions for VS Code Copilot
SKILLS/                 ← Workflow skill specs
README.md               ← This file
START_HERE.md           ← Quickstart guide
MANIFEST.md             ← Complete file inventory
```
