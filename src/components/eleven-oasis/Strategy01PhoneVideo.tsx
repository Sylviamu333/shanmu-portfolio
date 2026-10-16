"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectImage } from "@/data/projects";
import { ImageGallery } from "@/components/ImageGallery";
import demo from "./elevenOasisMobileDemo.json";
import "./Strategy01PhoneVideo.css";

type Playback = "loading" | "playing" | "paused" | "blocked" | "reduced" | "error";

export function Strategy01PhoneVideo({ active, artwork }: { active: boolean; artwork: ProjectImage }) {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const selected = useRef(active);
  const synchronize = useRef(() => {});
  const toggle = useRef(() => {});
  const [playback, setPlayback] = useState<Playback>("loading");
  const [showFrame, setShowFrame] = useState(false);

  useEffect(() => {
    const element = root.current;
    const overlay = canvas.current;
    const image = element?.querySelector<HTMLImageElement>(".gallery-image img");
    if (!element || !overlay || !image) return;
    // The existing ImageGallery contains the PNG. Measure its actual object-fit
    // paint rectangle, including letterboxing and the unchanged View image row.
    const align = () => {
      const box = image.getBoundingClientRect();
      const parent = element.getBoundingClientRect();
      const scale = Math.min(box.width / demo.artwork.width, box.height / demo.artwork.height);
      Object.assign(overlay.style, {
        left: `${box.left - parent.left + (box.width - demo.artwork.width * scale) / 2}px`,
        top: `${box.top - parent.top + (box.height - demo.artwork.height * scale) / 2}px`,
        width: `${demo.artwork.width * scale}px`, height: `${demo.artwork.height * scale}px`,
      });
    };
    align();
    const observer = new ResizeObserver(align);
    observer.observe(image);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = video.current;
    const container = root.current;
    if (!element || !container) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const dialog = container.querySelector<HTMLDialogElement>("dialog");
    let visible = false;
    let userPaused = false;
    let optedIn = false;
    let failed = false;
    let disposed = false;
    let attempt = 0;
    const motionAllowed = () => !reduced.matches || optedIn;
    const allowed = () => selected.current && visible && !document.hidden && !dialog?.open && motionAllowed() && !userPaused && !failed;
    const idle = (): Playback => failed ? "error" : !motionAllowed() ? "reduced" : "paused";
    const update = () => {
      const current = ++attempt;
      if (disposed) return;
      if (!allowed()) {
        element.pause();
        setPlayback(idle());
        return;
      }
      if (!element.hasAttribute("src")) element.src = demo.src;
      element.muted = true;
      void element.play().catch(error => {
        if (!disposed && current === attempt && error.name !== "AbortError" && !failed) {
          setShowFrame(false);
          setPlayback("blocked");
        }
      });
    };
    const onPlaying = () => {
      if (disposed) return;
      if (!allowed()) { element.pause(); return; }
      setShowFrame(true);
      setPlayback("playing");
    };
    const onPause = () => { if (!disposed) setPlayback(idle()); };
    const onError = () => {
      failed = true;
      ++attempt;
      element.pause();
      if (!disposed) { setShowFrame(false); setPlayback("error"); }
    };
    const onPreferenceChange = () => {
      optedIn = false;
      if (reduced.matches) setShowFrame(false);
      update();
    };
    toggle.current = () => {
      if (disposed || failed) return;
      if (!element.paused) {
        userPaused = true;
        ++attempt;
        element.pause();
      } else {
        userPaused = false;
        optedIn = reduced.matches;
        update();
      }
    };
    synchronize.current = update;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    // Enlarging the original still image must not leave a hidden movie running.
    const modalObserver = new MutationObserver(update);
    if (dialog) modalObserver.observe(dialog, { attributes: true, attributeFilter: ["open"] });
    element.addEventListener("playing", onPlaying);
    element.addEventListener("pause", onPause);
    element.addEventListener("error", onError);
    document.addEventListener("visibilitychange", update);
    reduced.addEventListener("change", onPreferenceChange);
    observer.observe(container);
    return () => {
      disposed = true;
      ++attempt;
      observer.disconnect();
      modalObserver.disconnect();
      element.removeEventListener("playing", onPlaying);
      element.removeEventListener("pause", onPause);
      element.removeEventListener("error", onError);
      document.removeEventListener("visibilitychange", update);
      reduced.removeEventListener("change", onPreferenceChange);
      element.pause();
      synchronize.current = () => {};
      toggle.current = () => {};
    };
  }, []);

  useEffect(() => {
    selected.current = active;
    synchronize.current();
  }, [active]);

  return (
    <div ref={root} className="eleven-strategy01" data-playback={playback} data-show-frame={showFrame}>
      <ImageGallery images={[artwork]} layout="full" />
      <div ref={canvas} className="eleven-strategy01-canvas">
        <div className="eleven-strategy01-screen" style={{
          left: `${demo.screen.x / demo.artwork.width * 100}%`,
          top: `${demo.screen.y / demo.artwork.height * 100}%`,
          width: `${demo.screen.width / demo.artwork.width * 100}%`,
          height: `${demo.screen.height / demo.artwork.height * 100}%`,
          maskImage: `url("${demo.mask}")`,
        }}>
          <video ref={video} autoPlay muted loop playsInline preload="metadata"
            aria-label="Eleven Oasis mobile homepage walkthrough" />
          <button type="button" className="eleven-strategy01-control" disabled={playback === "loading" || playback === "error"}
            aria-label={playback === "error" ? "Mobile walkthrough unavailable; static artwork shown" : playback === "playing" ? "Pause mobile homepage walkthrough" : "Play mobile homepage walkthrough"}
            onClick={() => toggle.current()}>
            <span aria-hidden="true">{playback === "playing" ? "Ⅱ" : "▶"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
