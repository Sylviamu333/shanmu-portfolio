import provenance from "./eleven-oasis-branding-assets.json";
import type { ProjectImage } from "./projects";

export const brandAssets = provenance.assets;
export const brandDocument = provenance.document;
export type BrandAssetKey = keyof typeof brandAssets;
export const BRAND_DURATION = 35;
export const brandChapters = [
  { id: "identity", label: "Identity", title: "Brand Identity", start: 0, pose: 2.8, page: 2, pages: [1,2,3,4,5,6,7,8,9,13,20] },
  { id: "colors", label: "Colors", title: "Color System", start: 7, pose: 9.1, page: 10, pages: [10] },
  { id: "typography", label: "Type", title: "Typography System", start: 13, pose: 17.5, page: 11, pages: [11,12] },
  { id: "photography", label: "Photo", title: "Photography & Art Direction", start: 19, pose: 25.6, page: 15, pages: [15,16,17,18] },
  { id: "story", label: "Story", title: "Brand Personality & Community", start: 28, pose: 31.2, page: 19, pages: [13,14,19,20] },
] as const;

/** Hex specifications printed on PDF page 10; never sampled from CMYK preview colors. */
export const brandColors = [
  { name: "Space Black", value: "#252525", core: true },
  { name: "Off White", value: "#F8F8F8", core: true },
  { name: "Denim Blue", value: "#0336A5", core: false },
  { name: "Vintage Leather", value: "#B38B6D", core: false },
  { name: "Deep Rust", value: "#8B3212", core: false },
  { name: "Solaris", value: "#F9F871", core: false },
] as const;

const titles = ["Guidelines cover", "Logo", "Logo clear space", "Logo minimum size", "Brand icon clear space", "Brand icon minimum size", "Approved logo colors", "Logo usage to avoid", "Logo and brand icon placement", "Colors", "Roboto typography", "Substitute typefaces", "Who we are", "Our community", "Photography core principles", "Photography to avoid", "Model guidelines", "Model choices to avoid", "Your personality, amplified.", "Original logo end card"];
export const brandPages: ProjectImage[] = titles.map((title, index) => {
  const asset = brandAssets[`page${index + 1}` as BrandAssetKey];
  return { src: asset.src, width: asset.width, height: asset.height, alt: `Eleven Oasis guideline, page ${index + 1}: ${title}`, caption: `${String(index + 1).padStart(2, "0")} / ${title}` };
});

export const brandChapterAt = (time: number) => time >= 34.2 ? 0 : time >= 28 ? 4 : time >= 19 ? 3 : time >= 13 ? 2 : time >= 7 ? 1 : 0;
