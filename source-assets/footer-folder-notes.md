# Interactive footer folder

Source: `footer-pink-glass-folder.png`. The original uploaded PNG is unchanged.

## Layers and provenance

- `src/components/home/FooterFolder.tsx` renders a separate back panel, portrait card, coral card, yellow note, front pocket, and decorative View label. `HomeFooter.tsx` supplies the single accessible Work link.
- `src/components/home/FooterFolder.css` animates only card transforms and label opacity/transforms. Portrait/note/coral movement is staggered by 60ms, lasts 560ms, and reverses from its current state on pointer leave. No looping animation or new dependency is used.
- `scripts/extract-footer-folder.py` (Pillow) reproducibly exports the original visible photo crop, handwriting/heart, green lettering, and front-pocket texture into `public/footer-folder/`. `asset-manifest.json` records source coordinates and extraction methods.
- The portrait is geometrically rectified from a clean visible region of the supplied image. Its subject and photographic content are unchanged; no face regeneration, retouching, or artificial hidden-photo fill is used.
- CSS/SVG reconstructs the card surfaces, back panel, white star and simple underline. The front pocket combines the original glass texture with a translucent surface, rounded highlights, inner shadows, and a modest backdrop blur. The complete flattened folder is never rendered behind the moving cards.

## Unavailable original layers

The flattened PNG does not supply the full unobscured portrait photograph, full card artwork, isolated back panel, or a reflection-free transparent front pocket. The implementation uses the clean visible portrait region and original lettering, while reconstructing hidden plain surfaces. An original full-resolution portrait and separate glass/card exports would allow closer framing and material fidelity. The extracted pocket retains the source's diffuse colored reflections, so those subtle reflections remain stationary while the cards move.

## Interaction and accessibility

Desktop hover and keyboard focus reveal three cards and a delayed yellow View label. Touch uses the compact static composition with a visible label and navigates directly to Work on one tap. The View label is decorative, never a nested control. Reduced motion and the existing global Pause Motion control suppress card movement. The existing footer dimensions, navigation, credits, Back to Top size, and other homepage sections are preserved.
