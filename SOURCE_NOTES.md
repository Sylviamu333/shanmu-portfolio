# Source materials and limitations

## Inspected sources

All five requested assets were fetched from `Sylviamu333/shanmu-portfolio`, `main`, source commit `e593f69fd13fc7f9cf7c317c328a723e9f88b5c6`. Their original repository paths and contents remain unchanged.

- `0813 Eleven Oasis Guideline V1.pdf`: 20 pages. Logo/clear space/color specifications and typography are used. Core palette: Space Black `#252525`, Off White `#F8F8F8`; accents: Denim Blue `#0336A5`, Vintage Leather `#B38B6D`, Deep Rust `#8B3212`, Solaris `#F9F871`. Roboto Black/Regular are primary; Impact/Gill Sans are substitutes.
- `EBC IP DESIGN 06.pdf`: 25 pages. Two golf-inspired identity concepts, symbol/wordmark variants, monograms, merchandise, signage, and application mockups. No launch date or production outcome is inferred.
- `Portfolio- SHAN MU.pdf`: 21 pages. Covers: pages 10–11 (individual homeware brand, 2022; original wordmarks and page 11 bedding, packaging, labels, tags). PIX: page 5 posters and invitations with context from page 4. Visual Experiments: page 13 key visual studies and page 6 collage/sketch/painting selection.
- `source-assets/HOMEPAGE - PC.png`: authentic BEFORE homepage, 2160 × 12939.
- `source-assets/PDP - pc.png`: authentic BEFORE product page, 1440 × 5519.

Published assets have page-level provenance in `public/projects/asset-manifest.json`. Embedded raster artwork is extracted at native resolution rather than captured from a low-resolution PDF preview. Vector identity pages are rendered directly from the PDF. Header bars outside artwork are excluded on EBC exports. Screenshots retain their full composition in display derivatives, and exact PNG copies are available from the comparisons and image viewer. Source originals are never edited.

## Explicit exclusions

- Covers page 10 photography/style reference images are not published as original project artwork. Only its wordmark studies are extracted.
- PIX page 5's visual-style reference strip and page 4 inspiration/art references are excluded. The selected campaign compositions include character and vehicle imagery; the portfolio does not claim original authorship of those underlying elements.
- Eleven Oasis guideline photography/model examples, including positive and negative examples, are treated as brand references rather than original design projects and are not used as portfolio photography.
- Architectural, urban-planning, and landscape pages are outside the requested five-project scope.

## Missing materials

- No confirmed AFTER homepage or PDP screenshots were available. The build environment blocked direct access to `www.elevenoasis.com`; the web reader could retrieve site text, but that is not a screenshot or an archive of the delivered redesign. Both `after` values are intentionally `null`. The comparison UI labels them as awaiting confirmed screenshots.
- The featured cover and Eleven Oasis case-study hero show the original website, explicitly labeled as before/project context. They do not imply it is the delivered redesign.
- Final interface decisions, detailed implementation annotations, testing/research methods, traffic volumes, and measurement dates were not supplied. The case study separates observed opportunities and design priorities from claims about completed interface changes.
- Conversion (1.2% → 2.1%, +75%, +0.9 percentage points), CTA CTR (5% → 25%, 5×, +400%), and approximately +200% GMV growth come from the user's brief. Results are labeled project-owner-reported. Concurrent GMV growth is not attributed exclusively to design.
- Personal contact details, work history, location, and resume were not supplied. Centralized editable values remain `null`; missing links have no fake destinations.
- `dejiajetomobi.com/design` was inaccessible through both the build environment and web reader. No claim about its exact layout or interactions is made. Art direction follows the explicit brief.
- The guidelines' model examples specify ages 35–50; the case study preserves the project's target audience of American men aged 40–65 provided in the brief, without treating the model guideline as a replacement audience.
