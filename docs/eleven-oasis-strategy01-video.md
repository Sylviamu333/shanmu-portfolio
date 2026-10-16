# Strategy 01 — original artwork with an embedded mobile walkthrough

Route: `/work/eleven-oasis/`. Only the first strategy's media renderer is changed. The six selectors, descriptions, transitions and responsive layout remain the same, as do all other case-study sections, shared navigation/footer and project pages.

## Exact source and serving

- Artwork: `source-assets/eleven-oasis-homepage-ux-decisions.png`, 1600 × 958 RGBA. Its existing public PNG remains byte-for-byte unchanged, and remains the complete base composition.
- Video: `source-assets/eleven-oasis-homepage-demo-mobile.mp4`, 592 × 1280 portrait, HEVC / yuv420p, 30fps, 543 frames, 18.1 seconds, with AAC audio. The original upload is unchanged.
- Derived browser asset: `/projects/eleven-oasis/strategy/mobile/homepage-mobile-d9ec1b3c8780.mp4`, 592 × 1206, H.264 High / yuv420p, 18.1 seconds, muted/no audio track, fast-start MP4. Size 4,508,747 bytes. Its content fingerprint is versioned in the URL.
- Reproduce with `python scripts/prepare-eleven-oasis-mobile-video.py` (FFmpeg/FFprobe required). The JSON manifest records source hash, dimensions, duration, crop and artwork coordinates.

The source includes its own status bar/Dynamic Island and browser address/navigation UI. Only the top 74px duplicate status strip is cropped: x0 y74 width592 height1206. The artwork's original status bar and Dynamic Island above y126 remain untouched. Browser chrome below that strip is retained; no website navigation, product content or CTA is removed. The slight aspect difference produces less than one source pixel of total horizontal cover crop. All 543 frames remain; brief recorded website-loading moments are part of the supplied footage, not player failures. Full-video SSIM against the same source crop: **0.995009**.

## Measured screen mask

The replaceable content area is x617, y126, width366, height746 within the original 1600 × 958 composition:

| Property | Percentage of the full artwork |
| --- | --- |
| Left | 38.5625% |
| Top | 13.1524008351% |
| Width | 22.875% |
| Height | 77.8705636743% |

A scoped SVG alpha mask traces the inner display's small upper corner taper and rounded bottom corners. The video is above the flattened PNG and clipped inside this opening. The bezel, hand, static status bar/island and all four annotations remain in the original image; no artwork or text is reconstructed, blurred or generated. The base remains visible wherever the mask is transparent.

The existing ImageGallery still contains the artwork with `object-fit: contain`. ResizeObserver measures its actual painted rectangle (including letterboxing and the unchanged View image row). The video canvas follows that rectangle, then applies the same measured screen percentages at every breakpoint. `object-fit: cover; object-position: center top` fills the opening without stretching or letterboxing.

## Playback and fallbacks

One persistent video element is lazy-sourced only when Strategy 01 is selected, visible, and motion is allowed. It is autoplay/muted/loop/playsInline with preload metadata and no native controls. A small accessible control within the screen supports manual pause/resume and keyboard focus. Selecting Strategies 02–06, leaving the viewport, hiding the browser tab, or enlarging the original artwork pauses playback without resetting currentTime. Returning resumes unless the visitor manually paused it.

The original artwork remains underneath throughout. Video opacity is enabled only after an allowed `playing` event. Failed loading/decoding and rejected autoplay restore the original static screen; reduced motion defaults to the original still without a video request, with an explicit Play option. Preference changes cancel automatic playback. The existing View image interaction enlarges the original **static** composition, and pauses the inline video while that dialog is open. It does not create a second player.

Observers, media events and preference/visibility listeners are cleaned up on unmount. No new dependency is introduced.

## Changed files

- `src/components/eleven-oasis/Strategy01PhoneVideo.tsx` and `.css`: calibrated overlay, playback lifecycle and in-screen control.
- `src/components/eleven-oasis/elevenOasisMobileDemo.json`: generated video and measured geometry manifest.
- `src/components/eleven-oasis/ElevenOasisStrategyShowcase.tsx`: use the dedicated media component for Strategy 01 only.
- `src/components/eleven-oasis/ElevenOasisStrategyShowcase.css`: extend the existing gallery sizing rules to the Strategy 01 wrapper without changing other strategies' computed styles.
- `scripts/prepare-eleven-oasis-mobile-video.py`: reproducible status-strip crop, H.264 encoding, mask and manifest.
- `public/projects/eleven-oasis/strategy/mobile/`: the derived MP4 and SVG mask.
- This implementation report.

## Verification

Lint, TypeScript, production build and content checks pass. Chromium tests covered desktop and mobile/tablet viewports at 320, 390, 600, 768, 950, 951, 1024, 1440, 1920 and 2560px; mobile touch was emulated at 390 × 844. All use the same percentage coordinates after measuring the actual contained artwork. No overflow or second Strategy 01 player was found. The video fills the screen and the in-screen control retains at least a 44px interaction target.

Actual screenshot comparisons at 390, 768, 1440 and 1920px confirm zero changed artwork pixels outside the replaceable phone display (allowing two raster pixels around its boundary). The PNG composition is unchanged; the existing View image control below the artwork is excluded from that artwork comparison. Original status bar/island, bezel, hand and annotations were visually inspected in the rendered composition. Source/public PNG hashes and the original video hash match.

Each of Strategies 02–06 pauses the video at its timestamp, and returning to 01 resumes it. Viewport exit/re-entry, manual pause/resume, keyboard activation, preference changes and original-still enlargement pass. Reduced-motion initial loading requests no video until explicit Play. Simulated failed video loading and rejected autoplay retain the original still. No-JavaScript rendering retains the original composition. The existing phone filter/lightbox and MacBook pause/resume pass with touch interaction. Rendered Overview, four-item navigation, Problem, Decisions, Results, shared header/footer, selector labels/descriptions and inactive strategy markup match the preceding build.

These are local production-build browser checks, with Chromium touch emulation rather than physical iOS/Safari hardware. Deployment status is verified separately through the repository's Vercel check.
