# Upgrade dev-task: never loosen a test to get green

Upgrade the dev-task skill so a failing test is fixed in the code, never by changing the test.

- A test may change only when the task says the criterion itself changed, and the PR must state that reason in one
  sentence.
- Before opening the PR, read the diff of the test files. Deleted tests, removed or weakened assertions (an exact value
  made into "at least one", a check made looser), and newly skipped tests all count as weakening unless the task says
  otherwise.
- If a test seems wrong or flaky, do not touch it: stop, report it, and leave the decision to a person.
- Change only the skill's steps and rules; keep it short and in the voice it already has.
