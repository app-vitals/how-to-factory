import { readFileSync } from "node:fs";
import { renderLandscape } from "./render-landscape.ts";
import {
  CHIP_MAX_LABELS,
  CHIP_NAME_MAX_WORDS,
  CHIP_RULES,
  COMPONENT_IDS,
  DEMOABLE_KINDS,
  QUEUE_CHIP_RULE,
  SHORT_MAX_WORDS,
  type Cell,
  type ChipRule,
  type Landscape,
} from "./landscape-types.ts";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const blank = (s: unknown) => typeof s !== "string" || s.trim() === "";

const wordCount = (s: string) => s.trim().split(/\s+/).length;

function checkDate(asOf: unknown, today: string): string | null {
  if (blank(asOf)) return "missing asOf";
  const s = asOf as string;
  if (!DATE_RE.test(s)) return `malformed asOf "${s}" (want YYYY-MM-DD)`;
  const d = new Date(`${s}T00:00:00Z`);
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== s) return `invalid asOf "${s}"`;
  if (s > today) return `asOf "${s}" is in the future`;
  return null;
}

function checkSource(url: unknown, hosts: string[]): string | null {
  if (blank(url)) return "missing sourceUrl";
  let u: URL;
  try {
    u = new URL(url as string);
  } catch {
    return `invalid sourceUrl "${url}"`;
  }
  if (u.protocol !== "https:") return `sourceUrl must be https: ${url}`;
  const host = u.hostname.toLowerCase();
  if (!hosts.some((h) => host === h || host.endsWith(`.${h}`)))
    return `sourceUrl host "${host}" not in allowedHosts [${hosts.join(", ")}]`;
  return null;
}

function checkChip(chip: unknown, rule: ChipRule): string | null {
  if (blank(chip)) return "missing chip";
  const c = chip as string;
  if (c !== c.trim()) return `chip "${c}" has leading or trailing whitespace`;
  if (rule.kind === "mark")
    return rule.allowed.includes(c) ? null : `chip "${c}" must be one of ${rule.allowed.join(" ")}`;
  if (rule.kind === "labels") {
    const labels = c.split(" + ");
    if (labels.length > CHIP_MAX_LABELS) return `chip "${c}" has ${labels.length} labels (max ${CHIP_MAX_LABELS})`;
    const bad = labels.filter((l) => !rule.allowed.includes(l));
    return bad.length ? `chip label "${bad[0]}" must be one of ${rule.allowed.join(", ")}` : null;
  }
  return wordCount(c) > CHIP_NAME_MAX_WORDS
    ? `chip is ${wordCount(c)} words (max ${CHIP_NAME_MAX_WORDS})`
    : null;
}

/** Returns a list of human-readable problems; empty means valid. `today` is YYYY-MM-DD. */
export function validateLandscape(data: Landscape, today: string): string[] {
  const errors: string[] = [];
  const ids = (data.components ?? []).map((c) => c.id).join();
  if (ids !== COMPONENT_IDS.join()) errors.push(`components must be [${COMPONENT_IDS.join(", ")}], got [${ids}]`);
  for (const p of data.products ?? []) {
    const at = (where: string, msg: string | null) => msg && errors.push(`${p.id} ${where}: ${msg}`);
    if (!p.allowedHosts?.length) errors.push(`${p.id}: allowedHosts must be non-empty`);
    const hosts = p.allowedHosts ?? [];
    const sourced = (where: string, o: { sourceUrl?: string; asOf?: string; summary?: string }) => {
      at(where, blank(o.summary) ? "missing summary" : null);
      at(where, checkSource(o.sourceUrl, hosts));
      at(where, checkDate(o.asOf, today));
    };

    // Naming rule: `name` must be non-empty. The literal "unknown" is the only
    // allowed placeholder, for when the source gives no product-specific name.
    const checkCell = (where: string, cell: Cell, chipRule: ChipRule) => {
      at(where, blank(cell.name) ? "missing name (use \"unknown\" if the source has none)" : null);
      sourced(where, cell);
      if (blank(cell.short)) at(where, "missing short");
      else if (wordCount(cell.short) > SHORT_MAX_WORDS)
        at(where, `short is ${wordCount(cell.short)} words (max ${SHORT_MAX_WORDS})`);
      at(where, checkChip(cell.chip, chipRule));
    };

    if (p.kind === "task-queue") {
      if (!p.queue) errors.push(`${p.id} queue: missing`);
      else checkCell("queue", p.queue, QUEUE_CHIP_RULE);
    } else {
      for (const c of data.components) {
        const cell = p.cells?.[c.id];
        const where = `cell ${c.id}`;
        if (!cell) {
          errors.push(`${p.id} ${where}: missing (use { "omitted": "reason" } if unsourced)`);
        } else if ("omitted" in cell) {
          at(where, blank(cell.omitted) ? "omitted needs a reason" : null);
        } else {
          checkCell(where, cell, CHIP_RULES[c.id]);
        }
      }
    }

    const d = p.demoable;
    if (!d) errors.push(`${p.id} demoable: missing`);
    else if (!(DEMOABLE_KINDS as readonly string[]).includes(d.kind))
      errors.push(`${p.id} demoable: invalid kind "${d.kind}"`);
    else if (d.kind !== "unknown") sourced("demoable", d);

    const dest = p.destination;
    if (!dest || blank(dest.summary)) errors.push(`${p.id} destination: missing (use summary "unknown")`);
    else if (dest.summary !== "unknown") sourced("destination", dest);
  }
  return errors;
}

export function checkReadmeFresh(data: Landscape, readme: string): string[] {
  return readme === renderLandscape(data)
    ? []
    : ["landscape/README.md is stale: run `bun scripts/render-landscape.ts`"];
}

if (import.meta.main) {
  const data = JSON.parse(readFileSync("landscape/matrix.json", "utf8")) as Landscape;
  const today = new Date().toISOString().slice(0, 10);
  const errors = validateLandscape(data, today);
  // Rendering assumes a structurally valid matrix; only check freshness once validation passes.
  if (!errors.length) errors.push(...checkReadmeFresh(data, readFileSync("landscape/README.md", "utf8")));
  if (errors.length) {
    for (const e of errors) console.error(`landscape: ${e}`);
    process.exit(1);
  }
  console.log("landscape: ok");
}
