# About editorial layout and six-photo mosaic

The page remains `/about/`. The primary reference is `source-assets/about-layout-reference.png` (1921 × 2347). The original screenshot and all uploaded photographs/illustration are unchanged.

## Sources and typography

- `about-portrait.jpg`, `about-life-01.jpg` through `about-life-05.jpg`: six authentic personal photographs, all displayed at once.
- `about-shan-illustration.png` (1467 × 1072): the full uncropped greeting illustration. Its public PNG is byte-identical to the upload. The lossless WebP has identical decoded pixels; no background removal, recoloring, or generated content is used.
- `scripts/prepare-about-photos.py` copies original JPEGs and creates responsive WebP delivery copies without filters/retouching. Its previous three-photo inputs are extended to all six. Originals in `public/about/` are byte-identical to the source files.
- Serif: the existing self-hosted Averia Serif Libre Light (300), also identified by the reference site's HTML/CSS. Body at the reference desktop width is 20px/28px; the compact experience table uses 18px. Manrope supplies the existing navigation/UI and restrained table headings. The Averia font is licensed under SIL OFL 1.1; its license is included at `public/fonts/OFL-averia-serif-libre.txt`. No proprietary reference fonts/code/assets are copied.

## Layout and content

`src/app/about/page.tsx` and `about.css` use a pure-white 50/50 editorial grid, thin rules, a left introduction, a right mosaic, a compact three-column experience table, and education. The supplied illustration contains the only visible greeting. The five supplied biography paragraphs, four “What I work on” items, actual email/LinkedIn, five jobs, and three education entries live in `src/data/about.ts`. No hobbies, degrees, awards, or career details were inferred. No resume PDF exists in the repository, so no resume link is shown.

The existing Header uses its homepage presentation on About: the same S logo, three navigation links, dimensions, responsive menu, and hover styling. The original HomeFooter is reused, including FooterFolder and its animations. The only footer API addition is an optional Work href; its default remains `#work` for the homepage, while About uses `/#work`. Global personal data stays unchanged so no homepage content or project page is altered.

The six mosaic rectangles reproduce the reference's large / pair / large / pair arrangement, including unequal paired widths. The portrait starts in the first landscape frame. Portrait object positions keep the face within the crop; original aspect ratios are preserved through object-fit rather than stretching.

## Photo switching

Six photo elements retain their identity and DOM order. Selecting any non-featured photograph swaps its assigned rectangle with the featured photograph; the other four slots remain unchanged. The existing Motion dependency interpolates the two absolute frames' left/top/width/height for 560ms with cubic-bezier(.22,1,.36,1). Frame dimensions interpolate instead of applying nonuniform image scaling, preserving the photos' natural proportions as their crops change. The stage reserves its complete height, so text, table, education, and footer do not move during swaps. Source sets are independent of slot size, preventing image reloads or blank frames.

Semantic buttons, descriptive alt text, aria-pressed, visible focus, and a polite announcement support keyboard and assistive technology. Reduced motion switches instantly. Touch works without hover. The fixed positions scale together on smaller screens; below 1100px the introduction, mosaic, experience, and education stack for readability. No carousel, generated photos, or extra motion dependency is introduced.

## Reference comparison and validation

Three rendered iterations were compared at 1921 × 2347. The refined page is approximately 2414px tall versus the reference's 2347px. The illustration occupies 410 × 299.6px, with its full artwork intact. Photo rows begin at approximately y182, y656, y1021, and y1434; the Experience divider is at y1200.6, closely matching the screenshot. The supplied education and longer company/date strings account for additional left-column height. The existing homepage container/header/footer dimensions are retained, so overall margins and footer height differ from the reference designer's site.

Browser verification covers seven widths (320/390/768/1024/1280/1440/1921), fixed 50/50 columns at desktop, mobile stacking, all six image positions, repeated and rapid swaps, intermediate motion, unchanged other four photos, no surrounding layout shifts or image reloads, keyboard/touch/reduced motion, the complete illustration, serif font loading, pure-white content, experience/education/contact links, shared header/footer parity, footer hover/fan/Back to Top, responsive menu, and client navigation. No console errors were observed. Saved homepage and Visual Experiments main/header markup remain identical after the change. TypeScript, lint, production build, and content checks pass; content checks verify all six original JPEG copies and the original illustration hash.
