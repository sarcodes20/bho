/* GENERATED — do not edit.
   Source: data/metals.ts, data/company.ts
   Regenerate: bash tools/build-static-data.sh
*/


/**
 * The six Platinum Group Metals that BH Overseas identifies as its principal
 * focus.
 *
 * `description`, `forms` and `applications` are taken from the company's own
 * product document without embellishment. `tagline` uses three descriptors
 * lifted from that same description — it is not added marketing language.
 * `number` and `mass` are standard chemical reference values.
 *
 * Order matches the order the company lists them in its own material, which is
 * also the order the explorer presents.
 */
window.METALS = [
  {
    id: "platinum",
    symbol: "Pt",
    name: "Platinum",
    number: 78,
    mass: "195.08",
    tagline: ["Rare", "Stable", "Catalytic"],
    description:
      "Platinum is a rare precious metal known for its excellent corrosion resistance, catalytic properties and high-temperature stability.",
    forms: ["Sponge", "Powder", "Wire", "Sheet", "Plate", "Scrap"],
    formsNote: "and other forms as required",
    applications: [
      "Thermocouples",
      "Laboratory equipment",
      "Chemical processing",
      "Catalysts",
      "Glass manufacturing",
      "Electronics",
      "Electroplating",
      "Other specialized applications",
    ],
    palette: {
      base: "#17191B",
      mid: "#7F868A",
      high: "#EDF0F1",
      cast: "rgba(186,198,208,0.10)",
      texture: "granule",
      density: 1.12,
      grain: 9.5,
      specular: 0.92,
    },
  },
  {
    id: "palladium",
    symbol: "Pd",
    name: "Palladium",
    number: 46,
    mass: "106.42",
    tagline: ["Catalytic", "Chemical", "Conductive"],
    description:
      "Palladium is an important Platinum Group Metal valued for its catalytic, chemical and electrical properties.",
    forms: ["Sponge", "Powder", "Wire", "Scrap"],
    formsNote: "and other forms as required",
    applications: [
      "Catalysts",
      "Electronics",
      "Chemical processing",
      "Electroplating",
      "Specialized industrial applications",
    ],
    palette: {
      base: "#141618",
      mid: "#6D7376",
      high: "#CFD4D6",
      cast: "rgba(176,182,186,0.08)",
      texture: "powder",
      density: 1.3,
      grain: 6.2,
      specular: 0.62,
    },
  },
  {
    id: "iridium",
    symbol: "Ir",
    name: "Iridium",
    number: 77,
    mass: "192.22",
    tagline: ["Rarest", "Corrosion-resistant", "High-temperature"],
    description:
      "Iridium is one of the rarest naturally occurring metals and is distinguished by its exceptional corrosion resistance and high-temperature properties.",
    forms: ["Metal", "Sponge", "Powder", "Scrap"],
    formsNote: "and other forms as required",
    applications: [
      "High-temperature equipment",
      "Electrochemical applications",
      "Electronics",
      "Laboratory equipment",
      "Specialized industrial uses",
    ],
    palette: {
      base: "#0F1113",
      mid: "#4F565A",
      high: "#AAB3B8",
      cast: "rgba(128,146,160,0.09)",
      texture: "sponge",
      density: 1.0,
      grain: 11,
      specular: 0.5,
    },
  },
  {
    id: "ruthenium",
    symbol: "Ru",
    name: "Ruthenium",
    number: 44,
    mass: "101.07",
    tagline: ["Hard", "Corrosion-resistant", "Electronic"],
    description:
      "Ruthenium is a hard and corrosion-resistant Platinum Group Metal with applications in electronics, catalysts and specialized industrial processes.",
    forms: ["Metal", "Powder", "Scrap"],
    formsNote: "and other forms as required",
    applications: [
      "Electronics",
      "Electrical contacts",
      "Catalysts",
      "Electroplating",
      "Specialized alloys",
    ],
    palette: {
      base: "#101113",
      mid: "#4A4E51",
      high: "#9AA0A3",
      cast: "rgba(140,146,150,0.06)",
      texture: "powder",
      density: 1.42,
      grain: 4.6,
      specular: 0.38,
    },
  },
  {
    id: "rhodium",
    symbol: "Rh",
    name: "Rhodium",
    number: 45,
    mass: "102.91",
    tagline: ["Catalytic", "Reflective", "Corrosion-resistant"],
    description:
      "Rhodium is a rare Platinum Group Metal known for its catalytic properties, corrosion resistance and reflective characteristics.",
    forms: ["Metal", "Powder", "Sponge", "Scrap"],
    formsNote: "and other forms as required",
    applications: [
      "Catalysts",
      "Chemical processing",
      "Electroplating",
      "Glass manufacturing",
      "Jewellery",
      "Other specialized applications",
    ],
    palette: {
      base: "#191B1D",
      mid: "#8C9296",
      high: "#F5F7F8",
      cast: "rgba(198,210,218,0.12)",
      texture: "granule",
      density: 1.05,
      grain: 10.5,
      specular: 1,
    },
  },
  {
    id: "osmium",
    symbol: "Os",
    name: "Osmium",
    number: 76,
    mass: "190.23",
    tagline: ["Dense", "Hard", "Wear-resistant"],
    description:
      "Osmium is an exceptionally rare and dense Platinum Group Metal, known for its high hardness and resistance to wear and corrosion.",
    forms: ["Metal", "Powder", "Compounds"],
    formsNote: "and other forms subject to specific requirements and availability",
    applications: [
      "Specialized alloys",
      "Scientific and laboratory applications",
      "Electrical contacts",
      "Other highly specialized uses",
    ],
    palette: {
      base: "#0A0B0D",
      mid: "#3E464C",
      high: "#8794A0",
      cast: "rgba(96,124,150,0.11)",
      texture: "chunk",
      density: 0.86,
      grain: 14,
      specular: 0.44,
    },
  },
];


/**
 * Every claim below is traceable to the BH Overseas company document.
 *
 * Deliberately absent, because the company has not supplied them: telephone
 * numbers, postal addresses, CIN/GST identifiers, certifications, client names,
 * volumes, revenue, headcount, office locations and environmental claims.
 * Add them to this file when the company provides them — nothing else needs
 * to change.
 */
window.COMPANY = {
  name: "BH Overseas",
  wordmark: "BH Overseas",
  descriptor: "Platinum Group Metals & Specialty Precious Metals",

  /** Used in the <title>, meta description and structured data. */
  meta: {
    title: "BH Overseas | Platinum Group Metals & Specialty Precious Metals",
    description:
      "BH Overseas sources, refines, trades and supplies Platinum Group Metals and selected specialty precious metals for industrial and specialized applications.",
    url: "https://www.bhoverseas.com",
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
  ],

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
  ],

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
    ],
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
  ],

  /**
   * Supplied photography, art-directed as specimen plates. Captions describe
   * the form shown — they do not claim the images depict a specific metal the
   * company has not identified.
   */
  specimens: [
    {
      src: "../public/images/source/granules-lg.jpg",
      alt: "Macro photograph of refined precious-metal granules",
      tag: "Granule",
      title: "Granules",
      note: "Cast granular form, supplied to specified purity and quantity.",
    },
    {
      src: "../public/images/source/powder-grey.jpg",
      alt: "Studio photograph of fine grey precious-metal powder",
      tag: "Powder",
      title: "Powder",
      note: "Fine powder, used where surface area and dispersion matter.",
    },
    {
      src: "../public/images/source/powder-dark.jpg",
      alt: "Studio photograph of dark precious-metal powder",
      tag: "Powder",
      title: "Fine dark powder",
      note: "A finer, darker grade — supplied to the assay and purity specified.",
    },
  ],

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
  ],
};
