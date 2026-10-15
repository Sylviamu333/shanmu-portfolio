import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { projects, orderedProjects } from "../src/data/projects.ts";
import { photographySeries } from "../src/components/photography/photography.ts";
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
