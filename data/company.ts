import type {
  Capability,
  FlowStep,
  Milestone,
  NavItem,
  Principle,
  Specimen,
} from "./types";

/**
 * Every claim below is traceable to the BH Overseas company document.
 *
 * Deliberately absent, because the company has not supplied them: telephone
 * numbers, postal addresses, CIN/GST identifiers, certifications, client names,
 * volumes, revenue, headcount, office locations and environmental claims.
 * Add them to this file when the company provides them — nothing else needs
 * to change.
 */
export const COMPANY = {
  name: "BH Overseas",
  wordmark: "BH Overseas",
  descriptor: "Platinum Group Metals & Specialty Precious Metals",

  /** Used in the <title>, meta description and structured data. */
  meta: {
    title: "BH Overseas | Platinum Group Metals & Specialty Precious Metals",
    description:
      "BH Overseas sources, refines, trades and supplies Platinum Group Metals and selected specialty precious metals for industrial and specialized applications.",
    /** Overridden on demo and preview deployments; the real domain is the fallback. */
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.bhoverseas.com",
    locale: "en_IN",
  },

  /** The two dates the document establishes. Nothing is extrapolated from them. */
  foundedYear: "2015",
  incorporatedYear: "2026",

  /**
   * The single published address. Client instruction: this is the only email
   * that may appear anywhere on the site, in any mailto, or in metadata.
   */
  email: "info@bhoverseas.com",

  hero: {
    eyebrow: "Established 2015",
    /** Two lines, two sizes — the second is set at the top of the scale. */
    titleLead: "Rare metals.",
    titleMain: "Precisely handled.",
    lede: "Sourcing, refining, trading and supply of Platinum Group Metals for industrial and specialized applications.",
  },

  statement: {
    eyebrow: "The company",
    title: ["Experience since 2015.", "Precision for", "what comes next."],
    copy: [
      "Products are sourced and supplied to the specification, quantity and form each customer requires.",
    ],
  },

  about: {
    eyebrow: "About",
    title: ["Built around", "the material."],
    copy: [
      "Engaged in Platinum Group Metals and other specialized precious metals since 2015, with experience in the sourcing, refining, trading and supply of these metals for industrial and specialized applications.",
      "The primary focus is Platinum, Palladium, Iridium, Ruthenium, Rhodium and Osmium. Requirements for other precious and specialty metals are evaluated on availability, specification and application.",
      "Incorporated as a Private Limited Company in 2026, building on the experience developed since 2015.",
    ],
    facts: [
      { k: "Focus", v: "Platinum Group Metals" },
      { k: "Activities", v: "Sourcing · Refining · Trading · Supply" },
      { k: "Trade", v: "Domestic and international" },
      { k: "Served", v: "Industrial and specialized applications" },
    ],
  },

  milestones: [
    { year: "2015", label: "Engaged in the business of Platinum Group Metals and other specialized precious metals." },
    { year: "2026", label: "Incorporated as a Private Limited Company." },
  ] as Milestone[],

  capabilities: [
    {
      id: "sourcing",
      name: "Sourcing",
      copy: "Sourcing of Platinum Group Metals and specialty precious metals according to specific requirements.",
    },
    {
      id: "refining",
      name: "Refining",
      copy: "Processing and refining of selected precious-metal materials according to applicable specifications and requirements.",
    },
    {
      id: "trading",
      name: "Trading",
      copy: "Domestic and international trading of precious and specialty metals.",
    },
    {
      id: "secondary-materials",
      name: "Secondary Materials",
      copy: "Sourcing and evaluation of selected PGM-bearing scrap, residues and recycled materials.",
    },
  ] as Capability[],

  secondary: {
    eyebrow: "Secondary & recycled materials",
    title: ["Value remains", "in the material."],
    copy: "BH Overseas deals in selected PGM-bearing secondary and recycled materials, subject to composition, assay, quantity and technical evaluation.",
    materials: [
      "PGM-bearing industrial scrap",
      "Production residues",
      "Precious-metal-containing materials",
      "Spent catalysts",
      "Other secondary PGM materials",
    ],
    caveat:
      "Each material is evaluated on its composition, assay and other relevant characteristics.",
    flow: [
      { name: "Secondary material", note: "Scrap, residues, spent catalysts and other PGM-bearing material." },
      { name: "Evaluation", note: "Composition, quantity and technical characteristics are reviewed." },
      { name: "Assay", note: "Precious-metal content is established." },
      { name: "Processing / refining", note: "Carried out to applicable specifications and requirements." },
      { name: "Precious metal", note: "Returned to specification, in the form required.", terminal: true },
    ] as FlowStep[],
  },

  principles: [
    {
      name: "Quality",
      copy: "Accurate specification, purity, assay and documentation at every stage.",
    },
    {
      name: "Reliability",
      copy: "Clear communication and consistent, ethical execution.",
    },
    {
      name: "Knowledge",
      copy: "Specialized understanding of the metals, their applications and their markets.",
    },
    {
      name: "Integrity",
      copy: "Professional and transparent relationships.",
    },
  ] as Principle[],

  /**
   * Supplied photography, art-directed as specimen plates. Captions describe
   * the form shown — they do not claim the images depict a specific metal the
   * company has not identified.
   */
  specimens: [
    {
      src: "/images/source/granules-lg.jpg",
      alt: "Macro photograph of refined precious-metal granules",
      tag: "Granule",
      title: "Granules",
      note: "Cast granular form, supplied to specified purity and quantity.",
    },
    {
      src: "/images/source/powder-grey.jpg",
      alt: "Studio photograph of fine grey precious-metal powder",
      tag: "Powder",
      title: "Powder",
      note: "Fine powder, used where surface area and dispersion matter.",
    },
    {
      src: "/images/source/powder-dark.jpg",
      alt: "Studio photograph of dark precious-metal powder",
      tag: "Powder",
      title: "Fine dark powder",
      note: "A finer, darker grade — supplied to the assay and purity specified.",
    },
  ] as Specimen[],

  enquiry: {
    eyebrow: "Specification",
    title: ["Tell us", "what you need."],
    note: "Availability varies with market conditions and sourcing. We respond by email.",
    // `subtitle` (Metal / Purity / Form / Quantity) and `forms` were removed
    // with the fields they labelled — see lib/enquiry.ts.
  },

  contact: {
    eyebrow: "Contact",
    title: ["Let's discuss", "your specification."],
    copy: "Tell us the metal, purity, form and quantity you require.",
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Products", href: "#metals" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Secondary Materials", href: "#secondary" },
    { label: "Approach", href: "#approach" },
    { label: "Contact", href: "#contact" },
  ] as NavItem[],
} as const;
