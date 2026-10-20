# Portfolio media optimization results

Implemented against baseline `0eb1670c6ecbb60d7984a5697f8bcc17baf82048`, 20 October 2026. This is an asset-delivery change, with no design or content redesign.

## Measured outcomes

- 101 source images now have 411 registered responsive candidates. Their full-resolution source-file total is **55,694,828 bytes → 19,104,134 bytes (65.7% smaller)**. This is a catalog comparison, not browser transfer savings: some About JPEGs were already served through existing WebP picture sources before this update. Some native candidates deliberately retain their smaller original.
- Two served H.264 videos: **10,292,459 → 5,096,719 bytes (50.5% smaller)**, with identical dimensions, frame counts, durations and frame rates. Desktop: 5,783,712 → 2,548,114 bytes; mobile: 4,508,747 → 2,548,605 bytes.
- **Actual cold-cache initial homepage media HTTP traffic:** desktop **13.29 → 3.49 MB (73.7% less)**; 393px/DPR3 mobile **13.51 → 3.92 MB (71.0% less)**.
- **Total public media stored on disk increases from 124,499,438 to 170,154,845 bytes**: every original is retained, plus 40,558,688 bytes of new responsive WebPs and 5,096,719 bytes of optimized videos. These backup/variant files are not all downloaded by visitors. Do not equate this disk total with page weight.
- All **379 previously audited media files** in public, source-assets and documentation remain byte-for-byte intact. There are 391 new physical WebPs; 20 registered candidates reuse an original rather than shipping a larger re-encode.

## What changed

1. Added a static custom Next Image loader and content-addressed manifest. Browsers select generated WebP widths; `output: "export"` and `trailingSlash: true` remain intact. No runtime `/_next/image` service, new media origin, or new CDN is required. Original `width`/`height`, CSS and aspect ratios remain in place.
2. High-quality WebP at quality 94 with Lanczos resizing, preserved embedded profiles, and lossless alpha. The EBC cover/animated source lettering, S monogram and glossy footer pocket use pixel-exact lossless WebP. Hero facial/foreground state files are unchanged to protect fine alpha registration and motion.
3. Shared SVG/CSS layers use the same derivative URL, avoiding duplicate original PNG downloads. Related-project thumbnails and other Next Images gain real responsive selection. About mosaic sizes now reflect each slot, including swaps; below-fold photos and mobile-carousel slides are lazy.
4. Research evidence warming now waits until 400px before its section enters the viewport. All tabs, evidence, filters and accordion state remain available. Responsive decode helpers warm the same image candidate as the visible element instead of also downloading the original. Foundations decode their existing responsive DOM images.
5. Optimized the two active videos using H.264, CRF 23, yuv420p and faststart, without resizing, recropping or changing playback logic. Existing poster/artwork fallbacks and source attachment only when visible/active remain intact. Below-fold Strategy 01 video does not download on initial load; reduced motion does not attach either video until explicitly requested. Videos already started may continue browser buffering after pausing; detaching their sources would disrupt resume state and was intentionally avoided.
6. Full-size lightbox originals remain available on demand for inspecting fine typography and photography. Existing guideline reader pages and original-download links are preserved.

## Local Chromium measurements

Desktop 1440×900/DPR1 and mobile 393×900/DPR3. Fresh contexts, cache disabled through CDP, identical static HTTP servers, reduced motion to isolate images from autoplay video downloads. “Initial” is 2.5 seconds after load, no scrolling; “scroll” moves 650px every 100ms then waits one second. Bytes are actual CDP media response bytes, including small response headers; pending requests use received encoded data. These are single controlled local samples, not field statistics, connection-speed or LCP claims. Different device pixel ratios, browsing choices and cache states change totals. Full scroll does not activate every strategy, reader or hidden carousel slide.

| Route | Width | Initial before | Initial after | Less initial media | After full scroll, before → after |
| --- | ---: | ---: | ---: | ---: | ---: |
| `/` | 1440px | 13.29 MB | 3.49 MB | 73.7% | 14.05 MB → 3.90 MB |
| `/about/` | 1440px | 3.31 MB | 1.16 MB | 65.1% | 3.31 MB → 1.16 MB |
| `/work/eleven-oasis/` | 1440px | 3.00 MB | 0.53 MB | 82.3% | 3.75 MB → 2.14 MB |
| `/work/early-birds-club/` | 1440px | 0.56 MB | 0.32 MB | 42.9% | 3.75 MB → 2.60 MB |
| `/work/team-wang-under-the-castle/` | 1440px | 2.58 MB | 0.46 MB | 82.2% | 7.20 MB → 1.68 MB |
| `/work/covers/` | 1440px | 0.21 MB | 0.11 MB | 46.6% | 1.26 MB → 0.82 MB |
| `/work/visual-experiments/` | 1440px | 0.25 MB | 0.15 MB | 39.9% | 2.25 MB → 1.58 MB |
| `/` | 393px | 13.51 MB | 3.92 MB | 71.0% | 14.05 MB → 4.29 MB |
| `/about/` | 393px | 2.56 MB | 1.20 MB | 53.1% | 3.31 MB → 1.61 MB |
| `/work/eleven-oasis/` | 393px | 2.08 MB | 0.30 MB | 85.6% | 3.75 MB → 2.03 MB |
| `/work/early-birds-club/` | 393px | 0.26 MB | 0.16 MB | 37.7% | 3.75 MB → 3.37 MB |
| `/work/team-wang-under-the-castle/` | 393px | 2.58 MB | 0.34 MB | 86.9% | 7.20 MB → 1.50 MB |
| `/work/covers/` | 393px | 0.21 MB | 0.11 MB | 46.6% | 1.26 MB → 0.82 MB |
| `/work/visual-experiments/` | 393px | 0.30 MB | 0.20 MB | 33.2% | 2.25 MB → 1.58 MB |

The separate normal-motion interaction run verified both videos and all six strategy presentations at both widths. Its video requests are not included in the reduced-motion image-transfer table. Mobile's offscreen, unselected carousel pages deliberately remain lazy; all 11 images decoded successfully when their pages were visited at 375, 393 and 430px.

## Largest optimized source images

Native-resolution comparison; visitors generally receive smaller candidates where appropriate. About source JPEG values here are not the old picture element's actual transferred WebP sizes.

| Source | Original | Native served fallback | File saving |
| --- | ---: | ---: | ---: |
| `/previews/eleven-oasis/website-classic.png` | 8.30 MB | 1.30 MB | 84.3% |
| `/about/about-life-02.jpg` | 5.51 MB | 1.73 MB | 68.6% |
| `/projects/eleven-oasis/foundations/desktop.webp` | 2.81 MB | 0.81 MB | 71.3% |
| `/projects/team-wang-under-the-castle/cover.png` | 2.06 MB | 0.33 MB | 84.1% |
| `/projects/eleven-oasis/strategy/campaigns/editorial-full.webp` | 2.27 MB | 0.78 MB | 65.6% |
| `/about/about-shan-illustration.png` | 1.59 MB | 0.19 MB | 88.4% |
| `/projects/eleven-oasis/strategy/campaigns/promotion-full.webp` | 1.41 MB | 0.48 MB | 65.8% |
| `/projects/eleven-oasis/strategy/homepage-ux-decisions.png` | 0.92 MB | 0.19 MB | 79.0% |
| `/previews/early-birds-club/cover.png` | 1.83 MB | 1.14 MB | 37.7% |
| `/previews/eleven-oasis/cover-classic.png` | 0.78 MB | 0.13 MB | 83.5% |

## Verification

- TypeScript, ESLint, production static export, existing content/source-provenance checks, research/branding/foundations checks, media checks and existing playback/research tests pass.
- Every route tested before/after: homepage, About, Eleven Oasis, Early Birds Club, Under the Castle, Covers, Key Visual photography. Page heights and all recorded heading sizes/positions match the baseline (0px height delta); no horizontal overflow, JavaScript exceptions or HTTP errors.
- 411 registered image candidates decode with the expected dimensions and are served with HTTP 200 and image MIME types; both videos return HTTP 206 byte ranges. Every native alpha channel was checked against its source; all three lossless special cases have exact RGBA pixels.
- Normal-motion desktop/mobile checks: video autoplay/mute/loop flags, real playback progress and looping across both end boundaries, click-to-pause/resume, inactive-video pause, all strategies loading, carousel advancement/manual selection, lightbox opening/closing, Research collapse/expand, deferred evidence downloads, About feature swapping, homepage idea-hover/return and the animated EBC cover. Extra responsive/reduced-motion checks at 375/393/430/768px.
- Selected rendered imagery/video and typography were visually reviewed. Existing video masks, screen geometry, durations, easing and other animation controllers were not changed. Prior SSIM comparisons of these exact video candidates: desktop 0.994834, mobile 0.992262; these support, but do not replace, browser review.
- Source and responsive files are present in the production export. Production-host reachability must be reported separately after deployment; local URL checks do not prove a production origin is reachable.

## Remaining opportunities and limits

- **No mainland-China network was available.** Transfer savings are measured locally; mainland routing, packet loss, latency and CDN reachability are unverified. No external media domains were added.
- Hero layered alpha assets (about 1.69 MB combined), the exact EBC animated cover (1.14 MB) and reader-only full-resolution guideline pages remain deliberate quality-preserving costs. A future further reduction needs careful motion/zoom review.
- Archived superseded screenshots, original PNGs and videos still occupy storage; they do not automatically load. Their removal/move out of public could reduce deploy size later, but this task preserves backups and direct original links.
- AVIF trials from the audit were slightly larger than comparable WebPs at the chosen high-quality settings, so WebP was selected. Encoding quality scales differ; no universal codec claim is implied.
- The test matrix covers Chromium; Safari/iOS hardware, other browsers and real mainland delivery still warrant device/field checks.

## Reproduce / maintain

Prebuilt variants are committed; normal builds require only the existing Node/npm dependencies. Image/video re-encoding is an offline maintenance task, not a build-time requirement:

```sh
# Requires Pillow with WebP support; never overwrites source originals.
python scripts/optimize-portfolio-images.py
# Requires ffmpeg/ffprobe; preserves existing presentation crops/timing.
python scripts/optimize-portfolio-videos.py
npm run typecheck
npm run lint
npm run build
npm run check:content -- --build
node scripts/check-media.mjs --build
```

Machine-readable details: [image sizes](optimized-images.csv), [video sizes](optimized-videos.json), [browser measurements and interactions](browser-measurements.json). Deployment status is reported with the final pushed commit.
