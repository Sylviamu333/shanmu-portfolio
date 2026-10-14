# SHAN MU — Design portfolio

An editorial, responsive personal portfolio built with Next.js App Router, TypeScript, Tailwind CSS, React, and Motion. Five data-driven case studies use the original repository's design assets. Eleven Oasis is the first and most detailed project.

## Run locally

Use Node.js 24 (minimum 22.13):

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Validate and build

```sh
npm run typecheck
npm run lint
npm run check:content
npm run build
npm run check:content -- --build
```

The static export is in `out/`; source PDFs are not deployed. Next.js generates project routes using `generateStaticParams` from the centralized project data. Adding a project requires a rebuild, not another page component.

## Edit content

- Projects: `src/data/projects.ts`
- About and contact: `src/data/personal.ts`
- Published images: `public/projects/<slug>/`
- Asset provenance: `public/projects/asset-manifest.json`
- Beginner guide: [CONTENT_EDITING_GUIDE.md](CONTENT_EDITING_GUIDE.md)
- Verified source scope and missing materials: [SOURCE_NOTES.md](SOURCE_NOTES.md)

Reusable components provide project cards, galleries and native-dialog image viewers, before/after comparisons, results, flexible case-study sections, and project navigation. Motion respects reduced-motion preferences. Missing contact links and after screenshots are explicitly represented in data rather than fabricated.

## Deploy on Vercel

Import this GitHub repository using Vercel's Next.js preset, Node.js 24, and build command `npm run build`. No environment variables, database, or authentication are needed. Leave Vercel's Next.js output configuration at its default. Use branch preview deployments to review, then merge the PR to publish from `main`.

For other static hosts, upload `out/` and support folder URLs such as `/work/covers/` plus a 404 fallback. Set `personal.siteUrl` to the real production URL and rebuild to enable a sitemap and absolute metadata.

## Original assets

The three source PDFs and two original screenshots are preserved in their original paths. `scripts/extract-assets.py` can rebuild the extracted artwork using PyMuPDF and Pillow. It exports native embedded images and high-resolution vector renderings, preserving aspect ratios and excluding documented reference artwork. Exact original BEFORE PNGs remain available as downloads. Confirmed AFTER screens are still needed; see the source notes.
