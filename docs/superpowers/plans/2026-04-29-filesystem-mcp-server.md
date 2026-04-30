---
title: Filesystem MCP Server Implementation Plan
description: Plan to add a remote ChatGPT-compatible filesystem MCP server for this repo
created: 2026-04-29
updated: 2026-04-29
tags: [plan, mcp, chatgpt, filesystem, ngrok]
---

# Filesystem MCP Server Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a remote MCP server that ChatGPT can connect to through ngrok and use to inspect, edit, create, move, and reorganize files in this repo, including saving user input as markdown notes.

**Architecture:** Build a small Node-based MCP HTTP server using the current Apps SDK contract. Expose only repo-scoped filesystem tools, return concise `structuredContent` for the model, and keep any bulky file payloads in `_meta` when needed. Skip UI. The server runs locally on `/mcp`, is tunnelled with ngrok, and is configured for ChatGPT Developer Mode.

**Tech Stack:** Node.js, `@modelcontextprotocol/sdk`, `@modelcontextprotocol/ext-apps`, `zod`, `fs/promises`, `path`, `ngrok`.

---

### Task 1: Lock repo shape and runtime entrypoint

**Files:**
- Create: `package.json`
- Create: `mcp-servers/filesystem/server.js`
- Create: `mcp-servers/filesystem/README.md`
- Modify: `README.md`

- [ ] **Step 1: Write the failing contract check**

```bash
node mcp-servers/filesystem/server.js
```

Expected: fail until dependencies and server code exist.

- [ ] **Step 2: Implement minimal Node scaffold**

```js
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import {
  StreamableHTTPServerTransport,
} from "@modelcontextprotocol/sdk/server/streamableHttp.js";

const server = new McpServer({ name: "chelchstack-filesystem", version: "0.1.0" });
```

- [ ] **Step 3: Add npm scripts**

```json
{
  "type": "module",
  "scripts": {
    "start:mcp": "node mcp-servers/filesystem/server.js",
    "dev:mcp": "node mcp-servers/filesystem/server.js"
  }
}
```

- [ ] **Step 4: Run entrypoint again**

```bash
node mcp-servers/filesystem/server.js
```

Expected: server starts and prints local `/mcp` URL.

- [ ] **Step 5: Commit**

```bash
git add package.json mcp-servers/filesystem/server.js mcp-servers/filesystem/README.md README.md
git commit -m "feat: add filesystem mcp server scaffold"
```

### Task 2: Add repo-safe filesystem read and listing tools

**Files:**
- Modify: `mcp-servers/filesystem/server.js`
- Create: `mcp-servers/filesystem/fs-root.js`
- Create: `mcp-servers/filesystem/fs-tools.test.js`

- [ ] **Step 1: Write failing tests for path guard and listing**

```js
import { strict as assert } from "node:assert";
import { resolveRepoPath, listFiles } from "./fs-root.js";

assert.throws(() => resolveRepoPath(".."), /outside repo root/);
```

- [ ] **Step 2: Implement repo-root resolver**

```js
import path from "node:path";
import { fileURLToPath } from "node:url";

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

export function resolveRepoPath(inputPath) {
  const candidate = path.resolve(repoRoot, inputPath);
  if (!candidate.startsWith(repoRoot + path.sep) && candidate !== repoRoot) {
    throw new Error("Path outside repo root");
  }
  return candidate;
}
```

- [ ] **Step 3: Implement `list_files` and `read_file` tools**

```js
server.registerTool(
  "list_files",
  {
    title: "List files",
    description: "Use this when you need to inspect repo structure.",
    inputSchema: {
      type: "object",
      properties: { dir: { type: "string" } },
      required: ["dir"],
      additionalProperties: false
    },
    annotations: { readOnlyHint: true, openWorldHint: false, destructiveHint: false }
  },
  async ({ dir }) => ({ structuredContent: await listFiles(dir) })
);
```

- [ ] **Step 4: Verify read tools return repo-scoped paths only**

```bash
node mcp-servers/filesystem/fs-tools.test.js
```

Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add mcp-servers/filesystem/server.js mcp-servers/filesystem/fs-root.js mcp-servers/filesystem/fs-tools.test.js
git commit -m "feat: add filesystem read tools"
```

### Task 3: Add write, move, delete, and markdown note tools

**Files:**
- Modify: `mcp-servers/filesystem/server.js`
- Create: `mcp-servers/filesystem/fs-write.js`
- Create: `mcp-servers/filesystem/fs-markdown.js`
- Create: `mcp-servers/filesystem/fs-mutate.test.js`

- [ ] **Step 1: Write failing tests for markdown note creation**

```js
import { writeMarkdownNote } from "./fs-markdown.js";

const result = await writeMarkdownNote("notes", "hello world");
assert.match(result.path, /notes\/.+\.md$/);
```

- [ ] **Step 2: Implement markdown sanitization and note writer**

```js
export function markdownTitleToFilename(title) {
  return title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "note";
}
```

- [ ] **Step 3: Add mutating tools with clear intent**

```js
server.registerTool("write_file", { /* annotations: destructiveHint false */ }, async ({ path, content }) => { /* ... */ });
server.registerTool("move_path", { /* destructiveHint true */ }, async ({ from, to }) => { /* ... */ });
server.registerTool("delete_path", { /* destructiveHint true */ }, async ({ path }) => { /* ... */ });
server.registerTool("save_markdown_note", { /* write note from user input */ }, async ({ title, body, folder }) => { /* ... */ });
```

- [ ] **Step 4: Verify retry safety and overwrite behavior**

```bash
node mcp-servers/filesystem/fs-mutate.test.js
```

Expected: pass, including path escape rejection and overwrite guards.

- [ ] **Step 5: Commit**

```bash
git add mcp-servers/filesystem/server.js mcp-servers/filesystem/fs-write.js mcp-servers/filesystem/fs-markdown.js mcp-servers/filesystem/fs-mutate.test.js
git commit -m "feat: add filesystem write tools"
```

### Task 4: Add ChatGPT metadata, ngrok flow, and local docs

**Files:**
- Modify: `mcp-servers/filesystem/server.js`
- Modify: `mcp-servers/filesystem/README.md`
- Modify: `README.md`
- Create: `docs/mcp-filesystem-setup.md`

- [ ] **Step 1: Add tool annotations and status text**

```js
_meta: {
  ui: { visibility: ["model"] },
  "openai/toolInvocation/invoking": "Reading repo…",
  "openai/toolInvocation/invoked": "Repo updated."
}
```

- [ ] **Step 2: Document ngrok and ChatGPT Developer Mode**

```bash
ngrok http 8787
```

Expected setup text:
- use `https://<subdomain>.ngrok.app/mcp`
- enable ChatGPT Developer Mode
- refresh app after tool or metadata changes

- [ ] **Step 3: Add exact local run instructions**

```bash
npm install
npm run start:mcp
ngrok http 8787
```

- [ ] **Step 4: Update top-level README with the new MCP server entry**

Add a short section that points to `mcp-servers/filesystem/README.md` and the setup doc.

- [ ] **Step 5: Commit**

```bash
git add mcp-servers/filesystem/server.js mcp-servers/filesystem/README.md README.md docs/mcp-filesystem-setup.md
git commit -m "docs: add ChatGPT filesystem setup"
```

## Self-Review Checklist

- [ ] Repo shape matches a tool-only remote MCP server.
- [ ] `list_files`, `read_file`, `write_file`, `move_path`, `delete_path`, and `save_markdown_note` all stay inside repo root.
- [ ] Mutations reject path traversal and absolute escape attempts.
- [ ] Tool descriptors include accurate annotations.
- [ ] No UI resource is registered.
- [ ] Server runs on `/mcp` and works with ngrok.
- [ ] Docs tell user how to connect app in ChatGPT Developer Mode.

## Gaps To Watch

- Need to decide whether `delete_path` is too broad for normal use; if yes, split into `trash_path` or `archive_path`.
- Need to confirm whether note saving should append to a single inbox file or create one file per note.
- Need to keep `structuredContent` small enough that model can reason about it without dumping full file contents.

