# Precursor

> A structured, human-governed workflow for GitHub Copilot that enforces review between every meaningful step.

---

## What Is Precursor?

Precursor is a **Plan → Execute → Closeout** workflow for VS Code Copilot. It turns AI chat agents into a governed development pipeline where every action stops for human review before proceeding.

No agent auto-continues. No autonomous chaining. You review, you decide, you select the next step.

---

## Quick Start

**New here?** Open [START_HERE.md](START_HERE.md) — it will walk you through setup and your first demo run in under 5 minutes.

**Already set up?** Jump straight to the demo: open [demo/TOY_TASK.md](demo/TOY_TASK.md), then select **@PrecursorPlan** from the Copilot dropdown and paste the task.

---

## How It Works

### The Core Loop

1. Select **@PrecursorPlan** from the Copilot dropdown and describe your task
2. ⏸ Review the plan
3. Select **@PrecursorExecute** and point it at the first step
4. ⏸ Review the implementation
5. Select **@PrecursorCloseout** to record what happened
6. ⏸ Review the closeout record

Every transition requires your explicit action. This is the **human review gate**:

```
---
⏸ AWAITING YOUR REVIEW
- [ ] Review the output above
- [ ] Revise if needed (edit files directly)
- [ ] When satisfied, select the next agent from the dropdown
---
```

---

## Agents

Select an agent from the Copilot chat dropdown:

| Agent | What it does |
|-------|-------------|
| **@PrecursorPlan** | Creates a plan from a task description |
| **@PrecursorExecute** | Implements one step at a time |
| **@PrecursorCloseout** | Closes out a step with a completion record |

---

## What's Inside

```
.github/agents/         ← Agent definitions for VS Code Copilot
SKILLS/                 ← Workflow skill specs (markdown files)
demo/                   ← Toy demo task and expected outputs
README.md               ← This file
START_HERE.md           ← Quickstart guide
MANIFEST.md             ← Complete file inventory
```
