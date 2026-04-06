# SKILL: BOOTSTRAP

> **Type:** Reusable task spec
> **Trigger:** First-time setup — run automatically by @PrecursorStart on first use
> **Invocation:** "Run BOOTSTRAP"

---

## Purpose

Orient a new user, help them add their projects to the workspace, and build the project registry so Precursor knows what it's working with.

If you cloned the repo, all Precursor files are already in place. This skill focuses on getting **your** projects registered.

---

## Phase A — Welcome

Greet the user and briefly explain what Precursor provides:

> Precursor gives you a structured **Plan → Execute → Closeout** workflow for GitHub Copilot. Every action stops for your review before proceeding.
>
> This setup will help you register the projects you want to work on so Precursor can discover them automatically.

---

## Phase B — Verify Precursor Installation

Check that the core structure is in place:

- [ ] `SKILLS/` directory exists and contains `RECURSE_PLAN.md`, `RECURSE_EXECUTE.md`, `RECURSE_CLOSEOUT.md`
- [ ] `.github/agents/` directory exists and contains `PrecursorPlan.agent.md`, `PrecursorExecute.agent.md`, `PrecursorCloseout.agent.md`

If anything is missing, flag it to the user. If everything is present, confirm and move on.

---

## Phase C — Add Your Projects

Explain the workspace layout:

> **How Precursor discovers projects:** Place your project repositories at the root level of this directory — alongside `SKILLS/`, `README.md`, etc. Each project should be its own folder (ideally a cloned git repo).
>
> For example:
> ```
> PRECURSOR/
> ├── SKILLS/
> ├── .github/agents/
> ├── README.md
> ├── my-web-app/          ← your project
> ├── api-service/          ← another project
> └── PLANS/                ← created when you run Plan
> ```

Ask the user:

> **Do you have any project folders you'd like to add now?**
> You can clone repos into this directory, copy folders in, or skip this step and add projects later.

If the user adds projects or confirms projects are already present, proceed to Phase D. If they skip, note that `PROJECTS.md` can be created later by running CONFIG_PROJECTS.

---

## Phase D — Build the Project Registry

Check if `PROJECTS.md` exists at the workspace root.

- **If it does not exist:** Read `SKILLS/CONFIG_PROJECTS.md` and execute the CONFIG_PROJECTS skill in full. This scans the workspace, classifies projects, writes `PROJECTS.md`, and delivers a verification prompt.
- **If it already exists:** Read it, confirm it looks current, and note it to the user.

---

## Phase E — Ready

Summarize what was set up:

1. Precursor installation status (confirmed or issues flagged)
2. Projects registered (list them, or note "none yet")
3. What to do next:
   - **Try the demo:** Open [demo/TOY_TASK.md](../demo/TOY_TASK.md) and run **@PrecursorPlan**
   - **Start real work:** Select **@PrecursorPlan** and describe any task
   - **Learn the full flow:** Read [START_HERE.md](../START_HERE.md)

---

## Completion Criteria

- [ ] Core Precursor files verified present
- [ ] User informed about project placement at workspace root
- [ ] `PROJECTS.md` created via CONFIG_PROJECTS (or user chose to skip)
- [ ] User has clear next steps
