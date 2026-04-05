# Precursor — Package Manifest

Complete inventory of every file in the Precursor package.

---

## Skills (`SKILLS/`)

| Path | Description |
|---|---|
| `SKILLS/BOOTSTRAP.md` | First-time setup flow — creates directories, installs skills, registers agents |
| `SKILLS/CONFIG_PROJECTS.md` | Project registry scanner — discovers and classifies workspace projects |
| `SKILLS/FIRST_BREW.md` | Guided first session walkthrough — Plan → Execute → Closeout cycle |
| `SKILLS/MORNING_COFFEE.md` | Daily orientation and priority stack |
| `SKILLS/RECURSE_CLOSEOUT.md` | Closeout mode — writes completion records and propagates status |
| `SKILLS/RECURSE_EXECUTE.md` | Execute mode — implements single-pass steps with audit trail |
| `SKILLS/RECURSE_PLAN.md` | Plan mode — decomposes tasks into step trees with human review gates |
| `SKILLS/RECURSE_REFOCUS.md` | Mid-session reorientation — re-reads context without modifying files |

## Agents (`.github/agents/`)

| Path | Description |
|---|---|
| `.github/agents/PrecursorStart.agent.md` | Boot agent — rehydrates context and runs MORNING_COFFEE |
| `.github/agents/PrecursorPlan.agent.md` | Creates plan trees from task descriptions (Phase 1 of Plan → Review → Execute → Review → Closeout → Review) |
| `.github/agents/PrecursorExecute.agent.md` | Implements single-pass steps with audit trail (Phase 2) |
| `.github/agents/PrecursorCloseout.agent.md` | Writes closeout records and propagates status updates (Phase 3) |
| `.github/agents/PrecursorRefocus.agent.md` | Mid-session reorientation (read-only) |

## Project Files (root)

| Path | Description |
|---|---|
| `README.md` | Project identity document — what Precursor is, how it differs, governance model |
| `START_HERE.md` | Quickstart guide — from clone to operational in ≤10 steps |
| `MANIFEST.md` | This file — complete file inventory for the Precursor package |

## Tools (`tools/`)

| Path | Description |
|---|---|
| `tools/extract-chat-logs.mjs` | Extracts Opus Copilot Chat sessions from VS Code JSONL storage as markdown transcripts. Zero external dependencies. |
