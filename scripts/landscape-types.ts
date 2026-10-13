export const COMPONENT_IDS = ["plan-hitl", "plan-persist", "plan-contents", "verify-judge", "verify-runs-app", "verify-keeps-going", "loop-starts-next", "loop-includes-plan"] as const;
export type ComponentId = (typeof COMPONENT_IDS)[number];

/** Longest `short` a slide cell may carry, in words. */
export const SHORT_MAX_WORDS = 8;

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
export type DemoableKind = (typeof DEMOABLE_KINDS)[number];

/** kind "unknown" needs no source; any other kind needs summary + source + date. */
export interface Demoable {
  kind: DemoableKind;
  summary?: string;
  sourceUrl?: string;
  asOf?: string;
}

/** summary "unknown" needs no source; otherwise summary + source + date. */
export interface Destination {
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
