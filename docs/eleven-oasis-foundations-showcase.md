# Strategy 06 — design foundations

Only Strategy 06's left presentation and requested right-side heading/copy change.
The six navigation buttons, parent stage dimensions, other strategies, mobile
journey, homepage, navigation, footer and other project pages stay unchanged.

## Source inspection

Both uploaded guideline images are 2537 × 1671:

- `source-assets/eleven-oasis-font system.png`
- `source-assets/eleven-oasis-icon system.png`

The typography sheet documents Oswald Semibold for banner headings (desktop 32px /
mobile 28px), section headings (32 / 26), PDP titles (24 / 18), SHOP NOW (24 / 18)
and ADD TO CART (16 / 16). Open Sans supplies body/product text (14 / 14 Regular),
PDP prices (24 / 24 Semibold), product-card prices (18 / 16 Semibold), option
labels (14 / 14 Semibold) and supporting interface text. These rules concern the
storefront UI; Strategy 05's separate brand-identity guideline is untouched.

Actual specimen headings use 32px / 26px Oswald 600, the SHOP NOW specimen uses
24px / 18px Oswald 600, and the primary-price specimen uses 24px Open Sans 600.
Metadata explicitly labels desktop/mobile specifications. Mobile shows a simpler
set of examples at their documented sizes rather than shrinking the whole sheet.

Oswald and Open Sans variable Latin subsets are locally hosted under
`public/fonts/eleven-oasis-foundations/`, obtained from the versioned
`@fontsource-variable/{oswald,open-sans}@5.3.0` packages. The original SIL OFL
licenses are included. Font families are scoped to this presentation; no global
font, dependency or Next.js font configuration changes.

## Four scenes / one timeline

| Timeline | Scene | Content |
| --- | --- | --- |
| 0–3s | Typography System | Live Oswald/Open Sans specimens and verified desktop/mobile values |
| 3–6s | Iconography System | Twelve original icon crops in Fabric, Product, Care and Purchase groups |
| 6–9s | Reusable UI Patterns | Original product card, CTAs, price/promotion, swatches/sizes, reviews and reassurance |
| 9–12s | Cross-Device Consistency | Original desktop homepage, mobile phone, PDP and campaign excerpts |

A single independent GSAP timeline controls all layers. Transitions last 500ms
with `power2.inOut`; icons enter 10px upward with a gentle stagger and their group
labels follow. The final half-second crossfade restores the exact opening pose.
The full loop is 12 seconds. No Strategy 05 content, clock or animation is reused.

Four indicators and the circular play/pause button reuse the existing PDP control
styles. Manual selection seeks the same master; when paused or motion is reduced,
it seeks a fully composed reading pose. Keyboard arrows, Enter/Space and touch
swipes work. Explicit pause, inactive Strategy 06, offscreen content and a hidden
document all pause the timeline. Returning to Strategy 06 resumes the same time;
resizing also preserves it. Reduced motion disables autoplay and retains manual
access to every scene. Observers, listeners and GSAP context are cleaned up.

## Original asset excerpts

The 26 lossless WebPs are raster excerpts, **not editable vector icons**. Exact
source filenames, SHA-256 hashes, final crop bounds, dimensions and output hashes
are in `public/projects/eleven-oasis/foundations/manifest.json`.

- Twelve icons: the original icon-system PNG, cropped without redrawing.
- Product card, SHOP NOW, View All and desktop browser: `HOMEPAGE - PC.png`.
- Prices, sizes/colors, rating, ADD TO CART, reassurance and PDP:
  `eleven-oasis-pdp-mobile-full.png`.
- Mobile phone: `eleven-oasis-mobile-1.png`, retaining its existing device frame.
- Campaign: `eleven-oasis-strategy-03-editorial-full.png`.

`python scripts/prepare-eleven-oasis-foundations.py` reproduces the crops. The
source assets are preserved. The interface-pattern composition is editorial
evidence of recurring visual patterns, not a claim that a production component
library or measured business impact exists.

At a panel width at or below 700px, typography is arranged in two compact horizontal
bands, icon groups retain their original shapes with fewer captions, and a smaller
set of UI excerpts is presented at a larger size. The overall media dimensions and
surrounding strategy layout remain fixed.

## Validation

- Lint, TypeScript, production build and existing content/playback checks.
- `node scripts/check-eleven-oasis-foundations.mjs --build` validates sources,
  asset hashes, final crop dimensions, font licenses and export copies.
- Source/derived raster pixels are compared directly during verification.
- Real-browser checks cover the natural loop, transitions, manual controls,
  pause/resume, tab and visibility gates, reduced motion, responsive composition,
  loaded fonts/images and neighboring-strategy regressions.

Verified results: two natural loops measured approximately 12 seconds each with
all four scenes and no blank sampled transitions. All four compositions passed
bounds checks at 320, 390, 600, 700, 768, 950, 951, 1024, 1440 and 1920px viewport
widths. Keyboard controls, real mobile taps/swipes, reduced-motion manual access,
font/image loading and exact pause/resume across strategy switching passed.
Strategies 01–05 passed browser regressions; their data and dedicated files are
unchanged. All 26 raster outputs match their original source crop pixels.
