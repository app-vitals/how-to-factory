# Task 1: slugify

Add `slugify(title: string): string` in `src/slugify.ts`.

Acceptance criteria:
- Lowercases and replaces runs of non-alphanumeric characters with a single `-`
- Trims leading and trailing `-`
- Returns `"untitled"` for input that has no alphanumeric characters
- Truncates to 40 characters without leaving a trailing `-`
