/** Verified against the uploaded PNGs and overview, read left to right, top to bottom.
 * Thumbnails are derived only by proportional resizing; previews use original PNGs.
 */
export type JourneyStage = "discover" | "explore" | "evaluate" | "purchase";
export type JourneySelection = "all" | JourneyStage;
export const journeyStages: { id: JourneySelection; label: string; caption: string }[] = [
  { id: "all", label: "ALL SCREENS", caption: "Explore all 11 screens. Select a stage to highlight its touchpoints, or select a phone for a closer look." },
  { id: "discover", label: "01 / DISCOVER", caption: "Find the right collection and discover new styles." },
  { id: "explore", label: "02 / EXPLORE", caption: "Explore relevant products through clearer browsing pathways." },
  { id: "evaluate", label: "03 / EVALUATE", caption: "Review product information and make confident decisions." },
  { id: "purchase", label: "04 / PURCHASE", caption: "Move from product selection to cart and checkout." },
];
export interface JourneyPhone {
  id: number;
  src: string;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  width: number;
  height: number;
  label: string;
  alt: string;
  stages: JourneyStage[];
}
const phone = (id: number, label: string, detail: string, stages: JourneyStage[]): JourneyPhone => ({
  id, label, stages, width: 679, height: 1148, thumbnailWidth: 240, thumbnailHeight: 406,
  src: `/projects/eleven-oasis/mobile/eleven-oasis-mobile-${id}.png`,
  thumbnail: `/projects/eleven-oasis/mobile/phone-${id}-thumb.webp`,
  alt: `${label} — ${detail}, inside the original iPhone frame`,
});
export const journeyPhones: JourneyPhone[] = [
  phone(1, "Classic Gear Homepage", "seasonal hero, apparel category entry points and best sellers", ["discover", "explore"]),
  phone(2, "Classic Gear Shoppable Campaign", "Rugged Layers campaign with a linked product card and shop-by-occasion entry", ["discover"]),
  phone(3, "Print Homepage", "Halloween campaign, illustrated collection entry points and best sellers", ["discover", "explore"]),
  phone(4, "About Eleven Oasis Print", "brand storytelling and customer reassurance", ["discover"]),
  phone(5, "Seasonal Sale Homepage", "end-of-season campaign and shop-by-sale entry points", ["discover", "explore"]),
  phone(6, "Collection Navigation", "open menu with Print, Classic and best-seller collection links", ["explore"]),
  phone(7, "Classic Gear Collection", "category tiles, best-seller product grid, filter and size-range controls", ["explore"]),
  phone(8, "Product Detail & Buy Box — View 1", "pullover images, price, guarantee, reviews, Beige / S selection and Add to Cart", ["evaluate", "purchase"]),
  phone(9, "Product Detail & Buy Box — View 2", "another capture of the same pullover detail and persistent Add to Cart control", ["evaluate", "purchase"]),
  phone(10, "Shopping Cart", "cart drawer with products, quantities, subtotal and Checkout entry", ["purchase"]),
  phone(11, "Checkout Entry", "order summary, express payment choices, contact and delivery fields; no completed transaction shown", ["purchase"]),
];
