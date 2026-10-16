import type { ProjectImage } from "./projects";

export interface ElevenStrategy {
  number: string;
  label: string;
  title: string;
  description: string;
  images: ProjectImage[];
  unavailable?: string;
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
    images: [{ src: "/projects/eleven-oasis/mobile/eleven-oasis-mobile-8.png", width: 679, height: 1148, alt: "Redesigned mobile product detail: pullover imagery, price, guarantee, reviews, Beige / S selection and persistent Add to Cart action" }],
  },
  {
    number: "03", label: "REUSABLE LANDING PAGES", title: "Flexible Experiences for Different Campaigns",
    description: "Reusable landing-page patterns were designed to support different collections and promotional campaigns while maintaining consistency across the storefront.",
    images: [], unavailable: "Dedicated landing-page exports are not available in this case study. The supplied campaign homepage captures do not establish a separate reusable landing-page layout.",
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
