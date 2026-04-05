# Precursor — Quickstart

Clone. Open. Run `@PrecursorStart`. You're operational.

---

## Setup (≤10 steps)

1. **Prerequisites:** VS Code with the GitHub Copilot extension (chat enabled).
2. **Clone** this repo (or download as ZIP) into an empty folder — or into the root of an existing project.
3. **Open** the folder in VS Code.
4. **Verify** that `SKILLS/` and `.github/agents/` directories exist.
5. **Open Copilot chat** and type: `@PrecursorStart`
6. `@PrecursorStart` detects no `PROJECTS.md` and runs **CONFIG_PROJECTS** automatically — it scans your workspace and builds a project registry.
7. **Review** the generated `PROJECTS.md`. Confirm the project list is correct.
8. **Done.** You're operational.
9. For a guided walkthrough of Plan → Execute → Closeout: **`Run FIRST_BREW`**
10. For the full setup and verification flow: **`Run BOOTSTRAP`**

---

## Core Concept: Human Review Gates

Every meaningful step in Precursor ends with this pattern:

```
---
⏸ AWAITING YOUR REVIEW
- [ ] Review the output above
- [ ] Revise if needed (edit files directly)
- [ ] When satisfied, invoke the next agent: @{NextAgent} {path}
---
```

**Why this matters:**

- **Enterprise governance.** Every agent action produces a visible markdown artifact — a plan file, a progress log, a closeout record. These are your audit trail. Nothing happens in the dark.
- **Visible audit trail.** Because every transition between agents requires your explicit invocation, the record of what happened and when is built into the workflow itself. You can trace any decision back through the chain.
- **Human judgment in the loop.** Agents are fast but not infallible. The review gate is where you catch misunderstandings, adjust scope, correct direction, or simply confirm that the work meets your standard before the next phase begins.

No agent auto-continues to the next phase. You read the output. You decide. You invoke what comes next.

---

## First Task Walkthrough

This walkthrough shows the full Precursor cycle end-to-end. Pick any small task — "add a README to my project" works fine.

### 1. Plan

```
@PrecursorPlan add a README to my project
```

`@PrecursorPlan` analyzes the task and produces a plan tree under `PLANS/`. When finished, it pauses:

```
⏸ AWAITING YOUR REVIEW
- [ ] Review the plan steps
- [ ] When satisfied: @PrecursorExecute execute PLANS/add-readme/1_write-readme/
```

**You review the plan.** Check that the steps make sense, the scope is right, nothing is missing. Edit the plan files directly if needed.

### 2. Execute

When you're satisfied with the plan, invoke execute on the first step:

```
@PrecursorExecute execute PLANS/add-readme/1_write-readme/
```

`@PrecursorExecute` reads the step spec, writes a PROGRESS.md, implements the work, and pauses:

```
⏸ AWAITING YOUR REVIEW
- [ ] Review the implementation
- [ ] When satisfied: @PrecursorCloseout closeout PLANS/add-readme/1_write-readme/
```

**You review the output.** Check the files created or modified. Verify the work matches your expectations.

### 3. Closeout

When you're satisfied with the implementation, invoke closeout:

```
@PrecursorCloseout closeout PLANS/add-readme/1_write-readme/
```

`@PrecursorCloseout` writes a CLOSEOUT.md, updates the root plan status, and pauses:

```
⏸ AWAITING YOUR REVIEW
- [ ] Review the closeout record
- [ ] Confirm status updates are accurate
```

**You confirm the record.** That step is now complete with a full audit trail: spec → progress → closeout.
