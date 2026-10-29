# Upgrade dev-task: tests come first, and the red run is on record

Upgrade the dev-task skill so a task's acceptance criteria drive the tests, and the tests exist before the code.

- Each acceptance criterion gets at least one test, written before any production code for that criterion.
- One criterion names the test layer and the tests added or retired. Follow it: write the tests at that layer. If it
  says none are needed, the skill must require the reason to be stated back in the PR.
- Run the new tests and confirm they fail, for the right reason, before writing the code. A new test that passes on its
  first run is testing existing behaviour or is wrong, so rewrite it.
- Keep the failing run's output and quote it in the PR, so a reviewer can see the test was red first.
- Change only the skill's steps and rules; keep it short and in the voice it already has.
