# Eleven Oasis — Editorial Results

Only the final `#results` section is replaced. The existing Results anchor,
case-study navigation and previous/next project links are retained. All rendered
content before Results is unchanged, including Research & Validation, Strategy
01–06 and the mobile shopping journey. Shared Navigation, Footer, other projects,
the homepage and About are untouched.

## Composition

- A bold sans-serif **The Results** opening with `04 / RESULTS`.
- An image-right behavioral-evidence composition, pale-gray exposure figures and
  a thin dashed explanatory box.
- An image-left A/B comparison, with Mobile, Desktop and Separate Test tabs.
- A final design-outcome composition with existing homepage, mobile PDP and
  brand guideline imagery, layered without introducing new artwork.

The canvas remains pure white. All styles are scoped beneath `.eo-results`.
The two Osnova reference screenshots and generated concept mentioned in the
brief were not available in the supplied attachments or repository. The written
layout, typography and motion specification therefore guided implementation;
no exact screenshot-to-screenshot fidelity is claimed.

## Source integrity

The existing fourteen-source research audit is reused. Exact filenames are
`hotjar1.png`–`hotjar6.png`, `hotjar7.jpg`–`hotjar9.jpg`, `abtest1.png`,
`abtest2.png`, and `abtest3.jpg`–`abtest5.jpg`. Original uploads and previously
prepared evidence assets are not changed.

The main Hotjar visual is the source-faithful `homeDesktopScroll.webp` excerpt
from `hotjar3.png`. It visibly records **53.3%** at the Best Sellers boundary and
**24.7%** at the deeper Shop the Look boundary. These are exposure observations,
not conversion rates or an explanation of visitor intent. All nine original
research boards are accessible in the Results source reader.

The comparison uses the same verified data and relative-change calculation as
the preceding Research & Validation section:

| Experiment | Conversion | Add to cart | Third metric |
| --- | --- | --- | --- |
| Mobile Shop the Look / abtest5 | 5.82% → 7.24%, +24.4% | 18.4% → 19.0%, +3.3% | Product views 53.2% → 54.0%, +1.5% |
| Desktop Shop the Look / abtest3 | 6.357% → 6.806%, +7.1% | 15.65% → 13.61%, −13.0% | Product views 35.70% → 35.60%, −0.3% |
| Separate unnamed test / abtest1 | 8.051% → 10.088%, +25.3% | 19.49% → 21.49%, +10.3% | Average order value $69.56 → $73.15, +5.2% |

`abtest4.jpg` supplies the mobile new/returning audience evidence.
`abtest2.png` supplies the matching unnamed-test dashboard and reported ranges.
All five A/B excerpts can be opened from the appropriate test view. The mobile
dashboard's reported +24.53% conversion change uses more precise underlying rates;
the UI explains why the displayed rounded rates calculate to +24.4%.

Exact variant layouts are not supplied. The unnamed snapshot has no visible
test name, device or date. No statistical significance, winning variant, tool
forecast, long-term uplift or overall revenue growth is claimed. Desktop declines
remain visible. Unrelated experiments are never combined.

The collage uses the existing `Eleven Oasis -Now-classic.png`, the existing
mobile PDP excerpt/full screenshot, and original brand guideline PDF page 10.
`scripts/prepare-eleven-oasis-results.py` generates a single optimized homepage
crop. Its source hash, crop coordinates, dimensions and output hash are recorded
in `public/projects/eleven-oasis/results/manifest.json`. Original source pixels
are preserved in the repository. Collage images represent design outcomes,
not experimentally verified business performance.

## Motion and interaction

Existing GSAP supplies once-only, viewport-triggered reveals. Headings fade and
move up 24px over 750ms on desktop; mobile uses 12px and 600ms. Images reveal at
scale 1.03 and settle at 1. Metrics fade from opacity 0.18 to their intended
pale-gray appearance. Dashed notes have a subtle 140ms delay. Each element and
row responds to its own visibility, with no sticky obstruction or scroll hijack.

All data values stay exact; no additional count-up is necessary. SSR leaves the
content readable. Initial and runtime reduced-motion preferences disable/cancel
the reveals, restoring static content. Scoped cleanup never touches other GSAP
timelines. Tabs support arrows, Home/End and visible keyboard focus. The reused
native dialog supports source-image panning, keyboard navigation, Escape/Close,
body-scroll lock and focus restoration.

## Files

- `src/components/eleven-oasis/ElevenOasisCaseStudy.tsx` — Results integration only.
- `src/components/eleven-oasis/ElevenOasisResults.tsx` — editorial composition,
  original evidence, experiment selection and scoped animation/reader behavior.
- `src/components/eleven-oasis/ElevenOasisResults.css` — scoped responsive styling.
- `public/projects/eleven-oasis/results/` — one optimized image and provenance.
- `scripts/prepare-eleven-oasis-results.py` — reproducible preview extraction.
- This document — sources, limitations, implementation and validation.

## Validation

Passed lint, TypeScript, production build, exported-content checks, the
fourteen-source integrity check and all four existing research metric tests.
The homepage extraction script reproduced the exact preview hash. Source,
derived and exported image hashes match.

Chromium checks passed for all three experiment views and all five A/B source
links, the seventeen-image reader, keyboard tabs, native modal navigation,
Escape/Close, body-scroll restoration and trigger-focus return. Real-time
scroll samples confirmed intermediate heading opacity/translation and image
scale values, their exact final states, independent row triggers and no replay.
Enabling reduced motion during a reveal immediately restored static content;
initial reduced motion and mobile touch controls also passed.

At 320, 390, 600, 768, 800, 801, 950, 951, 1024, 1440 and 1920px, all experiment
views remained free of horizontal overflow and overlapping statistics. Desktop
alternation and mobile reading order were checked, with screenshots visually
reviewed at desktop, tablet and mobile sizes. The Results anchor clears the
shared header; the canvas is `#FFFFFF` and the existing footer stays `#FFF5FB`.
No browser errors or failed local image requests were recorded.

Existing Strategy 01–06 browser regressions passed, including video playback,
carousel timing, campaign synchronization, 2× branding playback and foundations
pause/resume, keyboard/touch, visibility and reduced-motion behavior. A
byte-for-byte comparison confirmed all rendered case-study content outside the
Results replacement is unchanged.
