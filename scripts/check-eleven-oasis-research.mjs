import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
import { heatViews, heatPages, shopLookExperiments, separateTestMetrics } from "../src/data/eleven-oasis-research.ts";

const root = resolve(import.meta.dirname, "..");
const read = path => readFileSync(resolve(root, path));
const hash = path => createHash("sha256").update(read(path)).digest("hex");
const assets = JSON.parse(read("public/projects/eleven-oasis/research/manifest.json"));
const expectedSources = [...Array.from({ length: 9 }, (_, index) => `source-assets/hotjar${index + 1}.${index < 6 ? "png" : "jpg"}`), ...Array.from({ length: 5 }, (_, index) => `source-assets/abtest${index + 1}.${index < 2 ? "png" : "jpg"}`)];
assert.equal(Object.keys(assets).length, 35);
assert.deepEqual([...new Set(Object.values(assets).map(image => image.source))].sort(), expectedSources.sort());
for (const [name, image] of Object.entries(assets)) {
  assert.equal(hash(image.source), image.sourceSha256, `Source changed: ${name}`);
  assert.equal(hash(`public${image.src}`), image.sha256, `Derived evidence changed: ${name}`);
  assert.equal(image.width, image.crop[2] - image.crop[0]);
  assert.equal(image.height, image.crop[3] - image.crop[1]);
  assert(image.alt && image.caption);
  if (process.argv.includes("--build")) assert.equal(hash(`out${image.src}`), image.sha256, `Missing exported evidence: ${name}`);
}
assert.equal(new Set(heatViews.map(view => view.id)).size, heatViews.length);
assert.deepEqual([...new Set(heatViews.map(view => view.source))].sort((a,b) => a-b), [1,2,3,4,5,6,7,8,9]);
for (const view of heatViews) assert.equal(assets[view.asset].source, assets[`hotjar${view.source}`].source, `Mislabeled heatmap: ${view.id}`);
for (const page of heatPages) for (const device of ["Desktop", "Mobile"]) assert(heatViews.some(view => view.page === page.id && view.device === device));
assert(heatViews.filter(view => view.source === 5).every(view => view.page === "campaign"), "Do not mislabel the campaign as homepage evidence");
assert.equal(shopLookExperiments.mobile.source, "abtest5");
assert.equal(shopLookExperiments.desktop.source, "abtest3");
assert.equal(separateTestMetrics.length, 3);
// These public excerpts intentionally exclude browser bookmarks and unrelated
// revenue columns; raw uploads are preserved in source-assets.
assert(assets.abtest1.crop[0] >= 1570);
assert(assets.abtest3.crop[0] >= 1205);
assert(assets.abtest4.crop[0] >= 1180);
assert(assets.desktopTestTitle.crop[1] >= 37);
if (process.argv.includes("--build")) {
  const page = read("out/work/eleven-oasis/index.html").toString();
  for (const text of ["DATA-DRIVEN DESIGN", "Behavioral analysis", "Testing Design Hypotheses", "What the Experiments Revealed", "abtest4.jpg"]) assert(page.includes(text), `Missing research content: ${text}`);
  assert(!page.includes("03 / DESIGN RATIONALE"));
  assert(page.includes("statistical significance and long-term impact are not established"));
}
console.log("Research checks passed: 14 original sources, 35 faithful evidence excerpts, all nine Hotjar mappings, distinct experiment identities and exported assets.");
