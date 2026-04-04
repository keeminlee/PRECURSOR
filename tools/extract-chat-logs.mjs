#!/usr/bin/env node
// tools/extract-chat-logs.mjs
// Extracts today's Opus Copilot chat sessions from VS Code JSONL storage
// into readable markdown transcripts.
// Usage: node tools/extract-chat-logs.mjs [--date MM_DD_YYYY]

import { readFileSync, readdirSync, mkdirSync, writeFileSync, existsSync } from 'fs';
import { join, basename } from 'path';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const WORKSPACE_STORAGE_ID = '8c637ddb1de5c3a27b1b83fb4524d5f4';

function getChatSessionsDir() {
  const appData = process.env.APPDATA;
  const base = appData
    ? join(appData, 'Code', 'User', 'workspaceStorage', WORKSPACE_STORAGE_ID, 'chatSessions')
    : join('c:', 'Users', 'keemi', 'AppData', 'Roaming', 'Code', 'User', 'workspaceStorage', WORKSPACE_STORAGE_ID, 'chatSessions');
  return base;
}

// ---------------------------------------------------------------------------
// Date helpers
// ---------------------------------------------------------------------------

function parseTargetDate(args) {
  const idx = args.indexOf('--date');
  if (idx !== -1 && args[idx + 1]) {
    const raw = args[idx + 1]; // MM_DD_YYYY
    const [mm, dd, yyyy] = raw.split('_').map(Number);
    return { year: yyyy, month: mm, day: dd, formatted: raw };
  }
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const yyyy = now.getFullYear();
  return { year: yyyy, month: Number(mm), day: Number(dd), formatted: `${mm}_${dd}_${yyyy}` };
}

function epochMatchesDate(epochMs, target) {
  const d = new Date(epochMs);
  return d.getFullYear() === target.year
    && (d.getMonth() + 1) === target.month
    && d.getDate() === target.day;
}

function formatDate(epochMs) {
  return new Date(epochMs).toLocaleString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

// ---------------------------------------------------------------------------
// JSONL parsing
// ---------------------------------------------------------------------------

function parseSession(filePath) {
  const raw = readFileSync(filePath, 'utf8');
  const lines = raw.split('\n').filter(l => l.trim());

  let sessionId = null;
  let creationDate = null;
  let modelIdentifier = null;
  let customTitle = null;

  // Accumulate turns: each turn has a user message + response items array
  // kind:2 entries with k=["requests"] are new turns (contain message field)
  // kind:2 entries with k=["requests",N,"response"] are incremental response patches
  const turns = []; // { userText, responseItems[], modelId }

  for (const line of lines) {
    let obj;
    try { obj = JSON.parse(line); } catch { continue; }

    if (obj.kind === 0) {
      // Session metadata
      const v = obj.v;
      sessionId = v.sessionId;
      creationDate = v.creationDate;
      modelIdentifier = v.inputState?.selectedModel?.identifier ?? null;
    } else if (obj.kind === 1) {
      // Metadata update
      const keys = obj.k;
      if (Array.isArray(keys) && keys.includes('customTitle')) {
        customTitle = typeof obj.v === 'string' ? obj.v : null;
      }
    } else if (obj.kind === 2) {
      const k = obj.k;

      // New turn: k = ["requests"] — v is array of request objects
      if (Array.isArray(k) && k.length === 1 && k[0] === 'requests') {
        const entries = Array.isArray(obj.v) ? obj.v : [];
        for (const entry of entries) {
          let userText = '';
          if (entry.message) {
            if (entry.message.text) {
              userText = entry.message.text;
            } else if (Array.isArray(entry.message.parts)) {
              userText = entry.message.parts
                .map(p => p.text ?? '')
                .filter(Boolean)
                .join('\n');
            }
          }
          turns.push({
            userText,
            responseItems: Array.isArray(entry.response) ? [...entry.response] : [],
            modelId: entry.modelId ?? null
          });
        }
        continue;
      }

      // Response update: k = ["requests", N, "response"] — v is array of response items
      if (Array.isArray(k) && k.length === 3 && k[0] === 'requests' && k[2] === 'response') {
        const turnIndex = k[1];
        if (typeof turnIndex === 'number' && turnIndex < turns.length) {
          const items = Array.isArray(obj.v) ? obj.v : [];
          turns[turnIndex].responseItems.push(...items);
        }
        continue;
      }

      // Fallback: unrecognized k pattern — skip
    }
  }

  // Render response items into text for each turn
  const renderedTurns = turns.map(turn => {
    const assistantParts = [];
    for (const item of turn.responseItems) {
      const kind = item.kind;

      // Skip thinking blocks
      if (kind === 'thinking') continue;
      // Skip MCP server starting
      if (kind === 'mcpServersStarting') continue;

      if (kind === 'toolInvocationSerialized') {
        // Render as one-line blockquote
        const msg = item.pastTenseMessage?.value
          ?? item.invocationMessage?.value
          ?? item.invocationMessage
          ?? '(tool invocation)';
        // invocationMessage can be a string or an object with .value
        const msgStr = typeof msg === 'string' ? msg : (msg?.value ?? '(tool invocation)');
        assistantParts.push(`> ${msgStr}`);
        continue;
      }

      // Text items: no kind property, or unknown kind — only collect if .value is string
      if (kind === undefined || kind === null) {
        if (typeof item.value === 'string' && item.value.trim()) {
          assistantParts.push(item.value);
        }
        continue;
      }

      // progressMessage — skip (internal progress updates)
      if (kind === 'progressMessage') continue;

      // Any other kind → skip gracefully
    }

    return {
      userText: turn.userText,
      assistantText: assistantParts.join('\n\n'),
      modelId: turn.modelId
    };
  });

  return { sessionId, creationDate, modelIdentifier, customTitle, turns: renderedTurns };
}

// ---------------------------------------------------------------------------
// Output directory resolution
// ---------------------------------------------------------------------------

function resolveOutputDir(targetDate, repoRoot) {
  const docsDir = join(repoRoot, 'docs');
  const dateDir = targetDate.formatted; // MM_DD_YYYY

  // Scan for week_N folders
  let weekFolders = [];
  if (existsSync(docsDir)) {
    weekFolders = readdirSync(docsDir, { withFileTypes: true })
      .filter(d => d.isDirectory() && /^week_\d+$/.test(d.name))
      .map(d => ({ name: d.name, num: parseInt(d.name.replace('week_', ''), 10) }))
      .sort((a, b) => a.num - b.num);
  }

  // Check if any week_N contains today's date folder
  for (const wf of weekFolders) {
    const candidate = join(docsDir, wf.name, dateDir);
    if (existsSync(candidate)) {
      const out = join(candidate, 'transcripts', 'Opus');
      mkdirSync(out, { recursive: true });
      return out;
    }
  }

  // Not found — create under highest week_N
  const highest = weekFolders.length > 0
    ? weekFolders[weekFolders.length - 1].name
    : 'week_1';
  const out = join(docsDir, highest, dateDir, 'transcripts', 'Opus');
  mkdirSync(out, { recursive: true });
  return out;
}

// ---------------------------------------------------------------------------
// Markdown formatting
// ---------------------------------------------------------------------------

function sanitizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .substring(0, 60);
}

function formatSession(session) {
  const title = session.customTitle || session.sessionId || 'untitled';
  const model = session.modelIdentifier || 'unknown';
  const created = session.creationDate ? formatDate(session.creationDate) : 'unknown';
  const sid = session.sessionId || 'unknown';

  let md = `# ${title}\n`;
  md += `**Model:** ${model}  \n`;
  md += `**Created:** ${created}  \n`;
  md += `**Session ID:** ${sid}\n`;
  md += `\n---\n`;

  for (let i = 0; i < session.turns.length; i++) {
    const turn = session.turns[i];
    md += `\n## Turn ${i + 1}\n`;
    md += `\n### User\n\n${turn.userText || '_(empty)_'}\n`;
    md += `\n### Assistant\n\n${turn.assistantText || '_(empty)_'}\n`;
    md += `\n---\n`;
  }

  return md;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const args = process.argv.slice(2);
  const target = parseTargetDate(args);
  const repoRoot = process.cwd();

  console.log(`Target date: ${target.formatted}`);

  const sessionsDir = getChatSessionsDir();
  if (!existsSync(sessionsDir)) {
    console.error(`Chat sessions directory not found: ${sessionsDir}`);
    process.exit(1);
  }

  const jsonlFiles = readdirSync(sessionsDir)
    .filter(f => f.endsWith('.jsonl'))
    .map(f => join(sessionsDir, f));

  console.log(`Found ${jsonlFiles.length} JSONL files`);

  // Parse and filter
  const sessions = [];
  for (const file of jsonlFiles) {
    const session = parseSession(file);

    // Filter: must have Opus model
    if (!session.modelIdentifier || !session.modelIdentifier.toLowerCase().includes('opus')) {
      continue;
    }

    // Filter: must match target date
    if (!session.creationDate || !epochMatchesDate(session.creationDate, target)) {
      continue;
    }

    session._sourceFile = basename(file);
    sessions.push(session);
  }

  console.log(`Matched ${sessions.length} Opus sessions for ${target.formatted}`);

  if (sessions.length === 0) {
    console.log('No sessions to extract. Done.');
    return;
  }

  // Sort by creation date
  sessions.sort((a, b) => a.creationDate - b.creationDate);

  // Resolve output directory
  const outDir = resolveOutputDir(target, repoRoot);
  console.log(`Output directory: ${outDir}`);

  // Write files
  for (let i = 0; i < sessions.length; i++) {
    const session = sessions[i];
    const titleSlug = session.customTitle
      ? sanitizeTitle(session.customTitle)
      : session.sessionId;
    const filename = `${i}_${titleSlug}.md`;
    const outPath = join(outDir, filename);
    const md = formatSession(session);
    writeFileSync(outPath, md, 'utf8');
    console.log(`  Wrote: ${filename} (${session.turns.length} turns)`);
  }

  console.log('Done.');
}

main();
