"use client";

import Image from "next/image";
import { mediaSource } from "@/lib/media/image-loader";
import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { useHomepageMotion } from "./HomeMotion";
import "./EarlyBirdsPreview.css";

// Original 1600 × 1200 image coordinates. Extracting the source ink in SVG
// preserves its exact letterforms instead of requiring an embedded font.
const labels = [
  { text: "BRAND STORY", x: 34, y: 530.5, width: 147, origin: "71% 50%" },
  { text: "IP DESIGN", x: 59, y: 557.5, width: 98, origin: "65% 50%" },
  { text: "GRAPHIC SYSTEM", x: 59, y: 585, width: 154, origin: "65% 50%" },
  { text: "PHOTOGRAPHY", x: 59, y: 612, width: 130, origin: "65% 50%" },
  { text: "EBC - POP UP", x: 59, y: 639, width: 122, origin: "65% 50%" },
];

export function EarlyBirdsPreview() {
  const id = `ebc-ink-${useId().replaceAll(":", "")}`;
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const status = useRef({ visible: false, paused: false });
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const { paused } = useHomepageMotion();

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let intersects = false;
    const update = () => setVisible(intersects && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersects = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    if (!ready || !root.current) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const elements = gsap.utils.toArray<HTMLElement>(".ebc-label", root.current);
        const sequence = gsap.timeline({ paused: true, repeat: -1 });
        elements.forEach((element, index) => {
          const start = index * 2.1;
          const before = elements.slice(0, index);
          const after = elements.slice(index + 1);
          sequence.to(element, { scale: 3, duration: 0.65, ease: "power2.inOut" }, start);
          // Give a 3× label room without reflowing the cover or moving the photo.
          if (before.length) sequence.to(before, { yPercent: -100, duration: 0.65, ease: "power2.inOut" }, start);
          if (after.length) sequence.to(after, { yPercent: 100, duration: 0.65, ease: "power2.inOut" }, start);
          sequence.to(element, { scale: 1, duration: 0.65, ease: "power2.inOut" }, start + 1.2);
          const neighbors = [...before, ...after];
          sequence.to(neighbors, { yPercent: 0, duration: 0.65, ease: "power2.inOut" }, start + 1.2);
        });
        sequence.to({}, { duration: 0.25 });
        timeline.current = sequence;
        if (status.current.visible && !status.current.paused) sequence.play();
      }, root);
      return () => {
        timeline.current = null;
        context.revert();
      };
    });
    return () => media.revert();
  }, [ready]);

  useEffect(() => {
    status.current = { visible, paused };
    if (visible && !paused) timeline.current?.play();
    else timeline.current?.pause();
  }, [visible, paused]);

  return (
    <div ref={root} className="ebc-preview" data-ready={ready}>
      <div className="ebc-canvas">
        <Image
          className="ebc-cover"
          src={mediaSource("/previews/early-birds-club/cover.png")}
          unoptimized
          alt="Early Birds Club editorial cover: EBC logo, golf cart photography, DROP 1 and 2024"
          width={1600}
          height={1200}
          sizes="(max-width: 900px) 78vw, 39vw"
          onLoad={() => setReady(true)}
        />
        <div className="ebc-paper-repair" aria-hidden="true" style={{ backgroundImage: `url("${mediaSource("/previews/early-birds-club/cover.png")}")` }} />
        <div className="ebc-labels" aria-hidden="true">
          {labels.map(({ text, x, y, width, origin }, index) => (
            <span
              key={text}
              className="ebc-label"
              style={{
                left: `${(x / 1600) * 100}%`,
                top: `${(y / 1200) * 100}%`,
                width: `${(width / 1600) * 100}%`,
                transformOrigin: origin,
              }}
            >
              <span className="ebc-label-type">{text}</span>
              <svg className="ebc-label-ink" viewBox={`${x} ${y} ${width} 17.5`} preserveAspectRatio="none">
                <defs>
                  <filter id={`${id}-${index}`} filterUnits="userSpaceOnUse" x={x} y={y} width={width} height={17.5} colorInterpolationFilters="sRGB">
                    {/* Convert dark source lettering to alpha; discard the
                        near-white paper grain so no text rectangle remains. */}
                    <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -0.218275 -0.734292 -0.074127 0 1" />
                    <feComponentTransfer>
                      <feFuncA type="linear" slope="1.020408" intercept="-0.020408" />
                    </feComponentTransfer>
                  </filter>
                </defs>
                <image href={mediaSource("/previews/early-birds-club/cover.png")} width="1600" height="1200" filter={`url(#${id}-${index})`} />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
