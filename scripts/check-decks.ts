// Mechanical enforcement of the lesson-deck text and diagram rules (see decks/DIAGRAMS.md).
// Reads limits from decks/deck.config.json. Usage: bun scripts/check-decks.ts [repoRoot]
import { Glob } from "bun";
import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";

export interface DeckConfig {
  maxBullets: number;
  maxBulletWords: number;
  maxTitleWords: number;
  maxCaptionWords: number;
  maxVisualBlocks: number;
  maxDiagramsPerSlide: number;
  maxDiagramNodes: number;
  maxNodeLabelWords: number;
  safeZone: { widthPct: number; heightPct: number };
  visualExemptKinds: string[];
  forbiddenWords: string[];
}

export interface Violation {
  file: string;
  slide: number;
  rule: string;
  message: string;
}

interface El {
  tag: string;
  attrs: Record<string, string>;
  children: (El | string)[];
}

const VOID = new Set(["meta", "link", "br", "hr", "img", "input", "path", "rect", "circle", "line", "stop"]);
const RAW = new Set(["script", "style"]);

export function parseHtml(html: string): El {
  const root: El = { tag: "#root", attrs: {}, children: [] };
  const stack: El[] = [root];
  const re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>|([^<]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const top = stack[stack.length - 1] as El;
    if (m[4] !== undefined) {
      top.children.push(m[4]);
    } else if (m[2]) {
      const tag = m[2].toLowerCase();
      if (m[1]) {
        const i = stack.map((e) => e.tag).lastIndexOf(tag);
        if (i > 0) stack.length = i;
        continue;
      }
      const attrs: Record<string, string> = {};
      for (const a of (m[3] ?? "").matchAll(/([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g)) {
        attrs[(a[1] as string).toLowerCase()] = a[2] ?? a[3] ?? a[4] ?? "";
      }
      const el: El = { tag, attrs, children: [] };
      top.children.push(el);
      const selfClose = (m[3] ?? "").trimEnd().endsWith("/");
      if (RAW.has(tag)) {
        const end = html.indexOf(`</${tag}`, re.lastIndex);
        re.lastIndex = end < 0 ? html.length : end;
      } else if (!VOID.has(tag) && !selfClose) {
        stack.push(el);
      }
    }
  }
  return root;
}

const classes = (e: El) => (e.attrs.class ?? "").split(/\s+/).filter(Boolean);
const hasClass = (e: El, c: string) => classes(e).includes(c);
const elems = (e: El): El[] => e.children.filter((c): c is El => typeof c !== "string");

function descendants(e: El): El[] {
  return elems(e).flatMap((c) => [c, ...descendants(c)]);
}

function textOf(e: El, skip: (el: El) => boolean = () => false): string {
  return e.children
    .map((c) => (typeof c === "string" ? c : skip(c) ? "" : textOf(c, skip)))
    .join(" ");
}

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', nbsp: " ", "#39": "'" };

const decodeEntities = (text: string) => text.replace(/&(#?\w+);/g, (_, n: string) => ENTITIES[n] ?? " ");

export function wordCount(text: string): number {
  return decodeEntities(text).split(/\s+/).filter((t) => /[\p{L}\p{N}]/u.test(t)).length;
}

const isVisual = (e: El) => hasClass(e, "visual");
const isDiagram = (e: El) => hasClass(e, "diagram") || "data-diagram" in e.attrs;
const isExcluded = (e: El) => ["code", "pre", "table", "svg"].includes(e.tag) || isVisual(e) || isDiagram(e);
// Text outside tables, code and diagrams: what counts toward word limits.
const countable = (e: El) => wordCount(textOf(e, isExcluded));

function walkOutsideExcluded(e: El, out: El[] = []): El[] {
  for (const c of elems(e)) {
    out.push(c);
    if (!isExcluded(c)) walkOutsideExcluded(c, out);
  }
  return out;
}

function topLevelVisuals(e: El, out: El[] = []): El[] {
  for (const c of elems(e)) {
    if (isVisual(c)) out.push(c);
    else topLevelVisuals(c, out);
  }
  return out;
}

const pct = (v: string | undefined): number | null => {
  const m = v?.trim().match(/^(\d+(?:\.\d+)?)(%|vw|vh)?$/);
  return m ? Number(m[1]) : null;
};

function inSafeZone(e: El, cfg: DeckConfig): boolean {
  if (hasClass(e, "in-safe-zone")) return true;
  const style = Object.fromEntries(
    (e.attrs.style ?? "")
      .split(";")
      .map((d) => d.split(":").map((s) => s.trim()))
      .filter((p): p is [string, string] => p.length === 2 && !!p[0]),
  );
  if (style.position !== "absolute" && style.position !== "fixed") return false;
  const right = pct(style.right);
  const bottom = pct(style.bottom);
  return right !== null && bottom !== null && right < cfg.safeZone.widthPct && bottom < cfg.safeZone.heightPct;
}

export function checkDeckHtml(html: string, cfg: DeckConfig, file = "deck"): Violation[] {
  const out: Violation[] = [];
  const doc = parseHtml(html);
  const slides = descendants(doc).filter((e) => e.tag === "section" && hasClass(e, "slide"));
  slides.forEach((slide, i) => {
    const n = i + 1;
    const fail = (rule: string, message: string) => out.push({ file, slide: n, rule, message });
    const kind = slide.attrs["data-kind"] ?? "content";
    const all = descendants(slide);
    const outside = walkOutsideExcluded(slide);

    const title = all.find((e) => e.tag === "h1" || e.tag === "h2");
    if (title && wordCount(textOf(title)) > cfg.maxTitleWords) {
      fail("title-words", `title has ${wordCount(textOf(title))} words (max ${cfg.maxTitleWords})`);
    }

    const bullets = outside.filter((e) => e.tag === "li");
    if (bullets.length > cfg.maxBullets) fail("bullet-count", `${bullets.length} bullets (max ${cfg.maxBullets})`);
    for (const b of bullets) {
      const w = countable(b);
      if (w > cfg.maxBulletWords) fail("bullet-words", `bullet has ${w} words (max ${cfg.maxBulletWords})`);
    }

    for (const p of outside.filter((e) => e.tag === "p" || e.tag === "blockquote")) {
      if (!hasClass(p, "caption") && !hasClass(p, "subtitle")) {
        fail("prose", `prose paragraph "${countable(p).toString()} words"; use bullets or a caption`);
      } else if (countable(p) > cfg.maxCaptionWords) {
        fail("caption-words", `caption has ${countable(p)} words (max ${cfg.maxCaptionWords})`);
      }
    }

    const visuals = topLevelVisuals(slide);
    if (visuals.length === 0 && !cfg.visualExemptKinds.includes(kind)) {
      fail("no-visual", "content slide has no visual block (.visual)");
    }
    if (visuals.length > cfg.maxVisualBlocks) fail("visual-count", `${visuals.length} visual blocks (max ${cfg.maxVisualBlocks})`);

    const diagrams = all.filter(isDiagram).filter((d) => !all.some((o) => o !== d && isDiagram(o) && descendants(o).includes(d)));
    if (diagrams.length > cfg.maxDiagramsPerSlide) fail("diagram-count", `${diagrams.length} diagrams (max ${cfg.maxDiagramsPerSlide})`);
    for (const d of diagrams) {
      const nodes = descendants(d).filter((e) => hasClass(e, "node"));
      if (nodes.length > cfg.maxDiagramNodes) fail("diagram-nodes", `diagram has ${nodes.length} nodes (max ${cfg.maxDiagramNodes})`);
      for (const node of nodes) {
        const w = wordCount(textOf(node));
        if (w > cfg.maxNodeLabelWords) fail("node-label-words", `node label "${textOf(node).trim()}" has ${w} words (max ${cfg.maxNodeLabelWords})`);
      }
    }

    const visible = decodeEntities(textOf(slide)).replace(/\s+/g, " ").toLowerCase();
    for (const word of cfg.forbiddenWords) {
      if (visible.includes(word.toLowerCase())) fail("forbidden-word", `viewer-facing text contains forbidden word "${word}"`);
    }

    for (const e of all) {
      if (inSafeZone(e, cfg) && !hasClass(e, "facecam-zone")) fail("safe-zone", `<${e.tag}> is placed in the face-cam safe zone`);
    }
  });
  return out;
}

export function loadConfig(root: string): DeckConfig {
  return JSON.parse(readFileSync(join(root, "decks/deck.config.json"), "utf8")) as DeckConfig;
}

export async function findDecks(root: string): Promise<string[]> {
  const files = [join(root, "decks/_template/index.html")];
  for await (const f of new Glob("lessons/*/deck/index.html").scan({ cwd: root })) files.push(join(root, f));
  return files;
}

export async function checkDecks(root: string): Promise<{ files: number; violations: Violation[] }> {
  const cfg = loadConfig(root);
  const files = await findDecks(root);
  const violations = files.flatMap((f) => checkDeckHtml(readFileSync(f, "utf8"), cfg, f.replace(`${root}/`, "")));
  return { files: files.length, violations };
}

if (import.meta.main) {
  const root = resolve(process.argv[2] ?? ".");
  const { files, violations } = await checkDecks(root);
  for (const v of violations) console.error(`${v.file} slide ${v.slide} [${v.rule}] ${v.message}`);
  if (violations.length > 0) {
    console.error(`check-decks: ${violations.length} violation(s) in ${files} deck(s)`);
    process.exit(1);
  }
  console.log(`check-decks: ${files} deck(s) OK`);
}
