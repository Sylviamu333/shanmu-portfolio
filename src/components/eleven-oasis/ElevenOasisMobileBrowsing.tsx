"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { mobileBrowsing } from "@/data/eleven-oasis-case-study";

export function ElevenOasisMobileBrowsing() {
  const figure = useRef<HTMLElement>(null);
  const reveal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = figure.current;
    const target = reveal.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (!container || !target || reduced.matches
      || typeof IntersectionObserver === "undefined" || typeof target.animate !== "function") return;

    let animation: Animation | null = null;
    let observer: IntersectionObserver | null = null;
    let revealed = false;
    const showImmediately = () => {
      revealed = true;
      observer?.disconnect();
      animation?.cancel();
      animation = null;
    };
    const onPreferenceChange = () => {
      if (reduced.matches) showImmediately();
    };

    try {
      observer = new IntersectionObserver(([entry]) => {
        if (revealed || !entry.isIntersecting || entry.intersectionRatio < .15) return;
        revealed = true;
        observer?.disconnect();
        if (reduced.matches) {
          showImmediately();
          return;
        }
        try {
          animation?.play();
        } catch {
          showImmediately();
        }
      }, { threshold: .15 });
      // The server-rendered image is visible by default. Only a successfully
      // initialized client animation hides it; cancellation restores that base.
      animation = target.animate([
        { opacity: 0, transform: "translate3d(0, 24px, 0)" },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
      ], { duration: 700, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" });
      animation.pause();
      animation.currentTime = 0;
      animation.onfinish = () => {
        animation?.cancel();
        animation = null;
      };
      // Observe the stable outer figure, not its translating wrapper, so the
      // 15% threshold and shared media alignment stay independent of motion.
      observer.observe(container);
      reduced.addEventListener("change", onPreferenceChange);
    } catch {
      showImmediately();
    }

    return () => {
      showImmediately();
      reduced.removeEventListener("change", onPreferenceChange);
    };
  }, []);

  return (
    <section className="eleven-mobile-journey" aria-labelledby="eleven-mobile-journey-title">
      <header>
        <p className="eleven-journey-eyebrow">MOBILE SHOPPING JOURNEY</p>
        <h3 id="eleven-mobile-journey-title">From Discovery to Checkout</h3>
      </header>
      <figure ref={figure} className="eleven-mobile-browsing">
        <div ref={reveal} className="eleven-mobile-browsing-reveal">
          <Image
            className="eleven-mobile-browsing-image"
            src={mobileBrowsing.src}
            width={mobileBrowsing.width}
            height={mobileBrowsing.height}
            alt={mobileBrowsing.alt}
            sizes="(max-width: 1000px) 92vw, (max-width: 2200px) 56vw, 1200px"
          />
        </div>
      </figure>
    </section>
  );
}
