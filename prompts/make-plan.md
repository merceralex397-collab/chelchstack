# Goal

Create a practical implementation plan. Do not edit files.

# Task

$ARGUMENTS

# Known context

Relevant files/directories, if known:

- [add known file or directory]
- [add known file or directory]

Current issue / desired change:

- [describe what needs to change]

# Non-goals

- [things Codex must not redesign, refactor, or touch]

# Constraints

- Do not edit files.
- Prefer the smallest safe change that satisfies the task.
- Preserve existing public APIs unless the task explicitly requires changing them.
- Do not add dependencies unless clearly justified.
- Avoid broad repo exploration if relevant files are already provided.
- Identify uncertainty instead of guessing.

# Investigation budget

- Inspect only files needed to understand the requested change.
- Prefer targeted search over broad repository scans.
- Stop investigating once the implementation path is clear.
- Do not dump large file contents or command outputs.

# Output

Return:

1. Current-state summary
2. Relevant files and why they matter
3. Proposed approach
4. Step-by-step implementation plan
5. Tests or verification to run
6. Documentation impact, if any
7. Risks / unknowns
8. Suggested next prompt

# Done when

The plan is specific enough that a separate Codex implementation run can execute it without re-investigating the whole repository.
