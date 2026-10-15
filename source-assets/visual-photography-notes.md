# Visual Experiments photography detail

The existing route `/work/visual-experiments/` is reused. The homepage project data, last-card title, cover, category/year, order, card rendering, and all homepage/About components are unchanged. The shared detail template branches only for this slug; other projects retain their existing rendering. The existing site Header and Contact footer are reused.

## Sources

Exact uploaded filenames:

- `粉蓝摄影原图.png`: six individual STAY FOR THE NIGHT photographs.
- `黑白摄影原图.png`: six individual THE ORIGINAL 1 photographs.
- `EBC Drop 1 Lookbook .pdf`: six actual embedded editorial photographs from pages 4, 6, 8, 14, 16, and 17. No PDF viewer or giant flattened PDF page is rendered.
- `参考动画屏幕录制.mp4`: primary motion/interaction reference, 1280 × 720, 30fps, 15.4 seconds. Its browser content occupies approximately 1280 × 544 pixels.

`scripts/extract-visual-photography.py` requires Pillow and Poppler's `pdfimages`. It produces 18 optimized WebP photographs and a provenance/dimension manifest in `public/projects/visual-experiments/photography/`. Original uploads remain unchanged. Contact-sheet headings/gutters are excluded using recorded crop coordinates; photography, color, and embedded brand marks remain original. The TEAM WANG crops are only 278 × 494 pixels because that is the resolution available in the supplied composites. No artificial high-resolution detail or generated photographs are used. EBC photographs are extracted from the PDF's image streams and reduced to at most 1280 × 1707 for delivery. All 18 assets total approximately 1.4 MiB.

## Observed reference behavior

The video was inspected in full via half-second frames and full-size frames around transitions.

- Approximately 0–2.5s: a centered portrait remains prominent with substantial white space; a circular arrow cursor appears over imagery.
- Approximately 2.5–6.5s: oversized campaign typography moves horizontally behind layered photographs. The front image and deck change as cards shift sideways, with slight rotation and scale changes.
- Approximately 7–8.5s: images rapidly pull back into small scattered thumbnails and pass around text. The recording moves quickly through this part.
- Approximately 9.5–10.5s: a centered image develops into an overlapping three-card fan, followed by separated image cards.
- Approximately 10.5–15s: differently sized/offset cards pass horizontally with small foreground labels and continued layering.

Scroll input, exact scroll distance, original easing functions, hidden states, click destinations, and mobile/reduced-motion behavior cannot be recovered conclusively from the recording. The cursor is visible, but the recording does not establish all pointer-triggered behavior. Reference branding, photographs, biographies, and source code are not reused.

## Original implementation

`PhotographyExperience.tsx` uses the existing GSAP/ScrollTrigger dependency. Three independent scroll scenes present the requested series. Each has a native sticky viewport, centered photo deck, large moving type under the photographs, asymmetric fan, scaled scattered-thumbnail pull-back, reassembled fan, and horizontal gallery drift. Series hand off vertically as their sticky scenes leave the viewport. Scroll progress reverses every transform when scrolling backward. The observed motifs are adapted to these three supplied series; this is not a claim of identical reference-site structure or recovered timing.

Timelines use transform/opacity, function-based viewport coordinates, 0.35-second scrub smoothing, power2 interpolation for the fan/pull-back, and linear translation for horizontal movement. Image opacity remains 1; the experience is not a set of fade-in reveals. The timeline is remeasured on viewport/font changes and disposed on route departure or when the stills view is selected. No new animation dependency or automatic floating loop is added. Setup runs in a passive React effect, allowing the departing homepage's scroll controllers to finish cleanup before the photography timelines trigger a refresh.

A semantic “View as stills” control switches to an asymmetric editorial grid containing every photo. Reduced motion defaults to that static layout with no scroll timeline; a no-JavaScript fallback also exposes all photos. Series anchors and top/bottom return-to-Work links provide ordinary navigation. All photographs have descriptive alt text.

## Verification scope

Browser checks cover the existing homepage card and destination, all three series/18 images, intermediate motion states, forward/back reversal, native sticky handoffs, responsive widths, stills/resume, reduced motion, touch scrolling/anchors, no-JavaScript rendering, existing header/footer, other five project routes, and console errors. Saved pre-change homepage Hero/Work/footer and About markup are compared against the new export. TypeScript, lint, production build, and content checks are required before pushing. Content checks validate every photo against its provenance manifest and verify the exported series/assets.
