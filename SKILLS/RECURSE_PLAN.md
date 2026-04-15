# SKILL: RECURSE_PLAN

> **Type:** Reusable task spec
> **Trigger:** When a task needs structured planning before implementation
> **Agent:** `.github/agents/PrecursorPlan.agent.md`
> **Flow:** **Plan** -> `@PrecursorExecute` -> `@PrecursorCloseout`
> **Related skills:** `RECURSE_EXECUTE.md`, `RECURSE_CLOSEOUT.md`, `../RECURSOR/AGENT_PROVENANCE.md`

---

## Purpose

Create and manage plan trees inside the enterprise-safe `PRECURSOR` lane.

Two modes:
- **PLAN** -> decompose a task description into a tree of step specs
- **RECURSE** -> expand a `SPLIT`-rated step into its own sub-plan tree

Plans are created under `PLANS/{slug}/`.

This skill writes markdown artifacts only. It never edits project source code, config files, scripts, or anything outside the plan tree.

---

## Lane Contract

- Planning inside this repo is lane-fixed to `PRECURSOR`.
- Do not add cross-lane routing metadata here.
- `RECURSE_EXECUTE.md` and `RECURSE_CLOSEOUT.md` must record `Execution Lane: PRECURSOR` when work is actually performed in this lane.
- If a human wants work moved into another HQ lane, that handoff happens outside this planner.

---

## Invocation

| Mode | Argument format | Example |
|---|---|---|
| PLAN | `{task description}` | `@PrecursorPlan add retry logic to the backend` |
| PLAN (slug override) | `slug={name} {task description}` | `@PrecursorPlan slug=b360-retry add retry logic` |
| RECURSE | `recurse {path}/{n}_{step-name}/` | `@PrecursorPlan recurse PLANS/b360-retry/2_add-backoff/` |

Default mode if no prefix is recognized: **PLAN**.
If the argument starts with `recurse`: **RECURSE**.

---

## Slug Generation Rule

1. Take the first meaningful words from the task description.
2. Lowercase, hyphenate, and strip punctuation.
3. Example: `"add retry logic to backend"` -> `add-retry-backend`

If the user prefixes with `slug={name}`, use that value exactly.

---

## Path Resolution

PRECURSOR supports two plan-tree layouts. Both are first-class; EXECUTE and CLOSEOUT accept either path format.

| Layout | Path | When to use |
|---|---|---|
| **Day-level** (preferred when rituals are enabled) | `docs/week_N/{date}/PLANS/{slug}/` | Multi-day work; enables daily MORNING_COFFEE and EOD_RETRO rituals; keeps plans scoped to the day they were created |
| **Flat** (simple default) | `PLANS/{slug}/` | Single-session tasks; no daily ritual dependency; workspace has no `docs/week_N/` directory |

**Resolution rule for PLAN mode:**

1. If any `docs/week_N/` folder exists at workspace root:
   - Determine today's date in `MM_DD_YYYY` format
   - List `docs/` for `week_N/` folders
   - Find the `week_N/` that contains (or should contain) today's date directory
   - Target path: `docs/week_N/{date}/PLANS/{slug}/`
   - Create `PLANS/` under the day directory if it doesn't exist
2. Otherwise: target path is `PLANS/{slug}/` at workspace root.

For `RECURSE` mode, the path is supplied directly in the invocation — no resolution needed.

Existing flat-layout plans continue to work unchanged. Day-level and flat-layout plans can coexist in the same workspace; each plan's `Parent` header points to its own root.

---

## Plans Tree Structure

```text
PLANS/
`-- {slug}/
    |-- {slug}.md
    |-- {1}_{step-name}/
    |   |-- {1}_{step-name}.md
    |   |-- PROGRESS.md
    |   `-- CLOSEOUT.md
    |-- {2}_{step-name}/
    |   `-- {2}_{step-name}.md
    `-- {n}_{step-name}/
        |-- {n}_{step-name}.md
        |-- PROGRESS.md
        |-- CLOSEOUT.md
        |-- {1}_{sub-step}/
        |   `-- {1}_{sub-step}.md
        `-- {2}_{sub-step}/
            `-- {2}_{sub-step}.md
```

Naming rules:
- Root plan file: named identically to its parent directory (`{slug}.md`)
- Step spec file: named identically to its parent directory (`{n}_{step-name}.md`)
- Sub-step directories: direct children of the `SPLIT` step directory, with no intermediate sub-plan directory
- `PROGRESS.md` and `CLOSEOUT.md`: always these exact filenames

Anti-collision rule:
- `RECURSE` never creates an intermediate directory.
- Sub-step directories live directly inside the `SPLIT` step directory.
- The step spec itself is expanded in place with a `## Sub-plan` section.

---

## File Schemas

### `{slug}.md` (root plan file)

```markdown
# Plan: {slug}
> **Parent:** {path to parent root plan or macro-plan, if any} | none
> **Created:** {MM_DD_YYYY}
> **Status:** NOT STARTED | IN PROGRESS | COMPLETE | ABANDONED
> **Task:** {one-sentence task description}
> **Principal Intent:** {What success materially means — the human-legible "this is done when…"}
> **Greenlight:** YES — {date and approval context} | PENDING — requires human review
> **Impact Tier:** T0 | T1 | T2 | T3
> **Review Policy:** AUTO | DECOMP_REVIEW | STEP_GATE
> **Source Inputs:**
> - {upstream input — transcript, prior spec, review ticket, stakeholder ask, etc.}

**Originating description:**
{full natural language task as the user stated it}

---

## Steps

| # | Directory | Step | Recommendation | Depends on | Status | Update |
|---|-----------|------|----------------|------------|--------|--------|
| 1 | `{1}_{step-name}/` | {step title} | SINGLE-PASS \| SPLIT | — | NOT STARTED | — |

---

## Context

**What was read to inform this plan:**
- {file path} -> {why it was relevant}

**Key constraints carried in:**
- {any decisions or constraints that shaped the step breakdown}

---

## Decisions

1. {numbered decision -> rationale}
```

**Root plan contract fields:**

| Field | Required | Description |
|-------|----------|-------------|
| `Parent` | Yes | Path to parent root plan, or `none` for top-level plans |
| `Status` | Yes | Lifecycle state |
| `Task` | Yes | Concise one-line summary |
| `Principal Intent` | Yes | What success materially means — the human-legible "this is done when…" |
| `Greenlight` | Yes | `YES` with date and approval context, or `PENDING — requires human review` |
| `Impact Tier` | Yes | `T0` (low, reversible) through `T3` (critical, hard to reverse). Declarative — does not relax the human gate. |
| `Review Policy` | Yes | `AUTO` \| `DECOMP_REVIEW` \| `STEP_GATE`. Must be compatible with the declared Impact Tier. |
| `Source Inputs` | Yes | Upstream inputs that shaped this spec (transcripts, prior specs, review tickets, stakeholder asks) |

Plans generated in PLAN mode must include all of these fields. If the human has not yet greenlit the plan, set `Greenlight: PENDING — requires human review`.

**Impact Tier guidance:**

| Tier | Meaning | Typical review policy |
|------|---------|----------------------|
| T0 | Mechanical, reversible (file moves, doc edits, renames) | AUTO acceptable |
| T1 | Structured output with clear acceptance (scaffolding, template instantiation) | AUTO or DECOMP_REVIEW |
| T2 | Judgment-bearing (recommendations, assessments, quality verdicts) | DECOMP_REVIEW or STEP_GATE |
| T3 | Strategic, hard to reverse (shipped changes, external comms, contract-level decisions) | STEP_GATE required |

PRECURSOR is human-gated at every transition by design. Impact Tier and Review Policy are declarative metadata for auditors and reviewers; they do not relax the gate — they document its rationale.

**Compatibility with AUTO_COPILOT (experimental chained mode):**

The experimental `@PrecursorAuto` chained execution mode enforces additional constraints on the plan's governance header:

- `Greenlight` must be `YES`
- `Impact Tier` must be `T0`, `T1`, or `T2` (T3 hard-blocks)
- `Review Policy` must NOT be `STEP_GATE` (STEP_GATE requires between-step human review, which AUTO_COPILOT by design replaces with CI + Artifact Verification)

These constraints are declarative. The planner is not required to generate AUTO_COPILOT-compatible plans — but when planning work that will be chained, set Impact Tier appropriately and choose `AUTO` or `DECOMP_REVIEW` for Review Policy. See `SKILLS/AUTO_COPILOT.md` for the full precondition list.

### `{n}_{step-name}.md` (step spec)

```markdown
# SPEC: {Step title}
> **Parent:** [../{slug}.md](../{slug}.md)
> **Step:** {n} of {total}
> **Recommendation:** `SINGLE-PASS` | `SPLIT`
> **Status:** NOT STARTED | IN PROGRESS | COMPLETE
> **Depends on:** {step name(s), or "none"}

---

## What

{One paragraph: what this step does and why it belongs here.}

---

## Inputs

- `{file path}` -> {what it provides}

---

## Outputs / Artifacts

- **`{file path}`** -> {what it is}

---

## Acceptance Criteria

- [ ] {specific, verifiable condition}

---

## Reasoning

{2-4 sentences justifying SINGLE-PASS vs SPLIT. If SPLIT: name the sub-tasks and explain why single-pass is unsafe. If SINGLE-PASS: state why the scope is bounded and unambiguous.}

---

## Test Requirements

{Specify what tests this step must produce or update. Use the appropriate framework for the project (vitest, pytest, jest, go test, etc.). If the step is purely documentation/governance with no testable code, write `N/A — no testable code produced`.}

- **Framework:** {vitest | pytest | jest | go test | N/A}
- **Test scope:** {what behaviors or contracts the tests must cover}
- **Existing test files to update:** {paths, or "none — new test file(s) needed"}
```

**Test Requirements rules:**
- Every step that produces or modifies executable code (source files, API routes, domain logic, UI components, CLI tools, scripts) **must** include a `## Test Requirements` section with concrete test scope.
- Steps that produce only documentation, governance artifacts, plan files, or config with no runtime behavior may use `N/A — no testable code produced`.
- The planner does not write the tests — it specifies what the executor must test. Test specs should be specific enough that the executor knows which behaviors to cover, but not so prescriptive that they dictate test implementation.
- When a step modifies existing tested code, `Existing test files to update` must reference the relevant test files so the executor knows where to add or update assertions.

---

## Mode Behaviors

### PLAN

> **Hard guard - depth limit:**
> PLAN produces exactly two tiers: the root plan file (`{slug}.md`) and one spec file per step (`{n}_{step-name}/{n}_{step-name}.md`).
> It never creates anything inside a step directory beyond that spec file.
> No sub-step directories, no nested specs, no further decomposition.
> Steps that need more breakdown are rated `SPLIT`; the user explicitly invokes `RECURSE` later.

Read in parallel:
- `PROJECTS.md` if it exists
- Any source files the task description references directly

**Resolve:** today's plan directory per the Path Resolution section above. Referred to below as `{PLAN_ROOT}` — either `docs/week_N/{date}/PLANS/{slug}/` (day-level) or `PLANS/{slug}/` (flat).

Write:
- `{PLAN_ROOT}/{slug}.md` — root plan file
- `{PLAN_ROOT}/{n}_{step-name}/{n}_{step-name}.md` — one spec per step, nothing else inside the step directory

Key rules:
- Assign `SINGLE-PASS` or `SPLIT` to every step
- Include `Reasoning` in every step spec
- Include `Test Requirements` in every step spec (use `N/A — no testable code produced` when appropriate)
- Steps table must include the `Depends on` column
- Root plan must include all fields from the Root plan contract fields table (Principal Intent, Greenlight, Impact Tier, Review Policy, Source Inputs)
- Keep the plan lane-fixed to `PRECURSOR`
- After writing, display the steps table inline in chat and end with:
  > *"Plan ready. To implement: `@PrecursorExecute execute PLANS/{slug}/{n}_{step-name}/`"*

**Coherence-verification step generation rule:**

When a plan contains **two or more sibling steps**, always append a final `SINGLE-PASS` step whose sole purpose is to perform a coherence and verification pass over the entire plan level. This rule applies in both PLAN and RECURSE modes:

- **PLAN mode:** If the root plan has 2+ steps, the last step must be a coherence-verification step.
- **RECURSE mode:** If a SPLIT step decomposes into 2+ sub-steps, the last sub-step must be a coherence-verification step.
- **Single-step plans:** If there is exactly one implementation step, no coherence-verification step is required.

**Naming convention:** `{N}_coherence-verification-pass`, where `{N}` is the last step number. Example: a 5-step plan has `5_coherence-verification-pass/` as its final step. A SPLIT step with 3 sub-steps has `3_coherence-verification-pass/` as the final sub-step.

The coherence-verification step audits:
- stale assumptions carried across sibling steps
- missing back-propagation to the parent plan
- contradictions between step outputs
- incomplete status propagation in the steps table
- acceptance-criteria drift between spec and actual artifacts
- missing or fabricated provenance
- unresolved TODOs in produced artifacts
- mismatches between produced artifacts and the parent plan's declared `Principal Intent`

---

### RECURSE

Read:
- The target `SPLIT` step spec
- Codebase files listed in the step's `Inputs`
- Parent root plan file for context

Write in place:
- Append a `## Sub-plan` section to the target step spec
- Create one spec per sub-step as direct children of the `SPLIT` step directory

Use this appended section:

```markdown
---

## Sub-plan
> **Decomposed:** {MM_DD_YYYY}
> **Sub-plan Status:** NOT STARTED | IN PROGRESS | COMPLETE

### Sub-steps

| # | Directory | Step | Recommendation | Status | Update |
|---|-----------|------|----------------|--------|--------|
| 1 | `{1}_{sub-step}/` | {sub-step title} | SINGLE-PASS \| SPLIT | NOT STARTED | TBD |

### Context

**What was read to inform this decomposition:**
- {file path} -> {why it was relevant}

### Decisions

1. {numbered decision -> rationale}
```

Key rules:
- `RECURSE` appends to the existing spec; it never creates a separate sub-plan file
- Sub-step directories are direct children of the `SPLIT` step directory
- Sub-step specs point back to the expanded spec via `[../{n}_{step-name}.md](../{n}_{step-name}.md)`
- Include `Test Requirements` in every sub-step spec
- **Coherence-verification rule applies:** if 2+ sub-steps exist, append a final `{N}_coherence-verification-pass` sub-step (see PLAN mode Key rules above for the full audit checklist)
- After writing, display the sub-steps table inline in chat and end with:
  > *"Sub-plan ready. To implement: `@PrecursorExecute execute {path-to-step}/{m}_{sub-step}/`"*

---

### REFINE

`REFINE` is not a formal mode.

The human edits plan files directly and re-invokes `PLAN` or `RECURSE` if the structure needs to change.
The planner does not autonomously restructure plans.
