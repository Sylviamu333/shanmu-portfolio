"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

type Point = { x: number; y: number; time: number };
const subscribe = () => () => {};

// Original, bounded canvas renderer for the observed red dot / tapered ink trail.
export function ReferenceCursor({ paused }: { paused: boolean }) {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const cursor = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = cursor.current;
    const surface = canvas.current;
    const text = label.current;
    const context = surface?.getContext("2d");
    if (!el || !surface || !text || !context || paused) return;
    const media = matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    let points: Point[] = [];
    let active = false;
    let x = 0;
    let y = 0;
    let drawnX = 0;
    let drawnY = 0;
    let arrow = false;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    surface.width = 216 * dpr;
    surface.height = 216 * dpr;
    context.scale(dpr, dpr);
    const hide = () => {
      active = false;
      el.dataset.visible = "false";
      delete document.body.dataset.homeCursor;
      points = [];
      cancelAnimationFrame(frame);
      frame = 0;
      context.clearRect(0, 0, 216, 216);
    };
    const paint = (now: number) => {
      frame = 0;
      if (!active || document.hidden) return;
      if (arrow) {
        drawnX += (x - drawnX) * 0.35;
        drawnY += (y - drawnY) * 0.35;
        el.style.transform = `translate3d(${drawnX}px,${drawnY}px,0)`;
      }
      points = points.filter((point) => now - point.time < 300);
      context.clearRect(0, 0, 216, 216);
      context.lineCap = "round";
      context.lineJoin = "round";
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1],
          b = points[i];
        const age = Math.max(0, 1 - (now - a.time) / 300);
        const distance = Math.hypot(a.x - x, a.y - y);
        if (distance > 108) continue;
        context.strokeStyle = `rgba(239,64,83,${0.55 * age * age})`;
        context.lineWidth = 10 * age;
        context.beginPath();
        context.moveTo(a.x - x + 108, a.y - y + 108);
        context.lineTo(b.x - x + 108, b.y - y + 108);
        context.stroke();
      }
      if (points.length || (arrow && Math.hypot(x - drawnX, y - drawnY) > 0.1))
        frame = requestAnimationFrame(paint);
    };
    const move = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      if (
        !media.matches ||
        event.pointerType !== "mouse" ||
        !target?.closest(".homepage, .home-header")
      ) {
        hide();
        return;
      }
      const wasActive = active;
      active = true;
      x = event.clientX;
      y = event.clientY;
      const nextArrow = Boolean(target.closest(".hero-greeting"));
      if (!wasActive || arrow !== nextArrow || !nextArrow) {
        drawnX = x;
        drawnY = y;
        el.style.transform = `translate3d(${x}px,${y}px,0)`;
      }
      arrow = nextArrow;
      el.dataset.arrow = String(arrow);
      el.dataset.visible = "true";
      document.body.dataset.homeCursor = "true";
      const project = target.closest(".home-project-link");
      // Castle deliberately has no case-study badge, including at the pointer.
      const pointerLabel = project && !project.hasAttribute("data-case-study-badge");
      text.textContent = pointerLabel ? "Read case study" : "";
      el.dataset.label = pointerLabel ? "true" : "false";
      text.style.left = x < 165 ? "7px" : "-149px";
      text.style.top = y < 30 ? "7px" : "-25px";
      const now = performance.now();
      if (arrow) points = [];
      else points.push({ x, y, time: now });
      if (points.length > 72) points.shift();
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const key = (event: KeyboardEvent) => {
      if (event.key === "Tab" || event.key === "Escape") hide();
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    document.addEventListener("keydown", key);
    document.addEventListener("visibilitychange", hide);
    window.addEventListener("blur", hide);
    media.addEventListener("change", hide);
    return () => {
      hide();
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      document.removeEventListener("keydown", key);
      document.removeEventListener("visibilitychange", hide);
      window.removeEventListener("blur", hide);
      media.removeEventListener("change", hide);
    };
  }, [paused, mounted]);

  // The route-transition wrapper creates a fixed-position containing block.
  // A body portal keeps pointer coordinates in viewport space while scrolling.
  return mounted
    ? createPortal(
        <div
          ref={cursor}
          className="home-reference-cursor"
          aria-hidden="true"
          data-visible="false"
          data-label="false"
        >
          <canvas ref={canvas} className="home-cursor-trail" />
          <span ref={label} className="home-cursor-label" />
          <span className="home-cursor-dot" />
          <span className="home-cursor-arrow">↓</span>
        </div>,
        document.body,
      )
    : null;
}
