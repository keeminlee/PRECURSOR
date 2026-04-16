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
- Execution Lane: `PRECURSOR` | `UNKNOWN`
- Workflow Agent: `PrecursorCloseout`
- Transcript Source: `Codex` | `Copilot` | `ChatGPT` | `Unknown`
- Transcript Path: `{path}` | `PENDING transcript extraction`
- Session ID: `{id}` | `UNKNOWN`
- Ledger File: `.recursor/ledger/{YYYY-MM-DD}.jsonl` | `NOT RECORDED`
- Commit: `{sha}` | `NOT COMMITTED`

## Test Verification

{If the step spec has a `## Test Requirements` section that is not N/A, verify tests were written and pass.}

| Check | Result | Evidence |
|-------|--------|----------|
| Tests exist | {PASS/FAIL} | {list test file paths found, or "no test files produced"} |
| Tests run | {PASS/FAIL} | {command and output summary from PROGRESS.md or re-run} |
| Coverage scope | {PASS/FAIL} | {do tests cover what Test Requirements specified?} |

{If Test Requirements was N/A, write: "N/A — step produces no testable code."}

## Artifact Verification

{For each output artifact listed in the step spec, re-read the file from disk and verify both class conformance and intent alignment. Do NOT rely on PROGRESS.md claims or cached context — open and read the actual file.}

| Artifact | Class Check | Intent Check | Evidence |
|----------|-------------|--------------|----------|
| `{path}` | {Expected type} → {PASS/FAIL: what structural elements confirm the artifact is the type it claims to be} | {PASS/FAIL: does the content achieve what the step spec asked for} | {Cite specific content: heading names, schema elements, key sections found or missing} |

**Class conformance:** Confirm the artifact IS the type it claims to be. A spec file must carry the spec schema, a README must read like a README, a config file must be valid config, a workflow spec must have the workflow schema. Wrong-type content fails class check regardless of surface quality.

**Intent alignment:** Confirm the artifact achieves what the step spec's "What" section describes and what the acceptance criteria require — not merely that a file exists with content. Check whether the artifact would actually be usable for the purpose it was created.

## Quality Assessment

**Gate: {GREEN | YELLOW | RED | N/A}**
{One sentence justifying the gate. Must reference Artifact Verification results — a gate cannot be assigned without completed verification. See Quality Gate Definitions below.}

## Spec -> Progress Delta

{What changed from the original plan: scope changes, surprises, deferred items.
If none: "Implemented as specified."}

## Artifacts Produced

- `{path}` -> {description}

## UPDATE

> Step {n} complete -> {what was achieved, <=15 words} [{QUALITY_GATE}]
```

The `UPDATE` line is the canonical one-liner written back into the parent root plan's steps table under the Update column. The quality gate tag (for example `[GREEN]`) is appended so the parent plan summary shows quality at a glance.

---

## Quality Gate Definitions

| Gate | Meaning | Criteria |
|------|---------|----------|
| **GREEN** | Fully meets spec | All acceptance criteria met as written. Artifact Verification passes for all outputs: class conformance confirmed AND intent alignment confirmed. **Test Verification passes** (tests exist, run, and cover the specified scope) — or Test Requirements is N/A. No scope changes, no deferred items, no known issues. Output ready to build on. |
| **YELLOW** | Meets intent, minor gaps | Acceptance criteria met but with scope adjustments, non-blocking deferred items, or minor quality concerns. Test Verification may show partial coverage or minor gaps. Output is usable but may need follow-up. |
| **RED** | Incomplete or concerning | Significant acceptance criteria unmet, scope reduced substantially, or output quality raises concerns. Requires explicit follow-up step or re-execution. |
| **N/A** | Not applicable because blocked | Use only when Final Status is `BLOCKED`. |

**Assessment rules:**
- GREEN is the expectation for well-scoped SINGLE-PASS steps
- YELLOW is normal for complex steps or first-attempt implementations
- RED should trigger a follow-up action in the parent plan
- BLOCKED steps receive `Quality Gate: N/A`

**Artifact verification rules (non-negotiable for GREEN):**
- Before assigning any gate, re-read every file listed in PROGRESS.md "Files Created / Modified" from disk. Do not rely on PROGRESS.md descriptions, cached context, or the execution agent's self-report
- GREEN requires ALL Artifact Verification rows to show PASS for both class check and intent check
- **GREEN requires Test Verification to pass** — tests must exist, run successfully, and cover the scope specified in the step's Test Requirements. If Test Requirements is `N/A`, this check is skipped. If tests were required but not written, the gate cannot be GREEN.
- If PROGRESS.md contains a `## Test Results` section, verify the claimed results by re-running the test command. If the test command is unavailable or the environment is not set up, note this in the Evidence column rather than blindly trusting the claim.
- A file that exists but fails class check (wrong artifact type — e.g., README content in a workflow spec file) is at best YELLOW, more likely RED
- A file that exists but fails intent check (does not achieve what the step spec asked for) is at best YELLOW
- The Evidence column must cite specific content found in the artifact (heading names, schema elements, structural features), not just restate PROGRESS.md claims
- "Implemented as specified" is not sufficient for the Spec -> Progress Delta section on steps that produce structural artifacts — cite which structural elements were verified

---

## Mode Behavior: CLOSEOUT

**Read:**
- `PLANS/{slug}/{n}_{step-name}/{n}_{step-name}.md` — original spec
- `PLANS/{slug}/{n}_{step-name}/PROGRESS.md` — what was actually done
- `PLANS/{slug}/{slug}.md` — to locate the step row
- **All files listed in PROGRESS.md "Files Created / Modified"** — re-read from disk for Artifact Verification. This is mandatory. Do not skip this read even if you believe you already know the file contents.

**Write:**
1. `PLANS/{slug}/{n}_{step-name}/CLOSEOUT.md`
2. Append a `closeout` record to `.recursor/ledger/{YYYY-MM-DD}.jsonl` if the helper script exists
3. Propagate the `UPDATE` line into the parent plan row

**Preferred ledger command:**

```bash
node tools/record-agent-provenance.mjs \
  --phase closeout \
  --agent {codex|copilot|unknown} \
  --execution-lane {PRECURSOR|UNKNOWN} \
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
Execution-Lane: {PRECURSOR|UNKNOWN}
```

If git is unavailable, skip and note it in `CLOSEOUT.md`.

**After completing:**

> *"Closed out. {slug}.md step row updated and ready for human review."*
