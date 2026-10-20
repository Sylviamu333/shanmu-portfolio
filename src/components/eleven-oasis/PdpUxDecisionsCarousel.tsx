"use client";

import Image from "next/image";
import { decodeImage } from "@/lib/media/decode-image";
import { useEffect, useId, useRef, useState } from "react";
import { ImageGallery } from "@/components/ImageGallery";
import { pdpUxSlides } from "@/data/eleven-oasis-strategy";
import type { ProjectImage } from "@/data/projects";
import { createPdpPlaybackController, PDP_SLIDE_DURATION, type PdpPlaybackSnapshot } from "./pdpCarouselPlayback";
import "./PdpUxDecisionsCarousel.css";

type CarouselProps = {
  active: boolean;
  slides?: ProjectImage[];
  label?: string;
  paginationLabel?: string;
  showArrows?: boolean;
};

/** A new active session resets to slide 01 without changing other strategy state. */
export function PdpUxDecisionsCarousel({ active, ...props }: CarouselProps) {
  return <CarouselSession key={active ? "active" : "inactive"} active={active} {...props} />;
}

function CarouselSession({ active, slides = pdpUxSlides, label = "PDP UX decisions", paginationLabel = "Choose a PDP UX slide", showArrows = false }: CarouselProps) {
  const count = slides.length;
  const wrap = (index: number) => (index + count) % count;
  const root = useRef<HTMLDivElement>(null);
  const controller = useRef<ReturnType<typeof createPdpPlaybackController> | null>(null);
  const [playback, setPlayback] = useState<PdpPlaybackSnapshot>({ index: 0, playing: false, paused: false, reduced: false });
  const selected = playback.index;
  const [displayed, setDisplayed] = useState(0);
  const [failed, setFailed] = useState<number | null>(null);
  const [visited, setVisited] = useState([0]);
  const touch = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const helpId = useId();
  const select = (index: number) => {
    setFailed(null);
    controller.current?.select(index);
  };
  const slide = slides[selected];
  const visibleSlide = slides[displayed];

  useEffect(() => {
    if (!showArrows) return;
    const pill = root.current?.querySelector<HTMLElement>(".eleven-pdp-carousel-dots");
    if (!pill) return;
    const reveal = () => {
      const indicator = pill.querySelector<HTMLElement>('[aria-current="true"]');
      if (!indicator || pill.scrollWidth <= pill.clientWidth) return;
      const item = indicator.getBoundingClientRect();
      const container = pill.getBoundingClientRect();
      pill.scrollLeft += item.left - container.left - (pill.clientWidth - item.width) / 2;
    };
    reveal();
    const observer = new ResizeObserver(reveal);
    observer.observe(pill);
    return () => observer.disconnect();
  }, [selected, showArrows]);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const clock = createPdpPlaybackController(count, {
      now: () => performance.now(),
      request: callback => requestAnimationFrame(callback),
      cancel: id => cancelAnimationFrame(id),
      onChange: setPlayback,
      onProgress: elapsed => {
        element.style.setProperty("--pdp-progress", String(elapsed / PDP_SLIDE_DURATION));
        element.dataset.elapsed = String(elapsed);
      },
    });
    controller.current = clock;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const onPreference = () => clock.setConditions({ reduced: reduced.matches });
    const onVisibility = () => clock.setConditions({ hidden: document.hidden });
    clock.setConditions({ active, reduced: reduced.matches, hidden: document.hidden });
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(entries => {
      clock.setConditions({ visible: entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= .15) });
    }, { threshold: .15 });
    if (observer) observer.observe(element);
    else clock.setConditions({ visible: true });
    reduced.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer?.disconnect();
      reduced.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
      clock.dispose();
      controller.current = null;
    };
  }, [active, count]);

  useEffect(() => {
    let cancelled = false;
    void decodeImage(slides[selected], "(max-width:950px) 92vw, 65vw").then(() => {
      if (!cancelled) {
        setDisplayed(selected);
        setVisited(previous => previous.includes(selected) ? previous : [...previous, selected]);
        controller.current?.decoded(selected);
      }
    }).catch(() => {
      if (!cancelled) {
        setFailed(selected);
        controller.current?.decoded(selected, false);
      }
    });
    return () => { cancelled = true; };
  }, [selected, slides]);

  return <div ref={root} className="eleven-pdp-carousel-session" data-playback={playback.playing ? "playing" : "paused"}>
    <ImageGallery images={slides} presentation="pdp" onOpenChange={open => controller.current?.setConditions({ modal: open })} renderPreview={open => (
    <div className="eleven-pdp-carousel" role="region" aria-roledescription="carousel" aria-label={label}
      data-slide={selected + 1} data-rendered-slide={displayed + 1} onKeyDown={event => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          setFailed(null);
          controller.current?.step(event.key === "ArrowRight" ? 1 : -1);
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
          {slides.map((image, index) => {
            // First/current/adjacent images load eagerly; visited slides stay decoded.
            const adjacent = index === wrap(selected - 1) || index === wrap(selected + 1);
            if (index !== selected && !visited.includes(index) && !(active && adjacent)) return null;
            return <Image key={image.src} src={image.src} width={image.width} height={image.height} alt={image.alt}
              sizes="(max-width:950px) 92vw, 65vw" loading="eager" fetchPriority={index === selected ? "high" : "low"}
              className="eleven-pdp-carousel-slide" data-current={index === displayed} aria-hidden={index !== displayed} />;
          })}
        </button>
        {showArrows && <>
          <div className="eleven-trust-caption" aria-hidden="true"><span>{visibleSlide.alt.split(" — ")[0]}</span><span>{visibleSlide.caption}</span></div>
          <button type="button" className="eleven-trust-arrow" data-direction="previous" aria-label="Previous trust signal" onClick={() => select(selected - 1)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m14 5-7 7 7 7" /></svg></button>
          <button type="button" className="eleven-trust-arrow" data-direction="next" aria-label="Next trust signal" onClick={() => select(selected + 1)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m10 5 7 7-7 7" /></svg></button>
        </>}
      </div>
      <div className="eleven-pdp-carousel-controls">
        <div className="eleven-pdp-carousel-dots" role="group" aria-label={paginationLabel}>
          {slides.map((image, index) => <button type="button" key={image.src}
            aria-label={`Go to slide ${index + 1} of ${count}: ${image.alt.split(" — ")[0]}`}
            aria-current={selected === index ? "true" : undefined} onClick={() => select(index)}>
            <span className="eleven-pdp-indicator" aria-hidden="true"><span className="eleven-pdp-progress-fill" /></span>
          </button>)}
        </div>
        <button type="button" className="eleven-pdp-carousel-toggle" aria-label={playback.playing ? "Pause slideshow" : "Play slideshow"}
          aria-describedby={playback.reduced ? helpId : undefined} disabled={playback.reduced} onClick={() => controller.current?.toggle()}>
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="currentColor">
            {playback.playing ? <><rect x="4" y="3" width="2.5" height="10" rx=".6" /><rect x="9.5" y="3" width="2.5" height="10" rx=".6" /></> : <path d="M5 2.5 13 8 5 13.5Z" />}
          </svg>
        </button>
      </div>
      <span className="eleven-pdp-carousel-status" aria-live="polite" aria-atomic="true">{failed === selected ? "This slide could not load. The previous artwork remains visible." : `Slide ${selected + 1} of ${count}: ${slide.alt.split(" — ")[0]}${showArrows ? `. ${slide.caption}` : ""}`}</span>
      {playback.reduced && <span className="eleven-pdp-carousel-status" id={helpId}>Automatic playback is disabled by your reduced motion preference. Use the {count === 7 ? "seven" : count} slide controls to browse.</span>}
    </div>
  )} /></div>;
}
