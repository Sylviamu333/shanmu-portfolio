# Portfolio media performance audit

Audit date: 20 October 2026 (Asia/Shanghai). Audited application commit: `219296dcab5834da38f3b6eecc80e5c732894408`.

This is an audit, not an optimization implementation. Original images, videos, layouts, typography, animations, clipping coordinates and production code are unchanged. Test encodes were written only to scratch storage and are not deployed. This directory contains documentation and inventories only.

## Main finding

The homepage's three PNG preview assets total **10,915,399 bytes (10.92 MB)**. At the same pixel dimensions, test WebP quality-92 versions total **1,398,192 bytes**, a measured **9,517,207-byte / 87.2%** reduction. These are lossy candidates, not approved replacements. Exact-pixel lossless WebP versions total **6,496,256 bytes** and save **4,419,143 bytes / 40.5%** with decoded RGBA bytes verified identical. This is the best first opportunity, before changing any visual design.

There is also a cross-cutting delivery issue: `next.config.ts` uses static export and `images: { unoptimized: true }`. Most Next Image components have a `sizes` string but emit no responsive `srcset`. A `sizes` attribute alone does not cause the browser to request a smaller file. The About collage is an important exception: it already supplies real `<picture><source srcset>` variants.

## Complete downloadable inventories

- [Every tracked image/video and its size, dimensions, page, loading method, recommendation and measured candidate savings](asset-inventory.csv) — **379 rows**: 295 public media files and 84 archival/reference media files.
- [Every public image over 500 KB](images-over-500KB.csv) — **42 rows**.
- [Every video, including original/reference recordings](videos.csv) — **9 rows** (2 public playback files, 7 nonpublic source/reference/demo recordings).
- [All measured image test encodes](compression-samples.csv) — lossless, high-quality WebP, and selected AVIF comparisons.
- [Desktop/mobile page and strategy observations](browser-profiles.json).
- [Observed per-file requests and their first phase](observed-requests.csv).
- [Exact inventory metadata, hashes and video streams/MP4 atoms](inventory-metadata.json).

Bytes are exact. KB = 1,000 bytes; MB = 1,000,000 bytes. The image threshold is >500,000 bytes and video threshold >5,000,000 bytes. PDFs and fonts are discussed separately; the 379-row media inventory does not count them as images/videos.

Public media occupies **124,499,438 bytes (124.50 MB)**: 293 images totalling 114.21 MB, plus two videos totalling 10.29 MB. The 84 archival media files occupy **165,184,119 bytes** outside `public/` and are not automatic website payload. Do not mistake total repository or deployment size for the amount downloaded by one visit.

## Method and limitations

- All seven routes were inspected: homepage, About, Eleven Oasis, Early Birds Club, TEAM WANG DESIGN — Under the Castle, Covers, and the Key Visual photography destination (`/work/visual-experiments/`).
- Fourteen fresh Chromium profiles used desktop 1440×900 at DPR 1 and mobile 393×900 at DPR 3. HTTP cache was disabled. Tests captured a 2-second no-scroll state, scrolled the page, visited all six strategy panels, selected all Strategy 02/04 slides, and opened all 14 research-source images.
- The local server served the existing production static export and supported video byte ranges. This establishes file usage and loading behavior; it does **not** measure real mainland-China throughput, CDN routing, DNS, TLS, production cache headers, or Core Web Vitals.
- Every file was sized from disk; raster dimensions were inspected; all MP4 streams, durations and top-level atoms were probed. Live requests to `shanmu.space` and `www.shanmu.space` were blocked by the execution environment's proxy (`CONNECT 403`), before reaching either site. This is not evidence that the sites themselves return 403.
- Request sums below are **sizes of unique media files whose URLs were requested**, not measured transferred bytes. In particular, a video can be requested using byte ranges without transferring its full file. Native lazy-load distance varies by browser/network. A local 2-second snapshot is not a mainland timing benchmark.
- There were no JavaScript errors. Some Next route-prefetch requests and video requests were aborted during scrolling/strategy changes; aborted requests are not treated as broken media files. A full post-deployment mainland-network playback test is still needed.

## Per-page exposure

| Page | Initial desktop file-size sum | Initial mobile file-size sum | After scrolling, desktop | After scrolling, mobile |
|---|---:|---:|---:|---:|
| Homepage | 13.29 MB | 13.50 MB | 14.04 MB | 14.04 MB |
| About | 3.31 MB | 2.55 MB | 3.31 MB | 3.31 MB |
| Eleven Oasis | 8.77 MB | 7.85 MB | 14.04 MB | 14.04 MB |
| Early Birds Club | 0.56 MB | 0.26 MB | 3.74 MB | 3.74 MB |
| Under the Castle | 2.58 MB | 2.58 MB | 7.20 MB | 7.20 MB |
| Covers | 0.21 MB | 0.21 MB | 1.26 MB | 1.26 MB |
| Key Visual photography | 0.24 MB | 0.24 MB | 2.24 MB | 2.24 MB |

Eleven Oasis reaches a cumulative 31.78 MB of unique requested file sizes after all six strategies, and 34.01 MB after opening all original research images. This is an exploration-session total, not an initial page transfer. Strategy additions in the desktop profile were approximately 2.82 MB (PDP), 3.68 MB (campaigns), 3.97 MB (trust), 2.87 MB (branding), and 4.40 MB (foundations). Shared files can be reused across warm-cache page visits; do not add every page total as if each always downloads again.

## Ten highest-impact optimizations, ranked

Estimates overlap: responsive variants, conversion, and deferral can affect the same asset. Do not sum the rows into one guaranteed saving.

| Rank | Change | Evidence / measurable opportunity | Visual-fidelity safeguard |
|---|---|---|---|
| 1 | Replace homepage laptop screenshot PNG delivery with a measured WebP derivative | `website-classic.png`: 8.30 MB → 1.125 MB at 1921×6767, saving 86.5%; pixel-identical lossless alternative 4.857 MB, saving 41.5% | Keep the original; preserve the exact screen clip, screenshot aspect ratio, scrolling distance, duration and hover pause. Review text at actual display size and zoom. |
| 2 | Add a static responsive-image pipeline with real `srcset` / `<picture>` or an export-compatible custom loader | Homepage screenshot is 1921 px wide but drawn about 461 CSS px on desktop; many galleries similarly deliver original pixels. Most `sizes` strings currently cannot choose a variant | Retain full-resolution lightbox originals. Select widths from actual rendered width × DPR; validate 1×/2×/3×. Do not simply disable `unoptimized` in a static export without a compatible loader. |
| 3 | Re-encode both public MP4s without changing dimensions, frame rate or duration | PC: 5.784 → 2.548 MB (55.9%); mobile: 4.509 → 2.549 MB (43.5%). Combined saving 5.196 MB | Retain H.264 compatibility, 30fps, all controls, masks, crop, autoplay/mute/loop/playsInline. Both already have faststart and no audio. Small UI text still requires visual approval. |
| 4 | Optimize the EBC homepage cover and Under the Castle detail cover PNGs | 1.831 → 0.160 MB and 2.055 → 0.279 MB in native-dimension Q92 tests. Exact-pixel lossless savings 36.3% and 36.2% | Update every image/SVG/CSS reference together for the EBC cover. Do not redraw traced lettering or change the neon-green artwork. |
| 5 | Stop preloading all research preview layers on case-study mount | 26 research files / 1,634,868 bytes requested before scrolling, including hidden accordion/tab layers | Mount or warm the evidence when the research section approaches; retain current/adjacent prefetch, every original screenshot, all metrics, tabs and viewer state. |
| 6 | Use width-aware Campaign Landing Page previews | Two screenshots: 3.684 MB combined → 0.527 MB in 800px Q92 tests. At desktop DPR 1 each is drawn about 384 CSS px | An 800px variant is only for suitable width/DPR combinations. Serve larger variants on high-DPR/mobile displays. Keep the single shared scroll timeline and normalized progress. |
| 7 | Optimize/defer hidden Strategy 06 scene images | Selecting Strategy 06 eagerly requests 26 images / 4.40 MB. `desktop.webp` alone is 2.807 MB; a 1080px Q92 preview is 0.199 MB | Keep full-resolution closer views. Size variants for DPR (1080 is not sufficient for every large/3× case). Prefetch upcoming scenes without dropping frames or changing timeline order. |
| 8 | Reduce hero layer bandwidth and decoded texture size | Six foreground/face files total 1.689 MB and are decoded at mount. Each 1785×881 RGBA canvas is about 6.29 MB decoded; six are about 37.7 MB before browser overhead. One native Q92 foreground test is 0.093 MB vs 0.552 MB | Preserve transparency, edge diffusion, all registered SVG coordinates, expressions, hover responsiveness and the seamless single gradient. Prefer lossless for sensitive edges; do not remove interaction states. |
| 9 | Optimize About illustration and per-slot collage delivery | Single 1467px illustration is 0.959 MB, displayed 360 CSS px desktop / 317 mobile. A 960px Q92 candidate is 0.090 MB. All six collage photos eagerly fetch 960px variants, even smaller slots | Existing responsive photo sources are working: preserve them. Add illustration variants and slot-aware sizes; reserve larger variants for featured photo swaps and high DPR. |
| 10 | Optimize shared logo/footer raster resources | `s-monogram.png`: 0.168 → 0.070 MB pixel-identical lossless. Footer glass: 0.538 → 0.380 MB lossless, or 0.043 MB in a Q92 test | Preserve the uploaded S shape, alpha, glossy pink pocket and layered footer animation. Existing footer lazy loading should remain; avoid preloading decorative footer media from the top. |

A deployment-only cleanup of unused public legacy images is lower priority than these actual user-visible requests. It can reduce artifact size, but removing an asset no visitor requests saves **zero** page-transfer bytes. Do not delete original design sources.

## Actionable asset table

Sizes below are current served-file sizes. Measurements are scratch candidates and not guarantees of perceptual equivalence. “On tab” means it is deferred until that strategy is visited.

| Page / module | Asset (public-relative) | Type | Original | Loading | Recommendation | Measured candidate / reduction |
|---|---|---|---:|---|---|---|
| Homepage | `previews/eleven-oasis/website-classic.png` | PNG | 8.305 MB | Lazy img, requested in no-scroll profile | Native WebP first; real responsive widths | 1.125 MB / 86.45% (q92 at 1921x6767) |
| Homepage | `previews/eleven-oasis/cover-classic.png` | PNG | 0.780 MB | Lazy img; same initial profile | Native WebP; preserve stationary laptop | 0.114 MB / 85.44% (q92 at 1600x1200) |
| Homepage | `previews/early-birds-club/cover.png` | PNG | 1.831 MB | Lazy img + eager SVG/CSS reuse | Convert every reuse together | 0.160 MB / 91.28% (q92 at 1600x1200) |
| Homepage | `hero/hero-foreground.webp` | WEBP | 0.552 MB | Priority/SVG/mount decode | Registered alpha-preserving derivative | 0.093 MB / 83.16% (q92 at 1785x881) |
| All pages | `footer-folder/glass-pocket.png` | PNG | 0.538 MB | Native lazy img | Preserve alpha; lossless first | 0.043 MB / 92.08% (q92 at 1126x389) |
| All pages | `brand/s-monogram.png` | PNG | 0.168 MB | Eager SVG image | Pixel-identical WebP | 0.070 MB / 58.41% (lossless at 1254x1254) |
| About | `about/about-shan-illustration.webp` | WEBP | 0.959 MB | Eager picture, single WebP source | Real responsive illustration variants | 0.090 MB / 90.57% (q92 at 960x702) |
| Eleven Oasis / PC | `projects/eleven-oasis/demo/homepage-demo-cc253649880f.mp4` | MP4 | 5.784 MB | Intersection-gated autoplay; visible at initial load | Same-resolution H.264 CRF test | 2.548 MB / 55.94% (H.264 CRF23 at 760x490) |
| Eleven Oasis / Strategy 01 | `projects/eleven-oasis/strategy/mobile/homepage-mobile-d9ec1b3c8780.mp4` | MP4 | 4.509 MB | Active + visible gated src; requested during scroll | Same-resolution H.264 CRF test | 2.549 MB / 43.47% (H.264 CRF23 at 592x1206) |
| Eleven Oasis / Strategy 01 | `projects/eleven-oasis/strategy/homepage-ux-decisions.png` | PNG | 0.923 MB | Native lazy artwork; desktop no-scroll profile | Native WebP; retain legible annotations | 0.170 MB / 81.58% (q92 at 1600x958) |
| Eleven Oasis / Strategy 03 | `projects/eleven-oasis/strategy/campaigns/editorial-full.webp` | WEBP | 2.273 MB | On tab, effect forces eager decode | Width/DPR-aware preview; preserve shared timeline | 0.323 MB / 85.79% (q92 at 800x2979) |
| Eleven Oasis / Strategy 03 | `projects/eleven-oasis/strategy/campaigns/promotion-full.webp` | WEBP | 1.410 MB | On tab, effect forces eager decode | Width/DPR-aware preview; preserve shared timeline | 0.204 MB / 85.50% (q92 at 800x2179) |
| Eleven Oasis / Strategy 06 | `projects/eleven-oasis/foundations/desktop.webp` | WEBP | 2.807 MB | On tab, eager including hidden scenes | Responsive preview + scene-aware warming | 0.199 MB / 92.92% (q92 at 1080x745) |
| Under the Castle | `projects/team-wang-under-the-castle/cover.png` | PNG | 2.055 MB | Preloaded above-fold Next Image | Native WebP; preserve artwork | 0.279 MB / 86.41% (q92 at 1600x1200) |
| Under the Castle | `projects/team-wang-under-the-castle/merchandise.png` | PNG | 0.719 MB | Native lazy gallery img | Native WebP, original retained | 0.093 MB / 87.12% (q92 at 1594x561) |

For the campaign 800px and foundations 1080px samples, reductions include resizing, not just re-encoding. Preserve full originals and larger DPR variants. For the native-dimension PNG tests, only encoding changed. Exact byte counts for every variant appear in `compression-samples.csv`.

## Every public image exceeding 500 KB

This table includes optional readers, browser fallbacks and legacy copies so they are not mistakenly omitted from the audit. Their presence does **not** mean they load automatically. The complete CSV adds recommendations and candidate savings per file.

| Project / page | Public-relative filename | Type | Exact bytes | Loading / relevance |
|---|---|---|---:|---|
| Eleven Oasis | `projects/eleven-oasis/homepage-before-original.png` | PNG | 22,070,750 | Not requested in tested routes/states; retained legacy/alternate asset; review references before removal |
| Homepage | `previews/eleven-oasis/website-classic.png` | PNG | 8,304,639 | Native lazy img; fetched during no-scroll profile because browser threshold reaches Work |
| About | `about/about-life-02.jpg` | JPG | 5,507,689 | picture fallback; WebP selected in tested modern browsers |
| Eleven Oasis | `projects/eleven-oasis/strategy/mobile/pdp-mobile-full.webp` | WEBP | 4,547,714 | Not requested in tested routes/states; retained legacy/alternate asset; review references before removal |
| Eleven Oasis | `projects/eleven-oasis/homepage-before.webp` | WEBP | 3,798,898 | Not requested in tested routes/states; retained legacy/alternate asset; review references before removal |
| Eleven Oasis | `projects/eleven-oasis/foundations/desktop.webp` | WEBP | 2,807,182 | On Strategy 06 first visit: eager img for all scenes + new Image().decode() warm-up |
| Eleven Oasis | `projects/eleven-oasis/pdp-before-original.png` | PNG | 2,520,977 | Not requested in tested routes/states; retained legacy/alternate asset; review references before removal |
| Eleven Oasis | `projects/eleven-oasis/strategy/campaigns/editorial-full.webp` | WEBP | 2,273,422 | On Strategy 03 first visit; effect changes loading to eager and decodes both images |
| Under the Castle | `projects/team-wang-under-the-castle/cover.png` | PNG | 2,055,304 | Native img loading=auto; static export sends original asset (no automatic srcset) |
| Homepage | `previews/early-birds-club/cover.png` | PNG | 1,830,742 | Native lazy img plus eager SVG image and CSS background; URL reused/cached, not six separate full downloads |
| About | `about/about-life-01.jpg` | JPG | 1,717,297 | picture fallback; WebP selected in tested modern browsers |
| About | `about/about-shan-illustration.png` | PNG | 1,590,662 | picture fallback; WebP selected in tested modern browsers |
| Eleven Oasis | `projects/eleven-oasis/strategy/pdp-ux-decisions.png` | PNG | 1,510,996 | Not requested in tested routes/states; retained legacy/alternate asset; review references before removal |
| Eleven Oasis | `projects/eleven-oasis/homepage-before-display.webp` | WEBP | 1,424,618 | Not requested in tested routes/states; retained legacy/alternate asset; review references before removal |
| Eleven Oasis | `projects/eleven-oasis/strategy/campaigns/promotion-full.webp` | WEBP | 1,410,416 | On Strategy 03 first visit; effect changes loading to eager and decodes both images |
| Homepage | `hero/hero-pink-folder.png` | PNG | 1,347,903 | Not requested in tested routes/states; retained legacy/alternate asset; review references before removal |
| Eleven Oasis | `projects/eleven-oasis/homepage-ux.png` | PNG | 1,247,411 | Not requested in tested routes/states; retained legacy/alternate asset; review references before removal |
| Eleven Oasis | `projects/eleven-oasis/mobile-browsing.png` | PNG | 1,071,123 | Not requested in tested routes/states; retained legacy/alternate asset; review references before removal |
| Eleven Oasis | `projects/eleven-oasis/branding/a9dfe79cc0ca/page-15.webp` | WEBP | 1,065,614 | Guideline reader/full-resolution image on demand; not opened in these profiles |
| Eleven Oasis | `projects/eleven-oasis/branding/a9dfe79cc0ca/page-14.webp` | WEBP | 994,384 | Guideline reader/full-resolution image on demand; not opened in these profiles |
| Eleven Oasis | `projects/eleven-oasis/branding/a9dfe79cc0ca/page-17.webp` | WEBP | 985,920 | Guideline reader/full-resolution image on demand; not opened in these profiles |
| About | `about/about-shan-illustration.webp` | WEBP | 958,556 | Eager picture; real WebP srcset for photos; illustration has one WebP source |
| Eleven Oasis | `projects/eleven-oasis/strategy/homepage-ux-decisions.png` | PNG | 922,679 | Native img loading=lazy; static export sends original asset (no automatic srcset) |
| About | `about/about-life-01-1536.webp` | WEBP | 916,070 | Responsive srcset alternative; not selected at tested DPR/widths |
| Eleven Oasis | `projects/eleven-oasis/branding/a9dfe79cc0ca/page-18.webp` | WEBP | 862,756 | Guideline reader/full-resolution image on demand; not opened in these profiles |
| About | `about/about-life-03.jpg` | JPG | 856,372 | picture fallback; WebP selected in tested modern browsers |
| About | `about/about-life-02-1600.webp` | WEBP | 832,576 | Responsive srcset alternative; not selected at tested DPR/widths |
| Eleven Oasis | `projects/eleven-oasis/branding/a9dfe79cc0ca/page-16.webp` | WEBP | 812,718 | Guideline reader/full-resolution image on demand; not opened in these profiles |
| Homepage | `previews/eleven-oasis/cover-classic.png` | PNG | 780,018 | Native lazy img; fetched during no-scroll profile because browser threshold reaches Work |
| Eleven Oasis | `projects/eleven-oasis/strategy/trust/social-proof-02-56f9b8775c9d.webp` | WEBP | 777,112 | Selected strategy carousel; current/adjacent slides eager; visited slides retained |
| Eleven Oasis | `projects/eleven-oasis/foundations/pdp.webp` | WEBP | 757,064 | On Strategy 06 first visit: eager img for all scenes + new Image().decode() warm-up |
| Under the Castle | `projects/team-wang-under-the-castle/merchandise.png` | PNG | 718,964 | Native img loading=lazy; static export sends original asset (no automatic srcset) |
| Eleven Oasis | `projects/eleven-oasis/mobile/eleven-oasis-mobile-4.png` | PNG | 672,772 | Phone lightbox original on demand; thumbnails used in gallery |
| Eleven Oasis | `projects/eleven-oasis/mobile/eleven-oasis-mobile-3.png` | PNG | 644,909 | Phone lightbox original on demand; thumbnails used in gallery |
| About | `about/about-life-03-1600.webp` | WEBP | 629,840 | Responsive srcset alternative; not selected at tested DPR/widths |
| Eleven Oasis | `projects/eleven-oasis/research/hotjar3.webp` | WEBP | 601,102 | Research evidence lightbox, explicit click on original source |
| Eleven Oasis | `projects/eleven-oasis/strategy/trust/social-proof-01-757d93cdb792.webp` | WEBP | 596,842 | Selected strategy carousel; current/adjacent slides eager; visited slides retained |
| Eleven Oasis | `projects/eleven-oasis/mobile/eleven-oasis-mobile-5.png` | PNG | 557,354 | Phone lightbox original on demand; thumbnails used in gallery |
| Homepage | `hero/hero-foreground.webp` | WEBP | 551,666 | Hero priority image / eager SVG layers / mount-time new Image().decode() |
| About; Covers; Early Birds Club; Eleven Oasis; Homepage; Key Visual photography; Under the Castle | `footer-folder/glass-pocket.png` | PNG | 538,353 | Native lazy img; may be fetched early within browser lazy-loading threshold |
| Eleven Oasis | `projects/eleven-oasis/strategy/trust/social-proof-03-3d9529ace100.webp` | WEBP | 522,108 | Selected strategy carousel; current/adjacent slides eager; visited slides retained |
| Eleven Oasis | `projects/eleven-oasis/strategy/pdp/05-d74b08a46fa7.webp` | WEBP | 502,192 | Selected strategy carousel; current/adjacent slides eager; visited slides retained |

## Video findings

| Scope | File | Exact bytes | Dimensions / duration | Finding |
|---|---|---:|---|---|
| archive | `source-assets/eleven-oasis-homepage-demo.mp4` | 23,945,420 | 800×500 / 52.53s | Source/reference only; not delivered by the current site |
| archive | `source-assets/eleven-oasis-branding-animation-reference.mp4` | 15,962,204 | 800×500 / 21.23s | Source/reference only; not delivered by the current site |
| archive | `source-assets/参考动画屏幕录制.mp4` | 11,953,572 | 1280×720 / 15.40s | Source/reference only; not delivered by the current site |
| archive | `source-assets/2026-10-18 18-43-12.mp4` | 7,087,477 | 800×500 / 9.13s | Source/reference only; not delivered by the current site |
| public | `public/projects/eleven-oasis/demo/homepage-demo-cc253649880f.mp4` | 5,783,712 | 760×490 / 52.53s | Public autoplay file; over 5 MB |
| public | `public/projects/eleven-oasis/strategy/mobile/homepage-mobile-d9ec1b3c8780.mp4` | 4,508,747 | 592×1206 / 18.10s | Public autoplay file; below 5 MB |
| archive | `source-assets/2026-10-15 20-26-47.mp4` | 2,373,169 | 1280×720 / 2.93s | Source/reference only; not delivered by the current site |
| archive | `source-assets/eleven-oasis-homepage-demo-mobile.mp4` | 1,716,678 | 592×1280 / 18.10s | Source/reference only; not delivered by the current site |
| archive | `docs/previews/hero-brush-scroll-mobile.mp4` | 633,336 | 390×844 / 16.52s | Source/reference only; not delivered by the current site |

The PC video is 760×490, 30fps, 52.53 seconds, H.264, approximately 0.88 Mbps. The mobile video is 592×1206, 30fps, 18.10 seconds, H.264, approximately 1.99 Mbps. Both contain only a video stream, and `moov` precedes `mdat` (faststart already enabled). Removing audio or adding faststart is therefore not a new saving.

Native-dimension H.264 CRF-23 tests preserved both frame counts (1,576 and 543), durations, and 30fps. Sizes were 2,548,114 and 2,548,605 bytes. Whole-video SSIM against the existing files was 0.994834 and 0.992262 respectively. SSIM is only an aggregate diagnostic; it does not certify fine-text readability or replace visual review. Example command, written only to scratch storage:

```sh
ffmpeg -i ORIGINAL.mp4 -map 0:v:0 -an -c:v libx264 -preset medium   -crf 23 -pix_fmt yuv420p -movflags +faststart CANDIDATE.mp4
```

Video loading is already partly well designed. The PC player only attaches `src` after its IntersectionObserver fires, with a 200px look-ahead margin. During no-scroll tests the video was actually visible: roughly y=588–940 desktop and y=725–886 mobile. Its initial request is **not** evidence of a hidden, unconditional preload. Strategy 01's mobile movie had no `src` during initial snapshots and requested its file only after scrolling near that active panel. Both honor reduced motion. `preload="metadata"` does not limit an autoplaying video's full download, and pausing playback does not necessarily cancel already-buffering network work.

## Oversized pixels, lazy loading and positive findings

- Homepage website screenshot: 1921px source versus about 461 CSS px desktop. With no `srcset`, desktop DPR 1 receives the same file as high-DPR devices. Use the actual screen aperture width, not just card width, when generating variants.
- About illustration: 1467px source versus 360 CSS px desktop. The photo mosaic already uses real 480/960/up-to-1600px WebP sources; the tested browser selected 960px files instead of large JPEG originals. However, the same `sizes` is applied to all slots: a 240 CSS px desktop slot received a 960px image at DPR 1. Make this slot-aware without compromising immediate featured-photo swaps.
- Campaign screenshots: 1280px sources versus about 384 CSS px each at desktop DPR 1. Foundations `desktop.webp`: 2160px versus about 611 CSS px in the layout. Reader originals should stay separate from responsive on-canvas previews.
- The shared 1254px logo PNG renders as a small cropped SVG mark around 37 CSS px wide. The footer glass PNG is 1126px wide versus about 329 CSS px desktop. Neither has true responsive raster variants.
- Most generic galleries correctly use native `loading="lazy"`, explicit dimensions and `sizes`. But static `unoptimized` delivery means the source file remains full-sized. Chrome can start native-lazy requests before the image intersects the viewport; “requested before scroll” does not always mean the attribute is missing.
- SVG `<image>` layers and CSS image/mask URLs do not inherit native `<img loading="lazy">`. The homepage EBC cover is reused by an img, SVG masks and CSS; it is one URL and should not be counted as six independent full downloads.
- Research explicitly pre-decodes 26 preview files (1.635 MB), while hidden evidence layers also use eager images. This happens at case-study mount, before the research section is reached. Original Hotjar/source-reader captures remain on demand.
- All 11 mobile-journey thumbnails are eagerly present in the mounted carousel, including on desktop where that carousel is hidden. The desktop gallery reuses the same thumbnail URLs, so do not double-count them. Full-resolution phone PNGs are only used by the closer viewer.
- Strategies 02–06 are not mounted until first visited, which is good. Once visited, some panels remain mounted. Strategy 02/04 keeps current/adjacent slides ready rather than requesting every future slide on initial page entry. Keep this synchronization and crossfade behavior while optimizing files.
- Strategy 05 requested about 2.87 MB of on-canvas assets on selection, not all 8.07 MB in its public directory. Several >500KB full guideline pages are reader-only. Do not mislabel those pages as automatic initial downloads.
- EBC's new physical-activation gallery is already 10 WebP photographs totalling 655,292 bytes; its native dimensions/proportions are appropriate. Covers is only about 0.21 MB of unique requested media-file sizes initially; neither is the first place to sacrifice photographic or editorial quality.

## Related documents and fonts

These are not counted in the image/video thresholds. The guideline PDF is an explicit download, not an automatically downloaded 6.7 MB video/image. Fonts use local `@font-face` URLs and `font-display: swap`; no remote Google Fonts request was observed.

| Public-relative file | Type | Exact bytes | Loading |
|---|---|---:|---|
| `fonts/averia-serif-libre-light.woff2` | WOFF2 | 39,752 | Self-hosted font; separate from image/video inventory |
| `fonts/eleven-oasis-foundations/open-sans-latin-wght-normal.woff2` | WOFF2 | 48,320 | Self-hosted font; separate from image/video inventory |
| `fonts/eleven-oasis-foundations/oswald-latin-wght-normal.woff2` | WOFF2 | 28,488 | Self-hosted font; separate from image/video inventory |
| `fonts/inter-latin-500-normal.woff2` | WOFF2 | 24,272 | Self-hosted font; separate from image/video inventory |
| `fonts/manrope-variable.woff2` | WOFF2 | 28,076 | Self-hosted font; separate from image/video inventory |
| `projects/eleven-oasis/branding/a9dfe79cc0ca/guideline.pdf` | PDF | 6,704,969 | Explicit guideline download; not part of initial media loading |
| `resume/SHANMU- CV - En.pdf` | PDF | 149,235 | RESUME opens this real PDF in a new tab |

## Mainland delivery and external hosts

All image/video URLs in the current application and all observed runtime media requests are same-origin relative paths. Fonts are self-hosted too. Client-website links, LinkedIn links, SVG XML namespaces and the archived reference HTML's external URLs are not automatically loaded production media domains. No external media/CDN host was observed in the 14 local profiles.

The repository integrates with Vercel, but this audit cannot establish the current custom-domain origin/CDN routing from a mainland connection. The symptom (small page shell fast, large binaries slow) is consistent with high payload plus delivery throughput/latency limits; it does not by itself prove a specific host is blocked.

Validate from representative mainland China Mobile, China Unicom and China Telecom networks: cold-cache TTFB/throughput for a small image, the 8.30 MB screenshot and an MP4 range; repeat with warm cache. Inspect actual CDN/cache headers and byte-range support. If media delivery remains slow after reducing bytes, consider a suitably located object-storage/CDN path (for example Alibaba Cloud OSS/CDN) while keeping the application's layout and interactions unchanged. That is a separate infrastructure decision; no migration is performed here.

For content-hashed derivatives, verify a long-lived immutable caching policy. Keep safe invalidation for unversioned originals; do not blindly add `immutable` to filenames reused for changing artwork. Cache behavior is unverified, not known missing. Brotli/gzip helps text assets; it does not substitute for correctly encoded images/videos.

## Design-quality guardrails and implementation order

1. Keep every source file and archive. Generate new versioned derivatives rather than overwriting originals. No placeholders, generated replacement artwork or cropped case-study evidence.
2. Begin with the homepage's three PNGs. A lossless phase alone gives an exact-pixel 4.42 MB saving. The high-quality candidate phase could save 9.52 MB from those files; approve it through side-by-side review at real card sizes, zoom and high DPR.
3. Keep sharp full-resolution text/screenshots for enlarged views. Introduce separate responsive previews for small slots, never one reduced-resolution replacement for every context.
4. Preserve all photo ratios, alpha edges, the single seamless hero gradient, laptop/phone masks, Memoji states, folder interactions and every master animation timeline.
5. For videos keep original duration, dimensions, frame rate, crop, pause/resume, intersection/visibility handling and reduced-motion behavior. Review representative motion and small text, not static frames alone.
6. Test codec choices. At the settings used here, the sampled AVIF candidates were slightly larger than their WebP counterparts; AVIF is not automatically a saving. Quality scales are not interchangeable between codecs. Keep broadly supported fallbacks.
7. Re-run the same route/state profiles after each optimization. Compare bytes by unique URL, actual rendered dimensions, visible screenshot/video quality and cold/warm mainland delivery. Do not sum overlapping savings or judge success only by build/deployment size.

## What was changed

Only this documentation directory was added. No application file, source image, public asset, video, animation, text, layout or Next.js configuration was modified. Scratch candidates and local browser screenshots are excluded from Git. The report follows the owner's existing policy for publishing completed repository updates; any deployment triggered by this documentation-only commit serves the same application code and media as the audited version.
