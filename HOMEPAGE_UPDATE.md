# SHAN MU reference-based homepage redesign

## Reference inspected

The reference was read directly from `source-assets/Eemon Roy - Product Designer.html` on the existing repository's main branch. The self-contained file contains embedded CSS, fonts, images, responsive rules, and animation keyframes. It was rendered locally at desktop and mobile widths for analysis only, with application JavaScript disabled and external network requests blocked. The original HTML remains unchanged and is not part of the published application.

Verified design characteristics include a centered light serif hero, lime `#E7FF7D` and sky-blue `#AFE3FF` highlight blocks, a sweeping pink backdrop, a compact ruled navigation, and a bordered two-column Work grid. The source's Work image ratio is 781:472 with small uppercase captions. Its footer uses pale pink `#FFF5FB`, rose `#DA5168` text, an illustrated portfolio object, and stacked serif links. Mobile rules stack the project grid and rearrange the hero. Source CSS includes staggered card entrance, easing, hover feedback, reveal transitions, footer sway, and reduced-motion rules.

The saved file contains no live application JavaScript beyond structured metadata. The subsequent supplied 25-second recording provides primary evidence for runtime motion. Cursor/trail, labels, scroll drawing, glows, and footer sway are implemented in original GSAP/CSS/React code; verified observations and remaining uncertainties are documented in MOTION_RECREATION.md.

## Implemented design

- Centered SHAN MU greeting and highlighted UI/UX Designer · Visual Designer role.
- Exact supplied two-sentence introduction, without reference identity or client information.
- An original pink ribbon composition, illustrated sketchbook, phone, cursor, flower, and sprout drawn specifically for this portfolio.
- Five equally sized rectangular project tiles in a compact two-column desktop grid, with a single-column mobile layout. Eleven Oasis remains first.
- Small captions retain project names and categories. Descriptions remain available to assistive technology and on the unchanged case-study pages.
- The final grid cell contains existing design specialties, clearly labeled About rather than a new project. No fictional side projects are added.
- Pale pink footer with an original illustrated portfolio card, SHAN MU's identity, valid navigation, and verified contact links only.
- No testimonial heading, cards, colleague names, descriptions, or leftover testimonial section.

Original SVG illustrations and new Next.js components were authored for the implementation. Reference artwork, proprietary Plaak font files, and reference HTML/CSS/JavaScript were not copied into the published site. The openly licensed Averia Serif Libre typeface was acquired independently from Google Fonts and locally hosted with its OFL license; Manrope is retained for small interface text.

## Editing

Homepage copy is centralized in `src/data/personal.ts` and `src/data/homepage.ts`. Existing project data stays in `src/data/projects.ts`. New presentation components are under `src/components/home/`; styling is isolated in `src/app/homepage.css`. Existing case-study routes, content, layout components, PDFs, screenshots, published artwork, and source HTML are preserved.

The homepage offers recorded cursor/trail behavior, pointer-following project labels, a scroll-drawn pink ribbon, drifting glows, timed entrances, footer paper sway, and a coordinated Pause/Resume control. Unobserved thumbnail zoom, hero scroll tilt, sticker bobbing, background wander, and link highlight animations were removed. Reduced-motion preferences are respected. Mobile menu Escape returns focus to the menu button.

## Validation and production

TypeScript, lint, content checks, and the production build pass. Browser checks cover all six pages at 320, 390, 768, 1440, and 1920 pixels (30 combinations), plus exact introduction text, local fonts, project order, grid columns, image loading, navigation anchors, case-study links, comparisons, dialog keyboard controls, mobile navigation, motion controls, and 404 handling. Checksums confirm all 57 protected project/source files are unchanged.

The deployment target remains the existing Vercel project and URL: https://shanmu-portfolio-mu.vercel.app/. The validated update is committed and pushed to main. No new repository, Vercel project, domain, or hosted preview is created. Production status is checked against the pushed commit separately from local build success.
