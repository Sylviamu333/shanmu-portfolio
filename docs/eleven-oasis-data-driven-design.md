# Eleven Oasis — Research & Validation

The former Decisions content is replaced in place with **DATA-DRIVEN DESIGN**.
The existing `#decisions` anchor and case-study navigation still work. Problem,
Strategy 01–06, Results, project navigation and the shared header/footer remain
unchanged. No new route or dependency is added.

## Verified uploads

All fourteen originals were pulled from main and inspected individually:

- `hotjar1.png` — FlexComfort PDP click/scroll research board.
- `hotjar2.png` — homepage mobile-led click/scroll research board.
- `hotjar3.png` — homepage desktop/mobile click and scroll study.
- `hotjar4.png` — linen-cotton PDP desktop/mobile clicks and scroll depth.
- `hotjar5.png` — seasonal campaign landing page, presented in a separate Campaign tab.
- `hotjar6.png` — Sale collection.
- `hotjar7.jpg` — Best Sellers collection.
- `hotjar8.jpg` — Big & Tall collection.
- `hotjar9.jpg` — Big & Tall PDP.
- `abtest1.png` — unnamed Control Group / New Group 1 aggregate table.
- `abtest2.png` — matching metric dashboard excerpt; test identity is not shown.
- `abtest3.jpg` — **Test PC homepage shop the look** aggregate report.
- `abtest4.jpg` — **Test Mobile homepage shop the look**, new/returning audience table.
- `abtest5.jpg` — **Test Mobile homepage shop the look** aggregate metric charts.

`scripts/prepare-eleven-oasis-research.py` creates 35 lossless WebP evidence
excerpts, including the nine original Hotjar boards for full-size reading.
Source filenames, SHA-256 hashes, crop bounds, output dimensions and hashes are
recorded in `public/projects/eleven-oasis/research/manifest.json`. No original is
altered. Public A/B excerpts omit browser bookmarks, unrelated revenue columns
and recommendation banners. The raw reports remain in source-assets. Tool
forecast annotations visible in a chart are not adopted as portfolio findings.

## Verified metrics

Relative change = `(variant / control − 1) × 100`, calculated from the values
actually displayed in the cited source. This is not percentage-point change.

| Source / experiment | Metric | Control | Variant | Calculated relative change |
| --- | --- | --- | --- | --- |
| abtest5 / Mobile Shop the Look | Conversion | 5.82% | 7.24% | +24.4% |
| abtest5 / Mobile Shop the Look | Add to cart | 18.4% | 19.0% | +3.3% |
| abtest5 / Mobile Shop the Look | Product-page views | 53.2% | 54.0% | +1.5% |
| abtest3 / Desktop Shop the Look | Conversion | 6.357% | 6.806% | +7.1% |
| abtest3 / Desktop Shop the Look | Add to cart | 15.65% | 13.61% | −13.0% |
| abtest3 / Desktop Shop the Look | Product-page views | 35.70% | 35.60% | −0.3% |
| abtest1 / Separate unnamed snapshot | Conversion | 8.051% | 10.088% | +25.3% |
| abtest1 / Separate unnamed snapshot | Add to cart | 19.49% | 21.49% | +10.3% |
| abtest1 / Separate unnamed snapshot | Average order value | $69.56 | $73.15 | +5.2% |

The mobile dashboard itself reports +24.53%, +3.33% and +1.49%, using more precise
underlying rates. Those are retained separately from calculations based on its
rounded chart labels. The interface explains the rounding difference. It does
not silently equate +24.53% with a calculation from 5.82% and 7.24%.

The source audience table remains a separate, expandable **mobile cohort view**:

| Audience / abtest4 | Metric | Control | Variant |
| --- | --- | --- | --- |
| New visitors | Conversion | 4.842% | 6.510% |
| New visitors | Add to cart | 15.64% | 16.82% |
| New visitors | Product-page views | 48.60% | 50.09% |
| Returning visitors | Conversion | 8.649% | 9.934% |
| Returning visitors | Add to cart | 26.49% | 27.15% |
| Returning visitors | Product-page views | 66.49% | 68.21% |

Cohort changes are not added together or substituted for the aggregate report.
The unnamed table/chart snapshot is never attributed to the Shop the Look tests.
Its exact modification, name, device and date are unavailable in the screenshots.
Exact control/variant layouts are also not shown for Shop the Look. No winner,
formal significance, long-term uplift or overall project growth is claimed.

## Behavioral interpretation

Nineteen focused views cover Homepage, Product Page, Collection and Campaign,
with genuine Desktop/Mobile captures and source-specific case selectors. All
nine Hotjar sources are used. Original research boards are available in the
same accessible source reader.

Verified visible markers include:

- hotjar3 desktop: 53.3% at the Best Sellers boundary, 24.7% at Shop the Look.
- hotjar2 mobile: 34% at Gifting for Him.
- hotjar4 desktop: 41.6% near Add to Cart.
- hotjar4 mobile: 27.2% at Complete the Look and 10.8% deeper in the product story.

These are depth-specific exposure observations. Different captures are not
pooled into one funnel or treated as controlled device comparisons. Click marks
are not eye tracking or proof of user intent/friction. The iframe tracking gap
visible in hotjar4's mobile click capture is explicitly noted. Research-note
estimates without comparable visible numeric markers are not turned into KPIs.
The three insight-to-action cards distinguish observations from design responses;
they do not claim experiments caused individual redesign changes.

## Interaction and implementation

The new scoped `ElevenOasisResearch` component supplies page/device/capture
controls, a stable-height heatmap stage with 300ms crossfades, three editorial
insight cards, Mobile/Desktop comparison tables, the expandable mobile audience
detail, a separate three-metric KPI composition and a fourteen-source index.

Existing Motion and GSAP dependencies provide one-time 600ms section reveals,
restrained card hover movement and deterministic one-time KPI count-ups to the
exact source-derived target. Screen readers receive the final KPI value without
per-frame announcements. Reduced motion displays final static values and removes
motion. A section-local media-query subscription also responds to live system
preference changes; the installed Motion hook only snapshots that preference at
mount. No heatmap or experiment autoplay is introduced.

The existing ImageGallery dialog is reused without changing its shared code.
Scoped white reader styles allow full-resolution panning, with native modal
focus containment, keyboard image navigation, Escape/Close, body scroll lock and
focus return. All original screenshot colors are preserved.

## Validation

- `npm run lint`
- `npm run build`
- `npm run typecheck`
- `npm run check:content -- --build`
- `node --experimental-strip-types scripts/check-eleven-oasis-research.mjs --build`
- `node --experimental-strip-types scripts/test-eleven-oasis-research.mjs` (four tests)
- Existing strategy playback and source-asset checks.

Chromium checks passed for all 19 heatmap selections, repeated Mobile/Desktop
switching, both mobile cohorts, all 14 source images, modal keyboard navigation,
Escape/Close, body-scroll restoration and trigger-focus return. KPI count-ups
were sampled in motion and reached +25.3%, +10.3% and +5.2% once, without replay.
Initial and live reduced-motion preferences, real mobile touch controls and
full-resolution source panning passed.

At widths 320, 390, 600, 768, 850, 950, 951, 1024, 1440 and 1920px, the page had
no horizontal overflow, table values stayed within their cells and the research
controls retained at least 44px height. No browser errors or failed local asset
requests were recorded. Desktop/mobile screenshots were visually inspected.
The existing Strategy 01–06 regression checks also passed, including video,
carousel timing, synchronized campaign scrolls, 2× branding playback and
foundations pause/resume, visibility gates, keyboard and touch interaction.

The rendered content before and after the replaced Decisions section was also
compared byte-for-byte with the base commit and is unchanged.
