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

Plans are written to `PLANS/{slug}/` at the workspace root.

For `RECURSE` mode, the path is supplied directly in the invocation.

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
> **Parent:** {path to parent root plan or macro-plan, if any}
> **Created:** {MM_DD_YYYY}
> **Status:** NOT STARTED | IN PROGRESS | COMPLETE | ABANDONED
> **Task:** {one-sentence task description}

**Originating description:**
{full natural language task as the user stated it}

---

## Steps

| # | Directory | Step | Recommendation | Status | Update |
|---|-----------|------|----------------|--------|--------|
| 1 | `{1}_{step-name}/` | {step title} | SINGLE-PASS \| SPLIT | NOT STARTED | TBD |

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
```

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

Write:
- `PLANS/{slug}/{slug}.md`
- `PLANS/{slug}/{n}_{step-name}/{n}_{step-name}.md`

Key rules:
- Assign `SINGLE-PASS` or `SPLIT` to every step
- Include `Reasoning` in every step spec
- Keep the plan lane-fixed to `PRECURSOR`
- After writing, display the steps table inline in chat and end with:
  > *"Plan ready. To implement: `@PrecursorExecute execute PLANS/{slug}/{n}_{step-name}/`"*

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
- After writing, display the sub-steps table inline in chat and end with:
  > *"Sub-plan ready. To implement: `@PrecursorExecute execute {path-to-step}/{m}_{sub-step}/`"*

---

### REFINE

`REFINE` is not a formal mode.

The human edits plan files directly and re-invokes `PLAN` or `RECURSE` if the structure needs to change.
The planner does not autonomously restructure plans.
