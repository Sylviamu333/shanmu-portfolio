"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useHomepageMotion } from "./HomeMotion";
import "./CastlePreview.css";

// Outlines traced from the original 1380 × 650 artwork's two green eye regions.
// Shared SVG coordinates keep the unmodified image and overlays aligned, even
// when the full-bleed cover crops the artwork horizontally.
const eyes = "M601 433L603 426L607 421L617 421L657 430L669 435L657 446L655 446L645 454L629 461L616 462L610 460L605 456L601 447Z M745 435L748 433L757 432L781 425L806 421L808 424L808 447L805 456L801 460L794 463L782 463L767 456L756 447L754 447L745 438Z";

export function CastlePreview() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { paused } = useHomepageMotion();
  const [visible, setVisible] = useState(false);
  const id = `castle-eyes-${useId().replaceAll(":", "")}`;

  useEffect(() => {
    if (!root.current) return;
    let intersects = false;
    const update = () => setVisible(intersects && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersects = entry.isIntersecting;
      update();
    }, { threshold: .02 });
    observer.observe(root.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div ref={root} className="castle-preview" role="img"
      aria-label="TEAM WANG DESIGN — Under the Castle: a green gothic castle and central pumpkin with neon-green eyes"
      data-active={visible && !paused && reduced === false}>
      <svg viewBox="0 0 1380 650" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <path id={`${id}-shape`} d={eyes} />
          <filter id={`${id}-halo`} filterUnits="userSpaceOnUse" x="570" y="390" width="270" height="105" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          <filter id={`${id}-bloom`} filterUnits="userSpaceOnUse" x="565" y="385" width="280" height="115" colorInterpolationFilters="sRGB">
            <feGaussianBlur stdDeviation="11" />
          </filter>
        </defs>
        <image href="/projects/team-wang-under-the-castle/homepage-kv.png" width="1380" height="650" />
        <g className="castle-eye-flicker" fill="#39ff14">
          <use href={`#${id}-shape`} opacity=".42" filter={`url(#${id}-bloom)`} />
          <use href={`#${id}-shape`} opacity=".78" filter={`url(#${id}-halo)`} />
          <use href={`#${id}-shape`} opacity=".95" />
        </g>
      </svg>
    </div>
  );
}
