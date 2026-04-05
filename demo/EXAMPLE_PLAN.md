# Example Plan Output

This is what @PrecursorPlan should produce for the toy demo task. Your live run may differ in wording, but the structure should match.

---

## Expected root plan file: `PLANS/precursor-quickstart-guide/precursor-quickstart-guide.md`

```markdown
# Plan: precursor-quickstart-guide
> **Created:** 04_06_2026
> **Status:** NOT STARTED
> **Task:** Write a plain-English Quick Start guide for PRECURSOR

**Originating description:**
Write a plain-English Quick Start guide for PRECURSOR that explains Plan, Execute,
and Closeout with one worked example. Should be understandable by someone who has
never used Copilot agent workflows. Single markdown file, under 60 lines.

---

## Steps

| # | Directory | Step | Recommendation | Status | Update |
|---|-----------|------|----------------|--------|--------|
| 1 | `1_draft-guide/` | Draft the Quick Start guide | SINGLE-PASS | NOT STARTED | — |
| 2 | `2_review-and-polish/` | Review for clarity and trim to 60 lines | SINGLE-PASS | NOT STARTED | — |

---

## Context

**What was read to inform this plan:**
- `README.md` — understanding of Precursor's core loop and governance model
- `START_HERE.md` — existing quickstart structure and agent invocation patterns

**Key constraints carried in:**
- Must be a single markdown file
- Under 60 lines
- Plain English for non-Copilot users

---

## Decisions

1. Two steps rather than one — drafting and polishing are distinct concerns, and the
   review step ensures the guide meets the line-count constraint.
```

## Expected step spec: `PLANS/precursor-quickstart-guide/1_draft-guide/1_draft-guide.md`

```markdown
# SPEC: Draft the Quick Start guide
> **Parent:** [../precursor-quickstart-guide.md](../precursor-quickstart-guide.md)
> **Step:** 1 of 2
> **Recommendation:** `SINGLE-PASS`
> **Status:** NOT STARTED
> **Depends on:** none

---

## What

Write the initial draft of a Quick Start guide that explains Precursor's three
phases (Plan, Execute, Closeout) in plain English. Include one concrete worked
example showing the full cycle end-to-end.

---

## Inputs

- `README.md` — core loop description and governance model
- `START_HERE.md` — existing quickstart for structural reference

---

## Outputs / Artifacts

- **`QUICK_START_GUIDE.md`** — the guide, placed at workspace root

---

## Acceptance Criteria

- [ ] Guide explains Plan, Execute, and Closeout in 1–2 sentences each
- [ ] Guide includes one worked example showing the full cycle
- [ ] Written in plain English — no jargon assumed
- [ ] Single markdown file
- [ ] Under 60 lines

---

## Reasoning

This is a bounded writing task with clear inputs and acceptance criteria. The scope
is small enough for a single pass — the guide is short and the content sources are
already available in the repo.
```

---

## What to look for

When reviewing the live Plan output, check:

1. **Structure** — Did it create a root plan file and step directories?
2. **Decomposition** — Are the steps reasonable for this task?
3. **Step specs** — Does each step have clear inputs, outputs, and acceptance criteria?
4. **Review gate** — Did the agent stop and show `⏸ AWAITING YOUR REVIEW`?

The exact wording will vary each run. The structure is what matters.
