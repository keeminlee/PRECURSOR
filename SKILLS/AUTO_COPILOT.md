# SKILL: AUTO_COPILOT (experimental)

> **Type:** Reusable task spec — **EXPERIMENTAL**
> **Trigger:** When a fully-decomposed plan is ready for chained execution on an isolation branch
> **Agent:** `.github/agents/PrecursorAuto.agent.md`
> **Invocation:** `@PrecursorAuto run {plan-path}`

---

## Status: EXPERIMENTAL

AUTO_COPILOT is the lightweight, chained counterpart to PRECURSOR's human-gated default loop. It exists to prototype features on dedicated branches where **CI/QA and Artifact Verification serve as the gates between steps** — replacing the between-step human review, **not** the final review.

**It does not replace the Plan → Execute → Closeout loop.** It composes the same three skills into a chain. The human still gates at three critical points:

1. **Before invocation** — the plan must be greenlit and decomposed
2. **At any halt condition** — failures surface to the human immediately
3. **At merge** — AUTO_COPILOT never merges. The human reviews the completed plan tree and merges the branch themselves.

If these three gates do not feel sufficient for the work at hand, use the default human-gated loop instead (`@PrecursorPlan` → `@PrecursorExecute` → `@PrecursorCloseout`, one step at a time).

---

## Purpose

Chain `RECURSE_EXECUTE` and `RECURSE_CLOSEOUT` over every step of a plan, in order, halting on any failure. Produces a complete plan tree with PROGRESS.md, CLOSEOUT.md, and artifacts for every step, plus a single chat-level run summary for human review.

---

## Preconditions (ALL must hold — refuse otherwise)

Before running the chain, verify each of the following. If any check fails, output the specific failure reason and refuse to start.

| # | Check | Failure message |
|---|-------|----------------|
| 1 | Current git branch is NOT `main` or `master` | "AUTO_COPILOT refuses to run on `main`/`master`. Create a feature branch and retry." |
| 2 | Working tree is clean (no uncommitted changes) | "Working tree has uncommitted changes. Commit or stash before running AUTO_COPILOT." |
| 3 | Plan path resolves to an existing root plan file (`{slug}.md`) | "No plan found at `{path}`. Run `@PrecursorPlan` first." |
| 4 | Root plan `Greenlight` field is `YES` | "Plan `Greenlight` is `PENDING`. Human review and greenlight required before AUTO_COPILOT can run." |
| 5 | Root plan `Impact Tier` is `T0`, `T1`, or `T2` | "Plan `Impact Tier` is `T3`. T3 work requires STEP_GATE review policy and cannot be auto-executed." |
| 6 | Every step in the Steps table is rated `SINGLE-PASS` | "Step {n} is rated `SPLIT`. Decompose with `@PrecursorPlan recurse` before AUTO_COPILOT can run." |
| 7 | Every step with non-N/A Test Requirements has a specified Framework | "Step {n} has `Test Requirements` without a Framework. Amend the spec before AUTO_COPILOT can run." |
| 8 | A CI configuration exists (any of: `.github/workflows/*.yml`, `.gitlab-ci.yml`, `azure-pipelines.yml`, `.circleci/config.yml`) | "No CI configuration found. AUTO_COPILOT requires a CI gate on the branch. Add a CI config or use the default human-gated loop." |
| 9 | Root plan `Review Policy` is NOT `STEP_GATE` | "Plan `Review Policy` is `STEP_GATE` — the human explicitly requested between-step review. AUTO_COPILOT bypasses between-step review and refuses STEP_GATE plans by design. Use the default human-gated loop, or change the Review Policy (and re-greenlight) if chained execution is actually appropriate." |

**Note on precondition 8:** AUTO_COPILOT does not invoke CI. It verifies CI *exists* on the branch because the human's merge review is expected to wait for CI results. CI is the ambient gate that makes chained execution acceptable.

---

## Hard Halt Conditions (during execution)

Stop the chain immediately if any of these occur. Emit the halt reason and the path of the step that failed.

| Condition | Halt message |
|-----------|--------------|
| Step Execute fails to write `PROGRESS.md` | "Execute did not produce PROGRESS.md at step {n}. Halting." |
| Step Execute sets `PROGRESS.md` Status to `BLOCKED` | "Step {n} BLOCKED: {blocker summary}. Halting." |
| Test Results show any FAIL | "Tests failed at step {n}. Halting." |
| Step Closeout Quality Gate is `YELLOW`, `RED`, or `N/A` (when step was not BLOCKED) | "Step {n} gate is {gate}. AUTO_COPILOT requires GREEN to continue. Halting." |
| Artifact Verification has any FAIL row | "Artifact Verification failed at step {n}: {artifact path}. Halting." |
| Any step with `Impact Tier: T3` encountered mid-chain (sub-step rated T3) | "Step {n} is T3-equivalent scope. Halting for human review." |

**On halt:** the plan tree is left in partial state. PROGRESS.md and any written CLOSEOUT.md files are preserved. The human reviews the plan tree, fixes or overrides, and can resume with `@PrecursorExecute` / `@PrecursorCloseout` for the failed step manually — then optionally re-invoke `@PrecursorAuto run` on the remaining steps.

---

## Invocation

```text
@PrecursorAuto run {plan-path}
```

`{plan-path}` is the directory containing `{slug}.md`, either:
- `docs/week_N/{date}/PLANS/{slug}/` (day-level layout)
- `PLANS/{slug}/` (flat layout)

---

## Mode Behavior: RUN

**Read:**
- Current git branch (`git branch --show-current`)
- Current git status (`git status --short`)
- Root plan file: `{plan-path}/{slug}.md`
- Each step spec: `{plan-path}/{n}_{step-name}/{n}_{step-name}.md`
- CI config existence at the paths in precondition 8

**Validate:** every check in Preconditions above. If any fails, emit the failure message and stop — do not write anything.

**Execute the chain:**

For each step `{n}` in the Steps table, in order:

1. **Skip-if-complete:** if `{plan-path}/{n}_{step-name}/CLOSEOUT.md` already exists with `Final Status: COMPLETE` and `Quality Gate: GREEN`, log "Step {n} already closed GREEN — skipping" and continue.
2. **Invoke Execute:** run the full `RECURSE_EXECUTE` skill for `{plan-path}/{n}_{step-name}/`. This writes `PROGRESS.md` and all step outputs including tests.
3. **Check hard halts on PROGRESS.md:** if Status is `BLOCKED` or Test Results show FAIL, halt.
4. **Invoke Closeout:** run the full `RECURSE_CLOSEOUT` skill for `{plan-path}/{n}_{step-name}/`. This writes `CLOSEOUT.md` with Artifact Verification and Test Verification, and propagates the UPDATE line to the parent plan.
5. **Check hard halts on CLOSEOUT.md:** if Quality Gate is not GREEN, or any Artifact Verification row is FAIL, halt.
6. **Continue to step `{n+1}`.**

**Do not parallelize steps.** AUTO_COPILOT is strictly sequential — later steps may depend on earlier step outputs.

**Do not skip the coherence-verification step.** If the plan has a `{N}_coherence-verification-pass` final step, it is executed last like any other step. Its failure halts the chain like any other step.

**Never invoke `git commit`, `git merge`, `git push`, or any remote git operation.** The chain writes artifacts to the working tree only. The human commits and merges.

---

## Run Summary (output at chain completion or halt)

After the chain completes or halts, emit a single chat-level summary:

```markdown
# AUTO_COPILOT Run Summary: {slug}

**Status:** COMPLETE (all steps GREEN) | HALTED at step {n}
**Branch:** `{branch}`
**Plan:** `{plan-path}/{slug}.md`
**Duration:** {elapsed, approximate}

## Steps

| # | Step | Gate | Artifacts | Tests |
|---|------|------|-----------|-------|
| 1 | {title} | GREEN | {count} verified | {PASS/N/A} |
| … | … | … | … | … |

## Halt Reason (if halted)

{Halt message from the Hard Halt Conditions table, with specific step path.}

## Artifacts Produced

- {path} — {description}

## Next Action for Human

{If COMPLETE:} Review the plan tree, verify CI passes on this branch, then merge or open a PR.
{If HALTED:} Review step {n} artifacts and PROGRESS.md. Fix the issue manually, then either re-run the chain on remaining steps or downgrade to manual execution for this step.
```

Then output the review gate:

```
---
⏸ AWAITING YOUR REVIEW
- [ ] Review the run summary and plan tree
- [ ] Verify CI status on this branch
- [ ] If COMPLETE: commit, push, open PR (or merge per your team's policy)
- [ ] If HALTED: address the halt condition, resume manually or re-invoke @PrecursorAuto
---
```

---

## What AUTO_COPILOT Is Not

- **Not autonomous.** It is chained. The human gates before invocation (Greenlight), at any halt, and at merge.
- **Not a replacement for the manual loop.** Use the default `@PrecursorPlan` → `@PrecursorExecute` → `@PrecursorCloseout` flow for any work that does not meet all eight preconditions.
- **Not a CI runner.** It verifies CI *exists* on the branch because it relies on CI as the ambient pre-merge gate. It does not itself run CI.
- **Not a merger.** It never touches `main`/`master`, never commits, never pushes, never merges. The plan tree is the only artifact it produces.
- **Not a way to skip Artifact Verification.** Every step's Closeout still performs the full mandatory re-read and Evidence table. AUTO_COPILOT halts on the first verification FAIL.

---

## Enterprise Framing

AUTO_COPILOT's safety story rests on four layers, each visible and auditable on the branch:

1. **Branch isolation** — the chain cannot touch protected branches
2. **Plan greenlight** — a human explicitly authorized this plan before chained execution
3. **Per-step Artifact Verification** — every closeout independently re-reads artifacts from disk and cites evidence; no gate is self-approved
4. **Ambient CI** — a CI configuration is required to exist on the branch, so the human's merge review happens against verified build/test results

These four layers combined produce a plan-tree artifact the human reviews once at merge time. The review surface is smaller than reviewing each step individually, but the governance surface is strictly larger (every step has PROGRESS.md + CLOSEOUT.md with Artifact Verification — a manual reviewer rarely produces that much evidence per step).

---

## Completion Criteria

- [ ] All preconditions verified before any write
- [ ] Chain executed strictly sequentially
- [ ] Every step has PROGRESS.md and CLOSEOUT.md (or the chain halted and the halt reason is specific)
- [ ] Run summary emitted to chat
- [ ] Review gate delivered
- [ ] No git commit, merge, or push performed by the agent
