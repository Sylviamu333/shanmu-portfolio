import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const manifest = JSON.parse(readFileSync(resolve(root, 'src/data/eleven-oasis-branding-assets.json'), 'utf8'));
const hash = path => createHash('sha256').update(readFileSync(path)).digest('hex');
assert.equal(hash(resolve(root, manifest.source)), manifest.sourceSha256, 'Original guideline PDF changed');
assert.equal(manifest.physicalPages, 20, 'Include the nineteen content/cover pages and logo end card');
assert.equal(hash(resolve(root, 'public', manifest.document.src.slice(1))), manifest.sourceSha256, 'Manual-access PDF must remain original');
if (process.argv.includes('--build')) assert.equal(hash(resolve(root, 'out', manifest.document.src.slice(1))), manifest.sourceSha256);
assert(existsSync(resolve(root, 'source-assets/eleven-oasis-branding-animation-reference.mp4')));
assert.equal(Object.keys(manifest.assets).length, 39);
for (const [key, asset] of Object.entries(manifest.assets)) {
  assert(asset.page >= 1 && asset.page <= 20);
  assert(asset.width > 0 && asset.height > 0);
  const path = resolve(root, 'public', asset.src.slice(1));
  assert.equal(hash(path), asset.sha256, `Derived artwork changed: ${key}`);
  if (asset.src.endsWith('.svg')) {
    const svg = readFileSync(path, 'utf8');
    assert(!/<script|<font[\s>]|@font-face|https?:\/\//i.test(svg.replaceAll(/xmlns[^=]*="[^"]*"/g, '')), `Unexpected executable or redistributed font content: ${key}`);
    assert(svg.includes('viewBox='));
  }
  if (process.argv.includes('--build')) assert.equal(hash(resolve(root, 'out', asset.src.slice(1))), asset.sha256, `Export missing or stale: ${key}`);
}
for (let page = 1; page <= 20; page++) {
  const asset = manifest.assets[`page${page}`];
  assert.equal(asset.page, page); assert.equal(asset.width, 1600); assert.equal(asset.height, 1200);
}
assert.equal(manifest.assets.logo.page, 20);
for (const key of ['alphabet','robotoBlack','robotoRegular']) assert.equal(manifest.assets[key].page, 11);
for (const key of ['impact','gillSans']) assert.equal(manifest.assets[key].page, 12);
for (const key of ['closingHeadline','closingLine']) assert.equal(manifest.assets[key].page, 19);
console.log('Branding checks passed: original PDF hash, 39 sourced assets, 20 reader pages, exact font/logo paths and exported files.');
