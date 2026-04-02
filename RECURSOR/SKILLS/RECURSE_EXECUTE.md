# SKILL: RECURSE_EXECUTE

> **Type:** Reusable task spec
> **Trigger:** When a SINGLE-PASS-rated step is ready to implement
> **Agent:** `.github/agents/ExecuteRecurse.agent.md`
> **Flow:** `@PlanRecurse` → **Execute** → `@CloseoutRecurse`
> **Related skills:** `RECURSE_PLAN.md`, `RECURSE_CLOSEOUT.md`

---

## Purpose

Implement a SINGLE-PASS-rated step from an existing PLANS/ tree, writing a PROGRESS.md audit trail as work proceeds.

---

## Invocation

```
@ExecuteRecurse execute PLANS/{slug}/{n}_{step-name}/
```

Before doing anything, confirm the step spec exists at `PLANS/{slug}/{n}_{step-name}/{n}_{step-name}.md`. If not found, stop and reply:
> *"No step spec found at that path. Run `@PlanRecurse {task description}` first."*

---

## Tree Reference

Files you will read and write live here:

```
PLANS/{slug}/
├── {slug}.md                        ← root plan file (context + constraints)
└── {n}_{step-name}/
    ├── {n}_{step-name}.md           ← step spec (your instructions)
    ├── PROGRESS.md                  ← you write this FIRST, update throughout
    └── CLOSEOUT.md                  ← written later by @CloseoutRecurse
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

## Log

- [x] {completed action}
- [ ] {pending action}

## Files Created / Modified

- `{path}` — {what changed}

## Blockers

{None. | Description of blocker and what is needed to unblock.}
```

---

## Mode Behavior: EXECUTE

**Read (before writing anything):**
- `PLANS/{slug}/{n}_{step-name}/{n}_{step-name}.md` — step spec
- All files listed in the step's Inputs section
- `PLANS/{slug}/{slug}.md` — root plan for context and constraints

**Write:**
1. `PLANS/{slug}/{n}_{step-name}/PROGRESS.md` — **first action, no exceptions**
2. All files listed in the step's Outputs / Artifacts section
3. PROGRESS.md — updated as each acceptance criterion is completed

**Key rules:**
- **HARD GUARD:** Read the step's `Recommendation` field first.
  - If `SPLIT`: refuse. Respond:
    > *"This step is rated SPLIT. Use `@PlanRecurse recurse PLANS/{slug}/{n}_{step-name}/` to break it down first, or explicitly change the recommendation to SINGLE-PASS with a justification."*
  - If `SINGLE-PASS`: proceed.
- Work through the Acceptance Criteria checklist item by item
- Mark each `[x]` in PROGRESS.md as verified — do not batch-mark at the end
- If blocked at any point: set PROGRESS.md Status to `BLOCKED`, describe the blocker, stop — do not continue past a blocker

**After completing:**
> *"Step complete. PROGRESS.md written. To close out: `@CloseoutRecurse closeout PLANS/{slug}/{n}_{step-name}/`"*
