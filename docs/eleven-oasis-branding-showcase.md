# Strategy 05 — editorial brand guidelines showcase

Only the left media panel of Strategy 05 is replaced. Right-side selectors, active
colors, headline, description, notes and layout remain unchanged. Strategies 01–04
and 06 retain their existing implementations and assets.

## Inspected sources and reference motion

- `source-assets/eleven-oasis-branding-animation-reference.mp4`: H.264, 800 × 500,
  30 fps, 21.233 seconds. Inspected at 4 fps, including the transitions.
- `source-assets/0813 Eleven Oasis Guideline V1.pdf`: 800 × 600 page boxes. The file
  has **20 physical pages**: the requested material is on pages 1–19, followed by
  an unnumbered original-logo end card on page 20. No source file is altered.

Observable reference behavior:

| Recording time | Confirmed visual behavior | Implementation counterpart |
| --- | --- | --- |
| 0–1.25s | Wordmark reveals alongside its symbol | Prominent original-logo opening |
| 1.25–3.5s | Logo composition repositions and backing layers appear | Logo pulls back while supporting guideline pages enter |
| 3.75–6.25s | Stacked white chapter sheets replace one another | Identity board transitions into the rules composition |
| 6.25–9.25s | Four-panel board rearranges with offset panel movement | Coordinated card stagger and reflow |
| 9.75–12.5s | Typography sheet scales from the board to a focal close-up | Large original Roboto specimen pulls back to four font panels |
| 13–19.5s | Camera moves across application compositions and website layouts | Photography focal swaps and layered movement into the story |
| 20–21.2s | Photographic detail changes | Genuine guideline photography, rather than reference footage |

The MP4 does not expose original code, exact easing curves, input triggers or
whether each move was scroll-driven. Those details cannot be verified. The new
presentation uses original code and retimes the observable motion principles to
35 seconds for the requested five-chapter reading rhythm. The reference video's
brand, artwork, textures and footage are not included in the rendered website.

## Chapters and source mapping

| Chapter | Master timeline | Source pages |
| --- | --- | --- |
| 01 Identity | 0–7s | Logo/cover 1, 2 and 20; clear space 3; minimum sizes 4; icon 5–6; logo variations 7; incorrect use 8; placement 9; identity introduction 13 |
| 02 Colors | 7–13s | 10: exact printed hex specifications for all six colors |
| 03 Typography | 13–19s | 11: Roboto Black/Regular; 12: Impact/Gill Sans |
| 04 Photography | 19–28s | 15–18: positive photographic references, model selection and clearly contextualized pages showing what to avoid |
| 05 Story | 28–35s | 13–14 and 19; original logo from 20 closes the loop |

The closing wording is the source's **“Your personality, amplified.”** Original
vector paths preserve the official logo and type specimens. No font files are
extracted, downloaded or redistributed. Photographs remain references from the
brand guideline, not claims of original photography authorship.

## Assets and implementation

`python scripts/prepare-eleven-oasis-branding.py` uses PyMuPDF/Pillow to produce:

- 20 full lossless 1600 × 1200 page images for the manual reader;
- five smaller photographic-page previews for editorial cards;
- eight SVG crops retaining original PDF logo/type/closing-text paths;
- six photographic references extracted from their original PDF image objects.

Provenance, page numbers, crop bounds, image xrefs, dimensions and SHA-256 hashes
are stored in `src/data/eleven-oasis-branding-assets.json` and the public manifest.
Versioned assets live under
`public/projects/eleven-oasis/branding/a9dfe79cc0ca/`. A byte-identical
`guideline.pdf` is available from the compact external-document control for
searchable original text, native PDF zoom and complete document access.

`buildBrandGuidelinesTimeline` creates one GSAP master timeline. It owns every
panel, camera and opacity tween, including the return to the exact opening pose.
No scene has an independent timer or looping float. The master is the sole
source of chapter/time state; React updates only when a chapter or playback state
changes. Its transform work is contained in a clipped SVG artboard.

The playback controller pauses the complete timeline for explicit pause,
offscreen content, a hidden document, inactive Strategy 05 or an open reader.
Explicit pause remains authoritative when temporary gates clear. Returning to
Strategy 05 creates a new session at the opening. Resizing across the compact
layout boundary rebuilds geometry while retaining time and explicit pause.

Chapter controls seek the same master: playing presentation enters the selected
scene; paused/reduced-motion inspection uses its fully composed reading pose.
Reduced motion disables autoplay and supplies a meaningful identity overview plus
manual chapter selection and the complete page reader. The existing native
ImageGallery reader retains keyboard arrows, Escape, Close, backdrop dismissal
and accessible previous/next controls. Body scroll is locked while it is open.

At left-panel widths below 600px, the artboard uses a compact composition: larger
focal elements, fewer secondary type layers and numbered chapter controls.
Typography specimens remain the original artwork. All twenty source pages remain
available in the reader. The surrounding two-column/responsive strategy layout
and its media dimensions are unchanged.

## Validation

- `npm run lint`
- `npm run build`
- `npm run typecheck`
- `npm run check:content -- --build`
- `node scripts/check-eleven-oasis-branding.mjs --build`
- Existing PDP controller tests and real-browser regression checks.

Browser verification covers a complete natural 35-second cycle, chapter changes,
layered transforms, continuous painted frames, closing-loop continuity, exact
pause/resume, explicit pause across reader/visibility changes, re-selection,
responsive resizing, keyboard controls, all 20 reader pages, reduced motion and
Strategies 01–04/06. Desktop and mobile chapter frames are inspected visually.

Verified results: the 35-second natural loop, all five chapter compositions, all
20 reader pages, original PDF bytes, native reader focus/scroll handling and ten
responsive widths passed Chromium QA. The right-column HTML and media/selector
geometry matched their baseline. Strategies 01–04/06 passed browser regressions.
All 20 page copies matched the PDF-rendered RGB pixels; all eight vector crops
matched the original PDF SVG paths with only their outer viewports changed.
