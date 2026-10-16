"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import demo from "./elevenOasisDemo.json";
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
    let reducedMotionOptIn = false;
    let failed = false;
    let disposed = false;
    let attempt = 0;
    const motionAllowed = () => !reduced.matches || reducedMotionOptIn;
    const idleState = (): Playback => failed ? "error" : !motionAllowed() ? "reduced" : "paused";

    const update = () => {
      const currentAttempt = ++attempt;
      if (disposed) return;
      if (!motionAllowed() || !visible || document.hidden || pausedByUser || failed) {
        element.pause();
        setPlayback(idleState());
        return;
      }
      if (!element.hasAttribute("src")) element.src = demo.src;
      element.muted = true;
      // Playback events below own the playing/paused UI, including browser or
      // system pauses. This promise handles only a declined autoplay attempt.
      void element.play().catch(error => {
        if (!disposed && currentAttempt === attempt && error.name !== "AbortError" && !failed) {
          setPlayback("blocked");
        }
      });
    };
    const onPlaying = () => {
      if (disposed) return;
      if (!motionAllowed() || !visible || document.hidden || pausedByUser || failed) {
        element.pause();
        return;
      }
      setPlayback("playing");
    };
    const onPause = () => {
      if (!disposed) setPlayback(idleState());
    };
    const onError = () => {
      failed = true;
      ++attempt;
      element.pause();
      if (!disposed) setPlayback("error");
    };
    const onPreferenceChange = () => {
      reducedMotionOptIn = false;
      update();
    };
    toggle.current = () => {
      if (disposed || failed) return;
      if (!element.paused) {
        pausedByUser = true;
        ++attempt;
        element.pause();
      } else {
        pausedByUser = false;
        // Reduced motion defaults to a static poster without a video request.
        // An explicit play action may opt in; later preference changes reset it.
        reducedMotionOptIn = reduced.matches;
        update();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { rootMargin: "200px 0px" });
    element.addEventListener("playing", onPlaying);
    element.addEventListener("pause", onPause);
    element.addEventListener("error", onError);
    observer.observe(root.current);
    reduced.addEventListener("change", onPreferenceChange);
    document.addEventListener("visibilitychange", update);
    return () => {
      disposed = true;
      ++attempt;
      observer.disconnect();
      reduced.removeEventListener("change", onPreferenceChange);
      document.removeEventListener("visibilitychange", update);
      element.removeEventListener("playing", onPlaying);
      element.removeEventListener("pause", onPause);
      element.removeEventListener("error", onError);
      element.pause();
      toggle.current = () => {};
    };
  }, []);

  return (
    <figure ref={root} className="eleven-macbook-showcase" aria-describedby={description}>
      <div className="eleven-macbook-composition">
        <div className="eleven-macbook-label-rail">
          <p className="eleven-preview-label">REDESIGNED STOREFRONT</p>
        </div>
        <div className="eleven-macbook-device" data-playback={playback}>
          <div className="eleven-macbook-display">
            <div className="eleven-macbook-picture" style={{ backgroundImage: `url("${demo.poster}")` }}>
              <video
                ref={video}
                autoPlay muted loop playsInline preload="metadata"
                poster={demo.poster}
                aria-label="Eleven Oasis website browsing demonstration"
                aria-describedby={description}
              />
              <button
                className="eleven-macbook-control"
                type="button"
                onClick={() => toggle.current()}
                disabled={playback === "loading" || playback === "error"}
                aria-label={playback === "error" ? "Website demo unavailable" : playback === "playing" ? "Pause website demo" : "Resume website demo"}
                aria-describedby={description}
              >
                <span className="eleven-macbook-play-circle" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M8 5L19 12L8 19Z" fill="currentColor" /></svg>
                </span>
              </button>
            </div>
          </div>
          <Image
            className="eleven-macbook-overlay"
            src={`${assets}/macbook-frame.webp`}
            width={1600} height={1020}
            sizes="(max-width: 1200px) 92vw, 1200px"
            alt="Eleven Oasis website demo inside the original MacBook frame"
          />
        </div>
      </div>
      <figcaption>
        <span id={description}>Eleven Oasis — a recorded walkthrough of the live storefront.</span>
        {playback === "error" && <span role="status">Video unavailable · static preview</span>}
      </figcaption>
    </figure>
  );
}
