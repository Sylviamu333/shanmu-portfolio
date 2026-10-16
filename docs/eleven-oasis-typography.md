# Eleven Oasis unified typography

Route: `/work/eleven-oasis/`. This refinement changes typography only. The complete rendered main-page markup and copy match the preceding build after normalizing React's text separators and unwrapping the new inline outcome-number spans. Page structure, columns, widths, padding, margins, image/video assets, animation code and interactive behavior remain unchanged. Natural text reflow changes content heights.

## Reference audit

Before editing, computed styles were measured in Chromium at 1440, 768 and 390px widths. The editorial reference **Shopping experience & conversion** is the Overview Focus metadata value: Georgia Regular **14px**, not the larger 18px project subtitle. This distinction determines the editorial scale. The left Overview introduction is Arial Regular 16px / 24px on desktop and 15px / 22.5px on mobile. Metadata labels are Georgia Regular 10px / 14px, color #72736b. The original Problem heading is Arial Regular 28px / 33.6px on desktop and 24px / 28.8px on mobile.

## Measured hierarchy

Font stacks: **Arial** means `Arial, Helvetica, sans-serif`; **Georgia** means `Georgia, "Times New Roman", serif`. All levels use **400 / Regular**, normal style. Serif content uses font-synthesis:none, matching the Overview. The mobile breakpoint is 700px.

| Level | Font | Desktop size / computed line height | Mobile size / computed line height | Tracking / color |
| --- | --- | --- | --- | --- |
| 01 Project title, unchanged | Arial | 33.8px / 37.18px above 1100px | 30px / 33.6px | -.025em; #242521 |
| 02 Major section heading | Arial | 28px / 33.6px | 24px / 28.8px | -.02em; #242521 |
| 03 Editorial subheading | Georgia | 14px / 21px | 14px / 20.3px | normal; existing #242521 |
| 04 Lead paragraph | Arial | 16px / 24px | 15px / 22.5px | normal; #242521 |
| 05 Regular body | Arial | 15px / 24px | 15px / 24px | normal; #555555 |
| 06 Eyebrow / metadata | Georgia | 10px / 14px | 10px / 14px | normal; #72736b |
| 07 Case-study navigation, unchanged | Georgia | 18px / 25.2px | 16px / 23.2px | normal; existing interactive colors |
| 07 Strategy controls, unchanged | Arial | 12px / 16.8px | 12px / 16.8px | normal; existing interactive colors |

The existing project-title tablet rule (701–1100px) remains `calc(clamp(42px, 6vw, 48px) * .65)`, with 1.1 line height. Its measured 768px value remains **29.952px / 32.9472px**. The title's existing uppercase transformation and all original casing remain unchanged. The chapter headings are uppercase in their unchanged source text; their original computed text-transform:none is preserved. Existing eyebrow uppercase transformations remain where previously present.

## Shared tokens and selectors

`src/components/eleven-oasis/ElevenOasisTypography.css` centralizes the measured values under `.project-eleven-oasis`. It uses page-scoped `--eleven-type-*` variables and explicit existing text selectors, with no global heading/paragraph/button overrides.

- **Major headings:** `.eleven-study-heading > h2`.
- **Editorial:** `.eleven-problem-statements h3`, `.eleven-mobile-journey h3`, `.eleven-strategy-description h3`, `.eleven-strategy-unavailable h3`, `.eleven-editorial-row h3`, `.eleven-decision-headline`, `.eleven-decision-note h4`, `.eleven-system-part h4`, `.eleven-outcomes h3`, `.eleven-reflection h3`; shared with `.eleven-introduction-facts dd`.
- **Leads:** `.eleven-introduction-body`, `.eleven-problem-headline`, `.eleven-section-headline`, `.eleven-decisions-introduction`.
- **Body:** Problem paragraphs, Strategy explanations/brand notes/missing-export explanations, `.eleven-study-copy`, decision-note paragraphs, Results descriptions/note and original-context explanatory text. The Decisions lead is explicitly excluded from body rules.
- **Eyebrows:** `.eleven-introduction-facts dt`, `.eleven-journey-eyebrow`, `.eleven-subsection-label`, `.eleven-strategy-evidence-label`, chapter numbering paragraphs and the new inline `.eleven-outcome-number` spans.
- **Controls:** `.eleven-strategy-selectors button` uses the shared existing 12px sans-serif scale. `.eleven-section-navigation a` retains its independent existing rules, hover underline, active state and focus behavior.

Superseded type declarations were removed from `ElevenOasisIntroduction.css`, `ElevenOasisCaseStudy.css` and `ElevenOasisStrategyShowcase.css`; their layout declarations remain. `ElevenOasisCaseStudy.tsx` imports the shared stylesheet and wraps each existing Results number in a span so its typography can be subordinate without changing the heading wording or block structure.

Media controls, phone-stage buttons, gallery/lightbox controls, the shared header/footer and other routes receive no new typography overrides. Typography embedded in project artwork remains unchanged. The existing localized e-commerce nowrap span is preserved; paragraphs remain naturally wrapping.

## Verification

Lint, TypeScript, production build and content validation pass. Browser computed-style checks covered 320, 390, 600, 700, 701, 768, 950, 951, 1000, 1001, 1100, 1101, 1440, 1920 and 2560px. Checks compare every mapped text element against its actual Overview or Problem reference, including responsive family, size, weight, line height, letter spacing and relevant colors. The title, Overview references and case-study navigation match the pre-edit audit exactly. All six Strategy buttons retain their existing fonts, colors, 46px height and 44px number blocks. No text or page-level horizontal overflow was found.

Actual desktop/mobile screenshots were inspected for Problem, Strategy, Decisions and Results. All four anchors, six Strategy selections, Strategy 01 video pause/resume, phone filters/lightbox, and touch-emulated MacBook playback pass. The full page's wording and interactive markup, shared header/footer and all asset references are unchanged, apart from the inline number spans. CSS scope excludes other project pages, About and homepage. Browser QA uses the local production export and Chromium touch emulation; deployment status is checked separately through Vercel.
