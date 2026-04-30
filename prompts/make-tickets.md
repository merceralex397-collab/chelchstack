# Goal

Convert the approved plan into small, ordered implementation tickets. Do not edit files.

# Approved plan

$ARGUMENTS

# Known context

Relevant files/directories:

- [add known file or directory]

# Non-goals

- Do not implement the tickets.
- Do not redesign the plan.
- Do not add speculative work outside the approved plan.
- Do not create vague tickets like "improve code quality".

# Constraints

- Each ticket must be independently understandable.
- Each ticket must be small enough for one focused Codex implementation run.
- Each ticket must include scope boundaries.
- Each ticket must include verification.
- Order tickets by dependency.
- Separate required tickets from optional follow-up tickets.
- If a ticket depends on another ticket, state the dependency explicitly.

# Ticket format

For each ticket, return:

## Ticket N — [short title]

Goal:
- [specific outcome]

Scope:
- [files, modules, or behaviours included]

Non-goals:
- [what not to touch]

Implementation notes:
- [concrete guidance]

Verification:
- [smallest relevant test/check]

Docs/test impact:
- [whether docs or tests should be updated]

Dependencies:
- [previous tickets or none]

Done when:
- [concrete completion criteria]

# Output

Return:

1. Ticket sequence summary
2. Required tickets
3. Optional follow-up tickets
4. Suggested first ticket to implement
5. Risks in the ticket breakdown

# Done when

The approved plan is split into small, dependency-ordered tickets that can be passed one at a time to `implement-ticket.md`.
