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
