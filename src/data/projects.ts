export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  original?: string;
};
export type Metric = {
  value: string;
  label: string;
  detail: string;
  note?: string;
};
export type CaseSection = {
  id: string;
  title: string;
  type: "text" | "gallery" | "comparison" | "brand" | "results" | "external";
  body?: string[];
  images?: ProjectImage[];
  layout?: "full" | "pair" | "grid";
  bullets?: string[];
};
export type Comparison = {
  label: string;
  before: ProjectImage;
  after: ProjectImage | null;
};
export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  discipline: "Digital" | "Brand" | "Graphic";
  year: string | null;
  description: string;
  order: number;
  cover: ProjectImage;
  gallery: ProjectImage[];
  website?: string;
  facts: { label: string; value: string }[];
  sections: CaseSection[];
  results?: Metric[];
  resultsNote?: string;
  comparisons?: Comparison[];
  accent: string;
  brandColors?: { name: string; hex: string }[];
  resultsSummary?: string;
  coverStatement?: string;
  coverContext?: string;
  overviewLabel?: string;
};
const img = (
  slug: string,
  name: string,
  alt: string,
  width: number,
  height: number,
  caption?: string,
): ProjectImage => ({
  src: `/projects/${slug}/${name}.webp`,
  alt,
  width,
  height,
  caption,
});
const eo = (
  name: string,
  alt: string,
  width = 1800,
  height = 1350,
  caption?: string,
) => img("eleven-oasis", name, alt, width, height, caption);
const ebc = (name: string, alt: string, caption?: string) =>
  img("early-birds-club", name, alt, 1800, 957, caption);
const cov = (
  name: string,
  alt: string,
  width: number,
  height: number,
  caption?: string,
) => img("covers", name, alt, width, height, caption);
const vis = (name: string, alt: string, caption?: string) =>
  img(
    "visual-experiments",
    name,
    alt,
    name === "key-visual-04" ? 513 : 511,
    name === "key-visual-04" ? 910 : 908,
    caption,
  );
const homepageBefore: ProjectImage = {
  ...eo(
    "homepage-before-display",
    "Original Eleven Oasis desktop homepage before the redesign",
    1200,
    7188,
    "Before redesign · authentic original homepage",
  ),
  original: "/projects/eleven-oasis/homepage-before-original.png",
};
const pdpBefore: ProjectImage = {
  ...eo(
    "pdp-before-display",
    "Original Eleven Oasis desktop product detail page before the redesign",
    1200,
    4599,
    "Before redesign · authentic original product detail page",
  ),
  original: "/projects/eleven-oasis/pdp-before-original.png",
};
const ebcGallery = [
  ebc(
    "wing-symbol",
    "Single-wing and golf-ball symbol concept",
    "Design 01 · wing + golf ball",
  ),
  ebc(
    "identity-01",
    "Early Birds Club symbol and typographic lockups",
    "Design 01 · identity variations",
  ),
  ebc(
    "monogram-01",
    "Early Birds Club monogram pattern",
    "Design 01 · monogram system",
  ),
  ebc(
    "merchandise-01",
    "Cap and polo shirt application mockups",
    "Design 01 · merchandise concepts",
  ),
  ebc(
    "applications-01",
    "Golf accessory and umbrella identity mockups",
    "Design 01 · application concepts",
  ),
  ebc(
    "signage-01",
    "Illuminated Early Birds Club sign mockup",
    "Design 01 · signage concept",
  ),
  ebc(
    "double-wing-symbol",
    "Double-wing and golf-ball symbol concept",
    "Design 02 · double wings + golf ball",
  ),
  ebc(
    "identity-02",
    "Double-wing identity lockups",
    "Design 02 · identity variations",
  ),
  ebc(
    "cover",
    "Cream and dark green checkerboard Early Birds Club identity",
    "Design 02 · monogram and wordmark",
  ),
  ebc(
    "accessories-02",
    "Early Birds Club pin and accessory mockups",
    "Design 02 · accessory concepts",
  ),
  ebc(
    "apparel-02",
    "Early Birds Club identity on apparel",
    "Design 02 · apparel concepts",
  ),
  ebc(
    "flag-02",
    "Early Birds Club flag application mockup",
    "Design 02 · flag concept",
  ),
];
const coversGallery = [
  cov(
    "wordmark-01",
    "Expressive Covers wordmark exploration",
    856,
    259,
    "Wordmark exploration",
  ),
  cov(
    "wordmark-02",
    "Covers serif wordmark exploration",
    895,
    261,
    "Wordmark exploration",
  ),
  cov(
    "cover",
    "Covers cream packaging with floral imagery",
    501,
    682,
    "Packaging concept",
  ),
  cov(
    "packaging-front",
    "Covers packaging front with oversized wordmark",
    503,
    621,
    "Packaging · front",
  ),
  cov(
    "packaging-side",
    "Covers packaging side panel",
    289,
    621,
    "Packaging · side",
  ),
  cov(
    "bedding-01",
    "Monochrome Covers bedding design",
    513,
    684,
    "Bedding design",
  ),
  cov(
    "bedding-02",
    "Green palm-print Covers bedding design",
    507,
    624,
    "Bedding design",
  ),
  cov(
    "bedding-03",
    "Night-sky Covers bedding design",
    405,
    527,
    "Bedding design",
  ),
  cov(
    "bedding-04",
    "Palm-tree pattern Covers bedding design",
    566,
    747,
    "Bedding design",
  ),
  cov("woven-labels", "Covers woven label designs", 318, 484, "Woven labels"),
  cov("tag", "Covers hangtag design", 185, 292, "Tag design"),
];
const visualGallery = [
  vis(
    "cover",
    "Cyan and pink sculptural key visual on white",
    "Key visual study 01",
  ),
  vis(
    "key-visual-02",
    "Cyan and pink sculptural composition",
    "Key visual study 02",
  ),
  vis(
    "key-visual-03",
    "Cyan and pink graphic form exploration",
    "Key visual study 03",
  ),
  vis(
    "key-visual-04",
    "Cyan and pink spatial composition",
    "Key visual study 04",
  ),
  vis("key-visual-05", "Cyan and pink graphic study", "Key visual study 05"),
  vis(
    "key-visual-06",
    "Cyan and pink visual exploration",
    "Key visual study 06",
  ),
  img(
    "visual-experiments",
    "explorations",
    "Portfolio selection of collage, sketching and painting work",
    1801,
    707,
    "Collage, sketching & painting · portfolio page 6",
  ),
];
const asset = (
  name: string,
  alt: string,
  width: number,
  height: number,
  caption: string,
): ProjectImage => ({
  src: `/projects/team-wang-under-the-castle/${name}.png`,
  alt,
  width,
  height,
  caption,
});

const cover = asset("cover", "Under the Castle event collage: green pumpkin installation, entrance crowds, TEAM WANG DESIGN signage and medieval exhibition interiors", 1600, 1200, "Original supplied event collage · 2023");
const keyVisuals = [
  asset("key-visual-castle", "Neon green castle illustration with the pumpkin IP and campaign typography", 397, 497, "Castle key visual · original portfolio, page 3"),
  asset("key-visual-entrance", "Illustrated castle entrance framing the green pumpkin IP", 268, 335, "Entrance key visual · original portfolio, page 3"),
  asset("key-visual-moon", "Castle silhouette against a neon green moon", 279, 496, "Moon and castle key visual · original portfolio, page 3"),
  asset("key-visual-pumpkin", "Neon green pumpkin face with TEAM WANG DESIGN campaign lockup", 279, 496, "Pumpkin key visual · original portfolio, page 3"),
];
const posters = [
  asset("poster-vintage-01", "Vintage-style Under the Castle poster with a group of illustrated pumpkin characters", 298, 496, "Vintage poster variation 01 · original portfolio, page 3"),
  asset("poster-vintage-02", "Vintage-style poster featuring the Pumpkie pumpkin character", 298, 496, "Vintage poster variation 02 · original portfolio, page 3"),
  asset("poster-vintage-03", "Vintage-style Hidden Gem poster with an illustrated chest", 298, 496, "Vintage poster variation 03 · original portfolio, page 3"),
  asset("poster-vintage-04", "Vintage-style Spookie poster with an illustrated pumpkin character", 298, 496, "Vintage poster variation 04 · original portfolio, page 3"),
];
const applications = [
  asset("merchandise", "Original Halloween merchandise board: pumpkin plush toys, hot-water bags, towels, notebook, mug, keychains, stickers and apparel", 1594, 561, "Merchandise application board · original portfolio, page 8"),
  asset("packaging", "Original black and green campaign packaging: tote bag, shipping box, product boxes, stickers, tags and labels", 1410, 679, "Packaging application board · original portfolio, page 9"),
];
const events = [
  asset("event-pumpkin", "Giant illuminated green pumpkin installation beneath TEAM WANG DESIGN signage", 429, 407, "Pumpkin installation · crop from the supplied event collage"),
  asset("event-entrance", "Under the Castle entrance arch and visitors at night", 370, 453, "Entrance and visitors · crop from the supplied event collage"),
  asset("event-crowd", "Visitors gathering around the glowing pumpkin installation", 498, 318, "Event atmosphere · crop from the supplied event collage"),
  asset("event-interior", "Stone castle exhibition interior with glowing green TEAM WANG DESIGN signage", 597, 316, "Exhibition environment · crop from the supplied event collage"),
  asset("event-merchandise", "Campaign apparel displayed in the stone exhibition environment", 464, 367, "Merchandise display · crop from the supplied event collage"),
  asset("event-display", "Campaign accessories arranged beneath a stone exhibition arch", 495, 334, "Product display · crop from the supplied event collage"),
];

const teamWangProject: Project = {
  slug: "team-wang-under-the-castle",
  title: "TEAM WANG DESIGN — UNDER THE CASTLE",
  subtitle: "A Halloween world in black and neon green.",
  overviewLabel: "01 / Campaign Overview",
  category: "Campaign Design",
  discipline: "Graphic",
  year: "2023",
  order: 3,
  accent: "#00AB00",
  description: "For TEAM WANG DESIGN's 2023 Halloween campaign, Under the Castle, I developed Halloween-themed illustration key visuals centered around the brand's pumpkin IP. The visual direction combines eerie castle imagery with a distinctive black-and-neon-green palette, extending across online and offline campaign materials.",
  cover,
  gallery: [...keyVisuals, ...posters, ...applications, ...events],
  facts: [
    { label: "Campaign", value: "Under the Castle" },
    { label: "Category", value: "Campaign Design" },
    { label: "Year", value: "2023" },
    { label: "Focus", value: "Halloween illustration key visuals" },
  ],
  sections: [
    {
      id: "main-key-visual",
      title: "Main Key Visual",
      type: "gallery",
      layout: "pair",
      body: ["Pumpkin characters, castle-inspired compositions and expressive typography establish the campaign's black-and-neon-green visual language."],
      images: keyVisuals,
    },
    {
      id: "campaign-posters",
      title: "Campaign Posters",
      type: "gallery",
      layout: "pair",
      body: ["The original vintage-inspired poster variations explore the campaign's illustrated characters and motifs."],
      images: posters,
    },
    {
      id: "merchandise-packaging",
      title: "Merchandise & Packaging",
      type: "gallery",
      layout: "full",
      body: ["The campaign's pumpkin motifs and green-and-black palette extend across the supplied merchandise and packaging applications."],
      images: applications,
    },
    {
      id: "offline-campaign-experience",
      title: "Offline Campaign Experience",
      type: "gallery",
      layout: "pair",
      body: ["The event imagery documents the giant pumpkin installation, exterior signage, entrance, exhibition environment, merchandise displays and visitors."],
      images: events,
    },
  ],
};

export const projects: Project[] = [
  {
    slug: "eleven-oasis",
    title: "Eleven Oasis",
    subtitle: "E-commerce Website Redesign & Conversion Optimization",
    category: "UI/UX Design / E-commerce Website Redesign",
    discipline: "Digital",
    year: null,
    order: 1,
    accent: "#8b3212",
    coverStatement: "A clearer path to purchase.",
    coverContext: "Original website · project context",
    resultsSummary:
      "Project-owner-reported results. GMV growth occurred during the same period; it is not attributed exclusively to the redesign.",
    brandColors: [
      { name: "Space Black", hex: "#252525" },
      { name: "Off White", hex: "#F8F8F8" },
      { name: "Denim Blue", hex: "#0336A5" },
      { name: "Vintage Leather", hex: "#B38B6D" },
      { name: "Deep Rust", hex: "#8B3212" },
      { name: "Solaris", hex: "#F9F871" },
    ],
    description:
      "A comprehensive redesign of an existing menswear e-commerce website, focused on clearer shopping experiences and stronger conversion.",
    cover: homepageBefore,
    gallery: [homepageBefore, pdpBefore],
    website: "https://www.elevenoasis.com/",
    facts: [
      { label: "Project", value: "Redesign of an existing website" },
      { label: "Audience", value: "American men aged 40–65" },
      { label: "Focus", value: "Shopping experience & conversion" },
      { label: "Role", value: "UI/UX design" },
    ],
    comparisons: [
      { label: "Homepage", before: homepageBefore, after: null },
      { label: "Product detail page", before: pdpBefore, after: null },
    ],
    results: [
      {
        value: "+75%",
        label: "Conversion rate",
        detail: "1.2% → 2.1%",
        note: "+0.9 percentage points",
      },
      {
        value: "5×",
        label: "Key module CTA click-through",
        detail: "5% → 25%",
        note: "+400% relative improvement",
      },
      {
        value: "~200%",
        label: "Related business GMV growth",
        detail: "Growth during the same period",
      },
    ],
    resultsNote:
      "Results provided by the project owner. The measurement period, traffic volume, and testing method were not supplied. GMV growth occurred during the same period; it is not attributed exclusively to the redesign.",
    sections: [
      {
        id: "overview",
        title: "A clearer path from discovery to purchase.",
        type: "text",
        body: [
          "Eleven Oasis is a menswear e-commerce brand. Its website already existed; this project was a comprehensive redesign of most of the visual interface and shopping experience, rather than a new website built from scratch.",
          "The objective was to improve the shopping experience for American men aged 40–65 and support higher conversion rates.",
        ],
      },
      {
        id: "challenge",
        title: "An experience with a lot to say.",
        type: "text",
        body: [
          "The original homepage brings together promotional banners, repeated product merchandising, collection campaigns, reviews, user-generated content, and a blog. The original product page combines product imagery, promotions, variants, fit information, bundles, reviews, and FAQs.",
          "These screens suggest opportunities to make the hierarchy clearer, reduce competition between messages, and shorten the path to useful purchase information. These are observations and design hypotheses, not findings from validated usability research.",
        ],
        bullets: [
          "Repeated merchandising creates a long browsing journey.",
          "Promotional messages compete for attention.",
          "Trust-building information appears later on the homepage.",
          "The product page asks shoppers to process dense information.",
        ],
      },
      {
        id: "strategy",
        title: "Clarity at every decision.",
        type: "text",
        body: [
          "The redesign priorities connect information architecture, visual hierarchy, and purchase confidence. Specific implementation decisions should be documented alongside confirmed redesigned screens.",
        ],
        bullets: [
          "Give navigation and product discovery a clear structure.",
          "Present product information in an easy-to-scan hierarchy.",
          "Make primary purchase actions easy to recognize.",
          "Bring brand credibility and purchase reassurance into the journey.",
          "Build coherent layouts across screen sizes.",
        ],
      },
      {
        id: "before-after",
        title: "The starting point. The next chapter.",
        type: "comparison",
        body: [
          "The original screens below are preserved in full. Confirmed redesigned screenshots can be added to the adjacent slots; no reconstructed or fictional “after” screens are shown.",
        ],
      },
      {
        id: "homepage",
        title: "Homepage: organize the discovery journey.",
        type: "gallery",
        layout: "full",
        body: [
          "The original homepage shows category entry points, multiple collection campaigns, product grids, customer reviews, and editorial content. These provide the context for reviewing navigation, merchandising sequence, brand presentation, and CTA hierarchy.",
          "A confirmed redesigned homepage screenshot and its decision annotations are still needed to show the final implementation.",
        ],
        images: [homepageBefore],
      },
      {
        id: "product-detail",
        title: "Product page: support the purchase decision.",
        type: "gallery",
        layout: "full",
        body: [
          "The original PDP contains imagery, price and promotion information, color and size choices, fit and fabric information, bundle offers, purchase CTAs, payment options, reviews, and FAQs.",
          "The design priorities were clearer information hierarchy, stronger CTA prominence, and more useful decision support. A confirmed redesigned PDP is needed to demonstrate the resulting interface changes.",
        ],
        images: [pdpBefore],
      },
      {
        id: "visual-system",
        title: "Personality, with a consistent system.",
        type: "brand",
        body: [
          "The supplied brand guidelines define Space Black and Off White as core colors, with Denim Blue, Vintage Leather, Deep Rust, and Solaris as accents. Roboto Black is the primary headline typeface; Roboto Regular is used for body copy. Impact and Gill Sans are listed as substitutes.",
          "Logo use follows the supplied clear-space and brand-color rules. The photography direction favors authentic outdoor settings, natural light, earthy colors, and real moments of connection. Photography examples in the guideline are treated as references, not as original portfolio artwork.",
        ],
        images: [
          eo(
            "brand-logo",
            "Eleven Oasis original logo from the brand guidelines",
            1400,
            490,
          ),
          eo("logo-clear-space", "Eleven Oasis logo clear-space guideline"),
          eo("logo-colors", "Approved Eleven Oasis logo color variations"),
          eo("brand-colors", "Eleven Oasis brand color specification"),
          eo("brand-typography", "Eleven Oasis Roboto typography guideline"),
        ],
      },
      { id: "results", title: "A measurable shift.", type: "results" },
      {
        id: "final-website",
        title: "Explore Eleven Oasis.",
        type: "external",
        body: [
          "Visit the current menswear storefront. The live site may have evolved since this project; it is not a dated archive of the delivered redesign.",
        ],
      },
    ],
  },
  {
    slug: "early-birds-club",
    title: "Early Birds Club",
    subtitle: "A golf-inspired identity in two directions.",
    category: "Brand Identity / IP Design",
    discipline: "Brand",
    year: null,
    order: 2,
    accent: "#19333a",
    cover: ebcGallery[8],
    gallery: ebcGallery,
    description:
      "Wing and golf-ball symbols, expressive wordmarks, and a flexible identity system for Early Birds Club.",
    facts: [
      { label: "Discipline", value: "Brand identity / IP design" },
      { label: "Source", value: "EBC IP DESIGN 06" },
      { label: "Deliverables", value: "Symbols, lockups & monograms" },
      { label: "Applications", value: "Merchandise & signage concepts" },
    ],
    sections: [
      {
        id: "overview",
        title: "Built around the early birds.",
        type: "text",
        body: [
          "The supplied design document explores two identity directions for Early Birds Club. The first combines a wing with a golf ball; the second develops a double-wing and golf-ball symbol. Each direction extends into wordmarks, monograms, and application concepts.",
          "The work is presented as identity exploration and application mockups. Production status, launch date, and commercial outcomes have not been provided.",
        ],
      },
      {
        id: "direction-one",
        title: "01 / Wing + golf ball.",
        type: "gallery",
        layout: "pair",
        images: ebcGallery.slice(0, 6),
      },
      {
        id: "direction-two",
        title: "02 / Double wings + golf ball.",
        type: "gallery",
        layout: "pair",
        images: ebcGallery.slice(6),
      },
    ],
  },
  teamWangProject,
  {
    slug: "covers",
    title: "Covers",
    subtitle: "An identity for everyday rituals.",
    category: "Branding / Visual Identity / Packaging",
    discipline: "Brand",
    year: "2022",
    order: 4,
    accent: "#9c967d",
    cover: coversGallery[2],
    gallery: coversGallery,
    description:
      "A homeware identity spanning typography, bedding, packaging, woven labels, and tags.",
    facts: [
      { label: "Project", value: "Individual homeware brand" },
      { label: "Year", value: "2022" },
      { label: "Discipline", value: "Identity & packaging" },
      { label: "Scope", value: "Bedding, labels & tags" },
    ],
    sections: [
      {
        id: "overview",
        title: "A considered identity for the home.",
        type: "text",
        body: [
          "Covers is presented in the original portfolio as a 2022 individual homeware brand, with a collection of textiles for bedrooms, bathrooms, and living rooms. The project pairs wordmark exploration with bedding design and physical identity applications.",
          "This selection shows the design work identified in the source portfolio. Pages labeled photography or style reference have been excluded from the artwork gallery.",
        ],
      },
      {
        id: "wordmarks",
        title: "The identity, in type.",
        type: "gallery",
        layout: "pair",
        images: coversGallery.slice(0, 2),
      },
      {
        id: "packaging",
        title: "A tactile visual language.",
        type: "gallery",
        layout: "grid",
        images: coversGallery.slice(2, 5),
      },
      {
        id: "bedding",
        title: "Patterns for personal spaces.",
        type: "gallery",
        layout: "pair",
        images: coversGallery.slice(5, 9),
      },
      {
        id: "details",
        title: "Small details. A complete system.",
        type: "gallery",
        layout: "pair",
        images: coversGallery.slice(9),
      },
    ],
  },
  {
    slug: "visual-experiments",
    title: "Visual Experiments",
    subtitle: "An ongoing conversation with form.",
    category: "Graphic Design / Visual Exploration",
    discipline: "Graphic",
    year: null,
    order: 5,
    accent: "#63cad7",
    cover: visualGallery[2],
    gallery: visualGallery,
    description:
      "A curated selection of key visuals, collage, sketches, and painting from the original portfolio.",
    facts: [
      { label: "Discipline", value: "Graphic design / exploration" },
      { label: "Series", value: "Key visual studies" },
      { label: "Additional work", value: "Collage, sketching & painting" },
      { label: "Source", value: "Portfolio pages 6 & 13" },
    ],
    sections: [
      {
        id: "overview",
        title: "Room to try, question, and explore.",
        type: "text",
        body: [
          "A selection of graphic experiments from the original portfolio, organized as a visual series rather than a project for every PDF page. Cyan and pink key visuals explore form and composition, alongside collage, sketching, and painting studies.",
          "Client, campaign, and date details are not supplied for these pieces; they are presented as visual exploration.",
        ],
      },
      {
        id: "key-visuals",
        title: "Studies in color and form.",
        type: "gallery",
        layout: "grid",
        images: visualGallery.slice(0, 6),
      },
      {
        id: "explorations",
        title: "Across different ways of making.",
        type: "gallery",
        layout: "full",
        images: visualGallery.slice(6),
      },
    ],
  },
];
export const orderedProjects = [...projects].sort((a, b) => a.order - b.order);
export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
