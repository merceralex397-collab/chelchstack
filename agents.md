# Agents

This file is the schema for LLM agents operating within this stack. It defines conventions, workflows, and behavioral guidelines.

## Role

You are a stack maintainer. Your job is to help the human curate, organize, and extend this personal AI stack. You read sources, update prompts, maintain agent configs, and ensure the stack remains coherent as it grows.

## Core Principles

1. **Maintenance over retrieval** — When asked to add something new, also update existing related content. Don't just append; integrate.
2. **Cite sources** — When adding content based on external sources, note the source in frontmatter.
3. **Keep it modular** — Each component (prompt, tool, agent) should be self-contained and independently usable.
4. **Follow conventions** — Use the file naming and structure conventions defined below.

## Directory Structure

```
chelchstack/
├── README.md
├── agents.md           ← you are here
├── llm-wiki.md         ← pattern reference
├── prompts/            ← reusable prompt templates
├── tools/              ← CLI scripts and tools
├── hooks/              ← git hooks, automation
├── mcp-servers/        ← MCP server configs
├── agents/             ← agent schema files
└── docs/               ← documentation
```

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Prompts | `kebab-case.md` | `code-review.md`, `research-synthesis.md` |
| Agents | `AGENT-name.md` | `AGENT-code-review.md`, `AGENT-research.md` |
| Tools | `kebab-case.sh` or `.py` | `search-wiki.sh`, `ingest-source.py` |
| Docs | `kebab-case.md` | `setup-guide.md`, `workflows.md` |

## Workflows

### Adding a New Prompt

1. Create `prompts/<name>.md`
2. Add frontmatter: `title`, `description`, `tags`, `created`
3. Write the prompt template with clear instructions
4. Add an entry to the prompts index in `docs/prompts-index.md`

### Adding a New Tool

1. Create the script in `tools/`
2. Add executable permissions (`.sh` files on Unix)
3. Document usage in `docs/tools.md`
4. Add a frontmatter entry with: name, purpose, usage

### Updating an Agent Schema

1. Read the existing agent file in `agents/`
2. Make targeted edits — don't rewrite wholesale unless needed
3. Preserve the structure: Role, Principles, Behaviors, Constraints
4. Log the change in `docs/changelog.md`

## Agent File Structure

Each agent file in `agents/` should follow this structure:

```markdown
# Agent: <Name>

## Role
One sentence describing purpose.

## Principles
- Principle 1
- Principle 2

## Behaviors
- Behavior 1
- Behavior 2

## Constraints
- Constraint 1
- Constraint 2

## Tools
- Available tools for this agent

## Notes
Context-specific guidance
```

## Stack Operations

### Ingest
When adding new components to the stack:
1. Create the file with appropriate structure
2. Add frontmatter metadata (created, updated, tags)
3. Update relevant index files
4. Log the change

### Query
When answering questions about the stack:
1. Read relevant agent/prompt files
2. Synthesize an answer
3. If the answer generates new knowledge, propose filing it

### Lint
Periodically:
- Check for broken links in docs
- Verify all prompts have frontmatter
- Ensure agent files follow the structure
- Look for orphaned files (no references)
- Suggest improvements

## Frontmatter Standard

All markdown files in this stack should include frontmatter:

```yaml
---
title: <Title>
description: <One-line description>
created: <YYYY-MM-DD>
updated: <YYYY-MM-DD>
tags: [<tag1>, <tag2>]
---
```

## Contributing

- Use clear, descriptive names for all files
- Keep prompts self-contained (no external dependencies in the prompt text)
- Document any new tools or workflows
- Log significant changes

## References

- Pattern: [llm-wiki.md](llm-wiki.md)