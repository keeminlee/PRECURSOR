# SPEC: HTML shell + responsive stylesheet with tier-colored badges
> **Parent:** [../governance-visualizer.md](../governance-visualizer.md)
> **Step:** 2 of 3
> **Recommendation:** `SINGLE-PASS`
> **Status:** COMPLETE
> **Depends on:** 1

---

## What

Write the HTML shell that hosts the rendered governance visualizer and the stylesheet that themes it. The shell is the pre-assembly source for step 3; it uses `fetch()` against the JSON data file and dynamic `import` of the render module so developers can iterate quickly during step-2 work. Step 3 will inline everything for single-file distribution.

The stylesheet defines tier-colored badges (T0 green, T1 blue, T2 amber, T3 red) and a dark-mode card layout for the layers.

---

## Inputs

- `render.js` (from step 1) — exports that the shell imports
- `governance-data.json` (from step 1) — data the shell fetches

---

## Outputs / Artifacts

- **`shell.html`** — HTML skeleton with `#app` mount point, imports render.js, fetches governance-data.json
- **`styles.css`** — theme + tier-colored badges + responsive card layout

---

## Acceptance Criteria

- [x] `shell.html` has a `<div id="app">` mount point
- [x] `shell.html` loads render.js as an ES module and fetches the data JSON
- [x] `styles.css` defines `.tier-t0`, `.tier-t1`, `.tier-t2`, `.tier-t3` with distinct colors
- [x] Layout is responsive (centered, max-width container)
- [x] Dark-mode palette defined via CSS custom properties (`:root --bg`, `--text`, `--accent`)
- [x] No external CSS or font dependencies

---

## Reasoning

Single-pass because the shell and stylesheet are co-evolved: the CSS selectors target the exact class names the shell/render module emit. Splitting them would force cross-step coordination without benefit. The work is bounded (~100 lines across two files).

---

## Test Requirements

- **Framework:** N/A
- **Test scope:** N/A — step produces static assets (HTML shell and CSS) with no runtime logic. Correctness is verified at closeout via Artifact Verification (presence of required classes, mount point, and tier variants) and implicitly by step 3 when the visualizer renders visibly correctly in Simple Browser.
- **Existing test files to update:** none
