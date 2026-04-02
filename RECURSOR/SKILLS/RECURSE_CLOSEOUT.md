# SKILL: RECURSE_CLOSEOUT

> **Type:** Reusable task spec
> **Trigger:** After ExecuteRecurse completes a step
> **Agent:** `.github/agents/CloseoutRecurse.agent.md`
> **Flow:** `@PlanRecurse` → `@ExecuteRecurse` → **Closeout**
> **Related skills:** `RECURSE_PLAN.md`, `RECURSE_EXECUTE.md`

---

## Purpose

Write a CLOSEOUT.md that captures final state and delta from spec, then propagate the UPDATE line back into the parent plan's steps table.

---

## Invocation

```
@CloseoutRecurse closeout PLANS/{slug}/{n}_{step-name}/
```

---

## Tree Reference

```
PLANS/{slug}/
├── {slug}.md                        ← update the step row here
└── {n}_{step-name}/
    ├── {n}_{step-name}.md           ← original spec (read for delta)
    ├── PROGRESS.md                  ← source of truth for what was done
    └── CLOSEOUT.md                  ← you write this
```

---

## File Schema: CLOSEOUT.md

```markdown
# CLOSEOUT: {n}_{step-name}
> **Parent:** [{n}_{step-name}.md]({n}_{step-name}.md)
> **Final Status:** COMPLETE | PARTIAL | BLOCKED
> **Closed:** {MM_DD_YYYY}

---

## Final State

{One paragraph: what exists now that didn't before, and what works.}

## Spec → Progress Delta

{What changed from the original plan: scope changes, surprises, deferred items.
If none: "Implemented as specified."}

## Artifacts Produced

- `{path}` — {description}

## UPDATE

> Step {n} complete — {what was achieved, ≤15 words}
```

The UPDATE line is the canonical one-liner written back into the parent root plan's steps table under the Update column.

---

## Mode Behavior: CLOSEOUT

**Read:**
- `PLANS/{slug}/{n}_{step-name}/{n}_{step-name}.md` — original spec
- `PLANS/{slug}/{n}_{step-name}/PROGRESS.md` — what was actually done
- `PLANS/{slug}/{slug}.md` — to locate the step row

**Write:**
1. `PLANS/{slug}/{n}_{step-name}/CLOSEOUT.md`
2. **Propagate UPDATE** — find and update the step's row in the parent plan:
   - **If this is a top-level step:** the parent plan is `PLANS/{slug}/{slug}.md`. Find the row in the `## Steps` table.
   - **If this is a sub-step of a SPLIT step:** the parent is the expanded step spec (the file in the sub-step's `Parent` pointer, e.g. `../{n}_{step-name}.md`). Find the row in the `## Sub-plan > Sub-steps` table.
   - In either case: find the row where `#` equals the step number and `Directory` matches
   - Replace the `Status` cell with the Final Status (COMPLETE, PARTIAL, or BLOCKED)
   - Replace the `Update` cell with the UPDATE one-liner
   - **Do not touch any other row or any other section of the file**

**Key rules:**
- Derive the UPDATE line from PROGRESS.md's final state; keep it ≤15 words
- Final Status mirrors PROGRESS.md Status — `COMPLETE`, `PARTIAL`, or `BLOCKED`; the parent plan step row status matches
- If PROGRESS.md does not exist or Status is still `IN PROGRESS`, stop and reply:
  > *"PROGRESS.md is not complete. Finish the step with `@ExecuteRecurse execute PLANS/{slug}/{n}_{step-name}/` first."*

**After completing:**
> *"Closed out. {slug}.md step row updated. Full plan status: [paste current Steps table]"*
