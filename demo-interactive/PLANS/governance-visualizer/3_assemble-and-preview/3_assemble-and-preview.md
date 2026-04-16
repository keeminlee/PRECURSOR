# SPEC: Assemble single-file HTML, run tests, open Simple Browser
> **Parent:** [../governance-visualizer.md](../governance-visualizer.md)
> **Step:** 3 of 3
> **Recommendation:** `SINGLE-PASS`
> **Status:** NOT STARTED
> **Depends on:** 1, 2

---

## What

Assemble `governance-visualizer.html` as a **single self-contained file** by inlining the stylesheet from step 2 and the render module + data from step 1 into the shell from step 2. Run the existing `render.test.js` suite to confirm step 1's module still behaves correctly. Then open the assembled artifact in VS Code's Simple Browser so the human reviewer sees the running output.

This step also absorbs the coherence role for the plan (see root plan Decision 3). Its acceptance criteria require re-verifying step 1 and step 2 artifacts before assembly, running the tests, and performing explicit Artifact Verification of the final HTML.

---

## Inputs

- `shell.html` (from step 2) — assembly source
- `styles.css` (from step 2) — inlined into assembled file
- `render.js` (from step 1) — inlined into assembled file
- `render.test.js` (from step 1) — re-run as precondition to assembly
- `governance-data.json` (from step 1) — inlined into assembled file as a JS constant

---

## Outputs / Artifacts

- **`governance-visualizer.html`** — single self-contained HTML at demo workspace root. Opens directly in VS Code Simple Browser via `file://` without any local server or external fetch.

---

## Acceptance Criteria

- [ ] Step 1's and step 2's CLOSEOUT.md files both show `Final Status: COMPLETE` and `Quality Gate: GREEN` (coherence check — step cannot proceed if upstream steps are not GREEN)
- [ ] `render.test.js` re-runs and passes (test mandate — run `node --test render.test.js` and record result in PROGRESS.md)
- [ ] `governance-visualizer.html` exists at demo workspace root
- [ ] The assembled HTML contains **inlined** `<style>` (no `<link rel="stylesheet">`) and **inlined** `<script type="module">` (no `<script src=...>`) and **inlined data** as a JS constant (no `fetch()`)
- [ ] The assembled HTML is valid (opens without console errors, `<div id="app">` present, render module executes on DOMContentLoaded)
- [ ] The file opens in VS Code's Simple Browser and renders the four governance layers with their tier badges visibly distinct
- [ ] File size is reasonable (under 15 KB — no accidental bloat from bundling)

---

## Reasoning

Single-pass because the step is fundamentally a bundling operation with well-understood inputs and one well-defined output. The complexity is in faithfully inlining three source files without altering their behavior. The step is bounded (small output, no algorithmic work) and has clear acceptance (file exists, tests pass, renders visibly).

This step absorbs the coherence-verification role because (a) it must re-verify upstream artifacts before assembly can be trusted, and (b) the plan is demo-scoped and keeps to 3 steps rather than adding a 4th coherence step. Production plans should include a separate coherence step per `SKILLS/RECURSE_PLAN.md` coherence rule.

---

## Assembly Procedure (reference for the executor)

1. Read `shell.html`. Extract the body structure (keep `<!DOCTYPE>`, `<html>`, `<head>` up through the stylesheet link; replace the link with an inlined `<style>` block from `styles.css`; keep `<body>`, `<div id="app">`, and closing tags).
2. Read `styles.css`. Wrap its contents in `<style>` tags; insert at the location where `<link rel="stylesheet" href="styles.css">` appears in shell.html.
3. Read `render.js`. Its exports will be consumed by the inlined script below.
4. Read `governance-data.json`. Parse it — it will be inlined as a JS constant.
5. Replace shell.html's `<script type="module">...fetch...</script>` block with a new inlined module: paste render.js's functions (without the `export` keywords, since they're local to the inlined script), then declare `const data = {…}` with governance-data.json's parsed contents, then `document.getElementById('app').innerHTML = renderAll(data);` wrapped in a `DOMContentLoaded` listener if needed.
6. Write the assembled result to `governance-visualizer.html` at demo workspace root.

---

## Preview Procedure (reference for the executor)

After assembly and test re-run, open the artifact in VS Code's Simple Browser. Preferred path:

- Use the VS Code command `simpleBrowser.show` with the `file://` URL of `governance-visualizer.html`. If the agent has `runCommands` capability, invoke it directly.
- If command invocation is unavailable, instruct the human reviewer to right-click `governance-visualizer.html` in the VS Code Explorer and select "Open with Live Server" or use the command palette → "Simple Browser: Show" → paste the file's `file://` URL.

Either path satisfies the acceptance criterion — what matters is that the reviewer sees the running artifact, not how the browser opened.

---

## Test Requirements

- **Framework:** node:test (Node 18+)
- **Test scope:** re-run `render.test.js` from step 1 (it tests the module inlined into the final HTML). The test suite is the only guard that the inlined module behaves identically to the source module.
- **Existing test files to update:** none — `render.test.js` is re-run as-is. If the assembled HTML's inlined module diverges from `render.js` (e.g., whitespace collapse alters behavior), that is a bug in the assembly procedure and fixing it is part of this step.
