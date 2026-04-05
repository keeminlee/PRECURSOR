# SKILL: RECURSE_PLAN

> **Type:** Reusable task spec
> **Trigger:** When a task needs structured planning before implementation
> **Agent:** `.github/agents/PrecursorPlan.agent.md`
> **Flow:** **Plan** → `@PrecursorExecute` → `@PrecursorCloseout`
> **Related skills:** `RECURSE_EXECUTE.md`, `RECURSE_CLOSEOUT.md`

---

## Purpose

Create and manage recursive plan trees. Three primary modes:

- **PLAN** — decompose a task description into a tree of step specs under today's day-level directory
- **RECURSE** — expand a SPLIT-rated step into its own sub-plan tree
- **WORKFLOW** — instantiate a day-scoped plan from a reusable workflow template in `WORKFLOWS/`

New plans are created at `docs/week_N/{date}/PLANS/{slug}/` (day-level). Legacy plans at root `PLANS/` are still readable by EXECUTE and CLOSEOUT.

This skill produces `.md` files under the plan tree only. It never reads or writes project source code, config files, scripts, or anything outside the plan tree.

---

## Invocation

| Mode | Argument format | Example |
|---|---|---|
| PLAN | `{task description}` | `@PrecursorPlan add retry logic to the backend` |
| PLAN (slug override) | `slug={name} {task description}` | `@PrecursorPlan slug=b360-retry add retry logic` |
| RECURSE | `recurse {path}/{n}_{step-name}/` | `@PrecursorPlan recurse docs/week_2/04_02_2026/PLANS/b360-retry/2_add-backoff/` |

Default mode if no prefix is recognized: **PLAN**.
If the argument starts with `recurse`: **RECURSE**.

---

## Slug Generation Rule

1. Take the first ≤5 meaningful words from the task description
2. Lowercase, hyphenate, strip punctuation
3. Example: `"add retry logic to backend"` → `add-retry-backend`

If the user prefixes with `slug={name}`, use that value exactly.

---

## Path Resolution

Before writing any files in PLAN or WORKFLOW mode, resolve today's plan directory:

1. Determine today's date in `MM_DD_YYYY` format
2. List `docs/` for `week_N/` folders
3. Find the `week_N/` that contains (or should contain) today's date directory
4. Target path: `docs/week_N/{date}/PLANS/{slug}/`
5. Create `PLANS/` under the day directory if it doesn't exist

For RECURSE mode, the path is provided in the invocation — no resolution needed.

---

## Plans Tree Structure

```
docs/week_N/{date}/PLANS/
└── {slug}/
    ├── {slug}.md                    ← root plan file; named identically to directory
    ├── {1}_{step-name}/
    │   ├── {1}_{step-name}.md       ← step spec; named identically to directory
    │   ├── PROGRESS.md              ← written by EXECUTE before any code changes
    │   └── CLOSEOUT.md              ← written by CLOSEOUT after EXECUTE completes
    ├── {2}_{step-name}/
    │   ├── {2}_{step-name}.md
    │   └── ...
    └── {n}_{step-name}/             ← if SPLITted via RECURSE, sub-steps go here:
        ├── {n}_{step-name}.md       ← step spec (RECURSE appends ## Sub-plan section)
        ├── PROGRESS.md
        ├── CLOSEOUT.md
        ├── {1}_{sub-step}/
        │   └── {1}_{sub-step}.md
        ├── {2}_{sub-step}/
        │   └── {2}_{sub-step}.md
        └── ...
```

**Naming rules:**
- Root plan file: named identically to its parent directory (`{slug}.md`)
- Step spec file: named identically to its parent directory (`{n}_{step-name}.md`)
- Sub-step directories: direct children of the SPLIT step directory — **no** intermediate sub-plan directory
- PROGRESS.md and CLOSEOUT.md: always these exact names (not directory-matched)

> **ANTI-COLLISION RULE:** RECURSE never creates an intermediate directory. Sub-step directories live directly inside the SPLIT step's directory — same level as its spec, PROGRESS, and CLOSEOUT files. The step spec itself is expanded in-place with a `## Sub-plan` section; there is no separate sub-plan root file.

---

## File Schemas

### {slug}.md (root plan file)

```markdown
# Plan: {slug}
> **Parent:** {path to parent root plan or macro-plan, if exists}
> **Created:** {MM_DD_YYYY}
> **Status:** NOT STARTED | IN PROGRESS | COMPLETE | ABANDONED
> **Task:** {one-sentence task description}

**Originating description:**
{full natural language task as the user stated it}

---

## Steps

| # | Directory | Step | Recommendation | Status | Update |
|---|-----------|------|----------------|--------|--------|
| 1 | `{1}_{step-name}/` | {step title} | SINGLE-PASS \| SPLIT | NOT STARTED | — |

---

## Context

**What was read to inform this plan:**
- {file path} — {why it was relevant}

**Key constraints carried in:**
- {any decisions or constraints that shaped the step breakdown}

---

## Decisions

1. {numbered decision — rationale}
```

### {n}_{step-name}.md (step spec)

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

- `{file path}` — {what it provides}

---

## Outputs / Artifacts

- **`{file path}`** — {what it is}

---

## Acceptance Criteria

- [ ] {specific, verifiable condition}

---

## Reasoning

{2–3 sentences justifying SINGLE-PASS vs SPLIT. If SPLIT: name the sub-tasks and explain why
single-pass is unsafe. If SINGLE-PASS: state why the scope is bounded and unambiguous.}
```

---

## Mode Behaviors

### PLAN

> **HARD GUARD — depth limit:**
> PLAN produces exactly **two tiers**: the root plan file (`{slug}.md`) and one spec file per step (`{n}_{step-name}/{n}_{step-name}.md`). It never creates anything inside a step directory beyond that spec file. No sub-step directories, no nested specs, no further decomposition — even if the task feels large or a step clearly has sub-tasks. Steps that need further breakdown are rated `SPLIT`; the user explicitly calls RECURSE on them later.
>
> **If you catch yourself creating sub-step directories during PLAN mode — stop. That is RECURSE, not PLAN.**

**Read (in parallel):**
- `PROJECTS.md` — understand what projects and files exist
- Any source files the task description references directly

**Resolve:** today's plan directory per the Path Resolution section above.

**Write:**
- `docs/week_N/{date}/PLANS/{slug}/{slug}.md` — root plan file
- `docs/week_N/{date}/PLANS/{slug}/{n}_{step-name}/{n}_{step-name}.md` — one spec per step, nothing else inside the step directory

**Key rules:**
- Assign `SINGLE-PASS` or `SPLIT` to every step; never leave recommendation blank
- Include Reasoning in every step spec
- Steps table must include the Directory column
- After writing, display the steps table inline in chat as a confirmation summary, then end with:
  > *"Plan ready. To implement: `@PrecursorExecute execute docs/week_N/{date}/PLANS/{slug}/{n}_{step-name}/`"*

---

### RECURSE

**Read:**
- The target SPLIT step spec (path provided in invocation)
- Codebase files listed in the step's Inputs
- Parent root plan file for context

**Write (in-place expansion):**
- **Append** a `## Sub-plan` section to the target step spec. Do NOT create a separate sub-plan root file. The original sections (What, Inputs, Outputs, Criteria, Reasoning) stay untouched above. The appended section contains:

```markdown

---

## Sub-plan
> **Decomposed:** {MM_DD_YYYY}
> **Sub-plan Status:** NOT STARTED | IN PROGRESS | COMPLETE

### Sub-steps

| # | Directory | Step | Recommendation | Status | Update |
|---|-----------|------|----------------|--------|--------|
| 1 | `{1}_{sub-step}/` | {sub-step title} | SINGLE-PASS \| SPLIT | NOT STARTED | — |

### Context

**What was read to inform this decomposition:**
- {file path} — {why it was relevant}

### Decisions

1. {numbered decision — rationale}
```

- One spec per sub-step, as direct children of the SPLIT step directory

**Key rules:**
- RECURSE **appends** to the existing spec — it never creates a separate sub-plan file or intermediate directory
- Sub-step directories are direct children of the SPLIT step directory, alongside the spec and lifecycle files
- Sub-step specs' Parent pointer: `[../{n}_{step-name}.md](../{n}_{step-name}.md)` — the expanded spec
- After writing, display the sub-steps table and end with:
  > *"Sub-plan ready. To implement: `@PrecursorExecute execute {path-to-step}/{m}_{sub-step}/`"*

---

### REFINE (lightweight — human-driven)

REFINE is not a formal mode. The human edits plan files directly and re-invokes PLAN or RECURSE if the step table needs restructuring. The planner does not autonomously refine specs.
