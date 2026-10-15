# Homepage Halloween cover

- Original: `source-assets/under-the-castle-kv.png` (1380 × 650). Public copy: `public/projects/team-wang-under-the-castle/homepage-kv.png`, byte-for-byte identical.
- `CastlePreview.tsx` uses a single SVG viewport containing the original raster and two traced eye silhouettes. `preserveAspectRatio="xMidYMid meet"` letterboxes the full artwork inside the existing Work card; no image stretching, cropping, moving collage, or full-image brightness animation is used.
- Left eye source bounds: approximately x601–669, y421–462. Right: x745–808, y421–463. Paths follow the actual raster outlines, simplified within about 1.1 source pixels. They are not generic triangles.
- Three uses of the same eye paths provide crisp neon #39FF14 illumination, a 4px Gaussian halo, and a subtler 11px bloom in source coordinates. Blur filters remain static. Only the combined eye illumination opacity animates.
- CSS follows the requested five-second timeline: 25%, 35%, 100%, 20%, 90%, 40%, 30%, 30%, 100%, 45%, 25% intensity at 0/10/13/16/19/22/45/65/70/74/100% cycle progress.
- IntersectionObserver and document visibility pause the cycle outside the viewport or in hidden tabs. The existing homepage Pause Motion context also pauses it. Reduced motion shows a static 25% eye glow. Without JavaScript the original artwork and subtle paused illumination remain visible.
- The case-study project's cover, photographs, metadata, and route are untouched. The old extracted collage assets remain available to that case study.

## Verification

A running Chromium browser observed 16 seconds of automatic, unhovered playback, including eight bright pulses. The base image's bounds and transform stayed unchanged. Comparing exact dim/bright rendered frames confined every changing pixel to the eye/bloom region. Desktop, tablet, and mobile checks at 320, 390, 768, 1024, 1440, and 1920px confirmed alignment, original card dimensions/metadata, zero horizontal overflow, unchanged footer dimensions, and no leftover homepage About cell. Offscreen pause, global Pause Motion, reduced motion, mobile case-study navigation, and the new About route were checked.

The homepage practice section and its dedicated component/styles/copy/flower were removed. With the user's approval, existing biography/services now live at `/about/`; both About navigation links point there. No source illustration was regenerated.
