import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const manifest = JSON.parse(readFileSync(resolve(root, 'src/lib/media/images.json')));
const read = src => readFileSync(resolve(root, 'public', src.slice(1)));
let variants = 0;
for (const [src, image] of Object.entries(manifest)) {
  assert.equal(createHash('sha256').update(read(src)).digest('hex'), image.sha256, `Original changed: ${src}`);
  let previous = 0;
  for (const variant of image.variants) {
    assert(variant.width > previous && variant.width <= image.width, `Invalid responsive widths: ${src}`);
    assert(Math.abs(variant.height - image.height * variant.width / image.width) <= .500001, `Aspect ratio rounding error: ${src}`);
    assert.equal(read(variant.src).length, variant.bytes);
    if (variant.src !== src) assert.equal(read(variant.src).subarray(8, 12).toString(), 'WEBP');
    if (process.argv.includes('--build')) assert(existsSync(resolve(root, 'out', variant.src.slice(1))), `Missing exported variant: ${variant.src}`);
    previous = variant.width;
    variants++;
  }
  assert.equal(image.variants.at(-1).width, image.width, `Missing full-resolution fallback: ${src}`);
}
for (const name of ['elevenOasisDemo', 'elevenOasisMobileDemo']) {
  const video = JSON.parse(readFileSync(resolve(root, `src/components/eleven-oasis/${name}.json`)));
  assert(read(video.src).length < read(video.optimizedFrom).length, `Video size did not improve: ${name}`);
  const bytes = read(video.src);
  assert(bytes.indexOf(Buffer.from('moov')) < bytes.indexOf(Buffer.from('mdat')), `Video is not faststart: ${name}`);
  if (process.argv.includes('--build')) assert(existsSync(resolve(root, 'out', video.src.slice(1))));
}
console.log(`Media checks passed: ${Object.keys(manifest).length} unchanged originals, ${variants} responsive variants, two smaller faststart MP4s${process.argv.includes('--build') ? ', all exported' : ''}.`);
