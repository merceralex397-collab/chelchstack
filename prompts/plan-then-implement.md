# Goal

Create a short plan, then implement it with the smallest safe code changes.

# Task

$ARGUMENTS

# Relevant files/directories

- [list known file or directory]

# Non-goals

- [things Codex must not redesign, refactor, or touch]

# Constraints

- Keep the plan concise.
- Do not broaden scope.
- Do not redesign unrelated code.
- Do not add dependencies unless clearly justified.
- Preserve public APIs unless explicitly required.
- Avoid broad repo exploration if relevant files are provided.

# Process

1. Inspect only the relevant files.
2. Produce a concise implementation plan.
3. Implement the plan.
4. Add or update relevant tests if needed.
5. Update relevant docs if the change affects setup, usage, public APIs, CLI commands, config, user-visible behaviour, architecture, or developer workflow.
6. Run targeted verification.
7. Report results.

# Output

Return:

1. Brief plan used
2. Files changed
3. Summary of changes
4. Verification performed
5. Tests added/updated, or why no test update was needed
6. Documentation updated, or why no docs update was needed
7. Remaining risks

# Done when

A concise plan has been executed, the change is verified, and no unrelated work was performed.
