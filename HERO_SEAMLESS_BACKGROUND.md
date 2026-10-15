# Seamless Hero background refinement

## Root cause and reference

The flattened RGB `source-assets/hero-pink-folder.png` contains an opaque white backdrop and a large diagonal pink band. The prior Hero also displayed a separate page-wide pink SVG ribbon. Its character repair bitmap retained the same opaque backdrop. Moving these layers independently exposed mismatched bands, image edges, and white patches.

The approved `source-assets/pink-gradient-reference.svg` was read and rendered before implementation. It contains one path, not a multi-stop gradient:

- Path: `M-25 28 C55 -2 90 85 175 65 S285 17 365 67`
- Stroke: `#F48CCB`, opacity `.65`, width `43`
- Gaussian blur: `stdDeviation="12"`, with the supplied filter bounds

`HeroAtmosphere.tsx` uses those exact definitions. Its viewBox adds transparent padding so the wash can move without clipping its feathering. This is the sole Hero atmospheric background. The obsolete page-wide ribbon is removed; no blur is applied to the folder or character to conceal seams. ScrollTrigger now moves the wash subtly in both directions while preserving pause/resume and reduced-motion behavior.

## Foreground extraction

Automatic background-removal attempts shifted object geometry and were rejected. The published foregrounds instead use measured, editable vector outlines around the original objects. The source RGB pixels are retained, with a true alpha channel outside the foreground:

- `public/hero/hero-foreground.webp`: original pose, without the white/diagonal-pink backing; used for the initial/fallback pose, original happy face, hand, bulb, and foreground card layers.
- `public/hero/hero-resting-foreground.webp`: original pixels plus the existing localized character repair, exported with the background removed; used beneath the facial layers when ready.
- `foreground-matte.svg` and `resting-matte.svg`: editable outlines for connected objects and separate decorations, including holes around decorative loops.
- `scripts/build-hero-foreground.mjs`: reproducible lossless asset export from the unchanged source PNG and existing repair bitmap. Run it from the repository root with dependencies installed when intentionally updating these assets.

Both exported WebPs have alpha 0 along every canvas edge. Their full 1785 × 881 canvas and proportions are preserved. All 640,888 fully opaque pixels in the original-pose foreground match the source RGB values exactly. The folder, logos, and character receive no smoothing, blur, or replacement textures.

The existing relaxed, blinking, and curious facial images remain unchanged. Their rendered head layers use the extracted foreground alpha, so opaque pixels around those images cannot produce a white box above the character. Hand, bulb, and foreground occlusion use the transparent original-pose asset. No opaque repair rectangle is rendered at runtime. Failed facial-image loading and no-JavaScript rendering retain the transparent fallback rather than restoring the old pink backing.

This is foreground matting of a flattened image, not recovery of a layered 3D scene. Intrinsic frosted-glass colors and highlights remain as supplied; original physical refraction/transmittance cannot be reconstructed. Cutout boundaries are measured outlines with normal edge antialiasing. The desktop/mobile renders and their scroll transitions were inspected for visible boundaries and retained artwork detail.

## Requested UI refinements

The left Hero note now reads exactly, on two lines:

```text
thoughtful interactions,
meaningful experiences.
```

Its serif styling and color are retained. It sits to the left of the illustration on desktop and below it on narrower screens, with no overlap. The greeting, role, introduction, and other homepage copy are unchanged.

The visible Pause/Resume label, icon, padding and backdrop are scaled to exactly 50% of their previous width and height. The surrounding native button retains its accessible name, pressed state, keyboard behavior, and a minimum 44 px interaction height; measured targets are approximately 91 × 44 px on mobile and 110 × 44 px on desktop. Focus styling remains on the full target.

## Verification

- TypeScript, lint, production build, project/content checks, and whitespace checks pass.
- Browser verification covers 320, 390, 768, 1440 and 1920 px, each at six scroll positions through the Hero and into Work: 30 responsive scroll positions. Exact SVG attributes, one background, correct note, non-overlap, 0.5 width/height ratios, touch-target dimensions, no horizontal overflow, scroll reversal, pause/resume, and reduced motion pass.
- Actual desktop/mobile renders were visually inspected at initial, intermediate, and exiting scroll positions, including the Aha state. The wash fades into white as the Hero exits. No rectangular backing or duplicate pink band is present in these checked renders.
- The existing character suite passes: scheduled facial blink, curiosity/smile, timed hand/bulb/glow/rays, keyboard replay, tap, re-entry protection, pause, reduced-motion still response, asset-failure fallback, no JavaScript, and navigation cleanup.
- All six pages pass the existing five-width suite: 30 page/viewport combinations, all five projects, Eleven Oasis first, project images, captions, links, case comparisons/dialogs, navigation, footer behavior, and 404.
- A local 90-frame Chromium sample measured 16.7 ms median / 16.8 ms 95th-percentile intervals with no samples above 50 ms.
- Source PNG, source SVG, original facial-state bitmaps, Work components and artwork, all five project pages, header/navigation, and footer files are unchanged. Only Hero composition/copy, the background controller, and new Hero assets/styles/build tooling change.

Deploy through the existing main branch and existing Vercel project at https://shanmu-portfolio-mu.vercel.app/. Confirm the Vercel result for the exact pushed commit independently of local validation.
