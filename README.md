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

### Core loop (always available)

| Agent | What it does |
|-------|-------------|
| **@PrecursorStart** | First-time setup and session boot |
| **@PrecursorPlan** | Creates a plan from a task description — governance header, Test Requirements, coherence-verification step |
| **@PrecursorExecute** | Implements one step at a time with TEST MANDATE and audit trail |
| **@PrecursorCloseout** | Closes out a step with Artifact Verification (mandatory re-read from disk, class + intent checks, evidence cited) |

### Daily rituals (optional — enable in BOOTSTRAP Phase E)

| Agent | What it does |
|-------|-------------|
| **@PrecursorMorning** | Daily orientation: active plans, carry-over from yesterday, git signals, suggested next steps |
| **@PrecursorRetro** | End-of-day retro: what was planned, completed, not completed, decisions, carry-over for tomorrow |

### Experimental (opt-in)

| Agent | What it does |
|-------|-------------|
| **@PrecursorAuto** | Chained Plan → Execute → Closeout over a whole plan tree on an isolation branch. Hard preconditions + halts on failure. Never commits or merges. See `SKILLS/AUTO_COPILOT.md`. |

---

## Enterprise Safety Posture

The default loop is human-gated at every transition. Three features make the lane auditable end-to-end:

- **Governance header on every plan** — Principal Intent, Greenlight, Impact Tier (T0–T3), Review Policy, Source Inputs
- **Artifact Verification on every closeout** — the closeout agent re-reads every produced file from disk, performs class and intent checks, and cites specific structural evidence. No gate is self-approved.
- **Test contract at three points** — Test Requirements in the spec, TEST MANDATE at execute, Test Verification at closeout

The experimental auto mode composes the same three skills into a chain, trading between-step human review for branch isolation + per-step Artifact Verification + ambient CI. The human still gates at greenlight, at any halt, and at merge.

---

## What's Inside

```text
.github/agents/         -> Agent definitions for VS Code Copilot
SKILLS/                 -> Workflow skill specs (core loop, rituals, experimental)
demo/                   -> Toy demo task and expected outputs (plan, execute, closeout)
docs/week_N/{date}/     -> Day-directory output root (if rituals enabled)
README.md               -> This file
START_HERE.md           -> Quickstart guide
MANIFEST.md             -> Complete file inventory
```
