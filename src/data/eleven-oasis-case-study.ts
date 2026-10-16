import type { ProjectImage } from "./projects";

export const homepageUX: ProjectImage = {
  src: "/projects/eleven-oasis/homepage-ux.png",
  original: "/projects/eleven-oasis/homepage-ux.png",
  width: 1600,
  height: 954,
  alt: "Eleven Oasis Homepage UX Strategies: four numbered strategy notes beside the redesigned desktop storefront on a laptop and responsive storefront on an iPhone",
};

export const mobileBrowsing: ProjectImage = {
  src: "/projects/eleven-oasis/mobile-browsing.png",
  width: 1600,
  height: 1148,
  alt: "Eleven Oasis mobile shopping journey: two rows of iPhone mockups showing homepage browsing, collections, filtering, product details and cart interactions",
};

type UXDecision = {
  id: string;
  number: string;
  label: string;
  title: string;
  body: string;
  points: string[];
  images?: ProjectImage[];
};

// Dedicated decision screenshots can be added as authentic image entries.
// An absent images array renders concise editorial copy, without empty frames.
export const uxDecisions: UXDecision[] = [
  {
    id: "dual-collection-navigation",
    number: "01",
    label: "Navigation Strategy",
    title: "One Storefront, Two Shopping Journeys",
    body: "PRINT and CLASSIC GEAR share a storefront, with a collection switcher directly beneath the primary navigation. Keeping that choice visible gives shoppers a clear sense of where they are without introducing a different shopping structure for each collection.",
    points: [
      "An explicit selected state distinguishes the active collection.",
      "The same switching pattern carries across desktop and mobile.",
      "Consistent navigation supports two distinct ways to explore the range.",
    ],
  },
  {
    id: "shoppable-hero",
    number: "02",
    label: "Product Discovery",
    title: "Turning the Hero into a Shopping Entry Point",
    body: "The hero pairs campaign storytelling with direct shopping routes. Featured collections, campaign links and category entry points help visitors move from an initial impression to relevant products.",
    points: [
      "PRINT supports theme-led exploration.",
      "CLASSIC GEAR foregrounds product categories.",
      "A clear shopping CTA sits alongside useful discovery choices.",
    ],
  },
  {
    id: "trust-conversion",
    number: "03",
    label: "Trust & Conversion",
    title: "Building Purchase Confidence Above the Fold",
    body: "Review signals, order volume and the 30-day guarantee bring reassurance into the first screen. Placing these cues close to the shopping CTA helps communicate credibility and fit reassurance before visitors move deeper into the purchase journey.",
    points: [
      "Surface customer review signals early.",
      "Pair order-volume reassurance with the guarantee.",
      "Keep the primary shopping action clear and easy to find.",
    ],
  },
  {
    id: "responsive-design",
    number: "04",
    label: "Responsive Design",
    title: "One Experience, Optimized for Every Screen",
    body: "The desktop and mobile layouts keep the same collection choice and shopping priorities. On smaller screens, the hero and category entries stack into a readable sequence while retaining direct access to products.",
    points: [
      "Keep collection switching visible beneath navigation.",
      "Adapt the hero and product-discovery layout to the available width.",
      "Use mobile-friendly shopping interactions without losing context.",
    ],
  },
];

// The central-iPhone UX breakdown is used by Strategy 01. Keep this Decisions
// gallery empty so the same artwork is not presented twice.
export const homepageDecisionImages: ProjectImage[] = [];
// The supplied mobile composite is presented only in the Problem media column.
// Keep this Decisions gallery empty to avoid duplicating that presentation.
export const mobileBrowsingImages: ProjectImage[] = [];

// Add confirmed redesign exports here when supplied; do not substitute source
// screenshots or generate fictional collection, PDP, or component interfaces.
export const collectionImages: ProjectImage[] = [];
export const productDetailImages: ProjectImage[] = [];
export const interfaceSystemImages: ProjectImage[] = [];

export const designOutcomes = [
  {
    number: "01",
    title: "CLEARER SHOPPING STRUCTURE",
    body: "Introduced differentiated shopping pathways for PRINT and CLASSIC GEAR within a consistent storefront experience.",
  },
  {
    number: "02",
    title: "MORE CONNECTED PRODUCT DISCOVERY",
    body: "Designed clearer product entry points and supporting shopping interfaces across the homepage, collection pages, and product detail pages.",
  },
  {
    number: "03",
    title: "CONSISTENT CROSS-DEVICE DESIGN",
    body: "Developed reusable interface patterns and responsive specifications to support consistency across desktop and mobile experiences.",
  },
] as const;
