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

The **default demo is interactive**: a mostly-done plan tree where steps 1 and 2 are pre-staged complete and you run only step 3, which assembles a self-contained HTML application, runs unit tests, and opens it in VS Code's Simple Browser.

1. Open [demo-interactive/TOY_TASK.md](demo-interactive/TOY_TASK.md) and read the brief
2. Open `demo-interactive/` as your VS Code workspace root
3. In Copilot chat, choose **@PrecursorExecute** and paste:
   `execute PLANS/governance-visualizer/3_assemble-and-preview/`
4. Review the resulting `PROGRESS.md` and the assembled `governance-visualizer.html` rendering in Simple Browser
5. Choose **@PrecursorCloseout** and paste:
   `closeout PLANS/governance-visualizer/3_assemble-and-preview/`
6. Review the Artifact Verification and Test Verification tables in `CLOSEOUT.md` — this is the audit surface reviewers care about

For a simpler docs-only demo (writes a markdown Quick Start guide from scratch through all three phases), see [demo/TOY_TASK.md](demo/TOY_TASK.md).

The visible audit trail is the feature — both demos produce it, but the interactive demo produces it on **running code**.

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
