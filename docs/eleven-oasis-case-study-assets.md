# Eleven Oasis case-study asset audit

Scope: `/work/eleven-oasis/`. This audit accompanies the Problem → Strategy → Decisions → Results narrative.

## Authentic material retained

- `source-assets/eleven-oasis-homepage-demo.mp4`: latest clean recording of the redesigned storefront. The existing derived MP4, poster, screen geometry and playback component are unchanged.
- `source-assets/eleven-oasis-macbook.png`: original hardware artwork; its existing derived frame remains unchanged.
- `source-assets/eleven-oasis-homepage-ux.png`: displayed in full, preserving the original 1600 × 954 composition. The public copy is byte-for-byte identical.
- `source-assets/HOMEPAGE - PC.png` and `source-assets/PDP - pc.png`: original storefront captures, explicitly labelled as pre-redesign context in the existing expandable viewer.
- `0813 Eleven Oasis Guideline V1.pdf`: source of the existing five optimized brand-guideline images. Logo, clear-space, palette and Roboto brand typography references remain unedited.

The strategy artwork already numbers its themes consistently: 01 Navigation Strategy, 02 Product Discovery, 03 Trust & Conversion, 04 Responsive Design. It does not require alteration.

## Material not supplied

The repository currently has no dedicated authentic exports for:

1. Homepage UX breakdown with a central iPhone and navigation/trust/category close-ups.
2. Mobile Browsing composite showing homepage, collection, filtering, product detail and cart screens.
3. Final redesigned Collection and Product Detail screens across desktop and mobile.
4. Interface typography scales, vector icon library and sizing specifications, or reusable component/state sheets.

The page uses concise editorial copy and conditional gallery slots for these sections. It renders no empty artwork frames, stock images or fabricated UI. Add genuine `ProjectImage` entries to the page-specific arrays in `src/data/eleven-oasis-case-study.ts` when exports become available; preserve each asset's intrinsic aspect ratio.

## Typography and specifications

The project owner's complete redesign brief identifies **Oswald / Open Sans** as the storefront interface pairing. The supplied brand-identity PDF separately specifies **Roboto Black / Roboto Regular** for brand applications. These are described separately on the page, and the original brand artwork has not been relabelled as an Oswald/Open Sans component sheet.

No numeric interface type sizes, icon dimensions, spacing tokens or undocumented interaction-state specifications have been invented. Existing navigation and reassurance icons are described as seen in the supplied storefront artwork and walkthrough, without generating an imitation icon library.

## Outcomes

Results use the project owner's three supplied design-deliverable statements and reflection. No conversion, revenue, SEO or other business-performance metric is rendered as a result of this redesign. The page explicitly distinguishes deliverables from verified business impact.
