import type { ImageLoaderProps } from "next/image";
import manifest from "./images.json";

type Variant = { src: string; width: number; height: number; bytes: number };
type Entry = { width: number; height: number; variants: Variant[] };
const images: Record<string, Entry> = manifest;

/** Prebuilt files only: no /_next/image server is needed by the static export. */
export default function staticImageLoader({ src, width }: ImageLoaderProps): string {
  const variants = images[src]?.variants;
  return variants?.find(variant => variant.width >= width)?.src ?? variants?.at(-1)?.src ?? src;
}

/** Full-resolution derivatives for registered SVG layers, keeping their coordinates. */
export function mediaSource(src: string): string {
  return images[src]?.variants.at(-1)?.src ?? src;
}
