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

  emails: {
    primary: "pr.singhal@bhoverseas.com",
    general: "info@bhoverseas.com",
    sales: "sales@bhoverseas.com",
  },

  hero: {
    eyebrow: "Established 2015",
    title: ["Rare metals.", "Precisely handled."],
    lede: "BH Overseas sources, refines, trades and supplies Platinum Group Metals and specialty precious metals for industrial and specialized applications.",
    stamp: "Pt · Pd · Ir · Ru · Rh · Os",
  },

  statement: {
    eyebrow: "The company",
    title: ["Experience since 2015.", "Precision for", "what comes next."],
    copy: [
      "BH Overseas has developed experience in the sourcing, refining, trading and supply of Platinum Group Metals and selected specialty precious metals.",
      "Our products are sourced and supplied according to customers' required specifications, quantities and forms.",
    ],
  },

  about: {
    eyebrow: "About",
    title: ["Built around", "the material."],
    copy: [
      "BH Overseas has been engaged in the business of Platinum Group Metals and other specialized precious metals since 2015. Over the years we have developed experience in the sourcing, refining, trading and supply of these metals for industrial and specialized applications.",
      "Our primary focus is on Platinum, Palladium, Iridium, Ruthenium, Rhodium and Osmium. We also evaluate requirements for other precious and specialty metals based on availability, specifications and application.",
      "The incorporation of BH Overseas as a Private Limited Company in 2026 represents an important milestone in our journey. We intend to build on the experience developed since 2015 and further expand our presence in the global precious-metals industry.",
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
      "Each material is evaluated according to its composition, assay and other relevant characteristics. Acceptance, treatment and terms follow that evaluation.",
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
      copy: "We place importance on accurate specifications, purity, assay and appropriate documentation at every stage of our operations.",
    },
    {
      name: "Reliability",
      copy: "We value clear communication and consistent, ethical execution in our dealings with suppliers and customers.",
    },
    {
      name: "Knowledge",
      copy: "Our focus on Platinum Group Metals enables us to develop specialized knowledge of the metals, their applications and the markets in which we operate.",
    },
    {
      name: "Integrity",
      copy: "We believe professional and transparent relationships form the foundation of sustainable business.",
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
    subtitle: ["Metal", "Purity", "Form", "Quantity"],
    note: "Availability of individual metals, purities and forms may vary depending on market conditions and sourcing. We will respond to your enquiry by email.",
    forms: ["Sponge", "Powder", "Wire", "Sheet", "Plate", "Metal", "Scrap", "Other"],
  },

  contact: {
    eyebrow: "Contact",
    title: ["Let's discuss", "your specification."],
    copy: "Tell us the metal, purity, form and quantity you require.",
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Metals", href: "#metals" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Secondary Materials", href: "#secondary" },
    { label: "Approach", href: "#approach" },
    { label: "Contact", href: "#contact" },
  ] as NavItem[],
} as const;
