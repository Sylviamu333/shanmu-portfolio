# Eleven Oasis case-study asset audit

Scope: `/work/eleven-oasis/`. This audit accompanies the Problem → Strategy → Decisions → Results narrative.

## Authentic material retained

- `source-assets/eleven-oasis-homepage-demo.mp4`: latest clean recording of the redesigned storefront. The existing derived MP4, poster, screen geometry and playback component are unchanged.
- `source-assets/eleven-oasis-macbook.png`: original hardware artwork; its existing derived frame remains unchanged.
- `source-assets/eleven-oasis-mobile-browsing.png`: updated 1600 × 1148 overview, retained byte-for-byte in public as the layout reference. Its six-phone first row and five-phone second row are now built from the 11 individual PNGs in the same order, without displaying the composite underneath them.
- `source-assets/eleven-oasis-mobile-1.png` through `eleven-oasis-mobile-11.png`: all verified, 679 × 1148 RGBA. Byte-identical public PNGs power on-demand previews; 240 × 406 WebP thumbnails preserve the whole image, bezel and shadow without cropping. The typed manifest is `src/data/eleven-oasis-mobile-journey.ts`.
- `source-assets/eleven-oasis-homepage-ux.png`: displayed in full, preserving the original 1600 × 954 composition. The public copy is byte-for-byte identical.
- `source-assets/HOMEPAGE - PC.png` and `source-assets/PDP - pc.png`: original storefront captures, explicitly labelled as pre-redesign context in the existing expandable viewer.
- `0813 Eleven Oasis Guideline V1.pdf`: source of the existing five optimized brand-guideline images. Logo, clear-space, palette and Roboto brand typography references remain unedited.

The strategy artwork already numbers its themes consistently: 01 Navigation Strategy, 02 Product Discovery, 03 Trust & Conversion, 04 Responsive Design. It does not require alteration.

## Material not supplied

The repository currently has no dedicated authentic exports for:

1. Homepage UX breakdown with a central iPhone and navigation/trust/category close-ups.
2. Dedicated annotated Collection and Product Detail exports and final desktop layouts. The newly supplied mobile captures do show the redesigned listing, product detail, buy box, cart and checkout entry.
3. Interface typography scales, vector icon library and sizing specifications, or reusable component/state sheets.

The page uses concise editorial copy and conditional gallery slots for these sections. It renders no empty artwork frames, stock images or fabricated UI. Add genuine `ProjectImage` entries to the page-specific arrays in `src/data/eleven-oasis-case-study.ts` when exports become available; preserve each asset's intrinsic aspect ratio. The mobile journey already has a dedicated interactive Problem presentation; do not duplicate its images in Decisions.

## Typography and specifications

The project owner's complete redesign brief identifies **Oswald / Open Sans** as the storefront interface pairing. The supplied brand-identity PDF separately specifies **Roboto Black / Roboto Regular** for brand applications. These are described separately on the page, and the original brand artwork has not been relabelled as an Oswald/Open Sans component sheet.

No numeric interface type sizes, icon dimensions, spacing tokens or undocumented interaction-state specifications have been invented. Existing navigation and reassurance icons are described as seen in the supplied storefront artwork and walkthrough, without generating an imitation icon library.

## Outcomes

Results use the project owner's three supplied design-deliverable statements and reflection. No conversion, revenue, SEO or other business-performance metric is rendered as a result of this redesign. The page explicitly distinguishes deliverables from verified business impact.

## Interactive mobile journey

The existing Problem right column still stacks PC SHOPPING JOURNEY, the unchanged MacBook and caption, then MOBILE SHOPPING JOURNEY / From Discovery to Checkout. The gallery and MacBook share the same outer boundaries. Desktop uses six columns (six + five devices), tablet four and mobile two; stage buttons scroll horizontally on mobile.

Verified source mapping (all filenames have the `eleven-oasis-mobile-` prefix and `.png` extension):

| File | Visible interface | Stages |
| --- | --- | --- |
| 1 | Classic Gear homepage, categories, best sellers | Discover, Explore |
| 2 | Rugged Layers shoppable campaign | Discover |
| 3 | Print homepage, Halloween and collection entries | Discover, Explore |
| 4 | About Eleven Oasis Print brand story | Discover |
| 5 | Seasonal sale campaign and shopping entries | Discover, Explore |
| 6 | Open collection navigation menu | Explore |
| 7 | Classic Gear collection, filters and listings | Explore |
| 8 | Pullover detail, guarantee, reviews, Beige / S, Add to Cart | Evaluate, Purchase |
| 9 | Another near-identical capture of the same product and buy box | Evaluate, Purchase |
| 10 | Cart drawer, quantities, subtotal, Checkout link | Purchase |
| 11 | Checkout contact/delivery form and express payment entry | Purchase |

Images 8 and 9 are separate uploaded captures of the same interface, not evidence of two distinct funnel steps. No completed transaction or separate variant-selector screenshot is claimed. No numbered assets are missing.

ALL SCREENS starts fully emphasized. Stage buttons expose aria-pressed; matching devices get a restrained outline and unrelated devices dim to .25 over 300ms ease-out, with no layout reflow or scaling. The stage caption describes the selected touchpoint. Every phone remains clickable.

The native dialog follows the existing ImageGallery pattern with a scoped implementation: original full-frame PNG, contextual label/index, Previous/Next (wrapping), Left/Right arrow keys, close button, Escape, outside click, native modal focus containment, restoration to the invoking phone and background scroll locking. Original PNGs mount only when requested. No new dependency or shared gallery change.

Each outer phone item reveals once from opacity 0 / translateY(20px) / scale(.985) to opacity 1 / translateY(0) / scale(1), over 580ms with a 65ms reading-order stagger and cubic-bezier(.22,1,.36,1). A stable gallery IntersectionObserver starts the sequence. Native animation effects are cancelled on completion. Stage interaction or keyboard focus finishes any pending entrance so controls stay visible. Inner buttons own filtering independently. There is no floating loop or carousel.

Reduced-motion users see all items immediately with no stage transitions. Preference changes cancel pending motion. Without JavaScript, missing APIs or failed animation setup, server-rendered individual phones remain visible in order. All source assets remain unmodified.

## Validation of the interactive gallery

Lint, TypeScript, production export and content checks pass. Chromium checks cover 320, 390, 600, 601, 768, 1000, 1001, 1024, 1440, 1920, 2560 and 3840px widths: no page overflow, consistent intrinsic proportions, exact MacBook/gallery outer alignment, original six-plus-five desktop ordering and no stage-driven reflow. Actual intermediate stagger/opacity frames, one-time scrolling behavior, repeated filtering, all preview controls, keyboard focus containment/restoration, Escape/outside close, mobile touch, reduced-motion changes, no-JavaScript content and gallery initialization fallbacks were exercised. Full-resolution requests occur only after opening previews. Desktop and mobile MacBook playback/pause/resume pass. Rendered Overview, shared header/footer, section navigation, MacBook, Problem copy and all later sections match the preceding build. All 11 public PNG originals and the updated overview match their source files byte-for-byte.
