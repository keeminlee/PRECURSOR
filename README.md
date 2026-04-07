# Precursor

> A structured, human-governed workflow for GitHub Copilot that serves as the enterprise-safe `PRECURSOR` lane.

---

## What Is Precursor?

Precursor is a **Plan -> Execute -> Closeout** workflow for VS Code Copilot.

Inside the broader Starstory HQ architecture:
- `PRECURSOR` is a lane
- it is not the whole governance architecture
- it is intentionally human-gated at every meaningful transition

No agent auto-continues. No autonomous chaining. You review, you decide, you select the next step.

---

## Quick Start

**New here?** Select **@PrecursorStart** from the Copilot chat dropdown.

Or follow the step-by-step guide in [START_HERE.md](START_HERE.md).

**Already set up?** Open [demo/TOY_TASK.md](demo/TOY_TASK.md), select **@PrecursorPlan**, and paste the task.

---

## How It Works

### The Core Loop

1. Select **@PrecursorPlan** from the Copilot dropdown and describe your task
2. Review the plan
3. Select **@PrecursorExecute** and point it at the first step
4. Review the implementation
5. Select **@PrecursorCloseout** to record what happened
6. Review the closeout record

Every transition requires your explicit action.

```text
---
AWAITING YOUR REVIEW
- [ ] Review the output above
- [ ] Revise if needed (edit files directly)
- [ ] When satisfied, select the next agent from the dropdown
---
```

---

## Lane Position

Precursor is the enterprise-safe lane:
- Copilot-native
- human-reviewed between phases
- suitable when explicit human gating is the main requirement

It complements HQ lanes such as `RECURSOR/COPILOT` and `RECURSOR/CODEX`; it does not replace them.

---

## Agents

| Agent | What it does |
|-------|-------------|
| **@PrecursorStart** | First-time setup and session boot |
| **@PrecursorPlan** | Creates a plan from a task description |
| **@PrecursorExecute** | Implements one step at a time |
| **@PrecursorCloseout** | Closes out a step with a completion record |

---

## What's Inside

```text
.github/agents/         -> Agent definitions for VS Code Copilot
SKILLS/                 -> Workflow skill specs
demo/                   -> Toy demo task and expected outputs
README.md               -> This file
START_HERE.md           -> Quickstart guide
MANIFEST.md             -> Complete file inventory
```
