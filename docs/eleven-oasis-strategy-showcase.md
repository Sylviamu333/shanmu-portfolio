# Eleven Oasis interactive strategy showcase

Route: `/work/eleven-oasis/`. The four main anchors remain Problem → Strategy → Decisions → Results, with the shared navigation/footer and all existing Problem media interactions preserved.

## Reference and layout

The owner confirmed the external ChatGPT layout screenshot has no repository path and authorized implementation from the written specifications: approximately 70/30 desktop media/control proportions, numbered rectangular controls, charcoal selection, gray inactive states and descriptive copy below the controls. At 950px and below, the default order is selectors → media → description. Strategy 03 places its heading before the media, then supporting copy afterwards, and stacks the two browser previews at 700px and below. The Strategy heading precedes the component.

Six semantic buttons default to 01. One React selection drives both media and text, without timers, scrolling or page navigation. Each button has separate number and label blocks and aria-pressed. Inactive panels/descriptions are inert and excluded from the accessibility tree. Content fades out over 140ms, then in over 200ms; reduced motion disables transitions. Absolute media panels and overlapping description grid cells preserve stable dimensions. Images use contain, correct source dimensions, and the existing native-dialog ImageGallery enlargement pattern. Media is mounted on first selection and reused afterwards.

## Verified evidence

| Strategy | Asset / handling |
| --- | --- |
| 01 Rebuilt Homepage | `source-assets/eleven-oasis-homepage-ux-decisions.png`, 1600 × 958, copied byte-for-byte to `public/projects/eleven-oasis/strategy/homepage-ux-decisions.png`. Central mobile UI and annotated navigation/discovery/reassurance details. |
| 02 Redesigned PDP Buy Box | Owner-confirmed `source-assets/eleven-oasis-homepage-ux-decisions2.png`, despite its filename, is the final PDP artwork (1617 × 973). Copied byte-for-byte to `/projects/eleven-oasis/strategy/pdp-ux-decisions.png`. Complete 2×2 breakdown of product information hierarchy, size selection, bundle upselling and product detail transparency, with the full iPhone on the right. Replaces the former single-phone capture only in this strategy. |
| 03 Campaign Landing Pages | Dedicated Winter 2026 (`eleven-oasis-strategy-03-editorial-full.png`, 1280 × 4766) and Autumn Sale (`eleven-oasis-strategy-03-promotion-full.png`, 1280 × 3487) exports, displayed as two independently scrolling browser previews. Lossless WebP derivatives preserve every source pixel. Visual layout reference: `eleven-oasis-landpage-ux-decisions3.png`, 1600 × 958. |
| 04 Trust Signals | Lossless 480 × 355 WebP detail from the new UX Decisions image, crop rectangle `(1080, 55, 1560, 410)`. Includes the existing purchase-confidence annotation and entire shopping/reassurance inset. Statistics are original artwork content, not claimed redesign outcomes. |
| 05 Branding | Existing `brand-logo.webp` (1400 × 490), `logo-clear-space.webp`, `logo-colors.webp`, `brand-colors.webp`, `brand-typography.webp` (all four 1800 × 1350). The same five unmodified guideline images are contained in a compact grid, each enlargeable. The original verified brand text is available under Brand specifications. |
| 06 Built for Growth | No authentic reusable-component sheet or technical architecture export. A text state distinguishes documented recurring patterns from unverified technical implementation or business impact. |

All original source files remain untouched. The older `eleven-oasis-homepage-ux.png` (1600 × 954) remains archived and verified but is no longer rendered alongside its replacement.

## Cleanup

- Replaced the old Strategy summary and standalone `#homepage` image wrapper with the showcase.
- Moved the five-image Brand Guidelines gallery and its two factual paragraphs from Decisions into Strategy 05; removed the obsolete standalone branding wrapper and its CSS.
- Retained the Decisions typography, iconography and reusable-components rationale. Updated its cross-reference from "guideline below" to "guideline in Strategy 05".
- Preserved all other Decisions content and Results. Existing Collection/PDP articles are properly nested Decisions content, not redundant top-level sections, and were retained. Their original-storefront research viewer remains.
- Existing empty conditional gallery arrays produce no empty rendered frames; no duplicate mobile gallery or new top-level section was added.
- Updated content validation to check the four main anchors, six selectors and new authentic default image instead of requiring the superseded `#homepage` block.

## Changed files

- `src/components/eleven-oasis/ElevenOasisStrategyShowcase.tsx` and `.css`: selected-state controls, media, descriptions and responsive layout.
- `src/components/eleven-oasis/ElevenOasisCaseStudy.tsx` and `.css`: replace the old Strategy presentation and relocate the obsolete branding block; remove its unused styles.
- `src/data/eleven-oasis-strategy.ts`: typed six-strategy copy and verified media manifest.
- `src/data/eleven-oasis-case-study.ts`: correct the no-duplicate Homepage UX Decisions asset comment.
- `public/projects/eleven-oasis/strategy/homepage-ux-decisions.png` and `trust-signals.webp`: authentic default evidence and lossless detail.
- `scripts/check-content.mjs`: update main-anchor/default-evidence validation and check strategy paths.
- This report and `docs/eleven-oasis-case-study-assets.md`: updated provenance and missing-asset notes.

## Validation

Lint, TypeScript, production build and exported-content checks pass. Browser verification covered 320, 390, 600, 768, 950, 951, 1024, 1440, 1920 and 2560px widths. All six strategies retain stable showcase dimensions with correctly contained images, accessible controls and the required mobile order. Actual intermediate fade frames, rapid repeated changes, reduced motion, keyboard activation/focus, touch selection and image enlargement were tested. All four main anchors work. Existing phone stage filtering/lightbox and MacBook autoplay/pause/resume work on desktop and mobile. Rendered Overview, section navigation, Problem, Results and shared header/footer match the preceding build. Decisions matches after removing only the relocated branding block and updating its cross-reference. The source PNG copy and lossless trust-detail crop pass byte/pixel identity checks. No source assets were modified.

## Strategy 02 final PDP asset replacement

The intended `eleven-oasis-pdp-ux-decisions.png` was absent. The owner explicitly confirmed using the visually verified `eleven-oasis-homepage-ux-decisions2.png` instead. The original upload remains untouched. Only Strategy 02’s image mapping, intrinsic dimensions and alt text changed, using the existing contained ImageGallery and enlargement. Its title/description, default Strategy 01 selection, all other media, typography, transitions and layout remain unchanged. The four annotation titles are embedded in the PNG and were not duplicated as visible HTML.

Validation for this replacement: lint, TypeScript, production build and exported-content checks pass. Browser checks at nine widths (320–1920px) confirm no overflow, complete contained artwork and working enlargement. Existing showcase dimensions match the preceding build at 390, 768 and 1440px. All six selections, keyboard/touch controls, intermediate fade frames and Strategy 01 video pause/resume pass. The public PNG is byte-identical to the approved source.


## Strategy 03 final campaign visual

### Verified assets

- `source-assets/eleven-oasis-landpage-ux-decisions3.png`: 1600 × 958, flattened layout reference. It informed the two-window proportions and centered white captions. Since the photographic background cannot be cleanly separated from its windows and lettering, the implementation uses the owner-permitted restrained charcoal/warm radial CSS gradients. No stock photo or generated replacement is used.
- `source-assets/eleven-oasis-strategy-03-editorial-full.png`: 1280 × 4766, Winter 2026 on the left, including seasonal hero, looks, bundles, products, reviews and footer.
- `source-assets/eleven-oasis-strategy-03-promotion-full.png`: 1280 × 3487, Autumn Sale on the right, including sale hero, offer categories, products, collection discovery, reviews and footer.

The two fully opaque screenshots were converted to lossless RGB WebP at their original dimensions. Pixel comparisons are exact. The public derivatives are `public/projects/eleven-oasis/strategy/campaigns/editorial-full.webp` (2,273,422 bytes) and `promotion-full.webp` (1,410,416 bytes). All original source assets remain unchanged.

### Implementation

`Strategy03CampaignShowcase.tsx` owns two campaign browser components, each with one contained full-length image, one WAAPI transform timeline, an IntersectionObserver and a ResizeObserver. No duplicate screenshot or decorative browser chrome is added. Frames, titles and background remain stationary. Each distance is measured independently as `max(0, renderedImageHeight − viewportHeight)`. Resize updates keyframes without replacing the animation or resetting its phase. Only `translate3d` changes during playback; React does not render on every frame.

Winter holds at the top for 1 second, travels downward for 22 seconds, holds at the exact bottom for 1.5 seconds and returns over 3 seconds. Autumn uses a 2-second top hold and 20-second downward journey, then the same bottom hold and return. Both loop through their own top hold and use cubic-bezier(.45, 0, .55, 1) for smooth journeys. There is no overshoot or blank area below either screenshot.

Hovering a browser pauses only that campaign and mouse leave resumes its current position. Separate semantic controls with 44px targets support keyboard and touch pause/resume. Inactive, offscreen and hidden-document animations pause. Selecting Strategy 03 again resets both to the true top with their individual holds. Reduced motion keeps both first frames visible and disables scrolling. Cleanup cancels animations and disconnects observers/listeners.

The third selector is now `03 / CAMPAIGN LANDING PAGES`. Its exact requested heading, introduction, compact campaign subheadings/supporting lines and closing statement use the existing case-study type hierarchy. Other selectors and copy are unchanged. Strategy 01 remains the initial selection.

### Layout and scope

The desktop Strategy split, outer/media widths, right-column position and 46px selector dimensions are unchanged. Two equal 711:452 viewports sit side by side inside the original media area. Strategy 03 alone may reserve extra height for its requested description. Its longer copy is excluded from the shared inactive-description grid, preserving all other strategies’ previous dimensions.

At 950px and below, Strategy 03 uses selectors → heading → visual → supporting copy. At 700px and below, only its active media panel grows to fit two stacked previews. Other strategies retain their previous layout and dimensions. Scrolling the host page remains native. No horizontal overflow or enormous unmasked page images are introduced. Strategy 01 video, Strategy 02 walkthrough/enlargement and Strategy 04–06 remain unchanged.

### Files changed for Strategy 03

- `src/components/eleven-oasis/Strategy03CampaignShowcase.tsx` and `.css`: new isolated visual, lifecycle, controls and scoped responsive layout/copy rules.
- `src/components/eleven-oasis/ElevenOasisStrategyShowcase.tsx`: route Strategy 03 to its renderer and show its requested supporting copy.
- `src/data/eleven-oasis-strategy.ts`: verified campaign media/timings and Strategy 03-only label/copy changes.
- The two lossless public WebP assets above.
- This report.

### Strategy 03 verification

Lint, TypeScript, production build and exported-content checks pass. Real-time browser observation covers both complete independent cycles, initial holds, exact bottom holds, smooth return and subsequent top holds. Intermediate screenshots confirm both real hero states and both complete footer states without exposed gaps. Source-to-WebP comparisons are pixel-identical.

Chromium checks at 320, 390, 600, 700, 701, 768, 950, 951, 1024, 1440 and 1920px confirm equal windows, correct mobile order/stacking, no horizontal overflow, fixed right-column coordinates and unchanged selector heights. Baseline comparisons confirm other strategies retain their previous showcase/media/selector/description dimensions. Hover isolation, keyboard pause/resume, restart-on-selection, offscreen pause/resume, reduced-motion static first frames and touch controls pass. Twelve repeated strategy reactivations retain exactly two images and two timelines with only their initial image requests. All six selectors, Strategy 01 video and Strategy 02 walkthrough/enlargement remain functional. Other strategy descriptions and server-rendered content outside the showcase match the previous build. No browser errors occurred.
