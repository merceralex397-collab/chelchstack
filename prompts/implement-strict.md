# Goal

Implement the approved plan exactly, with minimal safe changes and no scope drift.

# Approved plan

$ARGUMENTS

# Relevant files

- [list known file]
- [list known file]

# Non-goals

- [things Codex must not redesign, refactor, or touch]

# Hard constraints

- Do not change requirements.
- Do not redesign the solution.
- Do not touch unrelated files.
- Do not add dependencies unless the approved plan explicitly requires them.
- Do not change public APIs unless the approved plan explicitly requires it.
- Do not perform broad refactors.
- Do not introduce new abstractions unless necessary to complete the approved plan.
- If the plan is blocked or wrong, stop and explain why before continuing.

# Tests and documentation

- Add or update tests only when required to verify the approved plan.
- Update docs only if the implemented change affects setup, usage, APIs, CLI commands, config, user-visible behaviour, architecture, or developer workflow.
- If tests or docs are not updated, explain why.

# Verification

- Run the smallest relevant verification first.
- Prefer tests or checks directly related to touched files.
- Do not run broad expensive checks until targeted verification passes or unless required by the task.
- If a check fails, identify whether the failure is caused by this change before fixing anything else.

# Output

Return:

1. Whether the approved plan was followed exactly
2. Any deviations and why they were necessary
3. Files changed
4. Summary of changes
5. Verification performed
6. Tests added/updated, or why no test update was needed
7. Documentation updated, or why no docs update was needed
8. Remaining risks
9. Follow-up tasks, if any

# Done when

The approved plan is implemented without scope drift, verification evidence is provided, and test/docs impact is handled.
