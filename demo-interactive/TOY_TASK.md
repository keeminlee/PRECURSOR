# Interactive Demo — Governance Visualizer

Most AI-assist demos produce prose. This one produces **running code**: an interactive HTML dashboard that visualizes PRECURSOR's own governance layers, opens in VS Code's Simple Browser, and passes its own unit tests.

It is also a **mostly-done plan tree**. Steps 1 and 2 are pre-staged complete — specs, PROGRESS.md, CLOSEOUT.md, Artifact Verification tables, and all the source artifacts. Your job is to run only step 3 (`3_assemble-and-preview`), which demonstrates the full Plan → Execute → Closeout loop on a single meaningful step that actually assembles a deployable artifact, runs tests, and opens a browser.

This is the default interactive demo. A simpler docs-only demo lives at [`../demo/TOY_TASK.md`](../demo/TOY_TASK.md).

---

## What This Demonstrates

- **Copilot codes, not just writes.** Steps 1 and 2 produced real JavaScript, HTML, CSS, data, and a passing test suite — not prose. Step 3 bundles them into a deployable single-file artifact.
- **Artifact Verification against running code.** The Closeout agent re-reads the assembled `governance-visualizer.html` from disk, verifies class and intent against the step spec, and cites specific structural evidence (inlined style tag, mount point, module script, data-id attributes for each rendered layer).
- **Three-point test contract end-to-end.** Step 3's spec declares Test Requirements, the Execute mandate re-runs `render.test.js`, and the Closeout's Test Verification table confirms 5/5 passing. A failing test halts the closeout — the gate cannot go GREEN without it.
- **Live preview inside VS Code.** The Execute agent opens the final artifact in Simple Browser so the human reviewer sees the running output directly — not just a file path.

---

## How to Run This Demo

1. Open `PRECURSOR/` as your VS Code workspace root.
2. Review the existing plan tree at `demo-interactive/PLANS/governance-visualizer/`. Notice:
   - Root plan file shows steps 1 and 2 complete with `[GREEN]` tags, step 3 pending
   - Each completed step has its PROGRESS.md, CLOSEOUT.md, and Artifact Verification table filled in
   - The artifacts themselves (`governance-data.json`, `render.js`, `render.test.js`, `shell.html`, `styles.css`) exist under `demo-interactive/`
3. (Optional but satisfying) Run the existing tests: `cd demo-interactive && node --test render.test.js` — confirms step 1's module works before you ask Copilot to consume it.
4. Select **@PrecursorExecute** from the Copilot agent dropdown and paste:
   ```
   execute demo-interactive/PLANS/governance-visualizer/3_assemble-and-preview/
   ```
5. Review the PROGRESS.md it produces and the assembled `governance-visualizer.html`. Verify it opened in Simple Browser and renders the four layers with tier-colored badges.
6. Select **@PrecursorCloseout** and paste:
   ```
   closeout demo-interactive/PLANS/governance-visualizer/3_assemble-and-preview/
   ```
7. Review the CLOSEOUT.md — especially the **Artifact Verification** and **Test Verification** tables. That's the moment the audit story lands.

See [EXAMPLE_EXECUTE.md](EXAMPLE_EXECUTE.md) and [EXAMPLE_CLOSEOUT.md](EXAMPLE_CLOSEOUT.md) for what good live outputs look like.

---

## What You Can Point At During a Presentation

**"Every step has a re-readable audit trail."** Open any completed step's folder — `demo-interactive/PLANS/governance-visualizer/1_data-and-rendering/`. There's the spec, the PROGRESS.md with Test Results, and the CLOSEOUT.md with Artifact Verification citing specific file contents. This is what a governed workflow leaves behind.

**"The closeout agent cannot self-approve."** In step 3's CLOSEOUT.md (once you run it), the Artifact Verification table names the `governance-visualizer.html` file, opens it, and cites actual content found — heading names, inlined style tags, script module presence, data-id attributes. A GREEN gate with weak evidence is a process failure visible on the closeout record.

**"Test discipline is enforced, not aspirational."** Step 3 cannot reach GREEN if `node --test render.test.js` fails. The executor's TEST MANDATE requires running it. The closeout's Test Verification table re-confirms it.

**"Governance is metadata, not ceremony."** The root plan declares `Principal Intent`, `Greenlight: YES`, `Impact Tier: T1`, `Review Policy: STEP_GATE`. That's the risk posture visible on the first line of the plan, before any work begins.
