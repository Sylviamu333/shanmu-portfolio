# Eleven Oasis — Research & Validation

The existing combined **03 / RESEARCH & VALIDATION — DATA-DRIVEN DESIGN**
section is redesigned in place. Its `#decisions` anchor and case-study navigation
are unchanged. Problem, Strategy 01–06, Results, project navigation and the shared
header/footer are unchanged. No separate Decisions section, route or dependency
is added.

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

## Reference analysis

Primary reference: `source-assets/2026-10-18 18-43-12.mp4`, pulled with commit
`bd16ed3`. The recording is 9.13 seconds, 800 × 500, at 30fps. Full frames and
10fps samples around the first transition were inspected before this redesign.

The visible pattern is a left accordion with one expanded item, understated
rules and chevrons, and a large corresponding composition on the right. Around
4.4s the first item closes while the second opens; subsequent selections show
the third, first and second items. The right image fades nearly to the pale
canvas before the incoming composition becomes fully visible. The switch takes
roughly 400ms. The image area remains beside the accordion as its text reflows.

The recording starts with an item already expanded. It does not establish an
initial entrance, autoplay, scroll-driven selection, mobile behavior, hover
styling, or exact source easing. Those effects are not attributed to the video.
The implementation adapts the demonstrated selection/collapse/image pattern to
the existing evidence, white canvas and Georgia/Arial portfolio typography.

## Interaction and implementation

Four manual accordion groups replace the long stack of modules:

1. **Behavioral analysis** — all 19 existing page/device/capture selections,
   each with its original observation, implication, depth markers and source.
   The right viewer keeps Homepage, Product Page, Collection and Campaign tabs,
   Desktop/Mobile controls, and the capture selector. All nine Hotjar sources
   remain available.
2. **From insight to action** — Homepage, PDP and Product Discovery tabs switch
   the three existing insights and matching evidence. Their original observed
   findings and design responses are preserved verbatim, including PRINT /
   CLASSIC GEAR. Mappings remain hotjar3, hotjar4 and hotjar8.
3. **A/B testing & validation** — Mobile/Desktop tabs retain the distinct Shop
   the Look experiments. A mobile audience selector shows aggregate, new and
   returning visitors separately. Tables, chart excerpts and the original test
   title excerpts remain available. The sources are abtest3.jpg, abtest4.jpg
   and abtest5.jpg; no cohort is substituted for the aggregate report.
4. **Measured outcomes** — the independent unnamed snapshot, with unchanged
   conversion, add-to-cart and AOV calculations. Source Table/Dashboard tabs
   show abtest1.png and abtest2.png. It is not combined with Shop the Look.

The original takeaway and expandable 14-source index remain below the workspace.
Large evidence previews open the existing full-resolution source reader. Related
content is selected in the same viewer instead of repeated down the page.

The first group is open by default and cannot be collapsed to an empty state.
Only one group is expanded. Arrow Up/Down and Home/End move accordion focus;
Enter/Space select. Evidence tabs retain their existing roving keyboard behavior.
Inactive panels are inert and hidden from assistive technology. Desktop and
mobile instances have distinct control/panel IDs and share a single state.
Below 950px the viewer sits directly beneath the expanded explanation.

A 400ms grid expansion coordinates the text and chevron. Images use a restrained
fade through white: outgoing opacity takes 180ms; incoming opacity takes 240ms
after a 160ms delay, completing at 400ms. These are approximations of the sampled
recording, not claims about Apple's source CSS. There are no animation timers,
scroll selection, autoplay, decorative transforms or KPI count-up loops.
CSS transitions handle interruption; initial and live reduced-motion preferences
remove the transitions. No animation dependency is added.

Preview assets are prewarmed/decoded and retained as image layers to prevent
replacement flashes. The latest selection revision wins if loading is slow;
text and its selected evidence commit together. Failed loads keep the previous
selection and announce a retry message. Source-reader focus return, native modal
keyboard containment, Escape/Close, image navigation and body scroll lock remain.

## Validation

- `npm run lint`
- `npm run build`
- `npm run typecheck`
- `npm run check:content -- --build`
- `node --experimental-strip-types scripts/check-eleven-oasis-research.mjs --build`
- `node --experimental-strip-types scripts/test-eleven-oasis-research.mjs`

The source-integrity check still validates all 14 originals and all 35 derived
assets by SHA-256, the nine Hotjar mappings and the distinct experiment identities.
The existing metric tests verify rounded versus reported mobile changes, mixed
desktop results, the independent snapshot and both separate mobile cohorts.

Chromium checks passed for all 19 Hotjar selections, three insight selections,
Mobile/Desktop experiments, both mobile cohorts, the two independent snapshot
views and all 14 full-resolution sources. Source-reader keyboard navigation,
Escape, focus return and body-scroll restoration passed. Intermediate frames
confirmed coordinated text expansion and fade-through timing. Repeated rapid
clicks and artificially delayed image decoding retained the latest selection.
Scrolling did not change the active group.

Keyboard accordion/tab operation, existing and module deep links, initial/live
reduced motion and real mobile touch passed. At 320, 390, 600, 768, 950, 951,
1024, 1440 and 1920px, all controls remained at least 44px high, the active image
remained inspectable, table cells did not overflow and there was no horizontal
page overflow. The desktop evidence box stayed the same size across all groups.
No browser errors or failed local asset requests were recorded.

Initial section height, with Behavioral Analysis selected and source index
closed (1000px viewport height):

| Viewport width | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| 1440px | 3940px | 1033px | 73.8% |
| 1024px | 3953px | 1074px | 72.8% |
| 768px | 4412px | 1719px | 61.0% |
| 390px | 6196px | 1952px | 68.5% |

Expanded source indexes and longer selected explanations can naturally take more
space. The reduction comes from showing one evidence group in a shared viewer,
consolidating three insight cards into tabs, selecting experiments/cohorts in one
table, and removing repeated inline proof stacks. No screenshots are discarded
or covered, and full-size reading remains available.

The existing Strategy 01–06 browser regression also passed: videos, carousel
timing, synchronized campaign scrolling, branding speed, foundations controls,
visibility pauses, reduced motion, keyboard and touch interactions are unchanged.
