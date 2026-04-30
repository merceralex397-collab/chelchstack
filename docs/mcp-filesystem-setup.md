---
title: MCP Filesystem Setup
description: How to connect ChatGPT to the filesystem MCP server in this repo
created: 2026-04-29
updated: 2026-04-29
tags: [mcp, chatgpt, setup, ngrok]
---

# MCP Filesystem Setup

1. Run `npm install`.
2. Set `NGROK_AUTHTOKEN`.
3. Run `npm run run:mcp`.
4. Copy printed ngrok HTTPS URL and append `/mcp` if needed.
5. In ChatGPT, enable **Developer Mode** under **Settings → Apps & Connectors → Advanced settings**.
6. Create new app/connector with tunneled `/mcp` URL.
7. Refresh app after tool or metadata changes.

The server is repo-scoped and can read, write, move, delete, and create markdown notes inside this repository only.
