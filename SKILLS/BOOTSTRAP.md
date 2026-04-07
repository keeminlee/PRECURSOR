# SKILL: BOOTSTRAP

> **Type:** Reusable task spec
> **Trigger:** First-time setup; usually run automatically by `@PrecursorStart`
> **Invocation:** "Run BOOTSTRAP"

---

## Purpose

Orient a new user, verify that the PRECURSOR lane is installed correctly, help them register projects, and leave the workspace ready for governed work.

If you cloned the repo, the core PRECURSOR files should already exist. This skill focuses on verifying the lane and getting the user's projects registered.

---

## Lane Contract

- PRECURSOR is the enterprise-safe, human-gated lane.
- The workflow remains `Plan -> Execute -> Closeout`.
- Every phase stops for human review before the next phase proceeds.
- Execute and closeout phases should align with `../RECURSOR/AGENT_PROVENANCE.md` when that shared provenance contract is available.

---

## Phase A - Welcome

Explain what PRECURSOR provides:

> PRECURSOR gives you a structured `Plan -> Execute -> Closeout` workflow for GitHub Copilot inside the enterprise-safe human-gated lane.
>
> This setup verifies the lane and registers the projects you want PRECURSOR to understand.

---

## Phase B - Verify Installation

Check that the core structure is present:

- [ ] `SKILLS/` exists and contains `RECURSE_PLAN.md`, `RECURSE_EXECUTE.md`, and `RECURSE_CLOSEOUT.md`
- [ ] `.github/agents/` exists and contains `PrecursorPlan.agent.md`, `PrecursorExecute.agent.md`, and `PrecursorCloseout.agent.md`
- [ ] `README.md`, `START_HERE.md`, and `MANIFEST.md` exist
- [ ] `../RECURSOR/AGENT_PROVENANCE.md` exists if this lane is installed inside Starstory HQ

If anything is missing, flag it clearly to the user. If everything is present, confirm and continue.

---

## Phase C - Add Projects

Explain the workspace layout:

> Place your project repositories at the root level of this directory, alongside `SKILLS/`, `README.md`, and `.github/agents/`.
> Each project should be its own folder, ideally a cloned git repo.

Example layout:

```text
PRECURSOR/
|-- SKILLS/
|-- .github/agents/
|-- README.md
|-- my-web-app/
|-- api-service/
`-- PLANS/
```

Ask whether the user already has project folders here or wants to add them now.

If they skip this step, note that `PROJECTS.md` can be created later by running `CONFIG_PROJECTS`.

---

## Phase D - Build the Project Registry

Check whether `PROJECTS.md` exists at the workspace root.

- If it does not exist: read `SKILLS/CONFIG_PROJECTS.md` and execute it fully.
- If it already exists: read it, confirm it still looks current, and tell the user what was found.

---

## Phase E - Ready

Summarize:

1. PRECURSOR installation status
2. Projects registered, or `none yet`
3. Recommended next actions:
   - Try the demo with [TOY_TASK.md](../demo/TOY_TASK.md)
   - Start real work with `@PrecursorPlan`
   - Read [START_HERE.md](../START_HERE.md) for the full guided flow

---

## Completion Criteria

- [ ] Core PRECURSOR files verified
- [ ] User informed about workspace project placement
- [ ] `PROJECTS.md` created or intentionally deferred
- [ ] User has clear next steps
