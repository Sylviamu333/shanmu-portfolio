# Pink folder hero and interactive Memoji

The later background refinement supersedes the opaque PNG/repair rendering described below. See [HERO_SEAMLESS_BACKGROUND.md](HERO_SEAMLESS_BACKGROUND.md) for the transparent foregrounds, unified approved wash, and current verification.

## Scope and original image

The final `source-assets/hero-pink-folder.png` was fetched from the existing repository's main branch at upload commit `bc195b5`. It is 1785 × 881, RGB, with an opaque white/pink background. `public/hero/hero-pink-folder.png` is a byte-for-byte copy, used directly by Next.js Image with its original aspect ratio, fixed intrinsic dimensions, and priority loading. It is not cropped, stretched, or replaced by a newly generated full composition.

Only the illustration contents of the existing hero art slot change. Its desktop/tablet/mobile dimensions, typography, introduction, handwritten note, navigation, page ribbon, Work grid, five case studies, cursor effects, scroll controller, and footer are preserved. Eleven Oasis stays first. The former open book and separate flat phone/flower/cursor stickers are removed from the hero; their decorative roles are already present in the uploaded artwork. No extra pink background shape or text is added over the source image.

## What can be isolated

The source PNG already depicts the excited open-mouth smile, raised index finger, and illuminated bulb. The character overlaps the cards, and her lower body is occluded by foreground software tiles. It contains no separate rig, hidden background, resting hand pose, or facial animation.

A localized background-restoration plate and three expression variants were edited from this exact source with the image editing tool. The variants preserve the same blonde character, sunglasses, lighting, position, and appearance. Generated pixels are restricted to measured SVG masks around the character and bulb; surrounding folder/card pixels continue to come from the uploaded PNG. Original foreground tiles are composited above the moving character to preserve occlusion. These are rendered transparent layers through SVG clipping, rather than a generic replacement character.

The four derived images are encoded as WebP at quality 95, totaling approximately 471 KB. They are decoded before any source pixels are concealed. If a state cannot load, or JavaScript is disabled, the complete original uploaded illustration remains visible. The interaction is unavailable rather than showing a broken or incomplete face.

## Facial changes versus layered effects

Actual image-state changes:

- Relaxed closed-mouth smile with open eyes.
- Naturally closed eyelids for idle blinks.
- Subtle curious eye/eyebrow state during the notice step.
- The original PNG's excited, open-mouth smile for the happy state and occasional idle smile.

These are crossfaded facial images. They are not a rigged 3D face, continuous muscle deformation, or real-time facial tracking. The eye and mouth pixels genuinely differ; transforming the entire illustration is not presented as facial animation.

Layered visual effects:

- The original finger/forearm is isolated and rises from behind the foreground card. This is a masked pose reveal with translation/rotation, not an articulated finger changing from a different hand pose.
- The source bulb and its rays are hidden at rest, then revealed. A warm radial glow, five short rays, and three tiny sparkle marks add illumination.
- The isolated head has a very small breathing/tilt motion. The whole folder floats and responds to pointer depth independently; those transforms are not facial changes.
- The background repair is an inferred reconstruction of pixels absent from the flattened PNG. It is only used behind the isolated parts, not as a replacement scene.

## Timing and interaction

| Time | Action |
| --- | --- |
| 0.0 s | Notice the pointer / slight head response |
| 0.2 s | Curious facial state fades in over 0.16 s |
| 0.4 s | Original happy smile fades in over 0.18 s; slight spring-like head lift |
| 0.5 s | Original raised-finger layer rises over 0.5 s |
| 0.6 s | Bulb appears over 0.35 s |
| 0.8 s | Warm glow and three tiny sparkles appear |
| 1.1 s | Bulb bounces subtly and extra rays expand |
| 1.5 s | Happy pose holds |
| 2.5 s | Return begins; expressions/gesture fade over 0.5 s and head settles over 0.6 s |

Idle blinks use randomized 4–7 second scheduling. Every third blink includes a brief smile. Head movement is only a couple of source-image pixels with less than one degree of idle tilt. Folder float travels 6 CSS pixels over a 4-second ease-in-out alternate leg. Pointer parallax is limited to approximately ±2 px horizontally and ±1.5 px vertically, without folder rotation.

Desktop hover triggers the sequence; touch uses tap. The character is also a native button with Enter/Space access, an accessible name and hint, a visible focus outline, and a polite announcement. Its hit area stays separate from the infinite float and is at least 44 × 44 px. Repeated input during an active sequence does not restart or stack animations.

The existing global Pause/Resume control coordinates the new motion. Reduced-motion mode disables float, head movement, blink loops, parallax, springs, sparkles and glow transitions. Activating the character shows a still happy expression/gesture/bulb, then returns to the resting image without movement. Idle timers/reactions stop offscreen, on document hiding, and on unmount; event listeners and GSAP tweens are cleaned up.

## Verification

- TypeScript, ESLint, production static build, and five-project/88-image content checks pass.
- Browser tests verify actual source dimensions, facial blink visibility, hover sequence timing, keyboard replay, busy/re-entry handling, tap interaction, pause/resume, reduced-motion static response, failed-state fallback, and no-JavaScript fallback.
- The original 30 page/viewport combinations pass: homepage plus all five case studies at 320, 390, 768, 1440 and 1920 px. Project artwork, links, image dialogs, comparisons, menu/Escape, fonts, exact introduction and project order remain correct.
- Original image proportions and minimum touch-target size pass at all five widths, with no horizontal overflow.
- A comparison with global float/breathing frozen shows the expression/gesture/illumination changes confined to the character area. Outside it, four raster pixels differ by at most 6/255 due to edge antialiasing; the folder and software tiles have no geometric movement during the reaction.
- Checksums verify the exact uploaded PNG copy and 84 unchanged existing source/project files; the only modified existing source file is `HomeIntro.tsx`. New assets, `HeroFolder.tsx`, and its isolated CSS implement the update.

Deployment uses the existing main branch and GitHub-connected Vercel production project at https://shanmu-portfolio-mu.vercel.app/. No new repository or Vercel project is created. The exact pushed commit's Vercel status is verified separately from local build success.
