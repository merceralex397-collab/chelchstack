# Goal

Create an architecture-aware implementation plan. Do not edit files.

# Task

$ARGUMENTS

# Known context

Relevant files/directories:

- [add known file or directory]

Known constraints:

- [add architectural constraint]
- [add compatibility constraint]

# Non-goals

- [things Codex must not redesign, refactor, or touch]

# Instructions

- Do not edit files.
- Identify the current architecture before proposing changes.
- Preserve existing working behaviour unless explicitly changing it.
- Avoid broad rewrites.
- Prefer incremental migration over large-bang replacement.
- Separate required changes from optional improvements.
- Identify compatibility risks, state risks, API risks, migration risks, and testing risks.
- Include verification steps for both behaviour and structure.

# Output

Return:

1. Current architecture summary
2. Problem with the current design
3. Target design
4. Minimal viable implementation path
5. Files/modules likely affected
6. Step-by-step plan
7. Migration or compatibility concerns
8. Test and verification plan
9. Documentation impact
10. Risks / unknowns
11. Recommended next prompt

# Done when

The design is clear enough to implement incrementally without broad, uncontrolled rewrites.
