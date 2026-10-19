# Shared Work detail hero

All five homepage Work destinations use `ProjectHero.tsx` / `ProjectHero.css`.
The source is the existing Eleven Oasis introduction, including its 50/50 grid,
outer gutters, 24px desktop / 18px mobile top padding, Selected work link and
project index, left description, right Georgia overview/facts, and divider rules.
The old oversized and separate photography hero styles were removed.

## Typography and responsive layout

- Title: Arial/Helvetica, 400, −0.025em tracking; 33.8px / 1.1 above 1100px.
- The existing tablet formula is retained at 701–1100px.
- At 700px and below, columns stack and the title is 30px / 1.12.
- Category: 12px sans-serif; description: 16px desktop / 15px mobile.
- Right overview: Georgia Regular, 18px desktop / 16px mobile.
- Facts: Georgia Regular, 10px labels and 14px values.

Heights remain content-driven: long campaign copy can take more space, and the
photography page does not get invented metadata. Titles keep their existing
capitalization and punctuation. Eleven Oasis remains visually uppercase. The
KEY VISUAL homepage destination retains its existing Visual Experiments detail
title, photography description, series links and stills/motion toggle. Routes,
project data, images, galleries and all case-study content remain unchanged.

## Verification

Computed styles, container and column alignment, back-link/index positioning,
wrapping and overflow were checked for all five routes at 1440, 1920, 1024, 768,
700, 701, 375 and 393px. Eleven Oasis matches a fresh unchanged-main build in
computed typography and geometry; desktop 1440px and mobile 393px hero crops
are pixel-identical. Desktop/mobile screenshots of every hero were reviewed.

Exported below-hero markup is unchanged (React-generated IDs normalized), including
all Eleven Oasis interactions and all three photography series. Shared header,
footer, homepage and About content remain unchanged. Photography series links,
stills/motion controls and the Selected work return to /#work were tested.
Lint, TypeScript, production build, content/source checks and research data tests
passed. Browser checks use the local production export.
