"use client";

import { useEffect, useRef } from "react";

/** Align only Work; other anchors retain their existing scroll behavior. */
export function useWorkNavigation(pathname: string) {
  const request = useRef<() => void>(() => {});

  useEffect(() => {
    if (pathname !== "/") return;
    let disposed = false;
    let revision = 0;
    let firstFrame = 0;
    let secondFrame = 0;
    let observer: MutationObserver | null = null;

    const cancel = () => {
      revision++;
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      observer?.disconnect();
      observer = null;
    };
    const align = () => {
      cancel();
      const currentRevision = revision;
      const mounted = () => {
        if (disposed || currentRevision !== revision) return;
        if (!document.getElementById("work")) {
          // A route can commit its URL before its streamed page is mounted.
          if (!observer) {
            observer = new MutationObserver(mounted);
            observer.observe(document.body, { childList: true, subtree: true });
          }
          return;
        }
        observer?.disconnect();
        observer = null;
        void document.fonts.ready.then(() => {
          if (disposed || currentRevision !== revision) return;
          // Allow font layout and the existing Hero ResizeObserver to settle.
          firstFrame = requestAnimationFrame(() => {
            secondFrame = requestAnimationFrame(() => {
              if (disposed || currentRevision !== revision) return;
              const work = document.getElementById("work");
              if (!work) { mounted(); return; }
              const header = document.querySelector<HTMLElement>(".site-header");
              const offset = header?.getBoundingClientRect().height ?? 0;
              window.scrollTo({
                top: Math.max(0, work.getBoundingClientRect().top + window.scrollY - offset),
                behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
              });
              work.focus({ preventScroll: true });
            });
          });
        });
      };
      mounted();
    };
    const onHistoryNavigation = () => {
      if (location.hash === "#work") align();
      else cancel();
    };
    request.current = align;
    window.addEventListener("hashchange", onHistoryNavigation);
    window.addEventListener("popstate", onHistoryNavigation);
    if (location.hash === "#work") align();

    return () => {
      disposed = true;
      cancel();
      request.current = () => {};
      window.removeEventListener("hashchange", onHistoryNavigation);
      window.removeEventListener("popstate", onHistoryNavigation);
    };
  }, [pathname]);

  return () => request.current();
}
