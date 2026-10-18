export type HeatPage = "homepage" | "pdp" | "collection" | "campaign";
export type EvidenceDevice = "Desktop" | "Mobile";
export type HeatView = {
  id: string; page: HeatPage; device: EvidenceDevice; label: string; asset: string; source: number;
  observation: string; implication: string; marker?: { value: string; label: string }[];
};
export const heatPages: { id: HeatPage; label: string }[] = [
  { id: "homepage", label: "HOMEPAGE" }, { id: "pdp", label: "PRODUCT PAGE" },
  { id: "collection", label: "COLLECTION" }, { id: "campaign", label: "CAMPAIGN" },
];
export const heatViews: HeatView[] = [
  { id: "home-desktop-click", page: "homepage", device: "Desktop", label: "Homepage · click map", asset: "homeDesktopClick", source: 3,
    observation: "Visible click marks cluster around navigation, search, cart and the campaign hero.",
    implication: "Keep shopping entry points explicit and easy to find. Treat lower-page discovery as something to test, rather than assuming every visitor sees it." },
  { id: "home-desktop-scroll", page: "homepage", device: "Desktop", label: "Homepage · scroll depth", asset: "homeDesktopScroll", source: 3,
    observation: "In this desktop capture, 53.3% reached the Best Sellers boundary and 24.7% reached the deeper Shop the Look boundary. Each marker describes exposure at a particular depth.",
    implication: "Prioritize useful entry points earlier in the page and test whether a shorter route improves discovery. Scroll exposure alone does not explain why visitors stopped.",
    marker: [{ value: "53.3%", label: "Best Sellers boundary" }, { value: "24.7%", label: "Shop the Look boundary" }] },
  { id: "home-mobile-click", page: "homepage", device: "Mobile", label: "Homepage · click map", asset: "homeMobileClick", source: 2,
    observation: "The mobile capture highlights the logo, search, cart and top navigation. Its visible interaction marks are concentrated near these early shopping controls.",
    implication: "Maintain a clear mobile navigation hierarchy and make collection entry points recognizable without requiring a long scroll." },
  { id: "home-mobile-scroll", page: "homepage", device: "Mobile", label: "Homepage · scroll depth", asset: "homeMobileScroll", source: 2,
    observation: "The source shows a 34% scroll marker at the Gifting for Him area in this mobile capture.",
    implication: "Review the length and order of promotional modules, then validate whether important shopping pathways are exposed earlier.", marker: [{ value: "34%", label: "Gifting for Him depth" }] },
  { id: "pdp-flex-desktop", page: "pdp", device: "Desktop", label: "FlexComfort shirt · clicks", asset: "pdpFlexDesktop", source: 1,
    observation: "Click marks are visible on product imagery, color choices, size and fit controls. The capture supports a closer look at product evaluation, without establishing purchase intent or confusion.",
    implication: "Make fit, color and size choices easy to understand, with supporting information near the purchase decision." },
  { id: "pdp-linen-desktop", page: "pdp", device: "Desktop", label: "Linen-cotton shirt · clicks", asset: "pdpLinenDesktop", source: 4,
    observation: "The linen-cotton PDP has clustered marks around color swatches, sizes, fabric options and fit. A high concentration of clicks does not, by itself, establish usability friction.",
    implication: "Test clearer selection feedback and concise fit guidance instead of adding more undifferentiated product copy." },
  { id: "pdp-linen-desktop-scroll", page: "pdp", device: "Desktop", label: "Linen-cotton shirt · scroll", asset: "pdpLinenDesktopScroll", source: 4,
    observation: "A visible 41.6% scroll marker sits near Add to Cart in this desktop capture. Deeper supporting content receives less exposure in the displayed map.",
    implication: "Review the distance to the primary action and keep key reassurance close to it. This capture does not show whether a visitor purchased before scrolling farther.", marker: [{ value: "41.6%", label: "Near Add to Cart" }] },
  { id: "pdp-big-desktop", page: "pdp", device: "Desktop", label: "Big & Tall shirt · clicks", asset: "pdpBigDesktop", source: 9,
    observation: "The Big & Tall PDP capture shows marks on imagery, color, size and fit choices in the first screen.",
    implication: "Keep size and fit information visible during evaluation and investigate whether lower product details support those choices." },
  { id: "pdp-mobile-scroll", page: "pdp", device: "Mobile", label: "Linen-cotton shirt · scroll", asset: "pdpLinenMobileScroll", source: 4,
    observation: "The mobile scroll capture marks 27.2% at Complete the Look and 10.8% at a deeper product-story area. These are page-depth observations, not conversion rates.",
    implication: "Consider earlier access to fit, reassurance and complementary products, then test the placement rather than attributing drop-off to a single cause.", marker: [{ value: "27.2%", label: "Complete the Look depth" }, { value: "10.8%", label: "Deeper product-story area" }] },
  { id: "pdp-linen-mobile", page: "pdp", device: "Mobile", label: "Linen-cotton shirt · clicks", asset: "pdpLinenMobile", source: 4,
    observation: "The mobile capture shows marks around imagery and purchase controls. A tracking notice obscures an embedded area, limiting what can be concluded about that control.",
    implication: "Use this map alongside a fresh recording or interaction trace before drawing conclusions about the embedded fit experience." },
  { id: "pdp-big-mobile", page: "pdp", device: "Mobile", label: "Big & Tall shirt · clicks", asset: "pdpBigMobile", source: 9,
    observation: "Visible mobile marks include product-gallery thumbnails and header controls. The screenshot does not quantify how many interactions led to a purchase.",
    implication: "Support image exploration while keeping product choices and the purchase action easy to reach." },
  { id: "collection-best-desktop", page: "collection", device: "Desktop", label: "Best sellers · clicks", asset: "bestDesktop", source: 7,
    observation: "Click marks appear on category entries and collection-navigation controls in the Best Sellers capture. The accompanying source also documents pagination activity.",
    implication: "Review category organization and first-page merchandising, then test whether shoppers can find relevant products with fewer detours." },
  { id: "collection-sale-desktop", page: "collection", device: "Desktop", label: "Sale collection · clicks", asset: "saleDesktop", source: 6,
    observation: "The sale-collection capture has marks around header and collection-navigation controls, with comparatively sparse visible marks on the displayed product entries.",
    implication: "Test clearer promotion information on product cards and filtering that matches sale-shopping needs." },
  { id: "collection-big-desktop", page: "collection", device: "Desktop", label: "Big & Tall · filters", asset: "bigDesktop", source: 8,
    observation: "The Big & Tall capture shows click marks on filter options, including sizes.",
    implication: "Keep size criteria accessible and preserve filtering context while visitors explore the collection." },
  { id: "collection-best-mobile", page: "collection", device: "Mobile", label: "Best sellers · pagination", asset: "bestMobile", source: 7,
    observation: "The numbered click concentrations sit on pagination in this mobile Best Sellers capture. Continued paging is visible; the reason for it is not established.",
    implication: "Evaluate product order and product-card information before treating more paging as either success or friction." },
  { id: "collection-sale-mobile", page: "collection", device: "Mobile", label: "Sale collection · clicks", asset: "saleMobile", source: 6,
    observation: "The mobile sale capture highlights cart, search and top navigation. It does not independently establish why visitors returned to those controls.",
    implication: "Check whether sale categories, promotion cues and product discovery meet the visitor’s immediate shopping goal." },
  { id: "collection-big-mobile", page: "collection", device: "Mobile", label: "Big & Tall · pagination", asset: "bigMobile", source: 8,
    observation: "The Big & Tall mobile screenshot places numbered click concentrations on pagination.",
    implication: "Preserve browsing position and selected criteria while testing ways to make the long product list easier to explore." },
  { id: "campaign-desktop", page: "campaign", device: "Desktop", label: "Seasonal campaign · clicks", asset: "campaignDesktop", source: 5,
    observation: "The seasonal campaign has visible desktop marks over scene tiles and the product grid.",
    implication: "Connect editorial scenes to clear shopping actions and evaluate which entry points help visitors reach products." },
  { id: "campaign-mobile", page: "campaign", device: "Mobile", label: "Seasonal campaign · context", asset: "campaignMobile", source: 5,
    observation: "The mobile campaign captures show a tall hero and curated-look content. The supplied excerpt does not provide a comparable numeric scroll marker for this view.",
    implication: "Explore a shorter story-to-product route and validate it with comparable mobile scroll evidence." },
];

export type ResearchMetric = { id: string; name: string; control: number; variant: number; precision: number; unit: "%" | "$"; reportedChange?: number };
export const shopLookExperiments = {
  mobile: {
    name: "Mobile homepage · Shop the Look", source: "abtest5", titleAsset: "mobileTestTitle",
    summary: "All three displayed rates increased in this mobile snapshot. The report does not show the exact variant layout or establish a statistically significant winner.",
    metrics: [
      { id: "conversion", name: "Conversion rate", control: 5.82, variant: 7.24, precision: 2, unit: "%", reportedChange: 24.53 },
      { id: "cart", name: "Add-to-cart rate", control: 18.4, variant: 19.0, precision: 1, unit: "%", reportedChange: 3.33 },
      { id: "views", name: "Product-page-view rate", control: 53.2, variant: 54.0, precision: 1, unit: "%", reportedChange: 1.49 },
    ] satisfies ResearchMetric[],
  },
  desktop: {
    name: "Desktop homepage · Shop the Look", source: "abtest3", titleAsset: "desktopTestTitle",
    summary: "Conversion increased, add-to-cart decreased, and product-page views were slightly lower. These mixed results warrant further investigation.",
    metrics: [
      { id: "conversion", name: "Conversion rate", control: 6.357, variant: 6.806, precision: 3, unit: "%" },
      { id: "cart", name: "Add-to-cart rate", control: 15.65, variant: 13.61, precision: 2, unit: "%" },
      { id: "views", name: "Product-page-view rate", control: 35.70, variant: 35.60, precision: 2, unit: "%" },
    ] satisfies ResearchMetric[],
  },
};
export const mobileAudienceResults = [
  { name: "New visitors", metrics: [
    { id: "conversion", name: "Conversion rate", control: 4.842, variant: 6.510, precision: 3, unit: "%" },
    { id: "cart", name: "Add-to-cart rate", control: 15.64, variant: 16.82, precision: 2, unit: "%" },
    { id: "views", name: "Product-page-view rate", control: 48.60, variant: 50.09, precision: 2, unit: "%" },
  ] satisfies ResearchMetric[] },
  { name: "Returning visitors", metrics: [
    { id: "conversion", name: "Conversion rate", control: 8.649, variant: 9.934, precision: 3, unit: "%" },
    { id: "cart", name: "Add-to-cart rate", control: 26.49, variant: 27.15, precision: 2, unit: "%" },
    { id: "views", name: "Product-page-view rate", control: 66.49, variant: 68.21, precision: 2, unit: "%" },
  ] satisfies ResearchMetric[] },
];
export const separateTestMetrics: ResearchMetric[] = [
  { id: "conversion", name: "Conversion rate", control: 8.051, variant: 10.088, precision: 3, unit: "%", reportedChange: 25.30 },
  { id: "cart", name: "Add-to-cart rate", control: 19.49, variant: 21.49, precision: 2, unit: "%", reportedChange: 10.26 },
  { id: "aov", name: "Average order value", control: 69.56, variant: 73.15, precision: 2, unit: "$", reportedChange: 5.16 },
];
export const relativeChange = (control: number, variant: number) => (variant / control - 1) * 100;
export const formatMetric = (metric: ResearchMetric, value: number) => metric.unit === "$" ? `$${value.toFixed(metric.precision)}` : `${value.toFixed(metric.precision)}%`;
export const formatChange = (value: number) => `${value > 0 ? "+" : value < 0 ? "−" : ""}${Math.abs(value).toFixed(1)}%`;
