# Lesson 3 scorer

A pre-filming tool for the lesson 3 before/after: score the tests an agent wrote with a
mutation score. It is **not** part of `factory/`, is not built live, and is not run in CI.
It has its own `package.json` so it does not touch the root TypeScript 7 pin or `bun.lock`:
Stryker needs TypeScript 5 (TypeScript 7 has no JS API).

## Pieces

- `tasks/` — four small factory-style tasks with acceptance criteria. Each run gets one task.
- `src/score.ts` — given the worktree one run produced, finds the files the run changed
  (committed since the base ref, uncommitted, and untracked), drops tests/declarations/config,
  and runs Stryker's `command` runner (`bun test`) with `mutate` scoped to just those files.
  Prints a mutation score and, with `--variant/--task/--run`, appends a row to `results.jsonl`.
- `src/report.ts` — reads `results.jsonl` and writes a variant x task markdown table; each cell
  is `median (min–max, n=runs)`.

Score = (killed + timeout) / (killed + timeout + survived + no coverage), as a percent.
Compile-error and ignored mutants are not counted. A run that changed no source files is not scored.

## Usage

```bash
cd experiments/lesson3
bun install
bun test                                   # unit tests for file selection, scoring, aggregation

# list what would be mutated, without running Stryker
bun src/score.ts ../../worktrees/<run> --base origin/main --dry-run

# score one run and record it
bun src/score.ts ../../worktrees/<run> --base origin/main --variant v1 --task 01-slugify --run 1

bun src/report.ts                          # table to stdout (or --out table.md)
```

Why scoped: a full run over lesson 1's suite (273 mutants) took about 9 minutes. Scoping to
the files a run changed keeps each score to a minute or two.

## Environment caveats

- The `ps` binary may be missing in the sandbox. Stryker uses it to find and kill child
  processes; install `procps` (or equivalent) if a run fails or hangs on cleanup. This is an
  environment issue, not a scorer bug.
- The TypeScript checker is enabled only when the worktree has a `tsconfig.json`; it drops
  mutants that do not compile. It resolves TypeScript 5 from this directory's `node_modules`.
- The test command defaults to `bun test` in the worktree (`--test-command` overrides it).
  Tests run in the worktree, so the worktree needs its own dependencies installed.
- Root `bun test` also discovers these unit tests; they are small and pure.

## Manual check

The Stryker invocation itself is not unit tested. It was checked once by hand:
on a scratch git repo with one module and one test (two of the four mutants survived or
errored by design: `n <= left` mutated to `n < left` survived, giving 3 killed / 1 survived =
75%), then rendered through `report.ts`. In the sandbox this only worked after putting a
minimal `ps` shim on `PATH` (the `ps` caveat above): Stryker's process-kill helper shells out
to `ps -o pid --no-headers --ppid <pid>`, and with no `ps` at all the run aborts with
`spawn ps ENOENT`. A real `ps` (procps) is the proper fix. The score is read from the JSON
report, so a crash during Stryker's shutdown after the report is written does not lose it.

A run whose own tests fail (or that wrote no tests) makes Stryker's initial dry run abort. `score.ts`
catches that, appends the row with `score: 0` and `status: "failed"` so it counts toward the
variant's median, and exits 1. Any report left over from a previous scoring of the same worktree is
deleted before Stryker starts, so a stale report is never read as this run's score.
