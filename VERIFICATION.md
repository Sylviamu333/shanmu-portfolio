# Verification and delivery

## Current homepage redesign

The homepage update passed TypeScript, lint, content, and production-build checks. Production browser QA passed for all six pages at 320, 390, 768, and 1440 pixels: all artwork loaded, the local variable font loaded, exact introduction text was verified, five projects remained present, and there was no horizontal overflow or JavaScript error. Filters, project navigation, comparisons, image viewer keyboard behavior, and mobile navigation passed. Checksums confirmed 56 protected project/source files unchanged, including project data, the case-study route, all original PDFs/screenshots, and published artwork.

Reference access was blocked; exact visual and animation fidelity could not be verified. See HOMEPAGE_UPDATE.md. Existing production target: https://shanmu-portfolio-mu.vercel.app. Production deployment success is verified separately after the main-branch update.

## Original portfolio verification

Validated on 14 October 2026 with Node.js 24.19.0.

- Dependency installation completed; the lockfile is included.
- Type checking and linting passed without errors or warnings.
- Content checks passed for five projects and 88 image references. Exact original screenshot copies match the source PNGs byte-for-byte.
- Production build passed. Homepage, all five project routes, metadata, robots, sitemap route, and 404 page are statically exported.
- Exported route and homepage navigation checks passed.
- Chromium browser QA passed at 320, 390, 768, and 1440 pixel widths for all six pages: 24 combinations, all images loaded, no horizontal overflow or JavaScript errors.
- Work filters, client-side project navigation, mobile menu, comparison selector, dialog focus/Escape behavior, and unknown-route 404 were verified.
- Desktop/mobile homepage and Early Birds Club compositions were visually reviewed. The mobile featured title and complete EBC cover were refined.
- Production preview startup via `npm run start` succeeded.
- Original root PDFs and source-assets files are unchanged against source commit e593f69fd13fc7f9cf7c317c328a723e9f88b5c6.

Build compatibility: Next.js's detached TypeScript CLI produced no captured output in this environment. The config uses the compiler API instead, preserving full build-time type checks. Metadata routes explicitly declare force-static for static export.

Confirmed Eleven Oasis AFTER screenshots, final interface annotations, personal work history/location, contact links, and resume remain editable placeholders. Source boundaries and reference access limitations are in SOURCE_NOTES.md.

The application is prepared for Vercel import and branch previews; no Vercel deployment has been created here. CONTENT_EDITING_GUIDE.md contains preview and deployment instructions.
