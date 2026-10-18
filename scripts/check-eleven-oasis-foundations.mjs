import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const read = path => readFileSync(resolve(root, path));
const hash = path => createHash("sha256").update(read(path)).digest("hex");
const assets = JSON.parse(read("public/projects/eleven-oasis/foundations/manifest.json"));
assert.equal(Object.keys(assets).length, 26);
for (const [name, image] of Object.entries(assets)) {
  assert.equal(hash(image.source), image.sourceSha256, `Original source changed: ${name}`);
  assert.equal(hash(`public${image.src}`), image.sha256, `Stale derived image: ${name}`);
  assert.equal(image.width, image.crop[2] - image.crop[0]);
  assert.equal(image.height, image.crop[3] - image.crop[1]);
  assert(image.alt && image.src.endsWith(".webp"));
  if (process.argv.includes("--build")) assert.equal(hash(`out${image.src}`), image.sha256);
}
for (const name of ["linen", "breathable", "wrinkle", "stripe", "cocktail", "shortSleeve", "wash", "bleach", "iron", "guarantee", "payLater", "shipping"]) {
  assert.equal(assets[name].source, "source-assets/eleven-oasis-icon system.png");
}
for (const family of ["oswald", "open-sans"]) {
  const path = `fonts/eleven-oasis-foundations/${family}-latin-wght-normal.woff2`;
  assert.equal(read(`public/${path}`).subarray(0, 4).toString(), "wOF2");
  assert(read(`public/fonts/eleven-oasis-foundations/${family}-OFL.txt`).toString().includes("SIL Open Font License"));
  if (process.argv.includes("--build")) assert.equal(hash(`public/${path}`), hash(`out/${path}`));
}
console.log("Foundations checks passed: 26 original raster excerpts, source hashes, crop bounds, local licensed fonts and exported files.");
