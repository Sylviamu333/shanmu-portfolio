"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useHomepageMotion } from "./HomeMotion";
import "./KeyVisualPreview.css";

export function KeyVisualPreview() {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const { paused } = useHomepageMotion();
  const active = visible && !paused && reduced === false;

  useEffect(() => {
    if (!root.current) return;
    let intersects = false;
    const update = () => setVisible(intersects && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersects = entry.isIntersecting;
      update();
    });
    observer.observe(root.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  const reset = () => {
    root.current?.style.removeProperty("--kv-x");
    root.current?.style.removeProperty("--kv-y");
  };

  return (
    <div ref={root} className="key-visual-preview" data-active={active}
      onPointerMove={event => {
        if (!active || event.pointerType !== "mouse" || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const box = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--kv-x", String((event.clientX - box.left) / box.width - .5));
        event.currentTarget.style.setProperty("--kv-y", String((event.clientY - box.top) / box.height - .5));
      }}
      onPointerLeave={reset} onPointerCancel={reset}>
      <div className="key-visual-plane">
        <Image src="/projects/visual-experiments/homepage-cover.webp"
          alt="TEAM WANG DESIGN: three translucent glass photography cards with blue and pink fashion compositions"
          width={1606} height={979} sizes="(max-width: 900px) 95vw, 48vw" />
        <div className="key-visual-atmosphere" aria-hidden="true">
          <span className="key-visual-wash key-visual-wash-blue" />
          <span className="key-visual-wash key-visual-wash-pink" />
        </div>
      </div>
    </div>
  );
}
