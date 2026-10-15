# TEAM WANG DESIGN — Under the Castle assets and motion

The case-study cover remains the unchanged `under the castle-cover.png`.
The homepage now reconstructs a layered cover on pure black: six unobstructed
photographic crops plus the central green logo. No flattened image sits beneath
the moving layers. An image-load failure replaces the complete layered scene
with the original static PNG.

## Source limitations and separation

The full original photographs are not available. Their occluded areas cannot be
recovered from the flattened PNG. The animated version therefore recomposes only
clean visible rectangular regions, rather than attempting to preserve missing
photo extents. Some photo framing and placement differ from the static collage.
No generative fill, neighboring photo fragments or duplicate photographs are used.

`python scripts/extract-castle-assets.py` exports original embedded campaign
artwork from `Portfolio- SHAN MU.pdf`, unobstructed photo crops, and the source
logo with its black matte converted to transparency. On black the logo matches
the source RGB within rounding precision. All derivatives retain their native
source resolution. The asset manifest records exact source coordinates/pages.

For wider photo framing or higher-resolution imagery, supply these six originals
(or a layered PSD/Figma collage): pumpkin installation/exterior signage; entrance
arch/visitors; crowd under the venue canopy; wide stone exhibition interior;
apparel display; foreground stone product display. A vector/transparent original
logo would improve scaling quality but is not required for the current cover.

## Recording observations and authored motion

The supplied 25-second reference recording shows the second Work card briefly
at approximately 10–13 seconds. Notification cards slide independently, vary
their overlaps and frame persistent central text. The recording does not expose
a complete long loop, the cards' exact easings or their original entrance timing.
Those values cannot be verified as an exact reconstruction.

The original implementation uses the existing Motion library for a logo-first
entrance (0.65 seconds), followed by six photo entrances (0.8 seconds each,
140 ms stagger, cubic easing). Independent CSS transform cycles last 5.9–8.8
seconds. A coordinated 21-second cycle transitions among three curated layouts,
changing overlaps without discontinuous z-index swaps. Desktop pointer parallax
adds depth without stopping the loops; mobile travel is reduced and has no
pointer parallax. The logo breathes by 1.2% without flashing.

IntersectionObserver, document visibility and the existing Pause Motion control
pause playback. Reduced motion and no-JavaScript render a static layered scene.
The third card uses its own yellow case-study badge in the empty upper-left
corner: hover/focus on desktop, visible on touch. The shared cursor label is
suppressed only for this card; other project affordances are unchanged.
