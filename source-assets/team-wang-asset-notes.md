# TEAM WANG DESIGN — Under the Castle asset provenance

The homepage uses `under the castle-cover.png` unchanged. Its 4:3 composition is
contained in the existing project-card frame on a black background.

`python scripts/extract-castle-assets.py` exports the supplied cover and original
embedded artwork from `Portfolio- SHAN MU.pdf`, plus unobstructed photograph crops
for the case study. `public/projects/team-wang-under-the-castle/asset-manifest.json`
records the source, page/image block or crop rectangle for every asset. The
posters retain their original embedded resolution; no illustrations or photos
have been generated or upscaled.

## Why the cover currently uses the requested static fallback

The event photographs exist only as overlapping pixels in the flattened cover.
Some hidden areas cannot be recovered. For example, the entrance photo covers
part of the pumpkin photo, the right-hand interior covers part of the crowd
photo, and the foreground product photo covers part of the merchandise photo.
Crops containing the entire apparent photo rectangles would therefore include
fragments of their neighbors. Floating those crops would expose duplicate image
fragments or missing areas. The case-study crops only use unobstructed regions;
they are not suitable substitutes for full floating layers.

## Originals needed to enable the independent floating collage

Please add the six uncropped event photographs to this repository:

1. Giant pumpkin installation with exterior TEAM WANG DESIGN signage (left).
2. Under the Castle entrance arch and visitors (top middle).
3. Pumpkin installation and crowd under the venue canopy (upper right).
4. Wide stone exhibition interior with TEAM WANG DESIGN signage (right).
5. Arched apparel/merchandise display (lower right).
6. Foreground stone product display (bottom middle).

An original layered collage file (PSD, Figma, etc.) containing the photographs
and logo is an alternative to six individual photo files. A transparent PNG or
SVG of the central logo would improve its scaling quality, but the supplied
logo is already preserved in the static cover. Complete photographs would permit
a faithful reconstruction with staggered entrance, independent floating, desktop
parallax, offscreen/global pausing and reduced-motion support, without inventing
occluded image content.
