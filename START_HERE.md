# Precursor — Quick Start

Get from clone to your first governed AI workflow in 5 minutes.

---

## Prerequisites

- **VS Code** with the **GitHub Copilot** extension installed (chat enabled)
- A GitHub Copilot subscription that supports agent modes

---

## Setup (one time)

1. **Clone** this repo: `git clone https://github.com/keeminlee/PRECURSOR.git`
2. **Open** the folder in VS Code
3. **Verify** you see `SKILLS/` and `.github/agents/` in the file explorer

That's it. Precursor is just markdown files — no install, no build, no dependencies.

---

## Try the Demo

A toy demo task is included so you can see the full workflow immediately.

### Step 1: Read the task

Open [demo/TOY_TASK.md](demo/TOY_TASK.md). This is a small, self-contained task:

> *Write a plain-English Quick Start guide for PRECURSOR that explains Plan, Execute, and Closeout with one worked example.*

### Step 2: Plan

1. Open the **Copilot chat** panel
2. Click the **agent dropdown** (top of the chat panel) and select **@PrecursorPlan**
3. Paste or type the task from `demo/TOY_TASK.md`

The Plan agent will decompose the task into concrete steps and write a plan under `PLANS/`. When it finishes, it stops and shows a review gate:

```
⏸ AWAITING YOUR REVIEW
```

**Review the plan.** Open the files it created under `PLANS/`. Check that the steps make sense.

> **What to expect:** A root plan file and 2–3 step directories, each containing a step spec. See [demo/EXAMPLE_PLAN.md](demo/EXAMPLE_PLAN.md) for an example of what good plan output looks like.

### Step 3: Execute

1. Switch the agent dropdown to **@PrecursorExecute**
2. The plan output will show you the path to each step (e.g. `PLANS/precursor-quickstart-guide/1_draft-guide/`). Tell Execute which step to run:

```
execute PLANS/{your-plan-name}/1_{step-name}/
```

(Use the actual path from the plan output — the plan name is auto-generated from your task description.)

The Execute agent reads the step spec, writes a `PROGRESS.md` log, does the work, and stops:

```
⏸ AWAITING YOUR REVIEW
```

**Review the output.** Check the files it created or modified. Check `PROGRESS.md` for the audit trail.

> **What to expect:** The actual deliverable file(s) listed in the step spec, plus a PROGRESS.md. See [demo/EXAMPLE_EXECUTE.md](demo/EXAMPLE_EXECUTE.md) for what this looks like.

### Step 4: Closeout (optional for demo)

1. Switch the agent dropdown to **@PrecursorCloseout**
2. Tell it which step to close: `closeout PLANS/{your-plan-name}/1_{step-name}/`

The Closeout agent writes a `CLOSEOUT.md` record and updates the parent plan's status table.

### Step 5: Inspect the trail

After running even one Plan → Execute cycle, open the `PLANS/` directory in the file explorer. You'll see:

```
PLANS/
└── {your-plan-name}/              ← auto-generated from your task
    ├── {your-plan-name}.md         ← root plan with steps table
    └── 1_{step-name}/
        ├── 1_{step-name}.md        ← step spec (what to do)
        ├── PROGRESS.md            ← audit log (what happened)
        └── CLOSEOUT.md            ← completion record (if closed out)
```

Every file is human-readable markdown. Every transition was reviewed by you. That's the governed workflow.

---

## The Key Idea

**Human review gates.** Every agent action ends with `⏸ AWAITING YOUR REVIEW`. Nothing auto-continues. You read the output, decide if it's right, and explicitly select the next agent. This gives you:

- A visible, auditable trail of every decision
- Human judgment at every transition point
- Full control over scope, quality, and direction

---

## What's Next

- Use Precursor on your own tasks — replace the toy demo with any real work
- The same Plan → Execute → Closeout loop scales from toy tasks to multi-step projects
- For the complete file inventory, see [MANIFEST.md](MANIFEST.md)
