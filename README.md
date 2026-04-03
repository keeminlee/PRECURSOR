# Precursor

> A human-governed, Sonnet-centered recursive task workflow system with visible markdown task/spec trees, strong onboarding, and enforced human review between every agentic step.

---

## What Is Precursor?

Precursor is a structured plan → execute → closeout workflow for VS Code Copilot. It turns chat agents into a governed development pipeline with mandatory human review gates between every meaningful step.

Precursor operates on a single model lane (Sonnet) and enforces human-in-the-loop governance by design — no agent auto-continues, no autonomous chaining.

---

## What's Inside

- `SKILLS/` — 8 reusable task specs (markdown files) that define agent behaviors
- `.github/agents/` — 5 VS Code Copilot agent modes that read and execute the skills
- `START_HERE.md` — Quickstart guide
- `MANIFEST.md` — Complete file inventory

---

## Quick Start

See [START_HERE.md](START_HERE.md).

---

## Governance Model

Every Precursor agent completes its bounded action, then **stops and presents its work for human review**:

```
---
⏸ AWAITING YOUR REVIEW
- [ ] Review the output above
- [ ] Revise if needed (edit files directly)
- [ ] When satisfied, invoke the next agent: @{NextAgent} {path}
---
```

No agent auto-continues. The user must explicitly invoke the next step. This creates a structural human-in-the-loop gate at every transition.

---

## Core Loop

```
@PrecursorPlan {task}     →  creates a plan tree under PLANS/
@PrecursorExecute {step}  →  implements a single step, writes PROGRESS.md
@PrecursorCloseout {step} →  writes CLOSEOUT.md, propagates status back to plan
```

---

## Daily Loop

```
@PrecursorStart           →  rehydrates context, runs morning coffee
```

---

## Skills

| Skill | Purpose |
|-------|---------|
| RECURSE_PLAN | Decompose tasks into step trees |
| RECURSE_EXECUTE | Implement single-pass steps with audit trail |
| RECURSE_CLOSEOUT | Write completion records, propagate status |
| RECURSE_REFOCUS | Mid-session reorientation (read-only) |
| MORNING_COFFEE | Daily orientation and priority stack |
| CONFIG_PROJECTS | Scan workspace, build project registry |
| BOOTSTRAP | First-time setup flow |
| FIRST_BREW | Guided first session walkthrough |

---

## Agent Naming Convention

All Precursor agents use the `Precursor` prefix:

- **PrecursorStart** — bootstrap and onboarding
- **PrecursorPlan** — recursive task planning
- **PrecursorExecute** — single-pass step execution
- **PrecursorCloseout** — step closeout and audit
- **PrecursorRefocus** — context recovery and reorientation

---

## Directory Structure

```
.github/agents/         ← 5 agent definitions for VS Code Copilot
SKILLS/                 ← 8 workflow skill specs
README.md               ← this file
START_HERE.md           ← quickstart guide
MANIFEST.md             ← complete file inventory
```
