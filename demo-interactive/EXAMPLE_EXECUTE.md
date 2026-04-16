# Example Execute Output — Step 3

This is what @PrecursorExecute should produce when run on `3_assemble-and-preview/`. Your live run may differ in wording, but the structure and the Test Results block must match.

---

## Expected PROGRESS.md: `PLANS/governance-visualizer/3_assemble-and-preview/PROGRESS.md`

```markdown
# PROGRESS: 3_assemble-and-preview
> **Parent:** [3_assemble-and-preview.md](3_assemble-and-preview.md)
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

- [x] Verified step 1 and step 2 CLOSEOUT.md files both show Final Status: COMPLETE / Quality Gate: GREEN
- [x] Re-ran render.test.js before assembly — confirmed 5/5 tests passing
- [x] Read shell.html, styles.css, render.js, governance-data.json
- [x] Assembled governance-visualizer.html with inlined <style>, inlined module <script>, and inlined data constant (no fetch, no external links)
- [x] Verified assembled file opens in Simple Browser — all four layers render with correct tier badges
- [x] Re-ran render.test.js post-assembly — still passing
- [x] Confirmed file size is reasonable (assembled HTML is ~10 KB)

## Files Created / Modified

- `governance-visualizer.html` — new file, self-contained single-file HTML application

## Test Results

- **Command:** `node --test render.test.js`
- **Result:** PASS — 5 tests passed, 0 failed
- **New/modified test files:** none — existing render.test.js re-run

## Blockers

None.
```

---

## Expected Deliverable: `governance-visualizer.html`

The Execute agent should produce a single self-contained HTML file at the demo workspace root with:

- Valid `<!DOCTYPE html>` + `<html>` + `<head>` + `<body>` structure
- **Inlined** `<style>...</style>` block containing the full contents of styles.css (no `<link rel="stylesheet">`)
- A `<div id="app" class="app">` mount point
- **Inlined** `<script type="module">` containing:
  - The render module's functions (exports stripped, since they're now local)
  - The governance data declared as `const data = {...}` rather than fetched
  - A call that writes `renderAll(data)` into `#app` on DOM ready
- No external network references, no `fetch()`, no `<link>` to external files

Opening the file in Simple Browser should show: title, subtitle, and four layer cards — each with a tier-colored badge (green / blue / amber / red for T0/T1/T2/T3).

---

## What To Look For

When reviewing the live Execute output, check:

1. **PROGRESS.md written first** — Before any assembly or test run
2. **Coherence check logged** — The agent confirmed step 1 and step 2 GREEN before assembling (the critical pre-assembly verification)
3. **Test Results block present and honest** — Shows the exact command run and PASS/FAIL. Tests must be re-run by this step even though they passed in step 1
4. **Assembled HTML is truly self-contained** — No `<link>` tags, no `fetch()` calls, no `src=` attributes pointing at external files. Inlined everything
5. **Simple Browser shows the rendering** — The agent either opens it automatically or provides a clear manual-open instruction; either way the reviewer sees a live running artifact, not just a file path
6. **Review gate delivered** — `⏸ AWAITING YOUR REVIEW` block at end pointing to `@PrecursorCloseout`
