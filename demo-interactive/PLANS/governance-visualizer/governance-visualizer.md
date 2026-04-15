# Plan: governance-visualizer
> **Parent:** none
> **Created:** 04_15_2026
> **Status:** IN PROGRESS
> **Task:** Build a single-file HTML dashboard visualizing PRECURSOR's governance layers
> **Principal Intent:** A reviewer opens `governance-visualizer.html` in VS Code's Simple Browser and can read the four PRECURSOR governance layers with their fields and tier badges, rendered correctly, with the underlying `render.js` module's unit tests passing.
> **Greenlight:** YES — staged for the PRECURSOR interactive demo on 04_15_2026
> **Impact Tier:** T1
> **Review Policy:** STEP_GATE
> **Source Inputs:**
> - `../../README.md` — PRECURSOR core loop description
> - `../../../SKILLS/RECURSE_PLAN.md` — governance header spec
> - `../../../SKILLS/RECURSE_CLOSEOUT.md` — Artifact Verification contract

**Originating description:**
Build a single-page HTML artifact that visualizes PRECURSOR's own governance layers (Plan Governance Header, Three-Point Test Contract, Artifact Verification, Coherence Verification). The artifact must be self-contained (inlined CSS, JS, and data) so it opens in VS Code's Simple Browser without a local server. The underlying render module must have passing unit tests. The final assembled HTML is the deliverable; the tests are the evidence of correctness.

---

## Steps

| # | Directory | Step | Recommendation | Depends on | Status | Update |
|---|-----------|------|----------------|------------|--------|--------|
| 1 | `1_data-and-rendering/` | Governance data contract + pure render module + tests | SINGLE-PASS | — | COMPLETE | Step 1 complete -> data + render + 5 passing tests [GREEN] |
| 2 | `2_shell-and-styling/` | HTML shell + responsive stylesheet with tier-colored badges | SINGLE-PASS | 1 | COMPLETE | Step 2 complete -> shell.html + styles.css with tier badges [GREEN] |
| 3 | `3_assemble-and-preview/` | Assemble single-file HTML, run tests, open Simple Browser | SINGLE-PASS | 1, 2 | NOT STARTED | — |

---

## Context

**What was read to inform this plan:**
- `../../README.md` — the four governance layers are the content the visualizer surfaces
- `../../../SKILLS/RECURSE_PLAN.md` — governance header schema we're visualizing
- `../../../SKILLS/RECURSE_CLOSEOUT.md` — Artifact Verification contract that step 3's closeout will exercise

**Key constraints carried in:**
- Single HTML file as the final deliverable (inlined CSS, JS, data)
- Must open in VS Code Simple Browser with `file://` URLs (no local server)
- Pure render module must be unit-testable under `node:test` (no external test deps)
- Tier badges must be visually distinct for T0/T1/T2/T3

---

## Decisions

1. **Data, rendering, and tests bundled into step 1** rather than split across multiple steps. The data contract is small (under 100 lines of JSON) and the render module is a pure function library — splitting further would produce trivial steps.
2. **Styling and shell bundled into step 2.** They're co-evolved: the HTML shell defines mount points that the CSS targets. Splitting them would force cross-step artifact coordination for no benefit.
3. **Demo exception from coherence-rule:** this plan has 3 implementation steps and no separate `{N}_coherence-verification-pass` step. Step 3 `3_assemble-and-preview` absorbs the coherence role — its acceptance criteria require re-reading and validating step 1 and step 2 artifacts before assembly, re-running `render.test.js`, and performing Artifact Verification on the final HTML. Production plans outside the demo context should include the separate coherence step per `SKILLS/RECURSE_PLAN.md`.
4. **Final HTML inlines everything.** Inlining CSS, JS module, and data removes the `fetch()` dependency that fails under `file://` URLs in Simple Browser. It also makes the artifact trivially shareable.
5. **Review Policy: STEP_GATE.** The demo is explicitly about showcasing human review between phases — the policy matches the intent. This plan is intentionally incompatible with `@PrecursorAuto` (which refuses STEP_GATE plans); the demo uses the manual loop.
