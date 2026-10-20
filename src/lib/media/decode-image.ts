import { getImageProps } from "next/image";
import staticImageLoader from "./image-loader";

/** Warm exactly the same responsive candidate as the visible Next Image. */
export function decodeImage(image: { src: string; width: number; height: number; alt: string }, sizes: string) {
  const { props } = getImageProps({ ...image, sizes, loader: staticImageLoader });
  const element = new window.Image();
  element.sizes = props.sizes ?? sizes;
  if (props.srcSet) element.srcset = props.srcSet;
  element.src = props.src;
  return element.decode();
}
