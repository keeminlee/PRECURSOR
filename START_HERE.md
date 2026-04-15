# Precursor - Quick Start

Get from clone to your first governed workflow in a few minutes.

---

## Prerequisites

- VS Code with the GitHub Copilot extension installed
- A GitHub Copilot subscription that supports agent modes

---

## Setup

1. Clone this repo
2. Open it in VS Code
3. Verify you can see `SKILLS/` and `.github/agents/`

Precursor is just markdown plus thin wrappers. No build step is required.

---

## What You Are Setting Up

Precursor is the enterprise-safe `PRECURSOR` lane in the broader Starstory architecture:
- Copilot-native
- explicitly human-gated
- review required between each major phase

---

## Try the Demo

1. Open [demo/TOY_TASK.md](demo/TOY_TASK.md)
2. In Copilot chat, choose **@PrecursorPlan**
3. Paste the task
4. Review the resulting plan under `PLANS/`
5. Switch to **@PrecursorExecute**
6. Execute one step
7. Review the resulting `PROGRESS.md`
8. Optionally close it out with **@PrecursorCloseout**

The visible audit trail is the feature.

---

## Key Idea

Every action ends at a human checkpoint:

```text
AWAITING YOUR REVIEW
```

Nothing auto-continues.

---

## What's Next

- Use Precursor on your own tasks
- Review [MANIFEST.md](MANIFEST.md) for the file inventory
- Treat Precursor as a lane-specific governed workflow, not as a universal abstraction

---

## Optional: Daily Rituals

If you want daily orientation and retrospective documents, enable rituals during `@PrecursorStart` (BOOTSTRAP Phase E). Once enabled, a `docs/week_N/{date}/` directory is scaffolded for each working day, and two additional agents are available:

- `@PrecursorMorning` → writes today's `MORNING_COFFEE.md` (active plans, carry-over, git signals, suggested next steps)
- `@PrecursorRetro` → writes today's `EOD_RETRO.md` (what was planned vs. completed, decisions, carry-over for tomorrow)

Rituals are additive. The core Plan → Execute → Closeout loop is unchanged whether rituals are enabled or not.

---

## Optional: Experimental Chained Mode

`@PrecursorAuto` chains Plan → Execute → Closeout over a whole plan tree on an isolation branch. It has eight hard preconditions (including branch isolation, plan greenlight, CI config present) and halts on any test or verification failure. Never commits or merges.

Use it only for prototype work where:
- The plan is fully decomposed to SINGLE-PASS steps
- The branch is disposable
- CI is wired up and acts as the ambient pre-merge gate
- Impact Tier is T0, T1, or T2 (T3 work must stay in the manual loop)

See [SKILLS/AUTO_COPILOT.md](SKILLS/AUTO_COPILOT.md) for the full safety contract.
