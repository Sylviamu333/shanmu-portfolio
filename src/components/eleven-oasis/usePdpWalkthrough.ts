"use client";

import { useEffect, useRef, useState } from "react";
import demo from "./elevenOasisPdpWalkthrough.json";

type Playback = "loading" | "playing" | "paused" | "reduced" | "error";

export function usePdpWalkthrough(active: boolean) {
  const root = useRef<HTMLDivElement>(null);
  const screenshot = useRef<SVGImageElement>(null);
  const synchronize = useRef(() => {});
  const toggle = useRef(() => {});
  const hover = useRef((value: boolean) => { void value; });
  const selected = useRef(active);
  const [playback, setPlayback] = useState<Playback>("loading");

  useEffect(() => {
    const container = root.current;
    const image = screenshot.current;
    const viewport = container?.querySelector(".eleven-pdp-hover");
    if (!container || !image || !viewport) return;
    const target = image;
    const host = container;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const dialog = container.querySelector("dialog");
    const source = new window.Image();
    let animation: Animation | null = null;
    let visible = false;
    let loaded = false;
    let requested = false;
    let failed = false;
    let userPaused = false;
    let hovering = false;
    let optedIn = false;
    let disposed = false;

    const update = () => {
      if (disposed) return;
      const motionAllowed = !reduced.matches || optedIn;
      const allowed = selected.current && visible && !document.hidden && !dialog?.open && motionAllowed && !userPaused && !hovering;
      if (selected.current && visible && motionAllowed && !requested) load();
      // The unmodified composition remains visible until the asset is decoded,
      // or when reduced motion, network failure or missing WAAPI requires a still.
      container.dataset.walkthroughReady = String(loaded && motionAllowed && !failed);
      if (animation && allowed && !failed) animation.play();
      else animation?.pause();
      setPlayback(failed ? "error" : !motionAllowed ? "reduced" : !loaded ? "loading" : allowed ? "playing" : "paused");
    };
    synchronize.current = update;
    hover.current = value => { hovering = value; update(); };
    toggle.current = () => {
      if (failed) return;
      if (animation?.playState === "running") userPaused = true;
      else { userPaused = false; optedIn = reduced.matches; }
      update();
    };
    const preference = () => { optedIn = false; update(); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(viewport);
    const modalObserver = new MutationObserver(update);
    if (dialog) modalObserver.observe(dialog, { attributes: true, attributeFilter: ["open"] });
    document.addEventListener("visibilitychange", update);
    reduced.addEventListener("change", preference);

    function load() {
      requested = true;
      source.src = demo.src;
      void source.decode().then(() => {
        if (disposed) return;
        // All distances are in the composition's SVG viewBox coordinates. Scaling
        // the viewBox with object-fit leaves this relationship exact at any size.
        const paintedHeight = source.naturalHeight * demo.screen.width / source.naturalWidth;
        const distance = Math.max(0, paintedHeight - demo.screen.height);
        target.setAttribute("height", String(paintedHeight));
        target.setAttribute("href", demo.src);
        const { down, bottomHold, return: returnTime, topHold } = demo.timing;
        const duration = down + bottomHold + returnTime + topHold;
        animation = target.animate([
          { transform: "translateY(0px)", offset: 0, easing: "cubic-bezier(.45, 0, .55, 1)" },
          { transform: `translateY(${-distance}px)`, offset: down / duration },
          { transform: `translateY(${-distance}px)`, offset: (down + bottomHold) / duration, easing: "cubic-bezier(.45, 0, .55, 1)" },
          { transform: "translateY(0px)", offset: (down + bottomHold + returnTime) / duration },
          { transform: "translateY(0px)", offset: 1 },
        ], { duration, iterations: Infinity });
        animation.pause();
        loaded = true;
        host.dataset.scrollDistance = String(distance);
        update();
      }).catch(() => { if (!disposed) { failed = true; update(); } });
    }

    return () => {
      disposed = true;
      animation?.cancel();
      observer.disconnect();
      modalObserver.disconnect();
      document.removeEventListener("visibilitychange", update);
      reduced.removeEventListener("change", preference);
      synchronize.current = () => {};
      toggle.current = () => {};
      hover.current = () => {};
    };
  }, []);

  useEffect(() => { selected.current = active; synchronize.current(); }, [active]);
  return { root, screenshot, playback, toggle, hover };
}
