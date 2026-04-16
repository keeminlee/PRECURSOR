# Example Execute Output

This is what @PrecursorExecute should produce when run on step 1 of the toy demo plan. Your live run may differ in wording, but the structure should match.

---

## Expected PROGRESS.md: `PLANS/precursor-quickstart-guide/1_draft-guide/PROGRESS.md`

```markdown
# PROGRESS: 1_draft-guide
> **Parent:** [1_draft-guide.md](1_draft-guide.md)
> **Status:** COMPLETE
> **Started:** 04_15_2026

---

## Provenance

- Agent Platform: `copilot`
- Execution Lane: `PRECURSOR`
- Workflow Agent: `PrecursorExecute`
- Transcript Source: `Copilot`
- Transcript Path: `PENDING transcript extraction`
- Session ID: `UNKNOWN`
- Ledger File: `NOT RECORDED`

## Log

- [x] Read README.md and START_HERE.md for source content
- [x] Drafted QUICK_START_GUIDE.md with three-phase explanation
- [x] Added worked example showing full Plan → Execute → Closeout cycle
- [x] Verified plain English, no jargon
- [x] Confirmed under 60 lines

## Files Created / Modified

- `QUICK_START_GUIDE.md` — new file, the Quick Start guide

## Test Results

- **Command:** N/A — no testable code produced
- **Result:** N/A
- **New/modified test files:** none

Documentation artifact only; Test Requirements was `N/A` in the step spec.
Intent and class conformance will be independently verified at closeout.

## Blockers

None.
```

## Expected deliverable: `QUICK_START_GUIDE.md`

The Execute agent should create something like this at the workspace root:

```markdown
# Precursor — Quick Start Guide

Precursor is a workflow for VS Code Copilot that breaks AI-assisted development
into three governed phases: **Plan**, **Execute**, and **Closeout**.

## The Three Phases

**Plan** — You describe a task. The Plan agent breaks it into concrete steps and
writes a structured plan. You review the plan before anything happens.

**Execute** — You pick a step from the plan. The Execute agent implements it and
writes a progress log. You review the work before moving on.

**Closeout** — You close out the step. The Closeout agent records what happened
and updates the plan's status. You confirm the record.

## Why This Matters

Every phase ends with a review gate — the agent stops and waits for you to check
the output. Nothing auto-continues. This gives you a visible audit trail and
human judgment at every decision point.

## Worked Example

**Task:** "Add a README to my project"

1. Select @PrecursorPlan → it creates a plan with steps like "draft README" and
   "add project description"
2. Review the plan files under PLANS/
3. Select @PrecursorExecute → it implements step 1 and writes PROGRESS.md
4. Review the README it created
5. Select @PrecursorCloseout → it writes CLOSEOUT.md and updates the plan status
6. Confirm the closeout record

After one cycle you have: a plan file, a progress log, a closeout record, and
the actual deliverable — all human-reviewed, all traceable.
```

---

## What to look for

When reviewing the live Execute output, check:

1. **PROGRESS.md written first** — The agent should create PROGRESS.md before any other files
2. **Provenance block filled** — Platform, lane, workflow agent, transcript source all set (use `Unknown` where truly unknown; never fabricate)
3. **Acceptance criteria tracked** — Each criterion from the step spec should appear as a checked item in PROGRESS.md
4. **Test Results section present** — Even when Test Requirements was `N/A`, the section should exist and state so explicitly
5. **TEST MANDATE honored** — If the step had non-N/A Test Requirements, tests must exist, the test command must be recorded, and the result must be captured
6. **Deliverable created** — The actual output file (QUICK_START_GUIDE.md) should exist
7. **Review gate** — Did the agent stop and show `⏸ AWAITING YOUR REVIEW`?
8. **Readable output** — Is the generated guide actually understandable?
