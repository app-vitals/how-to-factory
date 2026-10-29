# Upgrade dev-task: run the repo's checks and show what happened

Upgrade the dev-task skill so "done" rests on checks that ran, not on the agent saying so.

- Before the PR opens, run the repo's own install, lint, typecheck and test commands, taken from the repo's
  instructions. If a command is not written down anywhere, ask for it rather than guess.
- A failing check goes back to the agent with its failure log and a one-line note of each earlier attempt. After three
  attempts, stop and ask a person instead of continuing.
- The PR body carries a table with one row per acceptance criterion and one per check: what ran and the outcome (pass,
  fail, or skipped with the reason). A skipped check is shown as skipped, never as passed.
- Change only the skill's steps and rules; keep it short and in the voice it already has.
