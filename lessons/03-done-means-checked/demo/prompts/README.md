# Per-capability upgrade prompts

Four short prompts that upgrade the sample factory's `dev-task` skill (`factory/skills/dev-task/SKILL.md`) one
verification capability at a time. Each is about eight lines of engineer intent. They are the input to the live
upgrade: the factory is asked to apply each prompt to its own skill, and the resulting diff is the lesson's evidence.

## Order

Run them in this order, against the skill as it stands after the lesson 2 state of the factory, one prompt per branch or
commit so each diff stays separate. Each later prompt assumes the earlier one has landed.

| # | Prompt | What the SKILL.md diff should look like |
|---|--------|------------------------------------------|
| 1 | [01-red-first-tests.md](01-red-first-tests.md) | Step 3 (write the code) reworked so tests come first at the layer the task names; a step to run them and confirm they fail; the red run quoted in the PR. A handful of lines. |
| 2 | [02-run-checks-evidence.md](02-run-checks-evidence.md) | Step 4 (verify) extended to the repo's install, lint, typecheck and test commands, a capped fix loop with an attempt history, and a criteria-and-checks table added to the PR body in step 5. |
| 3 | [03-weakened-test-guard.md](03-weakened-test-guard.md) | One rule plus one verification step: read the test-file diff, treat deleted, loosened or skipped tests as weakening unless the task says otherwise. Replaces the existing "do not weaken or skip tests" sentence rather than repeating it. |
| 4 | [04-fresh-context-check.md](04-fresh-context-check.md) | A new step before the PR: a fresh-context agent given only the criteria and the diff marks each MET, PARTIAL or NOT MET; user-facing criteria also get the app run, with output attached. |

A good diff is small and confined to the skill's steps and rules. If a run rewrites the whole file, rewrites the
voice, or edits anything outside `factory/skills/dev-task/SKILL.md`, discard it and run the prompt again.

## The tool-neutral rule

Prompts state outcomes only. They name no test runner, language, agent product or command, and they do not point at
any other file to read first; each stands alone. Whatever stack a reader uses, the same four outcomes apply, so keep
any edit to these prompts to the same rule.
