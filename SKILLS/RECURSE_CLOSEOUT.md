# SKILL: RECURSE_CLOSEOUT

> **Type:** Reusable task spec
> **Trigger:** After PrecursorExecute completes a step
> **Agent:** `.github/agents/PrecursorCloseout.agent.md`
> **Flow:** `@PrecursorPlan` → `@PrecursorExecute` → **Closeout**
> **Related skills:** `RECURSE_PLAN.md`, `RECURSE_EXECUTE.md`

---

## Purpose

Write a CLOSEOUT.md that captures final state and delta from spec, then propagate the UPDATE line back into the parent plan's steps table.

---

## Invocation

```
@PrecursorCloseout closeout PLANS/{slug}/{n}_{step-name}/
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
> **Quality Gate:** GREEN | YELLOW | RED
> **Closed:** {MM_DD_YYYY}

---

## Final State

{One paragraph: what exists now that didn't before, and what works.}

## Quality Assessment

**Gate: {GREEN | YELLOW | RED}**
{One sentence justifying the gate. See Quality Gate Definitions below.}

## Spec → Progress Delta

{What changed from the original plan: scope changes, surprises, deferred items.
If none: "Implemented as specified."}

## Artifacts Produced

- `{path}` — {description}

## UPDATE

> Step {n} complete — {what was achieved, ≤15 words} [{QUALITY_GATE}]
```

The UPDATE line is the canonical one-liner written back into the parent root plan's steps table under the Update column. The quality gate tag (e.g. `[GREEN]`) is appended so the parent plan summary shows quality at a glance.

---

## Quality Gate Definitions

| Gate | Meaning | Criteria |
|------|---------|----------|
| **GREEN** | Fully meets spec | All acceptance criteria met as written. No scope changes, no deferred items, no known issues. Output ready to build on. |
| **YELLOW** | Meets intent, minor gaps | Acceptance criteria met but with scope adjustments, non-blocking deferred items, or minor quality concerns. Output is usable but may need follow-up. |
| **RED** | Incomplete or concerning | Significant acceptance criteria unmet, scope reduced substantially, or output quality raises concerns. Requires explicit follow-up step or re-execution. |

**Assessment rules:**
- GREEN is the expectation for well-scoped SINGLE-PASS steps
- YELLOW is normal for complex steps or first-attempt implementations
- RED should trigger a follow-up action in the parent plan (add a remediation step or re-execute)
- BLOCKED steps do not receive a quality gate — they have a Final Status of BLOCKED instead

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
  > *"PROGRESS.md is not complete. Finish the step with `@PrecursorExecute execute PLANS/{slug}/{n}_{step-name}/` first."*

**Git commit:**
After writing CLOSEOUT.md and propagating the UPDATE, commit the changes:
1. `git add -A` from the workspace root
2. `git commit -m "closeout: {slug} step {n} — {UPDATE one-liner}"`
3. Confirm with `git log --oneline -1`

If the workspace has no `.git/` or git is unavailable, skip and note it.

**After completing:**
> *"Closed out and committed. {slug}.md step row updated. Full plan status: [paste current Steps table]"*
