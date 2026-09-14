/**
 * Shared content types.
 *
 * Kept in a separate module so `metals.ts` and `company.ts` stay pure data —
 * the static preview build mirrors those two files mechanically.
 */

/** Drives the procedural material field rendered for each metal. */
export interface MaterialPalette {
  /** Darkest tone — the bed the particles sit on. */
  base: string;
  /** Body tone of an averagely-lit particle. */
  mid: string;
  /** Specular highlight tone. */
  high: string;
  /** Cool/warm cast applied over the field, as rgba(). */
  cast: string;
  /** Visual character of the form. */
  texture: "granule" | "powder" | "sponge" | "chunk";
  /** Particle count multiplier, 0.6 – 1.5. */
  density: number;
  /** Mean particle radius in CSS px at a 1000px-wide field. */
  grain: number;
  /** Strength of the specular highlight, 0 – 1. */
  specular: number;
}

export interface Metal {
  /** URL-safe id, also the tab value. */
  id: string;
  /** Chemical symbol, e.g. "Pt". */
  symbol: string;
  name: string;
  /** Atomic number. */
  number: number;
  /** Standard atomic weight. */
  mass: string;
  /**
   * Three descriptors drawn directly from the company description of the
   * metal. Not marketing copy.
   */
  tagline: string[];
  /** Verbatim from the company product document. */
  description: string;
  forms: string[];
  applications: string[];
  /** Trailing qualifier where the document states one. */
  formsNote?: string;
  palette: MaterialPalette;
}

export interface Capability {
  id: string;
  name: string;
  copy: string;
}

export interface Principle {
  name: string;
  copy: string;
}

export interface Milestone {
  year: string;
  label: string;
}

export interface FlowStep {
  name: string;
  note: string;
  terminal?: boolean;
}

export interface Specimen {
  src: string;
  alt: string;
  tag: string;
  title: string;
  note: string;
}

export interface NavItem {
  label: string;
  href: string;
}
