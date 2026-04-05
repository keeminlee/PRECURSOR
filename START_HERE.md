# Precursor — Quickstart

Clone. Open. Plan your first task.

---

## Setup

1. **Prerequisites:** VS Code with the GitHub Copilot extension (chat enabled).
2. **Clone** this repo (or download as ZIP) into the root of an existing project.
3. **Open** the folder in VS Code.
4. **Verify** that `SKILLS/` and `.github/agents/` directories exist.
5. **Open Copilot chat**, click the agent dropdown, and select **@PrecursorPlan**.
6. **Type a task** — e.g. `add a README to my project`
7. **Review the plan** the agent produces. Edit the plan files if needed.
8. Select **@PrecursorExecute** from the dropdown and point it at step 1.
9. **Review the work.** When satisfied, select **@PrecursorCloseout** to record what happened.
10. **Done.** You've completed your first Plan → Execute → Closeout cycle.

---

## Core Concept: Human Review Gates

Every meaningful step in Precursor ends with this pattern:

```
---
⏸ AWAITING YOUR REVIEW
- [ ] Review the output above
- [ ] Revise if needed (edit files directly)
- [ ] When satisfied, select the next agent from the dropdown
---
```

**Why this matters:**

- **Enterprise governance.** Every agent action produces a visible markdown artifact — a plan file, a progress log, a closeout record. These are your audit trail. Nothing happens in the dark.
- **Visible audit trail.** Because every transition between agents requires your explicit action, the record of what happened and when is built into the workflow itself. You can trace any decision back through the chain.
- **Human judgment in the loop.** Agents are fast but not infallible. The review gate is where you catch misunderstandings, adjust scope, correct direction, or simply confirm that the work meets your standard before the next phase begins.

No agent auto-continues to the next phase. You read the output. You decide. You select what comes next.
