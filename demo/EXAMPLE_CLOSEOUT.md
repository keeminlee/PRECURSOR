# Example Closeout Output

This is what @PrecursorCloseout should produce for step 1 of the toy demo plan after @PrecursorExecute completes. Your live run may differ in wording, but the structure must match — Artifact Verification and Test Verification are non-negotiable.

---

## Expected CLOSEOUT.md: `PLANS/precursor-quickstart-guide/1_draft-guide/CLOSEOUT.md`

```markdown
# CLOSEOUT: 1_draft-guide
> **Parent:** [1_draft-guide.md](1_draft-guide.md)
> **Final Status:** COMPLETE
> **Quality Gate:** GREEN
> **Closed:** 04_15_2026

---

## Final State

A plain-English Quick Start guide now exists at `QUICK_START_GUIDE.md` (workspace
root). It explains Plan, Execute, and Closeout in two sentences each, includes
one worked example of the full cycle, and fits within the 60-line constraint.

## Provenance

- Agent Platform: `copilot`
- Execution Lane: `PRECURSOR`
- Workflow Agent: `PrecursorCloseout`
- Transcript Source: `Copilot`
- Transcript Path: `PENDING transcript extraction`
- Session ID: `UNKNOWN`
- Ledger File: `NOT RECORDED`
- Commit: `NOT COMMITTED`

## Test Verification

N/A — step produces no testable code. Step spec declared `Test Requirements: N/A`.

## Artifact Verification

| Artifact | Class Check | Intent Check | Evidence |
|----------|-------------|--------------|----------|
| `QUICK_START_GUIDE.md` | Quick Start guide → PASS: H1 title, three phase subheadings (`Plan`, `Execute`, `Closeout`), "Worked Example" section with numbered step list | PASS: explains each phase in 1–2 sentences, walks the full cycle end-to-end, reads as plain English with no Copilot-specific jargon | H1 `# Precursor — Quick Start Guide`; subheadings `## The Three Phases`, `## Why This Matters`, `## Worked Example`; 54 lines (under the 60-line ceiling); worked example ("Add a README to my project") includes all six cycle steps from agent selection through closeout confirmation |

**Class conformance:** File IS a Quick Start guide — it has the structural elements of one (title, phase explanations, worked example), not a spec or a README disguised as one.

**Intent alignment:** The Principal Intent was "a first-time Copilot user can read the guide and complete one full cycle without asking for help." The guide walks through every agent invocation and every review gate; a first-time user following it would have no open questions about what to click next.

## Quality Assessment

**Gate: GREEN**
All acceptance criteria met; Artifact Verification passes on both class and intent for the single output; Test Requirements was N/A so Test Verification was skipped per the Quality Gate Definitions. No scope changes, no deferred items.

## Spec -> Progress Delta

Implemented as specified. Final line count (54) landed comfortably inside the
60-line ceiling, so the polish step (step 2) will focus on clarity rather than
trimming.

## Artifacts Produced

- `QUICK_START_GUIDE.md` — plain-English Quick Start guide, 54 lines

## UPDATE

> Step 1 complete -> Quick Start guide drafted, 54 lines, meets all acceptance criteria [GREEN]
```

---

## What to look for

When reviewing the live Closeout output, check:

1. **Artifact Verification table present and populated** — Every file in PROGRESS.md's "Files Created / Modified" must appear as a row, with PASS/FAIL in both Class Check and Intent Check columns
2. **Evidence column cites specifics** — Must reference actual heading names, schema elements, or structural features found in the artifact. Not "file looks good" — literal content quoted or listed
3. **Re-read from disk** — The closeout agent must open the output file(s) fresh, not rely on PROGRESS.md's description. This is the most important verification discipline in the whole workflow
4. **Test Verification present** — Either the three-row table (Tests exist / Tests run / Coverage scope) or an explicit `N/A — step produces no testable code` line
5. **Quality Gate justified against Artifact Verification** — GREEN requires every Artifact Verification row to PASS on both checks AND Test Verification to pass (or be N/A). A GREEN gate with a FAIL row is a process error
6. **UPDATE line propagated** — The one-liner under Update should also appear in the parent plan's Steps table row for this step, replacing the `—` placeholder
7. **Review gate** — Did the agent stop and show `⏸ AWAITING YOUR REVIEW`?

## Why Artifact Verification matters

This is the one section that distinguishes a governed workflow from a prompt-and-pray AI tool. The closeout agent **re-reads every produced file from disk**, independent of what the executor claims it did. The executor's `[x]` checkmarks in PROGRESS.md are treated as claims requiring verification — not as truth.

In an enterprise context, this is the auditable surface:
- Reviewers can re-run the verification by reading the same files and cross-checking the Evidence column
- A GREEN gate with weak Evidence is a process failure visible on the closeout record itself
- The AI cannot self-approve — the class check and intent check must cite specific structural evidence, and any reviewer can invalidate the gate by pointing at the evidence that isn't there

This is the core of the "AI output is not self-approved" property of the PRECURSOR lane.
