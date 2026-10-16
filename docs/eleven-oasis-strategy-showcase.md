# Eleven Oasis interactive strategy showcase

Route: `/work/eleven-oasis/`. The four main anchors remain Problem → Strategy → Decisions → Results, with the shared navigation/footer and all existing Problem media interactions preserved.

## Reference and layout

The owner confirmed the external ChatGPT layout screenshot has no repository path and authorized implementation from the written specifications: approximately 70/30 desktop media/control proportions, numbered rectangular controls, charcoal selection, gray inactive states and descriptive copy below the controls. At 950px and below, the order is selectors → media → description. The Strategy heading precedes the component.

Six semantic buttons default to 01. One React selection drives both media and text, without timers, scrolling or page navigation. Each button has separate number and label blocks and aria-pressed. Inactive panels/descriptions are inert and excluded from the accessibility tree. Content fades out over 140ms, then in over 200ms; reduced motion disables transitions. Absolute media panels and overlapping description grid cells preserve stable dimensions. Images use contain, correct source dimensions, and the existing native-dialog ImageGallery enlargement pattern. Media is mounted on first selection and reused afterwards.

## Verified evidence

| Strategy | Asset / handling |
| --- | --- |
| 01 Rebuilt Homepage | `source-assets/eleven-oasis-homepage-ux-decisions.png`, 1600 × 958, copied byte-for-byte to `public/projects/eleven-oasis/strategy/homepage-ux-decisions.png`. Central mobile UI and annotated navigation/discovery/reassurance details. |
| 02 Redesigned PDP Buy Box | Owner-confirmed `source-assets/eleven-oasis-homepage-ux-decisions2.png`, despite its filename, is the final PDP artwork (1617 × 973). Copied byte-for-byte to `/projects/eleven-oasis/strategy/pdp-ux-decisions.png`. Complete 2×2 breakdown of product information hierarchy, size selection, bundle upselling and product detail transparency, with the full iPhone on the right. Replaces the former single-phone capture only in this strategy. |
| 03 Reusable Landing Pages | No dedicated landing-page exports. A restrained text state explains the limitation; campaign homepage captures are not relabelled as standalone landing pages. Owner-supplied strategy copy remains. |
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
