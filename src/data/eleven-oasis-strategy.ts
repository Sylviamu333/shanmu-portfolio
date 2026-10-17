import type { ProjectImage } from "./projects";

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
    images: [{ src: "/projects/eleven-oasis/strategy/pdp-ux-decisions.png", width: 1617, height: 973, alt: "Eleven Oasis PDP UX Decisions: a two-by-two breakdown of product information hierarchy, intuitive size selection, contextual bundle upselling and product detail transparency, beside the complete redesigned product page on an iPhone" }],
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
