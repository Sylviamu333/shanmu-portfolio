# Strategy 02: PDP scrolling walkthrough

## Assets and screen measurement

The verified upload is `source-assets/eleven-oasis-pdp-mobile-full.png`, 1179 × 16382px, fully opaque. The original remains unchanged. `public/projects/eleven-oasis/strategy/mobile/pdp-mobile-full.webp` is a lossless RGB copy: identical pixels, dimensions and complete content, reduced from 9,632,852 to 4,547,714 bytes. It loads only after Strategy 02 is selected, visible and motion is allowed. Reduced-motion visitors see the original composition without downloading the long screenshot unless they explicitly press Play.

The existing 1617 × 973px PDP composition is unchanged. Its four left-hand UX breakdowns, phone bezel, status bar, Dynamic Island and browser header remain the original artwork. Only the webpage below the browser header is replaced. The measured content viewport is x=1132, y=128.5, width=397, height=786 artwork pixels, ending at y=914.5. The SVG clip path follows the near-vertical side edges and rounded lower display corners. The full-artwork SVG and original PNG share the same contained paint rectangle, including responsive letterboxing, entrance and existing hover transforms. There is no full-image scrolling or reconstruction of individual annotations.

## Animation and interactions

`usePdpWalkthrough.ts` decodes the uploaded page derivative and computes `paintedHeight = naturalHeight × screenWidth / naturalWidth`; travel is `max(0, paintedHeight − screenHeight)` (4730.245971 artwork pixels for this upload). The SVG viewBox scales both the viewport and travel together at every responsive size. A Web Animations API timeline scrolls down for 16 seconds, holds at the exact bottom for 1.4 seconds, returns smoothly over 3.2 seconds, then holds at the top for 1.2 seconds. Both journeys use cubic-bezier(.45, 0, .55, 1), with no overshoot or scrolling beyond the image bounds.

The screenshot is the only moving layer. The original artwork stays in place. Fine-pointer hover over the phone pauses and mouse leave resumes the same timeline. Touch does not latch a hover pause. A separate semantic Pause/Play button provides a 44px target without nesting a button inside the existing enlargement trigger or changing section dimensions. Manual pause persists across strategy changes. Inactive selection, offscreen media, hidden documents and an open image lightbox pause playback without resetting time. Reduced motion defaults to the original still, with explicit playback opt-in; failed loading or unavailable animation support also retains the original composition.

The existing Strategy 02 image button and accessible native lightbox remain intact. Clicking anywhere on the phone still enlarges the original high-resolution composition; no second animated viewer or conflicting click handler is added. Strategy 02's entrance and hover system, right-column descriptions, all selectors and Strategy 01's video are preserved.

## Files

- `src/components/eleven-oasis/Strategy02PdpArtwork.tsx`: screen overlay, hover events and separate playback control.
- `src/components/eleven-oasis/Strategy02PdpArtwork.css`: responsive overlay/control styling, scoped to this presentation.
- `src/components/eleven-oasis/usePdpWalkthrough.ts`: measured travel, timeline and pause/resume lifecycle.
- `src/components/eleven-oasis/elevenOasisPdpWalkthrough.json`: source hash, dimensions, screen contour and timing.
- `src/components/ImageGallery.tsx`: optional PDP-only overlay slot inside the existing hover wrapper; other galleries unchanged.
- `public/projects/eleven-oasis/strategy/mobile/pdp-mobile-full.webp`: lossless derivative.
- This report.

## Verification

Lint, TypeScript, production build and exported-content checks pass. Chromium verification observes a complete real-time 21.8-second loop, including actual intermediate/downward/bottom/return/top frames. Pixel comparison between the top and bottom frames confirms that all changes stay inside the phone's content rectangle; all four annotations, bezel and phone chrome remain identical. The source/derivative pixel comparison is exact.

Nine widths (320, 390, 600, 768, 950, 951, 1024, 1440 and 1920px) retain the previous showcase/media/selector/description dimensions with no horizontal overflow. SVG and PNG paint rectangles match at every width. Desktop and mobile rendered frames were visually inspected, including both ends of the scroll. Hover/manual/strategy/offscreen/lightbox pause and timestamp resumption, keyboard enlargement/Escape/focus restoration, reduced-motion no-download and explicit opt-in, touch dismissal/resumption and network-failure static fallback pass. All six selectors and Strategy 01 video pause/resume pass. Initial server-rendered main/header/footer content matches the preceding build. No browser errors occurred. A local browser recording was retained with the scratch QA evidence.
