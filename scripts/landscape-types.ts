export const COMPONENT_IDS = ["plan-name", "execute-name", "plan-hitl", "plan-persist", "plan-contents", "verify-judge", "verify-runs-app", "verify-keeps-going", "loop-starts-next", "loop-includes-plan", "design-reads", "design-form", "design-reuse", "design-approval", "design-tasks", "plan-clarify", "plan-assumptions", "plan-editable", "plan-saved", "plan-ordering", "plan-parallel", "plan-replan", "plan-critique", "plan-readonly", "plan-tracker", "plan-human-only", "plan-rollout", "verify-checks", "verify-criteria", "verify-test-plan", "verify-ci-gate", "verify-limits", "verify-test-guard", "verify-evidence", "verify-pr-fix"] as const;
type ComponentId = (typeof COMPONENT_IDS)[number];

/** Longest `short` a slide cell may carry, in words. */
export const SHORT_MAX_WORDS = 8;

/** Longest `name` chip, in words. */
export const CHIP_NAME_MAX_WORDS = 3;

/** Most labels a labels chip may join with " + ". */
export const CHIP_MAX_LABELS = 2;

const CHIP_MARKS = ["✓", "✗", "◐"] as const;

export type ChipRule =
  | { kind: "mark"; allowed: readonly string[] }
  | { kind: "labels"; allowed: readonly string[] }
  | { kind: "name" };

const MARK: ChipRule = { kind: "mark", allowed: CHIP_MARKS };

/** The chip format each component's cells must follow. */
export const CHIP_RULES: Record<ComponentId, ChipRule> = {
  "plan-name": { kind: "name" },
  "execute-name": { kind: "name" },
  "plan-hitl": MARK,
  "plan-persist": MARK,
  "plan-contents": MARK,
  "verify-judge": { kind: "labels", allowed: ["Check", "Model", "Agent", "Person"] },
  "verify-runs-app": MARK,
  "verify-keeps-going": { kind: "labels", allowed: ["Goal", "Hook", "Auto-fix", "Prompt", "Autopilot"] },
  "loop-starts-next": { kind: "labels", allowed: ["Event", "Schedule", "Finished run", "Person"] },
  "loop-includes-plan": MARK,
  "design-reads": MARK,
  "design-form": { kind: "labels", allowed: ["File", "Chat"] },
  "design-reuse": MARK,
  "design-approval": { kind: "labels", allowed: ["Human", "Human approves", "Automated"] },
  "design-tasks": { kind: "labels", allowed: ["Plan steps", "Parallel", "Tickets", "Same session"] },
  "plan-clarify": MARK,
  "plan-assumptions": MARK,
  "plan-editable": MARK,
  "plan-saved": { kind: "labels", allowed: ["File", "Chat"] },
  "plan-ordering": MARK,
  "plan-parallel": MARK,
  "plan-replan": MARK,
  "plan-critique": MARK,
  "plan-readonly": { kind: "labels", allowed: ["Tool restriction", "Instruction only"] },
  "plan-tracker": MARK,
  "plan-human-only": MARK,
  "plan-rollout": MARK,
  "verify-checks": MARK,
  "verify-criteria": MARK,
  "verify-test-plan": MARK,
  "verify-ci-gate": MARK,
  "verify-limits": MARK,
  "verify-test-guard": MARK,
  "verify-evidence": { kind: "labels", allowed: ["Logs", "Visual"] },
  "verify-pr-fix": MARK,
};

/** Task-queue products have no component; their `queue` cell chip is the product's own term. */
export const QUEUE_CHIP_RULE: ChipRule = { kind: "name" };

/** A sourced claim. `name` is the product's own name for the capability. */
export interface Cell {
  /** The product's own name for the stage/feature, or the literal "unknown". */
  name: string;
  summary: string;
  sourceUrl: string;
  /** YYYY-MM-DD date the source was fetched. */
  asOf: string;
  /** The text a slide cell shows: at most SHORT_MAX_WORDS words; names the surface when a product has two. */
  short: string;
  /** The compact mark, labels or name a slide cell shows; its format is set per component by CHIP_RULES. */
  chip: string;
}

/** A component we could not source; listed in the README, never guessed. */
export interface OmittedCell {
  omitted: string;
}

export const DEMOABLE_KINDS = [
  "free-tier",
  "trial",
  "oss-self-host",
  "paid",
  "docs-only",
  "unknown",
] as const;
type DemoableKind = (typeof DEMOABLE_KINDS)[number];

/** kind "unknown" needs no source; any other kind needs summary + source + date. */
export interface Demoable {
  kind: DemoableKind;
  summary?: string;
  sourceUrl?: string;
  asOf?: string;
}

/** summary "unknown" needs no source; otherwise summary + source + date. */
interface Destination {
  summary: string;
  sourceUrl?: string;
  asOf?: string;
}

interface BaseProduct {
  id: string;
  name: string;
  /** First-party hosts; sourceUrl host must equal or be a subdomain of one. */
  allowedHosts: string[];
  demoable: Demoable;
  destination: Destination;
}

/** A factory is compared on every component. */
export interface FactoryProduct extends BaseProduct {
  kind: "factory";
  cells: Record<ComponentId, Cell | OmittedCell>;
}

/** A task queue is not compared per component; it carries one sourced `queue` cell. */
export interface TaskQueueProduct extends BaseProduct {
  kind: "task-queue";
  queue: Cell;
}

export type Product = FactoryProduct | TaskQueueProduct;

export interface Landscape {
  components: { id: ComponentId; label: string }[];
  products: Product[];
}
