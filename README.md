# chelchstack

Personal AI usage stack — a curated collection of prompts, tools, agents, hooks, and MCP servers for maximizing productivity with LLMs.

## Overview

This repo follows the [LLM Wiki](llm-wiki.md) pattern: a persistent, compounding knowledge base maintained by LLMs. The stack evolves as you work with it — each component is a living file that agents read and maintain.

## Stack Components

| Component | Description |
|-----------|-------------|
| `agents/` | Agent schema files (CLAUDE.md-style) defining how LLMs operate within this stack |
| `prompts/` | Reusable prompt templates for common workflows |
| `tools/` | CLI tools and scripts for automation |
| `hooks/` | Git hooks and other automation triggers |
| `mcp-servers/` | MCP server configurations |
| `docs/` | Documentation and notes |

## Quick Start

1. Clone this repo
2. Read `agents.md` to understand how agents should behave
3. Explore the directory structure
4. Add your own components as your stack grows

## Key Files

- `agents.md` — The schema that tells LLMs how to maintain and extend this stack
- `llm-wiki.md` — The pattern this stack is built on
- `mcp-servers/filesystem/README.md` — ChatGPT-compatible filesystem server for this repo
- `docs/mcp-filesystem-setup.md` — Local and ngrok setup for ChatGPT

## How It Works

```
You (curator) + LLM Agent → Stack Maintenance
                     ↓
        ┌────────────────────────────┐
        │  prompts/  tools/  agents/  │
        │  hooks/    mcp-servers/     │
        └────────────────────────────┘
                     ↓
              Your AI Stack
```

## Principles

- **Compounding**: Knowledge accumulates over time, not re-derived on every query
- **Agent-owned**: LLMs write and maintain the stack; humans curate and direct
- **Modular**: Each component is independent and swappable
- **Version-controlled**: Git provides history, branching, and collaboration

## License

MIT
