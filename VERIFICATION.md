# Verification and delivery

## Current recording-based motion update

The primary 25-second screen recording was inspected before implementation, with timed frames, full-resolution hover/footer views, and particle measurements. See MOTION_RECREATION.md for confirmed behavior, secondary CSS timings, and remaining differences. Production-browser motion checks use the recording’s 1280 × 544 page viewport, plus touch and reduced-motion contexts. TypeScript, lint, production build, content checks, the 30 route/viewport suite, and targeted motion/lifecycle checks pass. All 57 protected project/source files remain unchanged.

## Previous reference-based homepage redesign

The reference HTML was read from the repository and locally rendered at desktop and mobile sizes. Its embedded CSS, palette, fonts, image proportions, grid rules, responsive behavior, hover styles, and keyframes were inspected. All reference resources remain analysis-only; original illustrations and components are used in the application. Live application JavaScript was not included in the saved file, so runtime motion is recreated from the available CSS.

TypeScript, lint, content checks, and production build passed. Browser QA passed all six pages at 320, 390, 768, 1440, and 1920 pixels (30 combinations): artwork and local fonts loaded, exact introduction and first-project order were verified, grid columns adapted correctly, and there were no JavaScript errors or horizontal overflow. Navigation anchors, soft case-study navigation, comparisons, image-dialog keyboard access, mobile menu/Escape focus return, Pause/Resume controls, reduced motion, and 404 handling passed.

Checksums confirm all 57 protected project/source files unchanged, including project data, the case-study route, all original PDFs/screenshots, published artwork, and the newly supplied reference HTML. All five project pages remain present. See HOMEPAGE_UPDATE.md for the complete implementation scope. Existing production target: https://shanmu-portfolio-mu.vercel.app/. Production status is verified separately after the main-branch push.

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
