# Task 4: token budget

Add `class Budget` in `src/budget.ts` with `constructor(limit: number)`, `spend(n: number): boolean`, and `remaining(): number`.

Acceptance criteria:
- `spend` returns `true` and deducts when `n` fits within the remaining budget
- `spend` returns `false` and deducts nothing when `n` would exceed the remaining budget
- Spending exactly the remaining amount is allowed
- Negative or non-integer `n`, and a negative `limit`, throw a `RangeError`
