# PRECURSOR Demo Walkthrough

**Presenter guide for the live PRECURSOR demo.**
Last updated: April 5, 2026

---

## Before the Demo

### Environment check (5 min before)

- [ ] VS Code open on the `PRECURSOR` folder (demo-v1 branch)
- [ ] Copilot chat panel visible
- [ ] Copilot extension active (check for agent dropdown in chat panel)
- [ ] No leftover `PLANS/` directory from previous runs — delete if exists
- [ ] `demo/TOY_TASK.md` is visible in the file explorer
- [ ] Font size large enough for screen share / projector

### Files to have open in tabs (recommended order)

1. `README.md` — for the intro
2. `demo/TOY_TASK.md` — for the task
3. (Leave other tabs closed — Copilot will create PLANS/ which you can open live)

---

## The Demo Script

### Part 1: What is this? (1–2 minutes)

**Open `README.md`.** Talk through:

> "Precursor is a structured workflow for GitHub Copilot. The idea is simple: instead of letting AI run autonomously, every action stops for human review.
>
> There are three agents — Plan, Execute, and Closeout. They form a loop.
> You describe a task, Plan breaks it into steps, Execute implements one step at a time, and Closeout records what happened.
>
> The key thing is the review gate — between every phase, the agent stops and waits for you. You check the output, and you decide what happens next."

**Point at:** The core loop numbered list, and the review gate code block.

### Part 2: The toy task (30 seconds)

**Switch to `demo/TOY_TASK.md`.** Talk through:

> "Here's a little demo task we can run right now. We're going to ask Precursor to write a Quick Start guide for itself — so the task is self-referential, which makes it easy to follow."

**Read the task aloud** or paraphrase it.

### Part 3: Plan (2–3 minutes)

1. **Open the Copilot chat panel**
2. **Click the agent dropdown** → select **@PrecursorPlan**
3. **Type or paste:** `Write a Quick Start guide for PRECURSOR that explains Plan, Execute, and Closeout with one worked example. Single markdown file, under 60 lines.`
4. **Wait for output** — the agent will create files under `PLANS/`
5. **When the review gate appears**, talk through what happened:

> "It broke the task into steps and wrote a plan. Let me open it."

6. **Open the `PLANS/` directory** in the file explorer
7. **Open the root plan file** (`{slug}.md`) and walk through the steps table
8. **Open one step spec** and point out:
   - What the step does
   - Inputs and outputs
   - Acceptance criteria
   - The `SINGLE-PASS` recommendation

> "Each step has a clear spec — what to do, what to read, what to produce, and how to verify it. And notice it stopped and waited for me to review this before doing anything."

### Part 4: Execute (2–3 minutes)

1. **Switch agent dropdown** to **@PrecursorExecute**
2. **Type:** `execute PLANS/{slug}/1_{step-name}/` (use the actual path from the plan)
3. **Wait for output** — the agent will:
   - Write `PROGRESS.md` first
   - Create the deliverable file
   - Stop at the review gate
4. **Talk through what happened:**

> "It read the spec, created a progress log, and wrote the actual Quick Start guide. Let me show you."

5. **Open `PROGRESS.md`** — point out the checked acceptance criteria
6. **Open the deliverable** (likely `QUICK_START_GUIDE.md`) — show the actual content

> "This is real output — a readable guide that a new user could follow. And again, it stopped and waited for me to check before doing anything else."

### Part 5: The audit trail (1 minute)

**Open the PLANS/ directory tree** in the file explorer. Talk through:

> "Now look at what we have. The plan file, a step spec, a progress log, and the actual deliverable. Every one of these is human-readable markdown. If you wanted to trace back how this guide was created — what the plan was, what decisions were made, what the agent did — it's all here."

### Part 6: Why this matters (30 seconds, wrap up)

> "This is the core idea: AI does the work, humans govern it. Every action has a spec, a log, and a review gate. It's markdown all the way down — no databases, no infrastructure, no build steps. Just VS Code and Copilot."

---

## Timing

| Part | Duration | Cumulative |
|------|----------|-----------|
| What is this? | 1–2 min | 2 min |
| Toy task | 30 sec | 2.5 min |
| Plan | 2–3 min | 5 min |
| Execute | 2–3 min | 8 min |
| Audit trail | 1 min | 9 min |
| Wrap up | 30 sec | 10 min |

**Target: 8–10 minutes total.** Can be compressed to 5 by skipping step spec walkthrough.

---

## If Something Goes Wrong

### Plan output is weird or too many steps

> "Sometimes the decomposition is more granular than you'd expect — that's OK, the review gate is where you'd adjust this. You can edit the plan files directly and re-scope."

Move on. Show the example output instead: `demo/EXAMPLE_PLAN.md`

### Execute writes unexpected files

> "The Execute agent follows the step spec, but it might interpret things differently than you expect. That's exactly why the review gate exists — you catch this here, not in production."

Move on. The point is the governance pattern, not perfect output.

### Agent doesn't stop at review gate

This shouldn't happen — the agent files explicitly instruct it to stop. If it does:
- Interrupt and explain: "Normally it stops here for review."
- Show the `demo/EXAMPLE_EXECUTE.md` file as fallback

### Copilot is slow or unresponsive

Have `demo/EXAMPLE_PLAN.md` and `demo/EXAMPLE_EXECUTE.md` ready to show as static examples:

> "Let me show you what this typically produces."

Walk through the example files as if they were live output. The governance story is the same.

### PLANS/ directory already exists from previous run

Delete it before the demo: right-click → Delete in file explorer, or `rm -rf PLANS/` in terminal.

---

## What NOT to Show

- **PrecursorStart / PrecursorRefocus** — these are advanced agents for multi-session workflows. Don't mention them unless asked.
- **MORNING_COFFEE / CONFIG_PROJECTS / BOOTSTRAP** — internal skills. Not relevant for first-run demo.
- **RECURSE mode** — the plan decomposition sub-plan capability. Too advanced for first demo.
- **Quality gates (GREEN/YELLOW/RED)** — closeout detail that will distract from the core message.
- **The SKILLS/ directory internals** — mention "skills define agent behaviors" but don't open the files unless asked.

---

## Fallback: Static Demo Path

If live execution is completely broken (Copilot is down, agents aren't loading):

1. Open `README.md` — tell the Precursor story
2. Open `demo/TOY_TASK.md` — show the task concept
3. Open `demo/EXAMPLE_PLAN.md` — walk through the plan structure
4. Open `demo/EXAMPLE_EXECUTE.md` — walk through the execute output
5. Explain the review gate pattern from the examples

This static path delivers 80% of the demo value without any live execution.

---

## Key Talking Points (if asked)

**"Why markdown?"**
> No infrastructure, no databases, no vendor lock-in. Every artifact is a text file that lives in your repo. Git gives you versioning and collaboration for free.

**"Does this scale?"**
> The same Plan → Execute → Closeout loop works for any task size. For larger tasks, steps can be further decomposed. The governance stays the same.

**"How is this different from just chatting with Copilot?"**
> Regular Copilot chat is freeform — you type, it responds, conversation scrolls away. Precursor creates a persistent, structured trail. Every decision, every output, every review is captured in files you can trace back through.

**"Can I use this on my own projects?"**
> Yes — clone the repo into any workspace. The skills and agents work on any codebase.
