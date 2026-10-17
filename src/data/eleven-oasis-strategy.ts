import type { ProjectImage } from "./projects";

/** Verified originals, numeric order; lossless WebP copies retain every artwork pixel. */
export const pdpUxSlides: ProjectImage[] = [
  {
    "src": "/projects/eleven-oasis/strategy/pdp/01-3595ab55daf3.webp",
    "width": 1600,
    "height": 958,
    "alt": "Product Information Hierarchy — Clarity at the Point of Decision; original PDP UX presentation with annotated storefront detail on a dark blurred background"
  },
  {
    "src": "/projects/eleven-oasis/strategy/pdp/02-7cb89a323108.webp",
    "width": 1600,
    "height": 958,
    "alt": "Product Display — More Detail Shots; original PDP UX presentation with annotated storefront detail on a dark blurred background"
  },
  {
    "src": "/projects/eleven-oasis/strategy/pdp/03-8f36f4c5dba9.webp",
    "width": 1600,
    "height": 958,
    "alt": "Intuitive Size Selection — Making Product Choices Effortless; original PDP UX presentation with annotated storefront detail on a dark blurred background"
  },
  {
    "src": "/projects/eleven-oasis/strategy/pdp/04-54c686a2fb33.webp",
    "width": 1600,
    "height": 958,
    "alt": "Contextual Bundle Upselling — Discover More Without Leaving the PDP; original PDP UX presentation with annotated storefront detail on a dark blurred background"
  },
  {
    "src": "/projects/eleven-oasis/strategy/pdp/05-d74b08a46fa7.webp",
    "width": 1600,
    "height": 958,
    "alt": "Product Detail Transparency — Helping Shoppers Understand What They Buy; original PDP UX presentation with annotated storefront detail on a dark blurred background"
  },
  {
    "src": "/projects/eleven-oasis/strategy/pdp/06-c328e481de65.webp",
    "width": 1600,
    "height": 958,
    "alt": "Recently Viewed Products — Reducing Friction in Product Rediscovery; original PDP UX presentation with annotated storefront detail on a dark blurred background"
  },
  {
    "src": "/projects/eleven-oasis/strategy/pdp/07-0122ad0f6b82.webp",
    "width": 1600,
    "height": 958,
    "alt": "Customer Reviews — Building Trust Through Social Proof; original PDP UX presentation with annotated storefront detail on a dark blurred background"
  }
];


export interface ElevenCampaign {
  id: string;
  name: string;
  label: string;
  support: string;
  image: ProjectImage;
}

export const elevenCampaigns: ElevenCampaign[] = [
  {
    id: "editorial", name: "Winter 2026", label: "Editorial-Led Discovery",
    support: "From inspiration to curated products.",
    image: {
      src: "/projects/eleven-oasis/strategy/campaigns/editorial-full.webp", width: 1280, height: 4766,
      alt: "Winter 2026 editorial campaign: seasonal hero, curated looks, festive edit, bundles, products, customer reviews and storefront footer",
    },
  },
  {
    id: "promotion", name: "Autumn Sale", label: "Promotion-Led Discovery",
    support: "From offers to shoppable deals.",
    image: {
      src: "/projects/eleven-oasis/strategy/campaigns/promotion-full.webp", width: 1280, height: 3487,
      alt: "Autumn Sale promotional campaign: sale hero, offer categories, discounted products, PRINT and CLASSIC GEAR discovery, customer reviews and storefront footer",
    },
  },
];


export interface ElevenStrategy {
  number: string;
  label: string;
  title: string;
  description: string;
  images: ProjectImage[];
  unavailable?: string;
  closing?: string;
}
export const elevenStrategies: ElevenStrategy[] = [
  {
    number: "01", label: "REBUILT HOMEPAGE", title: "Two Collections, Two Shopping Journeys",
    description: "I redesigned the homepage to create clearer shopping pathways for PRINT and CLASSIC GEAR, connecting collection navigation, product discovery, trust signals, and cross-collection exploration within one cohesive storefront.",
    images: [{ src: "/projects/eleven-oasis/strategy/homepage-ux-decisions.png", width: 1600, height: 958, alt: "Homepage UX Decisions: central iPhone with dual-collection navigation, shoppable product discovery, purchase confidence and cross-collection discovery annotations" }],
  },
  {
    number: "02", label: "REDESIGNED PDP BUY BOX", title: "Supporting Confident Purchase Decisions",
    description: "I refined the product purchasing experience by bringing essential product information, variant selection, pricing, and purchase actions into a clearer and more accessible hierarchy.",
    images: pdpUxSlides,
  },
  {
    number: "03", label: "CAMPAIGN LANDING PAGES", title: "One Framework. Two Shopping Intentions.",
    description: "Two campaign experiences shaped around different shopping motivations — seasonal inspiration and promotional discovery.",
    closing: "A consistent design language, adapted to different campaign goals.",
    images: elevenCampaigns.map(campaign => campaign.image),
  },
  {
    number: "04", label: "TRUST SIGNALS", title: "Building Confidence Throughout the Journey",
    description: "Customer reviews, social proof, and purchase assurances were surfaced at relevant touchpoints to help address shopper concerns during browsing and product evaluation.",
    images: [{ src: "/projects/eleven-oasis/strategy/trust-signals.webp", width: 480, height: 355, alt: "Unaltered purchase-confidence detail from the uploaded UX Decisions artwork: review reassurance, orders shipped and 30-day guarantee alongside the shopping action" }],
  },
  {
    number: "05", label: "BRANDING", title: "One Brand, Two Distinct Expressions",
    description: "I developed a more cohesive visual language while allowing PRINT and CLASSIC GEAR to retain distinct personalities through typography, imagery, color, and campaign presentation.",
    // The verified existing guideline images/body are supplied by the page's project data.
    images: [],
  },
  {
    number: "06", label: "BUILT FOR GROWTH", title: "A More Scalable Design Foundation",
    description: "Reusable components, consistent typography, and responsive interface patterns were organized to support future storefront updates and new shopping experiences.",
    images: [], unavailable: "A dedicated component sheet is not available. The case study documents recurring storefront patterns; no technical architecture or measured business growth is claimed.",
  },
];
