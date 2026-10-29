# Task 2: retry with backoff

Add `retry<T>(fn: () => Promise<T>, opts: { attempts: number; baseMs: number; sleep?: (ms: number) => Promise<void> }): Promise<T>` in `src/retry.ts`.

Acceptance criteria:
- Returns the first successful result without sleeping
- Retries up to `attempts` total calls, then rethrows the last error
- Waits `baseMs * 2^(n-1)` before retry `n` (injectable `sleep` so tests do not wait)
- `attempts < 1` throws a `RangeError` before calling `fn`
