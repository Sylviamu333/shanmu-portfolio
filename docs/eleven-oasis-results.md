# Eleven Oasis — compact impact summary

Only `04 / RESULTS` at `#results` is redesigned. It now contains one near-full-width
electric-blue panel with three white metrics, restrained dividers and a
low-contrast CSS dot texture. **The Results** now sits on white above the panel,
using the shared Eleven Oasis chapter-heading component.

| Figure | Caption | Basis |
| --- | --- | --- |
| 5% → 25% | Core CTA click-through rate | Supplied by the project owner |
| 5× | CTA engagement vs. baseline | 25% ÷ 5%; a derived restatement, not an independent outcome |
| ≈200% | Business GMV growth | Supplied by the project owner |

These figures are not independently verified. The existing owner-reported notes
in `src/data/projects.ts` document that the measurement period, traffic volume and
testing method were not supplied. No period, revenue amount, significance,
additional conversion rate or exclusive redesign attribution is added.
A brief visible provenance note keeps these distinctions explicit.

The blue2purple screenshot mentioned in the brief was not present in the
available attachments or repository. The detailed written composition guided
this implementation; exact screenshot fidelity is not claimed. No logo,
navigation, promotional banner or proprietary artwork is copied.

## Layout

Desktop and tablet widths above 760px use a single horizontal metric row, with
more room for the longer CTA figure and thin vertical separators. Mobile uses
three stacked metrics with horizontal separators. Typography uses the existing
case-study Arial/Helvetica sans-serif and Georgia eyebrow language.

The values render as semantic description-list text in the server component.
They are visible immediately, with no count-ups, autoplay, hidden reveals or
client-side animation controller. This also provides a static reduced-motion
experience. The original Results anchor and shared navigation remain intact.

The former editorial compositions, duplicate Hotjar/A/B viewers, collage and
Results-only GSAP reveal code are removed from this section. Research evidence
continues to live in the unchanged Research & Validation section. All source
assets and existing derived images remain in the repository, including the old
Results preview and its preparation script.

## Validation

- Lint, TypeScript, production build and exported-content checks.
- Results checks assert the three exact values/captions, owner provenance,
  derived-metric relationship and absence of inline research screenshots.
- Responsive browser inspection checks number/caption bounds, row/stack order,
  separators, readable contrast, the Results anchor and reduced motion.
- Comparison of exported markup verifies the surrounding case-study content is
  unchanged. Research source hashes and existing authentic metric tests remain
  valid.

Browser checks passed at 320, 375, 393, 430, 600, 760, 761, 768, 1000, 1024,
1440 and 1920px. All three values remained within their columns/panel; captions
followed the values, desktop vertical dividers changed to mobile horizontal
separators, and there was no horizontal overflow. The Results anchor cleared
the shared header and the existing active navigation indicator still worked.
The static panel remained readable with reduced motion. No browser errors or
failed local requests were recorded. Desktop, tablet and mobile screenshots
were visually reviewed.

| Viewport | Previous section height | New panel height |
| --- | ---: | ---: |
| 1440px desktop | 3021px | 459px |
| 1024px tablet/desktop | 2442px | 386px |
| 768px tablet | 4506px | 357px |
| 393px mobile | 3867px | 636px |

Exported markup for Problem (including Mobile Shopping Journey), Strategy,
Research & Validation, case-study navigation, project pagination, shared Header
and Footer was compared before/after and is identical. All source and derived
assets remain unchanged. Only the Results component/styles and their checks and
documentation were edited.

## Shared chapter headings

All four main chapters reuse `ElevenOasisSectionHeading`: Arial/Helvetica,
700 weight, 1.12 line height and −0.035em tracking, matching the previous Results
heading treatment. Sizes are fixed at 48px, or 36px at the existing 700px project
typography breakpoint. Eyebrows have an 18px gap above the heading; following
content has a shared 24px gap. All headings are dark on white. The Results heading
was moved above the blue panel with the project owner’s approval; the panel’s
metrics, texture, spacing, dividers and provenance text are unchanged.

The heading update was checked in Chromium at 1440, 1920, 375 and 393px, plus
700/701px at the breakpoint. All four computed headings matched: 48px/53.76px
font size/line height on desktop, 36px/40.32px on mobile, 700 weight, identical
tracking and #242521 text. The research title wrapped without overflow. All four
anchors remained visible below the shared header. Exported markup comparisons
confirmed unchanged strategy, journey, research workspace, metrics, provenance,
shared header/footer and project navigation. Lint, TypeScript, production build,
exported-content checks and the four research data tests passed.
