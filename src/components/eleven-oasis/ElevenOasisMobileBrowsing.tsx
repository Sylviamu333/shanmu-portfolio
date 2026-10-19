"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "@/components/Arrow";
import { journeyPhones, journeyStages, type JourneySelection } from "@/data/eleven-oasis-mobile-journey";
import "./ElevenOasisMobileBrowsing.css";

/** Uses the site's native <dialog> lightbox pattern, scoped to this gallery. */
function PhonePreview({ initialIndex, onClose }: { initialIndex: number; onClose: () => void }) {
  const [index, setIndex] = useState(initialIndex);
  const dialog = useRef<HTMLDialogElement>(null);
  const active = journeyPhones[index];
  const navigate = (direction: number) => setIndex(current => (current + direction + journeyPhones.length) % journeyPhones.length);

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    const trigger = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    const padding = document.body.style.paddingRight;
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    element.showModal();
    document.body.style.overflow = "hidden";
    if (gutter) document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + gutter}px`;
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = padding;
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog ref={dialog} className="eleven-phone-dialog" aria-labelledby="eleven-phone-preview-label"
      onClose={onClose}
      onClick={event => { if (event.target === event.currentTarget) event.currentTarget.close(); }}
      onKeyDown={event => {
        if (event.key === "Tab") {
          const controls = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not([disabled])"));
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          navigate(event.key === "ArrowRight" ? 1 : -1);
        }
      }}>
      <div className="eleven-phone-preview-panel">
        <div className="eleven-phone-preview-toolbar">
          <p id="eleven-phone-preview-label" aria-live="polite">{index + 1} / {journeyPhones.length} · {active.label}</p>
          <button type="button" autoFocus aria-label="Close phone preview" onClick={() => dialog.current?.close()}>Close ×</button>
        </div>
        <div className="eleven-phone-preview-image">
          <Image key={active.id} src={active.src} width={active.width} height={active.height} alt={active.alt} sizes="(max-width: 600px) 85vw, 440px" />
        </div>
        <div className="eleven-phone-preview-controls">
          <button type="button" onClick={() => navigate(-1)} aria-label="Previous phone">← Previous</button>
          <button type="button" onClick={() => navigate(1)} aria-label="Next phone">Next →</button>
        </div>
      </div>
    </dialog>
  );
}

export function ElevenOasisMobileBrowsing() {
  const gallery = useRef<HTMLUListElement>(null);
  const finishReveal = useRef<() => void>(() => {});
  const [stage, setStage] = useState<JourneySelection>("all");
  const [selected, setSelected] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const viewport = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ id: number; x: number; y: number; dragging: boolean } | null>(null);
  const suppressClick = useRef(false);
  const filtered = journeyPhones.filter(phone => stage === "all" || phone.stages.includes(stage));
  const pages = Array.from({ length: Math.ceil(filtered.length / 2) }, (_, index) => filtered.slice(index * 2, index * 2 + 2));

  function goToPage(next: number) {
    const target = Math.max(0, Math.min(next, pages.length - 1));
    if (target === page) return;
    // A phone that slides out becomes inert; retain keyboard focus in the viewer.
    if (viewport.current?.contains(document.activeElement)) viewport.current.focus({ preventScroll: true });
    setPage(target);
  }

  useEffect(() => {
    const container = gallery.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (!container || reduced.matches || typeof IntersectionObserver === "undefined" || typeof container.animate !== "function") return;
    const animations: Animation[] = [];
    let observer: IntersectionObserver | null = null;
    let started = false;
    const finish = () => {
      started = true;
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
    };
    finishReveal.current = finish;
    const onPreferenceChange = () => { if (reduced.matches) finish(); };
    try {
      // Each outer item owns entrance motion; its inner button owns stage styling.
      // SSR and cancellation both leave the gallery visible without inline styles.
      container.querySelectorAll<HTMLLIElement>("li").forEach((item, index) => {
        const animation = item.animate([
          { opacity: 0, transform: "translate3d(0, 20px, 0) scale(.985)" },
          { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
        ], { duration: 580, delay: index * 65, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" });
        animation.pause();
        animation.currentTime = 0;
        animation.onfinish = () => animation.cancel();
        animations.push(animation);
      });
      observer = new IntersectionObserver(entries => {
        if (started || !entries.some(entry => entry.isIntersecting)) return;
        started = true;
        observer?.disconnect();
        if (reduced.matches) { finish(); return; }
        try { animations.forEach(animation => animation.play()); } catch { finish(); }
      }, { threshold: .08 });
      observer.observe(container);
      reduced.addEventListener("change", onPreferenceChange);
    } catch { finish(); }
    return () => {
      finish();
      finishReveal.current = () => {};
      reduced.removeEventListener("change", onPreferenceChange);
    };
  }, []);

  return (
    <section className="eleven-mobile-journey" aria-labelledby="eleven-mobile-journey-title">
      <header>
        <p className="eleven-journey-eyebrow">MOBILE SHOPPING JOURNEY</p>
        <h3 id="eleven-mobile-journey-title">From Discovery to Checkout</h3>
      </header>
      <div className="eleven-journey-stages" role="group" aria-label="Mobile shopping stage">
        {journeyStages.map(option => (
          <button type="button" key={option.id} aria-pressed={stage === option.id} aria-controls="eleven-phone-gallery eleven-mobile-phone-carousel"
            onClick={() => { finishReveal.current(); setStage(option.id); setPage(0); }}>{option.label}</button>
        ))}
      </div>
      <p className="eleven-journey-caption" aria-live="polite"><span className="eleven-journey-desktop-caption">{journeyStages.find(option => option.id === stage)?.caption}</span><span className="eleven-journey-mobile-caption">{stage === "all" ? "Explore all 11 screens, two at a time. Filter by stage or select a phone for a closer look." : journeyStages.find(option => option.id === stage)?.caption}</span></p>
      <ul ref={gallery} id="eleven-phone-gallery" className="eleven-phone-gallery" aria-label="Mobile shopping screens in reading order">
        {journeyPhones.map((phone, index) => (
          <li key={phone.id} className="eleven-phone-reveal">
            <button type="button" className="eleven-phone-trigger"
              data-emphasis={stage === "all" ? "all" : phone.stages.includes(stage) ? "match" : "dim"}
              aria-label={`Enlarge ${phone.label}`} aria-haspopup="dialog"
              onFocus={() => finishReveal.current()}
              onClick={() => { finishReveal.current(); setSelected(index); }}>
              <Image src={phone.thumbnail} width={phone.thumbnailWidth} height={phone.thumbnailHeight} alt={phone.alt}
                sizes="(max-width: 600px) 44vw, (max-width: 1000px) 28vw, 10vw" />
            </button>
          </li>
        ))}
      </ul>
      <div id="eleven-mobile-phone-carousel" className="eleven-mobile-phone-carousel" role="region" aria-roledescription="carousel" aria-label="Mobile shopping journey screenshots" data-page={page + 1} data-page-count={pages.length} data-stage={stage}>
        <div className="eleven-phone-carousel-row">
          <button type="button" className="eleven-phone-page-arrow eleven-phone-page-previous" aria-label="Previous screenshots" aria-controls="eleven-phone-pair-viewport" aria-disabled={page === 0} onClick={() => goToPage(page - 1)}><Arrow /></button>
          <div ref={viewport} id="eleven-phone-pair-viewport" className="eleven-phone-pair-viewport" role="group" tabIndex={0} aria-label="Screenshot pairs. Use left and right arrow keys to navigate."
            onKeyDown={event => {
              const target = event.key === "ArrowRight" ? page + 1 : event.key === "ArrowLeft" ? page - 1 : event.key === "Home" ? 0 : event.key === "End" ? pages.length - 1 : null;
              if (target !== null) { event.preventDefault(); goToPage(target); }
            }}
            onPointerDown={event => {
              if (!event.isPrimary || event.button !== 0) return;
              suppressClick.current = false;
              gesture.current = { id: event.pointerId, x: event.clientX, y: event.clientY, dragging: false };
            }}
            onPointerMove={event => {
              const start = gesture.current;
              if (!start || start.id !== event.pointerId) return;
              const x = Math.abs(event.clientX - start.x), y = Math.abs(event.clientY - start.y);
              if (x > 10 && x > y * 1.4) {
                start.dragging = true; suppressClick.current = true;
                event.currentTarget.setPointerCapture(event.pointerId);
              }
            }}
            onPointerUp={event => {
              const start = gesture.current;
              gesture.current = null;
              if (!start || start.id !== event.pointerId || !start.dragging) return;
              const x = event.clientX - start.x, y = event.clientY - start.y;
              if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
              if (Math.abs(x) >= 35 && Math.abs(x) > Math.abs(y) * 1.4) goToPage(page + (x < 0 ? 1 : -1));
            }}
            onPointerCancel={() => { gesture.current = null; suppressClick.current = false; }}
            onClickCapture={event => { if (suppressClick.current && event.detail > 0) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}>
            <div key={stage} className="eleven-phone-pair-track" style={{ transform: `translate3d(${-page * 100}%, 0, 0)` }}>
              {pages.map((pair, index) => <div key={pair[0].id} className="eleven-phone-pair-slide" role="group" aria-roledescription="slide" aria-label={`Page ${index + 1} of ${pages.length}`} aria-hidden={index !== page} inert={index !== page}>
                <ul className="eleven-phone-pair" aria-label="Screenshots in reading order">{pair.map(phone => <li key={phone.id} data-phone={phone.id}>
                  <button type="button" className="eleven-phone-trigger" aria-label={`Enlarge screen ${String(phone.id).padStart(2, "0")}: ${phone.label}`} aria-haspopup="dialog" onClick={() => setSelected(journeyPhones.findIndex(item => item.id === phone.id))}>
                    <Image src={phone.thumbnail} width={phone.thumbnailWidth} height={phone.thumbnailHeight} alt={phone.alt} loading="eager" sizes="(max-width:600px) calc((100vw - 140px) / 2), 1px" />
                  </button>
                </li>)}</ul>
              </div>)}
            </div>
          </div>
          <button type="button" className="eleven-phone-page-arrow" aria-label="Next screenshots" aria-controls="eleven-phone-pair-viewport" aria-disabled={page === pages.length - 1} onClick={() => goToPage(page + 1)}><Arrow /></button>
        </div>
        <p className="eleven-phone-pagination" aria-live="polite" aria-atomic="true"><span aria-hidden="true">{String(page + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")}</span><span className="eleven-phone-carousel-sr">Page {page + 1} of {pages.length}. Screens {pages[page].map(phone => String(phone.id).padStart(2, "0")).join(" and ")}.</span></p>
      </div>
      {selected !== null && <PhonePreview initialIndex={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
