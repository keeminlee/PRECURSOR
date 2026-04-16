# Example Plan Output

This is what @PrecursorPlan should produce for the toy demo task. Your live run may differ in wording, but the structure should match.

---

## Expected root plan file: `PLANS/precursor-quickstart-guide/precursor-quickstart-guide.md`

```markdown
# Plan: precursor-quickstart-guide
> **Parent:** none
> **Created:** 04_15_2026
> **Status:** NOT STARTED
> **Task:** Write a plain-English Quick Start guide for PRECURSOR
> **Principal Intent:** A first-time Copilot user can read the guide and complete one full Plan → Execute → Closeout cycle without asking for help.
> **Greenlight:** PENDING — requires human review
> **Impact Tier:** T1
> **Review Policy:** STEP_GATE
> **Source Inputs:**
> - `demo/TOY_TASK.md` — task description
> - `README.md`, `START_HERE.md` — existing doc structure

**Originating description:**
Write a plain-English Quick Start guide for PRECURSOR that explains Plan, Execute,
and Closeout with one worked example. Should be understandable by someone who has
never used Copilot agent workflows. Single markdown file, under 60 lines.

---

## Steps

| # | Directory | Step | Recommendation | Depends on | Status | Update |
|---|-----------|------|----------------|------------|--------|--------|
| 1 | `1_draft-guide/` | Draft the Quick Start guide | SINGLE-PASS | — | NOT STARTED | — |
| 2 | `2_review-and-polish/` | Review for clarity and trim to 60 lines | SINGLE-PASS | 1 | NOT STARTED | — |
| 3 | `3_coherence-verification-pass/` | Audit step outputs and propagate status | SINGLE-PASS | 1, 2 | NOT STARTED | — |

---

## Context

**What was read to inform this plan:**
- `README.md` — Precursor's core loop and governance model
- `START_HERE.md` — existing quickstart structure and agent invocation patterns
- `demo/TOY_TASK.md` — task brief and acceptance criteria

**Key constraints carried in:**
- Must be a single markdown file
- Under 60 lines
- Plain English for non-Copilot users

---

## Decisions

1. Two implementation steps rather than one — drafting and polishing are distinct
   concerns, and the review step ensures the guide meets the line-count constraint.
2. A coherence-verification step is appended per the coherence rule (2+ sibling
   steps trigger it). It verifies that the final guide matches Principal Intent
   and that both earlier steps' acceptance criteria are actually satisfied.
```

## Expected step spec: `PLANS/precursor-quickstart-guide/1_draft-guide/1_draft-guide.md`

```markdown
# SPEC: Draft the Quick Start guide
> **Parent:** [../precursor-quickstart-guide.md](../precursor-quickstart-guide.md)
> **Step:** 1 of 3
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

---

## Test Requirements

- **Framework:** N/A
- **Test scope:** N/A — no testable code produced
- **Existing test files to update:** none

Documentation artifact only; no runtime behavior to test. Intent and class
conformance will be verified at closeout via Artifact Verification.
```

---

## What to look for

When reviewing the live Plan output, check:

1. **Governance header** — Are all 5 contract fields populated (Principal Intent,
   Greenlight, Impact Tier, Review Policy, Source Inputs)?
2. **Structure** — Did it create a root plan file and step directories?
3. **Coherence step** — For 2+ sibling steps, is there a final
   `{N}_coherence-verification-pass` step?
4. **Step specs** — Does each step have Inputs, Outputs, Acceptance Criteria,
   Reasoning, and Test Requirements?
5. **Review gate** — Did the agent stop and show `⏸ AWAITING YOUR REVIEW`?

The exact wording will vary each run. The structure is what matters.
