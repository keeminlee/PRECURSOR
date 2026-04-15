# SKILL: RECURSE_EXECUTE

> **Type:** Reusable task spec
> **Trigger:** When a SINGLE-PASS-rated step is ready to implement
> **Agent:** `.github/agents/PrecursorExecute.agent.md`
> **Flow:** `@PrecursorPlan` -> **Execute** -> `@PrecursorCloseout`
> **Related skills:** `RECURSE_PLAN.md`, `RECURSE_CLOSEOUT.md`, `../RECURSOR/AGENT_PROVENANCE.md`

---

## Purpose

Implement a SINGLE-PASS-rated step from an existing `PLANS/` tree, writing a `PROGRESS.md` audit trail as work proceeds.

---

## Invocation

```text
@PrecursorExecute execute PLANS/{slug}/{n}_{step-name}/
```

Before doing anything, confirm the step spec exists at `PLANS/{slug}/{n}_{step-name}/{n}_{step-name}.md`. If not found, stop and reply:

> *"No step spec found at that path. Run `@PrecursorPlan {task description}` first."*

---

## Tree Reference

```text
PLANS/{slug}/
|-- {slug}.md
`-- {n}_{step-name}/
    |-- {n}_{step-name}.md
    |-- PROGRESS.md
    `-- CLOSEOUT.md
```

---

## File Schema: PROGRESS.md

Written **before touching any code or other files**. Updated as each criterion is met.

```markdown
# PROGRESS: {n}_{step-name}
> **Parent:** [{n}_{step-name}.md]({n}_{step-name}.md)
> **Status:** IN PROGRESS | COMPLETE | PARTIAL | BLOCKED
> **Started:** {MM_DD_YYYY}

---

## Provenance

- Agent Platform: `codex` | `copilot` | `unknown`
- Execution Lane: `PRECURSOR` | `UNKNOWN`
- Workflow Agent: `PrecursorExecute`
- Transcript Source: `Codex` | `Copilot` | `ChatGPT` | `Unknown`
- Transcript Path: `{path}` | `PENDING transcript extraction`
- Session ID: `{id}` | `UNKNOWN`
- Ledger File: `.recursor/ledger/{YYYY-MM-DD}.jsonl` | `NOT RECORDED`

## Log

- [x] {completed action}
- [ ] {pending action}

## Files Created / Modified

- `{path}` -> {what changed}

## Test Results

- **Command:** {exact command run, or "N/A — no testable code produced"}
- **Result:** {PASS — N tests passed | FAIL — N passed, M failed | N/A}
- **New/modified test files:** {list of test file paths, or "none"}

## Blockers

{None. | Description of blocker and what is needed to unblock.}
```

---

## Mode Behavior: EXECUTE

**Read (before writing anything):**
- `PLANS/{slug}/{n}_{step-name}/{n}_{step-name}.md`
- All files listed in the step's Inputs section
- `PLANS/{slug}/{slug}.md`

**Write:**
1. `PLANS/{slug}/{n}_{step-name}/PROGRESS.md` - **first action, no exceptions**
2. If available, append a `start` record to `.recursor/ledger/{YYYY-MM-DD}.jsonl`
3. All files listed in the step's Outputs / Artifacts section
4. `PROGRESS.md` updates as each acceptance criterion is completed

**Preferred ledger command:**

```bash
node tools/record-agent-provenance.mjs \
  --phase start \
  --agent {codex|copilot|unknown} \
  --execution-lane {PRECURSOR|UNKNOWN} \
  --workflow-agent PrecursorExecute \
  --step-path "PLANS/{slug}/{n}_{step-name}/" \
  --status "IN PROGRESS" \
  --transcript-source {Codex|Copilot|ChatGPT|Unknown} \
  --transcript-path "{path-or-PENDING}" \
  --session-id "{id-or-UNKNOWN}"
```

If the helper script does not exist, still fill the provenance block in `PROGRESS.md`.

**Key rules:**
- **TEST MANDATE:** If the step spec contains a `## Test Requirements` section that is not `N/A`, you **must** write or update tests as part of execution. Tests are not optional follow-up work — they are part of the step's deliverables. Write tests alongside or immediately after the implementation code, before marking the step complete. Run the test suite (`npm test`, `npx vitest run`, `pytest`, or the project's equivalent) and record the result in `PROGRESS.md` under the `## Test Results` section. If tests fail, fix them before marking the step complete. If a test failure reveals a genuine bug in the implementation, fix the implementation. If a test failure is due to a flawed test, fix the test and document the correction.
- Read the step's `Recommendation` field first
  - If `SPLIT`: refuse and redirect to `@PrecursorPlan recurse`
  - If `SINGLE-PASS`: proceed
- Work through acceptance criteria item by item
- Mark each `[x]` in `PROGRESS.md` as verified; do not batch-mark at the end
- If blocked: set `PROGRESS.md` Status to `BLOCKED`, describe the blocker, stop
- Unknown provenance values are allowed; fabricated ones are not

**After completing:**

> *"Step complete. PROGRESS.md written. To close out: `@PrecursorCloseout closeout PLANS/{slug}/{n}_{step-name}/`"*
