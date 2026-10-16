"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import "./ElevenOasisMacbookVideo.css";

const assets = "/projects/eleven-oasis/demo";
type Playback = "loading" | "playing" | "paused" | "blocked" | "error" | "reduced";

export function ElevenOasisMacbookVideo() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const toggle = useRef(() => {});
  const [playback, setPlayback] = useState<Playback>("loading");
  const description = useId();

  useEffect(() => {
    const element = video.current;
    if (!element || !root.current) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let pausedByUser = false;
    let failed = false;
    let disposed = false;
    let attempt = 0;

    const update = () => {
      const currentAttempt = ++attempt;
      if (disposed) return;
      if (reduced.matches || !visible || document.hidden || pausedByUser || failed) {
        element.pause();
        // Releasing the source guarantees a static poster when motion is reduced.
        if (reduced.matches && element.hasAttribute("src")) {
          element.removeAttribute("src");
          element.load();
        }
        setPlayback(reduced.matches ? "reduced" : failed ? "error" : "paused");
        return;
      }
      if (!element.hasAttribute("src")) element.src = `${assets}/homepage-demo.mp4`;
      element.muted = true;
      void element.play().then(() => {
        if (!disposed && currentAttempt === attempt) setPlayback("playing");
      }).catch(error => {
        if (!disposed && currentAttempt === attempt && error.name !== "AbortError") {
          setPlayback("blocked");
        }
      });
    };
    const error = () => {
      failed = true;
      update();
    };
    // Native controls stay hidden; this keyboard-accessible control also permits
    // manual playback when the browser declines muted autoplay.
    toggle.current = () => {
      if (failed || reduced.matches) return;
      pausedByUser = !element.paused;
      update();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { rootMargin: "200px 0px" });
    observer.observe(root.current);
    reduced.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    element.addEventListener("error", error);
    return () => {
      disposed = true;
      ++attempt;
      observer.disconnect();
      reduced.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      element.removeEventListener("error", error);
      element.pause();
      toggle.current = () => {};
    };
  }, []);

  return (
    <figure ref={root} className="eleven-macbook-showcase" aria-describedby={description}>
      <div className="eleven-macbook-device" data-playback={playback}>
        <div className="eleven-macbook-display">
          <video
            ref={video}
            autoPlay muted loop playsInline preload="metadata"
            poster={`${assets}/poster.webp`}
            aria-label="Eleven Oasis website browsing demonstration"
            aria-describedby={description}
          />
        </div>
        <Image
          className="eleven-macbook-overlay"
          src={`${assets}/macbook-frame.webp`}
          width={1600} height={1020}
          sizes="(max-width: 1200px) 92vw, 1200px"
          alt="Eleven Oasis website demo inside the original MacBook frame"
        />
      </div>
      <figcaption>
        <span id={description}>Eleven Oasis — a recorded walkthrough of the live storefront.</span>
        <button
          type="button"
          onClick={() => toggle.current()}
          disabled={playback === "reduced" || playback === "error"}
          aria-label={playback === "reduced" ? "Static website preview; reduced motion enabled" : playback === "error" ? "Static website preview; video unavailable" : playback === "playing" ? "Pause website demo" : "Play website demo"}
        >
          {playback === "reduced" ? "Static preview · reduced motion" : playback === "error" ? "Static preview · video unavailable" : playback === "playing" ? "Pause demo" : "Play demo"}
        </button>
      </figcaption>
    </figure>
  );
}
