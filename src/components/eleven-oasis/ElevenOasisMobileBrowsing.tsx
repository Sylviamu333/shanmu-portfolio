"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { mobileBrowsing } from "@/data/eleven-oasis-case-study";

export function ElevenOasisMobileBrowsing() {
  const figure = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = figure.current;
    const image = container?.querySelector("img");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (!container || !image || reduced.matches
      || typeof IntersectionObserver === "undefined" || typeof image.animate !== "function") return;

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
      animation = image.animate([
        { opacity: 0, transform: "translateY(24px)" },
        { opacity: 1, transform: "translateY(0)" },
      ], { duration: 700, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" });
      animation.pause();
      animation.currentTime = 0;
      animation.onfinish = () => {
        animation?.cancel();
        animation = null;
      };
      // Observe the stable outer figure, not its translating image, so the
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
        <h3 id="eleven-mobile-journey-title">MOBILE SHOPPING JOURNEY</h3>
        <p>From Discovery to Checkout</p>
      </header>
      <figure ref={figure} className="eleven-mobile-browsing">
        <Image
          className="eleven-mobile-browsing-image"
          src={mobileBrowsing.src}
          width={mobileBrowsing.width}
          height={mobileBrowsing.height}
          alt={mobileBrowsing.alt}
          sizes="(max-width: 1000px) 92vw, (max-width: 2200px) 56vw, 1200px"
        />
      </figure>
    </section>
  );
}
