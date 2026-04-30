# Goal

Implement the requested change with the smallest safe code changes.

# Task / Plan

$ARGUMENTS

# Relevant files

- [list known file]
- [list known file]

# Non-goals

- [things Codex must not redesign, refactor, or touch]

# Constraints

- Follow the provided task or plan unless blocked.
- Do not broaden scope.
- Do not redesign unrelated code.
- Do not change public APIs unless explicitly required.
- Do not add dependencies unless clearly justified.
- Prefer readable, minimal changes over clever abstractions.
- Avoid broad repo exploration if relevant files are provided.

# Tests and documentation

- Add or update tests when the change affects behaviour, public APIs, bug fixes, CLI commands, config, or workflows.
- Update docs when the change affects setup, usage, public APIs, CLI commands, config, user-visible behaviour, architecture, or developer workflow.
- If tests or docs are not needed, state why in the final output.
- Do not create test or documentation churn for purely internal or trivial changes.

# Verification

- Run the smallest relevant verification first.
- Prefer tests or checks directly related to touched files.
- If verification fails, inspect only the relevant failure output.
- Fix and re-run targeted verification.
- Run broader verification only if appropriate.

# Output

Return:

1. Files changed
2. Summary of changes
3. Tests/verification performed
4. Tests added/updated, or why no test update was needed
5. Documentation updated, or why no docs update was needed
6. Remaining risks
7. Follow-up tasks, if any

# Done when

The requested change is implemented, targeted verification passes or is clearly reported, test/docs impact is handled, and no unrelated changes were made.
