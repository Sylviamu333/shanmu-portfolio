"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
      <div className="eleven-journey-stages" role="group" aria-label="Highlight a mobile shopping stage">
        {journeyStages.map(option => (
          <button type="button" key={option.id} aria-pressed={stage === option.id} aria-controls="eleven-phone-gallery"
            onClick={() => { finishReveal.current(); setStage(option.id); }}>{option.label}</button>
        ))}
      </div>
      <p className="eleven-journey-caption" aria-live="polite">{journeyStages.find(option => option.id === stage)?.caption}</p>
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
      {selected !== null && <PhonePreview initialIndex={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
