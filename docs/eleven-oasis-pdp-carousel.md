# Strategy 02 autoplay carousel and Mobile Shopping Journey correction

Target: `/work/eleven-oasis/`. This replaces Strategy 02's former single-composition
phone walkthrough; its original artwork, source files and walkthrough assets are retained.

## Assets

- Corrected source: `source-assets/eleven-oasis-mobile-9.png` (679 × 1148).
- Full-size served URL: `/projects/eleven-oasis/mobile/eleven-oasis-mobile-9-a5a538692de4.png`.
- Thumbnail: `/projects/eleven-oasis/mobile/phone-9-thumb-a5a538692de4.webp` (240 × 406).
- The canonical public image 09 and thumbnail are also refreshed. Only image 09's
  URLs are fingerprinted, so existing cached files cannot override this correction.
- All ten other mobile originals and thumbnails remain byte-for-byte unchanged.
- Seven source slides: `source-assets/eleven-oasis-pdp-strategy02-01.png` through
  `source-assets/eleven-oasis-pdp-strategy02-07.png`, each verified at 1600 × 958.
- Served slides: `/projects/eleven-oasis/strategy/pdp/01-3595ab55daf3.webp`,
  `02-7cb89a323108.webp`, `03-8f36f4c5dba9.webp`, `04-54c686a2fb33.webp`,
  `05-d74b08a46fa7.webp`, `06-c328e481de65.webp`, `07-0122ad0f6b82.webp`.
  Each WebP is lossless and RGB pixel-identical to its fully opaque source PNG.

## Implementation

`pdpUxSlides` is the typed manifest in `src/data/eleven-oasis-strategy.ts`.
`PdpUxDecisionsCarousel` occupies the existing Strategy 02 media panel. Shared
viewport sizing, column proportions, selectors, descriptions and other strategies
are unchanged. The panel remains inert when inactive.

A single `requestAnimationFrame` controller in `pdpCarouselPlayback.ts` owns the
current slide, elapsed milliseconds, pause state and automatic advancement. The
five-second clock supplies the progress fill directly; the fill has no separate
CSS animation or timer. Images use the existing 400ms opacity crossfade. A cycle
starts only after the current image is decoded, preventing blank frames and
avoiding charging loading time against the reading interval.

Seven clickable indicators sit inside a rounded light-neutral pill. The active
indicator expands to a 40 × 6px capsule; its dark fill reflects elapsed / 5000.
Inactive dots are 6px. A separate 32px circular pause/play button resumes the
exact elapsed position. All pagination and playback targets remain at least
32px, including at a 320px viewport. Side arrows are removed; keyboard arrows
and touch swipe remain available. No extra image text or decorative backgrounds
are added.

Manual selection resets progress for a different slide and preserves explicit
pause. Selecting the active indicator leaves its elapsed time unchanged. The
slideshow freezes offscreen, while the browser tab is hidden, and while its native
image dialog is open. Those gates preserve elapsed time and never catch up by
skipping slides. Closing the dialog respects explicit user pause. Selecting
Strategy 02 again creates a fresh session at slide 01 with autoplay enabled.
Reduced motion disables autoplay and continuous progress, retains manual controls
and switches images immediately. Only selected-slide changes reach the live
region; per-frame progress updates never cause screen-reader announcements.

The first/current/adjacent slides load eagerly; visited slides stay mounted. Every
image retains its verified dimensions and `object-fit: contain`. Canceled decodes
cannot replace a newer selection. The inactive strategy panel remains inert.
Animation frames are canceled, stale image completions are ignored, and the
intersection observer and preference/visibility listeners are detached when the
session unmounts.

An optional `renderPreview` slot reuses `ImageGallery`'s existing native PDP dialog.
The currently displayed slide opens in that one dialog; arrows and dots are sibling
controls, so they cannot activate enlargement. The viewer retains Escape, backdrop
and close-button dismissal, scroll locking, focus containment and focus restoration.
Closing enlargement preserves the carousel selection. Its optional `onOpenChange`
callback pauses only this carousel; default gallery behavior is unchanged.

## Verification

Required checks:

- `node --experimental-strip-types scripts/test-pdp-carousel-playback.mjs`
- `npm run lint`
- `npm run build`
- `npm run typecheck`
- `npm run check:content -- --build`

Content checks verify all eleven mobile source/copy hashes and the seven ordered,
fingerprinted slide assets. Deterministic controller tests cover all seven exact
five-second cycles, one pending animation frame, precise pause/resume, manual
selection, stale decodes, active-dot clicks, all visibility/modal gates, reduced
motion and disposal. Browser QA checks a complete real autoplay loop against the
rendered progress fill, then pause/resume, manual controls, lightbox/keyboard/focus,
offscreen/tab visibility, strategy switching and reduced motion. Layout checks
cover widths 320, 390, 600, 700, 768, 950, 951, 1024, 1440 and 1920, plus mobile
tap/swipe. Strategy 01 playback and Strategy 03 synchronized scrolling are checked
without modifying their code, styles or assets.
