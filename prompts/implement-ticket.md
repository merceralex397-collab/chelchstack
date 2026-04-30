# Goal

Implement the specified ticket only.

# Ticket

$ARGUMENTS

# Relevant files

- [list known file]

# Non-goals

- [adjacent tickets or related work Codex must not start]

# Constraints

- Implement only this ticket.
- Do not start adjacent tickets.
- Do not redesign the broader system.
- Do not change unrelated files.
- Preserve current behaviour outside this ticket.
- If the ticket is ambiguous, make the smallest reasonable interpretation and state it.
- If the ticket is blocked, stop and explain the blocker.

# Tests and documentation

- Add or update tests when needed to verify this ticket.
- Update docs only if this ticket changes setup, usage, APIs, CLI behaviour, config, user-visible behaviour, architecture, or developer workflow.

# Verification

- Run the smallest relevant verification for this ticket.
- If no automated test exists, perform the closest available check and explain the limitation.

# Output

Return:

1. Ticket implemented
2. Interpretation used, if any
3. Files changed
4. Summary of changes
5. Verification performed
6. Tests added/updated, or why no test update was needed
7. Documentation updated, or why no docs update was needed
8. Remaining risks / follow-up tickets

# Done when

This ticket is complete without accidentally implementing adjacent tickets.
