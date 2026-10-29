export interface RunResult {
  variant: string;
  task: string;
  run: number;
  score: number | null; // mutation score percent; null = nothing scoreable
}

export interface Cell {
  n: number;
  median: number;
  min: number;
  max: number;
}

export function median(values: number[]): number {
  if (values.length === 0) throw new Error("median of empty list");
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 === 1 ? s[mid]! : (s[mid - 1]! + s[mid]!) / 2;
}

/** Group runs into variant x task cells; unscoreable runs (null score) are dropped. */
export function aggregate(results: RunResult[]): Map<string, Map<string, Cell>> {
  const buckets = new Map<string, Map<string, number[]>>();
  for (const r of results) {
    if (r.score === null) continue;
    const row = buckets.get(r.variant) ?? new Map<string, number[]>();
    row.set(r.task, [...(row.get(r.task) ?? []), r.score]);
    buckets.set(r.variant, row);
  }
  const out = new Map<string, Map<string, Cell>>();
  for (const [variant, row] of buckets) {
    const cells = new Map<string, Cell>();
    for (const [task, scores] of row) {
      cells.set(task, { n: scores.length, median: median(scores), min: Math.min(...scores), max: Math.max(...scores) });
    }
    out.set(variant, cells);
  }
  return out;
}

const fmt = (n: number) => n.toFixed(1);
const fmtCell = (c: Cell | undefined) => (c ? `${fmt(c.median)} (${fmt(c.min)}–${fmt(c.max)}, n=${c.n})` : "—");

/** Markdown table: one row per variant, one column per task, cells "median (min–max, n)". */
export function renderTable(results: RunResult[]): string {
  const agg = aggregate(results);
  const tasks = [...new Set(results.map((r) => r.task))].sort();
  const variants = [...agg.keys()].sort();
  const lines = [
    `| variant | ${tasks.join(" | ")} |`,
    `|---|${tasks.map(() => "---").join("|")}|`,
    ...variants.map((v) => `| ${v} | ${tasks.map((t) => fmtCell(agg.get(v)?.get(t))).join(" | ")} |`),
  ];
  return lines.join("\n") + "\n";
}
