# SKILL: FIRST_BREW

> **Type:** Reusable task spec
> **Trigger:** First working session with Precursor
> **Invocation:** "Run FIRST_BREW"

---

## Purpose

Walk a new user through the core Precursor workflow: **Plan → Execute → Closeout**. By the end, the user will have planned a simple task, executed a step, closed it out, and understood the human review gate pattern.

**Prerequisite:** `SKILLS/` and `.github/agents/` directories exist. (If you cloned the repo, they already do.)

---

## Your First Plan → Execute → Closeout Cycle

Use the demo task from [demo/TOY_TASK.md](../demo/TOY_TASK.md), or pick any small task — "add a README to my project" also works fine.

### Step 1: Plan

Open Copilot chat, select **@PrecursorPlan** from the agent dropdown, and type your task:

```
add a README to my project
```

The Plan agent analyzes your task and breaks it into concrete steps. It writes a plan under `PLANS/` — a markdown file listing each step with a clear spec.

When finished, it **stops and waits**:

```
---
⏸ AWAITING YOUR REVIEW
- [ ] Review the plan steps
- [ ] When satisfied, switch to @PrecursorExecute and point it at step 1
---
```

**You review the plan.** Are the steps reasonable? Is the scope right? Edit the plan files directly if you want to adjust anything.

### Step 2: Execute

When you're happy with the plan, select **@PrecursorExecute** from the dropdown and tell it which step to run:

```
execute PLANS/add-readme/1_write-readme/
```

The Execute agent reads the step spec, writes a `PROGRESS.md` log, does the work, and **stops and waits**:

```
---
⏸ AWAITING YOUR REVIEW
- [ ] Review the implementation
- [ ] When satisfied, switch to @PrecursorCloseout
---
```

**You review the work.** Check the files created or modified. Does it match what you expected?

### Step 3: Closeout

When you're satisfied, select **@PrecursorCloseout** from the dropdown:

```
closeout PLANS/add-readme/1_write-readme/
```

The Closeout agent writes a `CLOSEOUT.md` record, updates the plan's status table, and **stops and waits**:

```
---
⏸ AWAITING YOUR REVIEW
- [ ] Review the closeout record
- [ ] Confirm status updates are accurate
---
```

**You confirm.** That step now has a full audit trail: spec → progress → closeout.

---

## The Pattern

Every meaningful action in Precursor follows the same shape:

1. **Agent acts** — produces a bounded output (plan, code, record)
2. **Agent stops** — presents the `⏸ AWAITING YOUR REVIEW` gate
3. **You review** — check, edit, confirm
4. **You select next** — explicitly select the next agent from the dropdown

No agent ever auto-continues. You are always in control.

---

## What You Now Have

After completing this walkthrough:

- A **plan** that broke a task into steps
- A **progress log** that recorded what happened during execution
- A **closeout record** that captured the final state
- A **human review gate** at every transition

This is the core loop. Everything else in Precursor builds on it.

---

## Completion Criteria

- [ ] At least one full Plan → Execute → Closeout cycle completed
- [ ] User understands the review gate pattern
