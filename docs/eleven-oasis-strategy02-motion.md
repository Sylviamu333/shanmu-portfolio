# Strategy 02 PDP micro-interaction

Scope: `/work/eleven-oasis/`, Strategy 02 only. The verified flattened PNG remains byte-identical at `/projects/eleven-oasis/strategy/pdp-ux-decisions.png`; no asset or strategy copy changed.

## Presentation

`Strategy02PdpArtwork.tsx` reuses `ImageGallery` with the opt-in `presentation="pdp"`. It observes visibility and waits for the selected image to decode, then starts one entrance per Strategy 02 selection. Scrolling does not control progress or replay the entrance. The observer disconnects after entry; cleanup cancels pending entry when switching strategies.

`Strategy02PdpArtwork.css` replaces only Strategy 02's incoming panel fade with a single 600ms opacity/translateY/scale transition: opacity 0 → 1, 12px → 0, .98 → 1; cubic-bezier(.22, 1, .36, 1). Existing transitions on descriptions and other panels remain unchanged. A separate inset frame and hover wrapper provide 1 → 1.015 scaling over 300ms ease-out on fine pointers. The inset keeps the complete PNG inside the original allocated media area, including at maximum hover scale. Touch devices omit hover scaling. Reduced motion displays the image immediately without either transform.

## Existing lightbox, scoped enhancements

The entire image remains a native button with meaningful alt text, Enter/Space activation and visible keyboard focus. The existing native dialog is reused with a Strategy 02-only white presentation, translucent neutral backdrop, 92vw × 90dvh bounds and contained full-resolution artwork. Close, Escape and backdrop dismissal are retained. The single-image dialog keeps Tab/Shift+Tab on its Close control. The opt-in presentation locks body scrolling, compensates for a visible scrollbar, restores prior inline styles and returns focus to the image trigger on close or cleanup. Other galleries retain their existing appearance and behavior. No dependency added.

## Changed files

- `src/components/eleven-oasis/Strategy02PdpArtwork.tsx`
- `src/components/eleven-oasis/Strategy02PdpArtwork.css`
- `src/components/eleven-oasis/ElevenOasisStrategyShowcase.tsx`
- `src/components/ImageGallery.tsx` (optional PDP presentation only)
- This report.

## Validation

Lint, TypeScript, production build and exported-content checks passed. Chromium checks covered nine widths (320, 390, 600, 768, 950, 951, 1024, 1440 and 1920px), matching the preceding build's showcase/media/selector/description dimensions exactly. No horizontal overflow occurred. Real intermediate entrance frames confirm the 600ms transition and absence of a second incoming panel fade. Hover growth stays within its frame and resets on mouse leave at every width. Offscreen selection waits for visibility, and ordinary scrolling does not replay entry.

Desktop and mobile screenshots were inspected. The complete composition is visible both inline and enlarged. Enter/Space/click activation, focus indication, Tab/Shift+Tab containment, Close/Escape/backdrop dismissal, scroll locking/restoration and trigger focus restoration passed. All six selectors, description updates and Strategy 01 video pause/timestamp/resume passed, as did reduced-motion and touch behavior. Server-rendered content outside the showcase matches the previous build; the original/public PNG hashes match. No browser errors occurred.
