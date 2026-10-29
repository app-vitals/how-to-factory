# Task 3: dependency order

Add `order(tasks: { id: string; deps: string[] }[]): string[]` in `src/order.ts`.

Acceptance criteria:
- Returns ids so every task appears after all of its dependencies
- Ties keep input order
- Throws an error naming the ids involved when there is a cycle
- Throws when a dependency id does not exist in the input
