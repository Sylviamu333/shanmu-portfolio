import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { projects, orderedProjects } from "../src/data/projects.ts";
import { photographySeries } from "../src/components/photography/photography.ts";
import { homepageUX } from "../src/data/eleven-oasis-case-study.ts";
import { elevenStrategies, pdpUxSlides, trustSignalSlides } from "../src/data/eleven-oasis-strategy.ts";
import { journeyPhones } from "../src/data/eleven-oasis-mobile-journey.ts";
const root = resolve(import.meta.dirname, "..");
const photoManifest = JSON.parse(readFileSync(resolve(root, "public/projects/visual-experiments/photography/manifest.json"), "utf8"));
for (const series of photographySeries) {
  for (const photo of series.photos) {
    const filename = photo.src.split("/").at(-1);
    const entry = photoManifest.find(item => item.file === filename);
    assert(entry, `Missing photography provenance: ${filename}`);
    assert(existsSync(resolve(root, "public", photo.src.slice(1))), `Missing photograph: ${filename}`);
    assert(existsSync(resolve(root, "source-assets", entry.source)), `Missing original: ${entry.source}`);
    assert.equal(photo.width, entry.width, `Incorrect photograph width: ${filename}`);
    assert.equal(photo.height, entry.height, `Incorrect photograph height: ${filename}`);
    assert(photo.alt.trim(), `Missing photography alt text: ${filename}`);
  }
}
const hash = (file) =>
  createHash("sha256").update(readFileSync(file)).digest("hex");
assert.equal(journeyPhones.length, 11, "The mobile journey must retain all eleven screens");
for (const [index, phone] of journeyPhones.entries()) {
  assert.equal(phone.id, index + 1, "Mobile screen order changed");
  assert.equal(hash(resolve(root, "source-assets", `eleven-oasis-mobile-${phone.id}.png`)), hash(resolve(root, "public", phone.src.slice(1))), `Stale mobile screen: ${phone.id}`);
  assert(existsSync(resolve(root, "public", phone.thumbnail.slice(1))), `Missing mobile thumbnail: ${phone.id}`);
}
assert.equal(pdpUxSlides.length, 7, "Strategy 02 must contain seven slides");
assert.equal(elevenStrategies[1].images, pdpUxSlides);
assert.equal(elevenStrategies[3].images, trustSignalSlides);
const trustGroups = [
  ["SOCIAL PROOF", "social-proof", 3, "Building Credibility at First Glance"],
  ["Purchase Reassurance", "purchase-reassurance", 2, "Reducing Perceived Purchase Risk"],
  ["PRODUCT TRANSPARENCY", "product-transparency", 3, "Removing Uncertainty Around Fit & Quality"],
  ["CUSTOMER VALIDATION", "customer-validation", 2, "Building Confidence Through Authentic Reviews"],
];
assert.equal(trustSignalSlides.length, 10, "Trust Signals must include all ten uploaded images");
let trustIndex = 0;
for (const [category, slug, count, caption] of trustGroups) {
  for (let sequence = 1; sequence <= count; sequence++) {
    const number = String(sequence).padStart(2, "0");
    const source = resolve(root, "source-assets", `eleven-oasis-strategy05-trust-${category}${number}.png`);
    const slide = trustSignalSlides[trustIndex++];
    assert(slide.src.endsWith(`/${slug}-${number}-${hash(source).slice(0, 12)}.webp`), "Trust asset order or revision changed");
    assert.equal(slide.caption, caption);
    assert.equal(slide.width, 1600);
    assert.equal(slide.height, 958);
    assert(slide.alt.includes(category.toUpperCase()));
    assert(existsSync(resolve(root, "public", slide.src.slice(1))));
    if (process.argv.includes("--build")) assert.equal(hash(resolve(root, "public", slide.src.slice(1))), hash(resolve(root, "out", slide.src.slice(1))));
  }
}
for (const [index, slide] of pdpUxSlides.entries()) {
  const number = String(index + 1).padStart(2, "0");
  const fingerprint = hash(resolve(root, "source-assets", `eleven-oasis-pdp-strategy02-${number}.png`)).slice(0, 12);
  assert(slide.src.endsWith(`/${number}-${fingerprint}.webp`), `Incorrect PDP asset order or revision: ${number}`);
  assert(existsSync(resolve(root, "public", slide.src.slice(1))), `Missing PDP slide: ${number}`);
  assert(slide.alt && slide.width > 0 && slide.height > 0);
}
assert.equal(
  hash(resolve(root, "source-assets/eleven-oasis-homepage-ux.png")),
  hash(resolve(root, "public", homepageUX.src.slice(1))),
  "Homepage UX presentation must remain byte-for-byte original",
);
assert.equal(
  new Set(projects.map((p) => p.slug)).size,
  projects.length,
  "Project slugs must be unique",
);
assert.equal(
  new Set(projects.map((p) => p.order)).size,
  projects.length,
  "Project order must be unique",
);
assert.equal(
  orderedProjects[0].slug,
  "eleven-oasis",
  "Eleven Oasis must be featured first",
);
let count = 0;
for (const project of projects) {
  assert.match(project.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.equal(
    new Set(project.sections.map((s) => s.id)).size,
    project.sections.length,
    "Section anchors must be unique",
  );
  const images = [
    project.cover,
    ...project.gallery,
    ...project.sections.flatMap((s) => s.images || []),
    ...(project.comparisons || []).flatMap((c) => [
      c.before,
      ...(c.after ? [c.after] : []),
    ]),
  ];
  for (const image of images) {
    assert(image.alt.trim(), `Missing alt text: ${image.src}`);
    assert(
      image.width > 0 && image.height > 0,
      `Missing dimensions: ${image.src}`,
    );
    assert(
      existsSync(resolve(root, "public", image.src.slice(1))),
      `Missing image: ${image.src}`,
    );
    if (image.original)
      assert(existsSync(resolve(root, "public", image.original.slice(1))));
    count++;
  }
  if (project.website)
    assert.equal(new URL(project.website).protocol, "https:");
}
for (const [original, copy] of [
  ["HOMEPAGE - PC.png", "homepage-before-original.png"],
  ["PDP - pc.png", "pdp-before-original.png"],
]) {
  assert.equal(
    hash(resolve(root, "source-assets", original)),
    hash(resolve(root, "public/projects/eleven-oasis", copy)),
    "Original screenshot content changed",
  );
}
for (const name of ["about-portrait", ...Array.from({ length: 5 }, (_, i) => `about-life-0${i + 1}`)]) {
  assert.equal(
    hash(resolve(root, "source-assets", `${name}.jpg`)),
    hash(resolve(root, "public/about", `${name}.jpg`)),
    `Original About photograph changed: ${name}`,
  );
}
assert.equal(
  hash(resolve(root, "source-assets/about-shan-illustration.png")),
  hash(resolve(root, "public/about/about-shan-illustration.png")),
  "Original About illustration changed",
);
assert(Math.abs((2.1 / 1.2 - 1) * 100 - 75) < 1e-9);
assert(Math.abs((25 / 5 - 1) * 100 - 400) < 1e-9);
if (process.argv.includes("--build")) {
  const elevenPage = readFileSync(resolve(root, "out/work/eleven-oasis/index.html"), "utf8");
  const elevenAnchors = ["problem", "strategy", "decisions", "results"];
  let lastAnchor = -1;
  for (const anchor of elevenAnchors) {
    const position = elevenPage.indexOf(`id="${anchor}"`);
    assert(position > lastAnchor, `Missing or out-of-order Eleven Oasis section: ${anchor}`);
    lastAnchor = position;
  }
  assert(elevenPage.includes(elevenStrategies[0].images[0].src), "Missing initial Homepage UX Decisions evidence");
  assert(!elevenPage.includes(`src="${homepageUX.src}"`), "Do not duplicate the superseded Homepage UX overview");
  assert.equal(elevenStrategies.length, 6);
  for (const strategy of elevenStrategies) {
    assert(elevenPage.includes(`${strategy.number} / ${strategy.label}`), `Missing strategy selector: ${strategy.number}`);
    for (const image of strategy.images) {
      assert(existsSync(resolve(root, "public", image.src.slice(1))), `Missing strategy asset: ${image.src}`);
      assert(image.alt && image.width > 0 && image.height > 0);
    }
  }
  assert.equal(hash(resolve(root, "source-assets/eleven-oasis-homepage-ux-decisions.png")), hash(resolve(root, "public", elevenStrategies[0].images[0].src.slice(1))), "Homepage UX Decisions must remain byte-for-byte original");
  for (const anchor of ["behavioral-analysis", "insight-to-action", "research-experiments", "research-outcomes", "research-takeaways"])
    assert(elevenPage.includes(`id="${anchor}"`), `Missing research module: ${anchor}`);
  assert(elevenPage.includes("DATA-DRIVEN DESIGN"), "Missing research section heading");
  const resultsStart = elevenPage.indexOf('id="results"');
  const resultsSection = elevenPage.slice(resultsStart, elevenPage.indexOf("</section>", resultsStart));
  for (const text of ["04 / RESULTS", "Design That Drives Results.", "5% → 25%", "5×", "≈200%", "Core CTA click-through rate", "CTA engagement vs. baseline", "Business GMV growth", "not independently verified", "not a separate outcome", "not attributed exclusively to the redesign"])
    assert(resultsSection.includes(text), `Missing Results figure, label or provenance: ${text}`);
  assert(!resultsSection.includes("<img"), "Keep research screenshots in Research & Validation");
  assert(!resultsSection.includes("eo-results-row"), "Keep Results a single compact metrics panel");
  assert(!elevenPage.includes('class="missing-screenshot"'), "Do not publish empty after-screen placeholders");
  for (const project of projects)
    assert(
      existsSync(resolve(root, "out/work", project.slug, "index.html")),
      `Missing exported route: ${project.slug}`,
    );
  const photographyPage = readFileSync(resolve(root, "out/work/visual-experiments/index.html"), "utf8");
  for (const series of photographySeries) {
    assert(photographyPage.includes(`id="${series.id}"`), `Missing photography series: ${series.id}`);
    for (const photo of series.photos)
      assert(photographyPage.includes(photo.src), `Missing rendered photograph: ${photo.src}`);
  }
  const homepage = readFileSync(resolve(root, "out/index.html"), "utf8");
  for (const project of projects)
    assert(
      homepage.includes(`/work/${project.slug}/`),
      `Missing homepage project link: ${project.slug}`,
    );
  assert(!homepage.includes('class="home-about'), "Removed homepage practice section must stay absent");
  assert(homepage.includes('href="/about/"'), "About navigation must retain a valid destination");
  assert(existsSync(resolve(root, "out/about/index.html")), "Missing About route");
  assert.equal(
    hash(resolve(root, "source-assets/under-the-castle-kv.png")),
    hash(resolve(root, "public/projects/team-wang-under-the-castle/homepage-kv.png")),
    "Homepage Halloween artwork must remain byte-for-byte original",
  );
  for (const id of ["work", "contact"])
    assert(homepage.includes(`id="${id}"`), `Missing navigation target: ${id}`);
}
console.log(
  `Content checks passed: ${projects.length} projects, ${count} image references, original screenshots byte-for-byte intact${process.argv.includes("--build") ? ", all project routes exported" : ""}.`,
);
