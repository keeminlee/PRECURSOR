# SKILL: RECURSE_CLOSEOUT

> **Type:** Reusable task spec
> **Trigger:** After PrecursorExecute completes a step
> **Agent:** `.github/agents/PrecursorCloseout.agent.md`
> **Flow:** `@PrecursorPlan` -> `@PrecursorExecute` -> **Closeout**
> **Related skills:** `RECURSE_PLAN.md`, `RECURSE_EXECUTE.md`, `../RECURSOR/AGENT_PROVENANCE.md`

---

## Purpose

Write a `CLOSEOUT.md` that captures final state and delta from spec, then propagate the `UPDATE` line back into the parent plan's steps table.

---

## Invocation

```text
@PrecursorCloseout closeout PLANS/{slug}/{n}_{step-name}/
```

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

## File Schema: CLOSEOUT.md

```markdown
# CLOSEOUT: {n}_{step-name}
> **Parent:** [{n}_{step-name}.md]({n}_{step-name}.md)
> **Final Status:** COMPLETE | PARTIAL | BLOCKED
> **Quality Gate:** GREEN | YELLOW | RED | N/A
> **Closed:** {MM_DD_YYYY}

---

## Final State

{One paragraph: what exists now that did not before, and what works.}

## Provenance

- Agent Platform: `codex` | `copilot` | `unknown`
- Workflow Agent: `PrecursorCloseout`
- Transcript Source: `Codex` | `Copilot` | `ChatGPT` | `Unknown`
- Transcript Path: `{path}` | `PENDING transcript extraction`
- Session ID: `{id}` | `UNKNOWN`
- Ledger File: `.recursor/ledger/{YYYY-MM-DD}.jsonl` | `NOT RECORDED`
- Commit: `{sha}` | `NOT COMMITTED`

## Quality Assessment

**Gate: {GREEN | YELLOW | RED | N/A}**
{One sentence justifying the gate.}

## Spec -> Progress Delta

{What changed from the original plan: scope changes, surprises, deferred items.
If none: "Implemented as specified."}

## Artifacts Produced

- `{path}` -> {description}

## UPDATE

> Step {n} complete -> {what was achieved, <=15 words} [{QUALITY_GATE}]
```

---

## Mode Behavior: CLOSEOUT

**Read:**
- `PLANS/{slug}/{n}_{step-name}/{n}_{step-name}.md`
- `PLANS/{slug}/{n}_{step-name}/PROGRESS.md`
- `PLANS/{slug}/{slug}.md`

**Write:**
1. `PLANS/{slug}/{n}_{step-name}/CLOSEOUT.md`
2. Append a `closeout` record to `.recursor/ledger/{YYYY-MM-DD}.jsonl` if the helper script exists
3. Propagate the `UPDATE` line into the parent plan row

**Preferred ledger command:**

```bash
node tools/record-agent-provenance.mjs \
  --phase closeout \
  --agent {codex|copilot|unknown} \
  --workflow-agent PrecursorCloseout \
  --step-path "PLANS/{slug}/{n}_{step-name}/" \
  --status "{COMPLETE|PARTIAL|BLOCKED}" \
  --quality-gate "{GREEN|YELLOW|RED|N/A}" \
  --transcript-source {Codex|Copilot|ChatGPT|Unknown} \
  --transcript-path "{path-or-PENDING}" \
  --session-id "{id-or-UNKNOWN}" \
  --commit "{sha-or-empty}"
```

If the helper script does not exist, still fill the provenance block in `CLOSEOUT.md`.

**Key rules:**
- Derive the `UPDATE` line from `PROGRESS.md`'s final state; keep it <=15 words
- Final Status mirrors `PROGRESS.md` Status
- If `PROGRESS.md` does not exist or Status is still `IN PROGRESS`, stop and reply:
  > *"PROGRESS.md is not complete. Finish the step with `@PrecursorExecute execute PLANS/{slug}/{n}_{step-name}/` first."*
- `CLOSEOUT.md` provenance must match `PROGRESS.md` provenance unless you explicitly explain the drift

**Git commit:**
If PRECURSOR is operating in a git-backed workspace and a commit is created after human review, include these provenance trailers whenever possible:

```text
Agent: {codex|copilot|unknown}
Workflow-Agent: PrecursorCloseout
Transcript-Source: {Codex|Copilot|ChatGPT|Unknown}
Transcript: {path-or-PENDING}
Session-ID: {id-or-UNKNOWN}
```

If git is unavailable, skip and note it in `CLOSEOUT.md`.

**After completing:**

> *"Closed out. {slug}.md step row updated and ready for human review."*
