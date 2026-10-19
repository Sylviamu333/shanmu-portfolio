# Early Birds Club section navigation

Only `/work/early-birds-club/` uses this content shell. Its existing hero,
checkerboard cover, project facts, related projects, shared header and footer
remain unchanged. No other project or homepage data is edited.

The exact five cover categories map to real ordered sections:

| Navigation | Anchor | Existing/source content |
| --- | --- | --- |
| BRAND STORY | #brand-story | Original overview title and both unchanged paragraphs |
| IP DESIGN | #ip-design | Both original direction titles, wing symbols and identity variations |
| GRAPHIC SYSTEM | #graphic-system | Original monogram/checkerboard artwork, merchandise, accessory and apparel mockups |
| PHOTOGRAPHY | #photography | Six existing optimized EBC Drop 1 lookbook photographs |
| EBC – POP UP | #ebc-pop-up | Original signage and flag mockups with their original concept captions |

No dedicated pop-up documentation was found in the repository or 70-page Drop 1
lookbook. The pop-up category therefore shows existing concepts and makes no claim
that an event was produced. This mapping was stated to the owner while requesting
any preferred dedicated source. All twelve original gallery artworks, alt text
and captions remain present exactly once, with the six real photographs added.
The old #overview, #direction-one and #direction-two deep links are retained.

The server-rendered content reuses Reveal and ImageGallery, including the existing
entrance motion and image dialog controls. A small client navigation component
tracks five section boundaries once per scroll frame, exposes aria-current, and
observes header/navigation/section sizes. CSS sticky positions the sidebar below
the shared header; at 700px and below it becomes a compact sticky horizontal bar.
The active mobile link scrolls into the bar horizontally without moving the page.
Native anchors preserve history, keyboard activation and reduced-motion behavior.
Measured clearance adds only the offset not already provided by html scroll-padding.
Direct hash entry aligns after fonts and layout settle, without long timers.

## Verification

Production-export Chromium checks covered 375, 393, 700, 701, 768, 1024, 1440 and
1920px, plus reduced motion. All five links, manual forward/backward scrolling,
active states, keyboard activation, direct #photography entry, hidden overflow,
header clearance, sticky position and image open/Escape passed. Desktop, tablet
and mobile screenshots were reviewed. A settled first-link check confirmed the
heading lands at about 153px desktop / 173px mobile, with sticky tops of 90px / 58px.

Exported DOM comparisons confirmed the complete hero, header/footer and project
navigation/related-project markup are unchanged. All original copy and artwork
captions were checked for retention. Build content checks assert exactly five
links, matching anchors/order, retained artworks and available EBC photography.
