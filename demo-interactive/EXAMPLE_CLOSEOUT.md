# Example Closeout Output — Step 3

This is what @PrecursorCloseout should produce after step 3's Execute completes. The Artifact Verification and Test Verification tables are the **non-negotiable sections** — they are the core of the governance story for this demo.

---

## Expected CLOSEOUT.md: `PLANS/governance-visualizer/3_assemble-and-preview/CLOSEOUT.md`

```markdown
# CLOSEOUT: 3_assemble-and-preview
> **Parent:** [3_assemble-and-preview.md](3_assemble-and-preview.md)
> **Final Status:** COMPLETE
> **Quality Gate:** GREEN
> **Closed:** 04_15_2026

---

## Final State

`governance-visualizer.html` exists at the demo workspace root as a single
self-contained HTML application. It inlines the stylesheet from step 2, the
render module from step 1, and the governance data as a JavaScript constant —
no external fetches or resource links. The file opens in VS Code's Simple
Browser and renders the four PRECURSOR governance layers with their tier
badges correctly colored. The underlying render module's unit tests re-ran
during execute and all 5 passed.

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

| Check | Result | Evidence |
|-------|--------|----------|
| Tests exist | PASS | `render.test.js` present at demo workspace root; 5 tests declared with `test(...)` |
| Tests run | PASS | PROGRESS.md Test Results section reports `PASS — 5 tests passed, 0 failed` against `node --test render.test.js`; re-ran the command independently during closeout and confirmed same result |
| Coverage scope | PASS | Tests cover escape correctness, tier-class naming, field escaping in both name and value, layer rendering structure, and top-level assembly — matches Test Requirements declared in step 3 spec |

## Artifact Verification

| Artifact | Class Check | Intent Check | Evidence |
|----------|-------------|--------------|----------|
| `governance-visualizer.html` | Self-contained HTML application → PASS: valid `<!DOCTYPE html>`, `<head>` with charset/viewport/title, `<body>` with `<div id="app" class="app">` mount point, inlined `<style>` block (no `<link rel="stylesheet">`), inlined `<script type="module">` (no external `src=`), closing `</html>` | PASS: file renders the four governance layers (Plan Governance Header, Three-Point Test Contract, Artifact Verification, Coherence Verification) with tier-colored badges. Opened in Simple Browser and confirmed visual correctness — title "PRECURSOR Governance Layers", subtitle present, four `<article class="layer">` blocks rendered, each with distinct badge color matching its tier (T2 amber, T1 blue, etc.) | Inlined `<style>` block contains `--t0: #4ade80`, `--t1: #60a5fa`, `--t2: #fbbf24`, `--t3: #f87171` (verified by reading file); inlined script declares `const data = {...}` rather than fetching; `data-id="plan-governance"` through `data-id="coherence-verification"` all present in the rendered HTML output; no `<link>` tags except the mandatory charset meta; no `fetch()` calls; file size ~10 KB |

**Class conformance:** The artifact IS a self-contained HTML application. It has the complete structure (doctype, html, head, body, closing tags), inlines all resources, and contains a working render pipeline. A reviewer can copy the single file anywhere and it will still render correctly without a server.

**Intent alignment:** The step's Principal Intent (from the root plan) required a reviewer to be able to open the file in Simple Browser and see the four governance layers rendered correctly with tier badges. Verified directly by opening the file and inspecting the rendered output — all four layers visible, badges distinct, layout responsive.

## Quality Assessment

**Gate: GREEN**
All acceptance criteria met; Artifact Verification passes on both class and intent for the single output with specific cited evidence (inlined blocks, tier variable values, data-id attributes, no external fetches, ~10 KB size); Test Verification confirms 5/5 tests passing re-run during closeout. Steps 1 and 2 were verified GREEN before execution began per the coherence acceptance criterion. No scope changes, no deferred items.

## Spec -> Progress Delta

Implemented as specified. One minor note: the assembly procedure required stripping `export` keywords from the inlined render module functions (they're local to the inlined `<script>`, not exported from a module). This was noted in the Assembly Procedure reference in the step spec and executed as expected.

## Artifacts Produced

- `governance-visualizer.html` — self-contained HTML application, ~10 KB, renders 4 governance layers with tier badges

## UPDATE

> Step 3 complete -> single-file HTML assembled, tests pass, renders in Simple Browser [GREEN]
```

---

## What To Look For — The Flagship Review Section

This closeout is the single most important artifact in the demo. Four things must land for the enterprise audit story to hold:

1. **Artifact Verification cites specific content.** Not "file exists" — must name actual tier-variable values (`--t2: #fbbf24`), actual data-id attributes, actual structural elements. Evidence column is specific enough that a reviewer could re-verify by reading the file themselves.

2. **No `<link>` or `<script src=>` references in Evidence.** The whole point of step 3 is inlining; the closeout must confirm inlining happened. "Self-contained" is falsifiable, not aspirational.

3. **Test Verification re-ran the command during closeout.** Not just quoted PROGRESS.md. The Evidence column says "re-ran the command independently during closeout and confirmed same result."

4. **GREEN gate is justified against the verification.** "Gate: GREEN" must reference Artifact Verification results in its justification sentence. A gate that says "looks good to me" without citing verification is a process failure.

This is what "AI output is not self-approved" actually looks like on paper.
