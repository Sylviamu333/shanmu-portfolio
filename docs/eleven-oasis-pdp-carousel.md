# Strategy 02 carousel and Mobile Shopping Journey correction

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

The carousel is manual only: seven 32px pagination targets, wrapping previous/next
arrows, keyboard left/right and touch swipe. Dots update immediately; the previous
decoded artwork remains visible until the requested image is ready. Canceled
requests cannot replace a newer selection. CSS uses a 400ms opacity crossfade;
reduced motion switches immediately. No slide text is reconstructed outside the images.

The first/current/adjacent slides load eagerly; visited slides stay mounted. Every
image uses its verified intrinsic dimensions and `object-fit: contain`. Strategy
02 resets to slide 01 on re-selection without resetting other strategy components.

An optional `renderPreview` slot reuses `ImageGallery`'s existing native PDP dialog.
The currently displayed slide opens in that one dialog; arrows and dots are sibling
controls, so they cannot activate enlargement. The viewer retains Escape, backdrop
and close-button dismissal, scroll locking, focus containment and focus restoration.
Closing enlargement preserves the carousel selection.

## Verification

Required checks:

- `npm run lint`
- `npm run build`
- `npm run typecheck`
- `npm run check:content -- --build`

Content checks verify all eleven mobile source/copy hashes and the seven ordered,
fingerprinted slide assets. Browser QA covers all slides, dots and wrapping arrows;
rapid selection; selected-image enlargement; keyboard/focus and scroll restoration;
manual-only behavior; reset on re-selection; delayed image loading; reduced motion;
mobile swipe/tap; and widths 320, 390, 600, 700, 768, 950, 951, 1024, 1440 and 1920.
Strategy 03 is additionally checked through two real animation loops, comparing
both normalized scroll positions at 25%, 50%, 75% and 100%.
