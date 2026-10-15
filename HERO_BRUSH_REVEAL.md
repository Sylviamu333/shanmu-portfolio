# Restored scroll-driven Hero wash

## Regression and restoration

Compared `51a2cef` with `fdd4ca1`. The earlier ribbon used a normalized SVG path (`pathLength=1`, dash array `1 1`) and a GSAP `strokeDashoffset` tween from 1 to 0. It drew from left to right across the Hero, then continued down the rest of the page. Its trigger was the homepage top reaching the viewport top, its end was the homepage bottom reaching the viewport bottom, its easing was linear, and its ScrollTrigger smoothing was 0.18 seconds. Backward scrolling reversed the drawing.

The seamless-background update removed that path and its dash progression. Its replacement animated only the completed SVG's position (`xPercent: -1 → 1`, `y: 0 → 28`). That preserved a little parallax but lost the painting effect.

The fix draws the approved wash itself, before its existing Gaussian filter is applied. There is still only one colored background path. No solid ribbon, additional pink shape, opaque image backing, hard clipping mask, extra blur, or illustration transformation was added.

- The approved SVG's exact path, `#F48CCB`, opacity `.65`, stroke width `43`, and Gaussian `stdDeviation=12` are preserved. The advancing edge receives the same softness as the rest of the wash.
- A normalized dash offset starts at `.94` (6% revealed) and reaches 0 (complete). Both GSAP's initial state and tween retain fractional precision with `autoRound: false`.
- The start, drawing direction, linear easing, and 0.18-second smoothing match the earlier Hero sweep. Since the background now ends in the Hero, its reveal completes over 60% of the Hero height rather than over the removed page-wide ribbon's entire range. The range refreshes with responsive layout changes.
- Scrolling backward retraces the same progression. Pause Motion disables the drawing trigger and freezes its in-flight scrub; Resume Motion refreshes the responsive range and synchronizes with the current scroll position, including after resizing while paused.
- Reduced motion displays the complete approved wash without scroll animation. Changing that preference while the page is open removes/recreates the GSAP controller. The first CSS state matches the first scripted state, avoiding a complete-wash flash while fonts load.

The transparent foreground assets, facial states, Aha sequence, folder float/parallax, cursor, exact Hero note, half-size visible motion control, Work section, project pages, and footer are unchanged.

## Browser verification

Verified the actual production export in Chromium, with mobile emulation at 320 and 390 px and desktop/tablet widths of 768, 1440 and 1920 px. Each width was scrolled slowly through 64 forward and 64 backward positions. The SVG produced more than 45 distinct fractional drawing states per direction; progress was monotonic, and returning to the top restored the initial wash.

At every width, pausing during active drawing froze the exact intermediate offset while scrolling continued. Resuming caught up to the current position. A separate lifecycle check covers touch pause/resume, resizing while paused, responsive range recalculation, and project/home navigation. Reduced motion showed the complete wash at every scroll position, and live preference changes restored the controller correctly. The single background, absence of the old ribbon, exact note, accessible motion-control target, and lack of horizontal overflow were checked.

Desktop/mobile initial, quarter, half, three-quarter, and complete frames were inspected alongside the running scroll sequence. The painting edge stays diffused into white and the folder remains sharp; no duplicate band, rectangular backing, or seam was visible in these checked states.

The existing character interaction suite also passed: scheduled blink, curious/happy states, hand/bulb/glow/rays timing, keyboard replay, touch, pause, reduced motion, navigation cleanup, failed-image fallback and no-JavaScript foreground. TypeScript, lint, production build, and the five-project/content/export checks passed.

The six-page layout/navigation suite passed at all five widths (30 route/viewport combinations). Unrecorded desktop scroll sweeps at 1440 and 1920 px measured approximately 16.7 ms median and 16.8 ms or less at the 95th percentile, with no frame intervals over 50 ms. The recorded 390 px mobile sweep also measured 16.7 ms median and 16.8 ms at the 95th percentile. These are local Chromium measurements, not physical-device benchmarks.

[Watch the 17-second mobile browser recording](docs/previews/hero-brush-scroll-mobile.mp4). It shows forward drawing, backward reversal, pause/resume, and the reduced-motion preference change on the local production export. This is a recording of the SHAN MU implementation, not the reference site.
