# SPEC: Governance data contract + pure render module + tests
> **Parent:** [../governance-visualizer.md](../governance-visualizer.md)
> **Step:** 1 of 3
> **Recommendation:** `SINGLE-PASS`
> **Status:** COMPLETE
> **Depends on:** none

---

## What

Define the JSON data contract for governance layers (four layers: Plan Governance Header, Three-Point Test Contract, Artifact Verification, Coherence Verification). Write a pure, dependency-free JavaScript module that renders this data to HTML strings. Include unit tests that validate escaping, structure, and tier-badge class naming.

The module is deliberately DOM-free — it returns HTML strings. That makes it unit-testable under `node:test` without a jsdom dependency.

---

## Inputs

- `../../../README.md` — PRECURSOR governance features to surface as layers
- `../../../SKILLS/RECURSE_PLAN.md` — governance header field list
- `../../../SKILLS/RECURSE_CLOSEOUT.md` — Artifact Verification contract language

---

## Outputs / Artifacts

- **`governance-data.json`** — four-layer data contract at demo workspace root
- **`render.js`** — ES module exporting `escapeHtml`, `renderBadge`, `renderField`, `renderLayer`, `renderAll`
- **`render.test.js`** — 5 tests under `node:test`, no external dependencies

---

## Acceptance Criteria

- [x] `governance-data.json` has exactly 4 layers, each with `id`, `name`, `description`, `tier`, and `fields[]`
- [x] `render.js` is a pure string-returning module with no DOM or fetch references
- [x] `renderBadge('Tx')` produces `class="tier tier-tx"` (lowercase for CSS)
- [x] HTML-sensitive characters (`&`, `<`, `>`, `"`, `'`) are escaped in all user-facing strings
- [x] `render.test.js` passes all assertions under `node --test render.test.js`
- [x] No external npm dependencies introduced

---

## Reasoning

Single-pass because the three artifacts are tightly co-designed: the data contract defines what the render functions operate on, and the tests validate both shapes together. Splitting would produce three trivial steps with an artificial dependency chain. The work is bounded (~250 lines total across three files) and has clear acceptance (tests pass).

---

## Test Requirements

- **Framework:** node:test (built-in Node 18+)
- **Test scope:** escape correctness, tier-class naming, layer rendering completeness, top-level assembly structure
- **Existing test files to update:** none — new test file created
