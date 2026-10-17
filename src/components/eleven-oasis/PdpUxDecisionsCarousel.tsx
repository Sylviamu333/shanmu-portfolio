"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ImageGallery } from "@/components/ImageGallery";
import { pdpUxSlides } from "@/data/eleven-oasis-strategy";
import "./PdpUxDecisionsCarousel.css";

const count = pdpUxSlides.length;
const wrap = (index: number) => (index + count) % count;

/** A new active session resets to slide 01 without changing other strategy state. */
export function PdpUxDecisionsCarousel({ active }: { active: boolean }) {
  return <CarouselSession key={active ? "active" : "inactive"} active={active} />;
}

function CarouselSession({ active }: { active: boolean }) {
  const [selected, setSelected] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [failed, setFailed] = useState<number | null>(null);
  const [visited, setVisited] = useState([0]);
  const touch = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const select = (index: number) => {
    const next = wrap(index);
    setFailed(null);
    setSelected(next);
    setVisited(previous => previous.includes(next) ? previous : [...previous, next]);
  };
  const slide = pdpUxSlides[selected];
  const visibleSlide = pdpUxSlides[displayed];

  useEffect(() => {
    let cancelled = false;
    const image = new window.Image();
    image.src = pdpUxSlides[selected].src;
    void image.decode().then(() => {
      if (!cancelled) setDisplayed(selected);
    }).catch(() => {
      if (!cancelled) setFailed(selected);
    });
    return () => { cancelled = true; };
  }, [selected]);

  return <ImageGallery images={pdpUxSlides} presentation="pdp" renderPreview={open => (
    <div className="eleven-pdp-carousel" role="region" aria-roledescription="carousel" aria-label="PDP UX decisions"
      data-slide={selected + 1} data-rendered-slide={displayed + 1} onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          select(selected + (event.key === "ArrowRight" ? 1 : -1));
        }
      }}>
      <div className="eleven-pdp-carousel-viewport">
        <button type="button" className="eleven-pdp-carousel-image" aria-haspopup="dialog"
          aria-busy={selected !== displayed && failed !== selected}
          aria-label={`Enlarge slide ${displayed + 1} of ${count}: ${visibleSlide.alt}`} onClick={event => {
            if (suppressClick.current) { suppressClick.current = false; return; }
            open(displayed, event.currentTarget);
          }}
          onPointerDown={event => {
            suppressClick.current = false;
            if (event.pointerType === "touch") touch.current = { x: event.clientX, y: event.clientY, moved: false };
          }}
          onPointerMove={event => {
            const start = touch.current;
            if (!start || event.pointerType !== "touch") return;
            if (Math.abs(event.clientX - start.x) > 10 || Math.abs(event.clientY - start.y) > 10) start.moved = true;
          }}
          onPointerUp={event => {
            const start = touch.current;
            touch.current = null;
            if (!start || event.pointerType !== "touch") return;
            const dx = event.clientX - start.x;
            const dy = event.clientY - start.y;
            suppressClick.current = start.moved || Math.abs(dx) > 10 || Math.abs(dy) > 10;
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) select(selected + (dx < 0 ? 1 : -1));
          }}
          onPointerCancel={() => { touch.current = null; suppressClick.current = true; }}>
          {pdpUxSlides.map((image, index) => {
            // First/current/adjacent images load eagerly; visited slides stay decoded.
            const adjacent = index === wrap(selected - 1) || index === wrap(selected + 1);
            if (index !== selected && !visited.includes(index) && !(active && adjacent)) return null;
            return <Image key={image.src} src={image.src} width={image.width} height={image.height} alt={image.alt}
              sizes="(max-width:950px) 92vw, 65vw" loading="eager" fetchPriority={index === selected ? "high" : "low"}
              className="eleven-pdp-carousel-slide" data-current={index === displayed} aria-hidden={index !== displayed} />;
          })}
        </button>
        <button type="button" className="eleven-pdp-carousel-arrow" data-direction="previous" aria-label="Previous PDP slide"
          onClick={() => select(selected - 1)}>←</button>
        <button type="button" className="eleven-pdp-carousel-arrow" data-direction="next" aria-label="Next PDP slide"
          onClick={() => select(selected + 1)}>→</button>
      </div>
      <div className="eleven-pdp-carousel-dots" role="group" aria-label="Choose a PDP UX slide">
        {pdpUxSlides.map((image, index) => <button type="button" key={image.src}
          aria-label={`Go to slide ${index + 1} of ${count}: ${image.alt.split(" — ")[0]}`}
          aria-current={selected === index ? "true" : undefined} onClick={() => select(index)}><span /></button>)}
      </div>
      <span className="eleven-pdp-carousel-status" aria-live="polite" aria-atomic="true">{failed === selected ? "This slide could not load. The previous artwork remains visible." : `Slide ${selected + 1} of ${count}: ${slide.alt.split(" — ")[0]}`}</span>
    </div>
  )} />;
}
