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
    mass: "195.084",
    density: "21.45",
    meltingPoint: "1768",
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
    density: "12.02",
    meltingPoint: "1555",
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
    mass: "192.217",
    density: "22.56",
    meltingPoint: "2466",
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
    density: "12.45",
    meltingPoint: "2334",
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
    mass: "102.906",
    density: "12.41",
    meltingPoint: "1964",
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
    density: "22.59",
    meltingPoint: "3033",
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
    /** Overridden on demo and preview deployments; the real domain is the fallback. */
    url: "https://www.bhoverseas.com",
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
      "Each material is evaluated on its composition, assay and other relevant characteristics.",
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
  ],

  /**
   * The forms the company supplies, drawn from the per-metal form lists in the
   * product document. Shown as a technical index over the material band.
   */
  forms: ["Sponge", "Powder", "Wire", "Sheet", "Plate", "Metal", "Scrap"],

  /**
   * Supplied photography. The large granule macro carries the material band
   * full-bleed; the two small-format sources are marked `ref` and appear only
   * as datasheet swatches, which is the one size they are convincing at.
   * Captions describe the form shown — they do not claim the images depict a
   * specific metal the company has not identified.
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
      ref: true,
    },
    {
      src: "../public/images/source/powder-dark.jpg",
      alt: "Studio photograph of dark precious-metal powder",
      tag: "Fine powder",
      title: "Fine dark powder",
      note: "A finer, darker grade — supplied to the assay and purity specified.",
      ref: true,
    },
  ],

  enquiry: {
    eyebrow: "Specification",
    title: ["Tell us", "what you need."],
    note: "Availability varies with market conditions and sourcing. We respond by email.",
    // `subtitle` (Metal / Purity / Form / Quantity) and `forms` were removed
    // with the fields they labelled — see lib/enquiry.ts.
  },

  contact: {
    eyebrow: "Contact",
    /**
     * Client-specified wording. The previous headline and its supporting line
     * were withdrawn by the client and must not return. The email is the
     * action here — the enquiry form sits directly above it, so a button
     * would only duplicate that.
     */
    title: ["Tell us your", "requirements."],
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Products", href: "#metals" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Secondary Materials", href: "#secondary" },
    { label: "Approach", href: "#approach" },
    { label: "Contact", href: "#contact" },
  ],
};
