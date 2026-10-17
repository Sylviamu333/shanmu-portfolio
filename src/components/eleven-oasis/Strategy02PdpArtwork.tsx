"use client";

import { useEffect, useRef } from "react";
import type { ProjectImage } from "@/data/projects";
import { ImageGallery } from "@/components/ImageGallery";
import "./Strategy02PdpArtwork.css";

export function Strategy02PdpArtwork({ active, images }: { active: boolean; images: ProjectImage[] }) {
  const entrance = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = entrance.current;
    if (!element || !active) return;
    let cancelled = false;
    let visible = false;
    let loaded = false;
    const reveal = () => {
      if (!cancelled && visible && loaded) {
        element.dataset.entered = "true";
        observer?.disconnect(); // One entrance per selection, never scroll-scrubbed.
      }
    };
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      reveal();
    }, { threshold: 0.1 });
    if (observer) observer.observe(element);
    else visible = true;
    const image = element.querySelector<HTMLImageElement>(".gallery-image img");
    // The image is selected explicitly, so load it even if below the fold.
    if (image) image.loading = "eager";
    void (image?.decode() ?? Promise.resolve()).catch(() => {}).then(() => {
      loaded = true;
      reveal();
    });
    return () => {
      cancelled = true;
      observer?.disconnect();
      delete element.dataset.entered;
    };
  }, [active, images]);

  return <div ref={entrance} className="eleven-pdp-entrance" data-active={active}>
    <ImageGallery images={images} layout="full" presentation="pdp" />
  </div>;
}
