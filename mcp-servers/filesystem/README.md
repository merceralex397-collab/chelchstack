---
title: Filesystem MCP Server
description: Remote ChatGPT-compatible filesystem server for the chelchstack repo
created: 2026-04-29
updated: 2026-04-29
tags: [mcp, filesystem, chatgpt, ngrok]
---

# Filesystem MCP Server

This server exposes repo-scoped tools for ChatGPT:

- `list_files`
- `read_file`
- `write_file`
- `move_path`
- `delete_path`
- `save_markdown_note`

## Run

```bash
npm install
npm run start:mcp
```

Server listens on `http://localhost:8787/mcp`.

One-command launcher:

```bash
$env:NGROK_AUTHTOKEN="YOUR_TOKEN"
npm run run:mcp
```

This stays running in current terminal until you press `Ctrl+C`.

## ChatGPT setup

1. Enable **Developer Mode** in ChatGPT under **Settings → Apps & Connectors → Advanced settings**.
2. Start a tunnel:

```bash
ngrok http 8787
```

Or, if `ngrok` is not installed globally:

```bash
$env:NGROK_AUTHTOKEN="YOUR_TOKEN"
npm run tunnel:mcp
```

3. Use the public URL with `/mcp`, for example `https://<subdomain>.ngrok.app/mcp`.
4. Add that URL as a new app/connector in ChatGPT.
5. Refresh the app after changing tools or metadata.

## Safety

All paths are resolved relative to repo root. Anything outside repo root is rejected.
Mutating tools are intentionally broad enough to reorganize the repo, so use them carefully.
