# EBC physical brand activations

The existing `#ebc-pop-up` chapter now includes five documented activations from
`source-assets/EBC brand book- FINAL.pdf`, using one-based PDF pages 20–24.
The original signage and flag concepts remain below the photographs, explicitly
labelled as identity application concepts.

| PDF page | Case | Type | Location |
| --- | --- | --- | --- |
| 20 | Dongjiang Pop-up | Retail pop-up | Dongjiang, Shanghai |
| 21 | Taikoo Hui Pop-up Store | Retail pop-up | Taikoo Hui, Guangzhou |
| 22 | EBC × Young Star | Community collaboration | Yunhaigu, Shenzhen |
| 23 | EBC × Beijing Golf Association | Tournament activation | Nicklaus Club, Beijing |
| 24 | EBC × Young Presidents’ Organization (YPO) | Leadership community collaboration | Beijing |

Two original embedded photographs were extracted per page using PyMuPDF
`extract_image`, then encoded as WebP with Pillow at quality 92, method 6.
No cropping, upscaling, page screenshots, compositing, or invented imagery is used.
The PDF's native image resolutions are retained; extracting them cannot add
detail beyond that available in the supplied PDF.

`public/projects/early-birds-club/activations/manifest.json` records the source PDF
hash, one-based page numbers, PDF image xrefs, native pixel dimensions, embedded
image hashes, output hashes, and file sizes. The ten photographs total 655,292
bytes (about 640 KiB). The PDF itself is not copied into the public export.

All captions and context are based on the supplied pages and the owner's brief.
No attendance, sales, performance results, or personal responsibilities are
claimed. The source's superlative venue descriptions and membership statistics
are omitted.

The existing image gallery supplies lazy loading, full-ratio images, keyboard
image navigation and click-to-enlarge dialogs. The existing Reveal component
supplies a subtle one-time movement and respects reduced motion. The five-item
sticky section navigation is unchanged.

Validation: `npm run lint`, `npm run typecheck`, `npm run build`, and
`npm run check:content -- --build`. Content checks validate the five source pages,
photograph dimensions/hashes, and all exported case images. Browser checks should
cover desktop, tablet and mobile, each image viewer, and the Pop-up anchor.

The review branch is `codex/ebc-activations-preview`. Its Vercel Preview Deployment
is for review only; merging into main and updating production require approval.
