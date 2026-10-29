import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { renderTable, type RunResult } from "./results.ts";

const { values } = parseArgs({
  options: {
    in: { type: "string", default: resolve(import.meta.dir, "../results.jsonl") },
    out: { type: "string" },
  },
});

if (!existsSync(values.in!)) {
  console.error(`no results at ${values.in}`);
  process.exit(1);
}
const rows = readFileSync(values.in!, "utf8")
  .split("\n")
  .filter(Boolean)
  .map((l) => JSON.parse(l) as RunResult);
const table = renderTable(rows);
if (values.out) writeFileSync(values.out, table);
else process.stdout.write(table);
