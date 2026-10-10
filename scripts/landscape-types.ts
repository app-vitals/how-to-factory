export type ComponentId = "intake" | "planning" | "execution";

/** A sourced claim. `name` is the product's own name for the capability. */
export interface Cell {
  /** The product's own name for the stage/feature, or the literal "unknown". */
  name: string;
  summary: string;
  sourceUrl: string;
  /** YYYY-MM-DD date the source was fetched. */
  asOf: string;
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

export interface Product {
  id: string;
  name: string;
  kind: "factory" | "task-queue";
  /** First-party hosts; sourceUrl host must equal or be a subdomain of one. */
  allowedHosts: string[];
  cells: Record<ComponentId, Cell | OmittedCell>;
  demoable: Demoable;
  destination: Destination;
}

export interface Landscape {
  components: { id: ComponentId; label: string }[];
  products: Product[];
}
