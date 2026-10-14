# Editing your SHAN MU portfolio

You only need two content files and the `public/projects/` folder. You do not need a CMS or database. Keep file names simple: lowercase words separated by hyphens, with no spaces.

## First preview

1. Install Node.js 22.13 or newer (Node.js 24 is recommended).
2. Open this repository folder in VS Code.
3. Open **Terminal → New Terminal**.
4. Run `npm ci` once to install the website tools.
5. Run `npm run dev` and open `http://localhost:3000`.

To review the built production site, run `npm run build`, then `npm run start` and open the same local address.

Keep that terminal running. Saving a content file updates your preview. Press **Ctrl+C** to stop it.

## Replace a project cover

1. Find the project's folder, for example `public/projects/covers/`.
2. Add your image, preferably a WebP or JPEG. Keep its proportions. Around 1,600–2,000 pixels wide is enough for most landscape artwork; do not upscale small images.
3. Open `src/data/projects.ts` and find the project by its `slug`.
4. Set its `cover` to your image:

```ts
cover: {
  src: '/projects/covers/my-new-cover.webp',
  alt: 'Describe the actual artwork in this image',
  width: 1600,
  height: 1200,
  caption: 'Packaging design',
},
```

The path starts with `/projects/`, **not** `/public/projects/`. `width` and `height` are the actual pixel dimensions. Cover images may be cropped by the layout; full gallery images preserve their proportions. Eleven Oasis has a special homepage website presentation in `src/components/home/HomeProject.tsx`. Keep its cover a website screenshot. The PIX and Visual Experiments thumbnails also use their existing gallery images.

## Change project text

Each entry has `title`, `subtitle`, `category`, `description`, `facts`, and `sections`. Replace the text inside quotes. Keep the surrounding commas and brackets. If you use an apostrophe inside single quotes, escape it (`I\'m`) or use double quotes (`"I'm"`).

- `description` appears in the introduction and search metadata.
- `year` is `null` when unknown. Do not add a guessed year.
- `facts` are short project details.
- Each section has a unique `id` that also becomes its navigation anchor.
- `body` is a list of paragraphs.
- `bullets` is an optional list of points.

## Add gallery images

Add image objects to a section's `images` list. An image only appears on the case-study page when it is in a section. `gallery` is the centralized inventory of that project's artwork; keep it updated too.

```ts
{
  id: 'packaging',
  title: 'A tactile visual language.',
  type: 'gallery',
  layout: 'pair', // 'full', 'pair', or 'grid'
  images: [
    {
      src: '/projects/covers/packaging.webp',
      alt: 'Covers cream packaging with the black wordmark',
      width: 1600,
      height: 2000,
      caption: 'Packaging concept',
    },
  ],
},
```

Visitors can click gallery artwork to enlarge it. In the image viewer, use Escape to close and the left/right arrow keys to move between images. Very tall website screenshots open in a scrollable viewer.

## Add a new project

1. Create `public/projects/your-project/` and add its images.
2. Copy an existing project entry in `src/data/projects.ts` inside the `projects` list.
3. Choose a unique `slug`, for example `your-project`.
4. Set `order` to a number no other project uses.
5. Change every field, including the cover, gallery, facts, and sections.
6. Set `discipline` to `'Digital'`, `'Brand'`, or `'Graphic'`. This identifies its discipline; the compact homepage uses the project's category for its caption.
7. Remove fields you do not need. Set unknown `year` to `null`.
8. Run the checks below and rebuild.

The homepage, section navigation, next/previous project navigation, metadata, and `/work/your-project/` page are generated from the same data. Static deployment needs a new build to create the new route. Layouts adapt to added projects; homepage styling is in `src/app/homepage.css`, while existing case-study styling stays in `globals.css`.

## Reorder projects

Change each project's `order`. Lower numbers appear first. Keep Eleven Oasis at `1` if it should remain the featured first project. Do not use duplicate numbers. The original order is Eleven Oasis, Early Birds Club, Covers, PIX Metaborg, Visual Experiments.

## Add real Eleven Oasis “after” screens

Add confirmed screenshots to `public/projects/eleven-oasis/`. Find `comparisons` in the Eleven Oasis entry. Replace each `after: null` with an image object. The comparison automatically displays the supplied screenshot. Keep the original `before` images.

Also replace the images and text in the `homepage` and `product-detail` sections with confirmed redesign work and relevant annotations. Update the cover and its caption if using an after screenshot; the current cover explicitly identifies the original website. Do not present the current live site as a dated archive unless you can verify it.

## Edit About and Contact

Open `src/data/personal.ts`. Edit your name, role (`positioning`), introduction, specialties, and contact links. Decorative homepage text and section labels are in `src/data/homepage.ts`. The homepage uses the exact introduction, existing specialties, and verified links; it does not display biography, skills, experience, or location placeholders. Those fields remain available in the data for future use. Replace `null` with real values inside quotes:

```ts
email: 'your-real-email-address',
linkedin: 'https://www.linkedin.com/in/your-real-profile/',
resume: '/resume.pdf',
```

For a resume, add the PDF as `public/resume.pdf`. Use your real contact information. Leave unknown fields as `null`; the website shows a clear placeholder and does not create a broken link. Replace the experience string with your own confirmed background. The portfolio does not assume employers or education.

The existing production URL is already set in `siteUrl`. Keep it unchanged to preserve the same URL, sitemap, and absolute metadata.

## Check your changes

Run:

```sh
npm run typecheck
npm run lint
npm run check:content
npm run build
npm run check:content -- --build
```

If a command shows an error, undo your last edit or check for missing commas, brackets, quotes, and incorrect image paths. The content check also verifies that the original screenshots are intact.

## Publish updates with Vercel

1. Push your changes to a development branch and open a pull request into `main`.
2. In Vercel, choose **Add New → Project**, then import `Sylviamu333/shanmu-portfolio`.
3. Use the **Next.js** framework preset. Keep the repository root as the root directory.
4. Set the build command to `npm run build`. Use Node.js 24. No environment variables are required.
5. Keep Vercel's default output configuration for Next.js. The app is also exported as static files in `out/`.
6. Vercel creates a preview deployment for the branch/PR. Check desktop, tablet, mobile, all project pages, and the enlarged image viewer.
7. Merge the reviewed PR when ready. Vercel publishes your `main` branch updates.

You can also host the generated `out/` directory on a static host with folder-style URLs and a 404 fallback. Original PDFs and reference files stay outside the published assets. The two exact original PNG screenshots are included as downloadable originals.

## Source documents

Do not edit or delete the three root PDFs or `source-assets/` screenshots. Published artwork was extracted from those files. `public/projects/asset-manifest.json` records its source and page. `SOURCE_NOTES.md` lists exclusions and missing materials.

If you intentionally want to re-extract all supplied artwork, install `pymupdf` and `pillow` in a Python environment, then run `python scripts/extract-assets.py`. This overwrites the generated image files; use it only when you want to rebuild those original exports, not after replacing them with new artwork.
