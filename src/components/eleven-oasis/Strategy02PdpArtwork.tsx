"use client";

import { useEffect, useId } from "react";
import type { ProjectImage } from "@/data/projects";
import { ImageGallery } from "@/components/ImageGallery";
import { usePdpWalkthrough } from "./usePdpWalkthrough";
import demo from "./elevenOasisPdpWalkthrough.json";
import "./Strategy02PdpArtwork.css";

export function Strategy02PdpArtwork({ active, images }: { active: boolean; images: ProjectImage[] }) {
  const { root: entrance, screenshot, playback, toggle, hover } = usePdpWalkthrough(active);
  const id = useId().replace(/:/g, "");
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
  }, [active, images, entrance]);

  return <div ref={entrance} className="eleven-pdp-entrance" data-active={active}>
    <ImageGallery images={images} layout="full" presentation="pdp" pdpOverlay={
      <svg className="eleven-pdp-walkthrough" viewBox={`0 0 ${demo.artwork.width} ${demo.artwork.height}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs><clipPath id={`${id}-screen`}><path d={demo.screenPath} /></clipPath></defs>
        <g clipPath={`url(#${id}-screen)`} className="eleven-pdp-page">
          <image ref={screenshot} x={demo.screen.x} y={demo.screen.y} width={demo.screen.width} height={demo.height * demo.screen.width / demo.width} />
        </g>
        <rect x="1130" y="47" width="400" height="872" rx="62" fill="transparent" className="eleven-pdp-hit"
          onPointerEnter={event => { if (event.pointerType === "mouse") hover.current(true); }}
          onPointerLeave={event => { if (event.pointerType === "mouse") hover.current(false); }} />
      </svg>
    } />
    <button type="button" className="eleven-pdp-playback" disabled={playback === "loading" || playback === "error"}
      aria-label={playback === "error" ? "PDP walkthrough unavailable; static artwork shown" : playback === "playing" ? "Pause PDP walkthrough" : "Play PDP walkthrough"}
      aria-describedby={`${id}-help`} onClick={() => toggle.current()}>
      {playback === "error" ? "Static preview" : playback === "playing" ? "Pause walkthrough" : "Play walkthrough"}
    </button>
    <span className="sr-only" id={`${id}-help`}>The complete product page scrolls inside the phone. Hover over the phone to pause. Enlarge opens the original still composition.</span>
  </div>;
}
