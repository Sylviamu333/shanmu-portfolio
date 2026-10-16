import sharp from "sharp";
import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import { folderContentsPath, folderEdgeMaterials } from "../src/components/home/heroFolderLayers.ts";

// Reproducible extraction of the user's original visible content. Run with:
// node --experimental-strip-types scripts/extract-hero-contents.mjs
const width = 1785, height = 881;
const input = "public/hero/hero-resting-foreground.webp";
const sourceFile = await fs.readFile(input);
const source = await sharp(sourceFile).ensureAlpha().raw().toBuffer();
const mask = await sharp(Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><path d="${folderContentsPath}" fill="white"/></svg>`)).ensureAlpha().raw().toBuffer();
const output = Buffer.alloc(source.length);
let visiblePixels = 0;
for (let x = 0; x < width; x++) {
  let last = -1;
  for (let y = 0; y < height; y++) {
    const index = (y * width + x) * 4;
    if (mask[index + 3] > 128) last = y;
    // Keep every source RGB pixel unchanged; only isolate its visible alpha.
    for (let c = 0; c < 3; c++) output[index + c] = source[index + c];
    output[index + 3] = Math.round(source[index + 3] * mask[index + 3] / 255);
    if (mask[index + 3] === 255 && source[index + 3]) visiblePixels++;
  }
  if (last < 0) continue;
  // The cut crosses opaque material, not the silhouette: keep this internal
  // boundary opaque so antialiasing cannot leave a transparent hairline.
  for (let y = last - 2; y <= last; y++) {
    const index = (y * width + x) * 4;
    output[index + 3] = source[index + 3];
  }
  const { sample: [sx, sy] } = folderEdgeMaterials.find(({ until }) => x < until);
  const sample = (sy * width + sx) * 4;
  const color = source.subarray(sample, sample + 3);
  const edge = (last * width + x) * 4;
  const difference = Math.hypot(...[0, 1, 2].map(c => source[edge + c] - color[c]));
  // Padding is hidden behind the original fixed pocket at rest. On lift it
  // continues blank card material only. Do not stretch/repeat a clipped logo.
  for (let y = last + 1; y < Math.min(height, last + 145); y++) {
    const index = (y * width + x) * 4;
    const mix = difference > 90 ? 1 : Math.min(1, (y - last) / 26);
    for (let c = 0; c < 3; c++) output[index + c] = Math.round(source[edge + c] * (1 - mix) + color[c] * mix);
    output[index + 3] = 255;
  }
}
await sharp(output, { raw: { width, height, channels: 4 } }).webp({ lossless: true, effort: 6 }).toFile("public/hero/hero-contents.webp");
await fs.writeFile("public/hero/contents-provenance.json", JSON.stringify({
  source: input,
  sourceSHA256: createHash("sha256").update(sourceFile).digest("hex"),
  width, height, visiblePixels,
  extraction: "Original visible RGB pixels; shared content matte; original blank material sampled for occluded-edge padding. No generated/replacement icons, illustrations or character states.",
  limitation: "The source does not contain hidden lower artwork. All visible tool cards/papers move as one shared bank; hidden logos and individual full card shapes are not reconstructed.",
}, null, 2) + "\n");
console.log(`Extracted shared content bank: ${visiblePixels} source pixels retained unchanged.`);
