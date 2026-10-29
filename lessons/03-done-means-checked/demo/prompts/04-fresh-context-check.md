# Upgrade dev-task: someone else checks the criteria against the diff

Upgrade the dev-task skill so the agent that built the change is not the one that decides it is done.

- After the checks pass, start a separate agent with a fresh context. Give it only the acceptance criteria and the diff:
  nothing about how or why the code was written.
- It marks each criterion MET, PARTIAL or NOT MET, with a line of evidence from the diff for each.
- Anything not MET goes back to be fixed, then is checked again. Do not open the PR until every criterion is MET.
- For a criterion a person would see or use (a page, a command, an endpoint), also start the app and exercise that
  path, and attach the output. Say so when a criterion has no such behaviour.
- Change only the skill's steps and rules; keep it short and in the voice it already has.
