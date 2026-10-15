# Key Visual homepage cover

Source: `visual-experiments-cover.png` (1606 × 979), optimized as
`public/projects/visual-experiments/homepage-cover.webp`. The original uploaded
PNG is unchanged. The homepage display name does not change project data or the
existing `/work/visual-experiments/` photography route.

## Observed reference

The first left project in `2026-10-15 20-26-47.mp4` was inspected at 30 fps and
sampled as cropped frames. The recording lasts 2.933 seconds at 1280 × 720.
Its outer card stays fixed. Broad blurred cyan/blue fields sweep and deform
behind a centered mark: a pale crescent travels across the upper/right area,
a larger blue field crosses the middle, and the pale band returns diagonally.
The central mark also transitions and a product UI rises near the clip's end.
Those product-specific elements are not applicable to the supplied photography.
No clear hover enter/leave or full repeated cycle is shown; their exact easing
and duration cannot be established from this recording.

## Implementation and limitations

`KeyVisualPreview` preserves one intact cover. The image contains translucent
cards with the atmosphere and reflections baked through them; independent
floating cards cannot be extracted cleanly without reconstructing imagery.
There are no duplicate PNG layers, rectangular cutouts, generated photographs,
or reconstructed logos.

Two original radial blue/pink washes sweep continuously using composited CSS
transforms. An independently authored, feathered luminance mask excludes all
three card silhouettes; it masks only the colored atmospheric layer, never the
original photograph. The six-second eased cycle keeps the new pastel treatment
gentler than the short reference's product sequence. Fine-pointer hover adds
at most 0.6 degrees of perspective and 1.2% enlargement, returning in 700ms.
Hover timing is an authored restraint, not a verified reference value.

The global Pause Motion control freezes the wash and suppresses depth. Motion
also pauses offscreen/in hidden tabs. Reduced-motion CSS stops it immediately;
touch has no pointer tilt, and the non-JavaScript version is static and clickable.
