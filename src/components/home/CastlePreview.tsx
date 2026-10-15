import Image from "next/image";
import type { ProjectImage } from "@/data/projects";
import "./CastlePreview.css";

// The flattened collage occludes parts of the photographs. Until the original
// photos are available, keep the exact artwork instead of fabricating layers.
export function CastlePreview({ image }: { image: ProjectImage }) {
  return (
    <div className="castle-preview" data-collage-mode="static-fallback">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(max-width: 900px) 95vw, 48vw"
      />
    </div>
  );
}
