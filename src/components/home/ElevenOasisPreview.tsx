"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import "./ElevenOasisPreview.css";

// Measured in the uploaded 1600 × 1200 mockup's original coordinates.
const screen = { x: 217.5, y: 206.5, width: 1165, height: 724 };
const website = { width: 1921, height: 6767 };
const scrollEnd =
  (screen.height / ((screen.width * website.height) / website.width) - 1) * 100;

export function ElevenOasisPreview() {
  const clip = `eleven-screen-${useId().replaceAll(":", "")}`;
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let intersecting = false;
    const update = () => setInView(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div
      ref={root}
      className="eleven-laptop"
      data-ready={ready}
      data-in-view={inView}
      style={{ "--eleven-scroll-end": `${scrollEnd}%` } as CSSProperties}
    >
      <svg className="eleven-screen-clip" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id={clip} clipPathUnits="objectBoundingBox">
            {/* Rounded top corners and tapered edges of the actual display. */}
            <path d="M.021459 0H.978541C.987554 0 .99485 .01174 .99485 .026243L1 1H0L.00515 .026243C.00515 .01174 .012446 0 .021459 0Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="eleven-laptop-canvas">
        <Image
          className="eleven-laptop-frame"
          src="/previews/eleven-oasis/cover-classic.png"
          alt="Eleven Oasis e-commerce website displayed on a MacBook"
          width={1600}
          height={1200}
          sizes="(max-width: 900px) 95vw, 48vw"
        />
        <div
          className="eleven-laptop-screen"
          style={{
            left: `${(screen.x / 1600) * 100}%`,
            top: `${(screen.y / 1200) * 100}%`,
            width: `${(screen.width / 1600) * 100}%`,
            height: `${(screen.height / 1200) * 100}%`,
            clipPath: `url(#${clip})`,
          }}
        >
          <Image
            className="eleven-screen-page"
            src="/previews/eleven-oasis/website-classic.png"
            alt=""
            aria-hidden="true"
            width={website.width}
            height={website.height}
            sizes="(max-width: 900px) 70vw, 36vw"
            onLoad={() => setReady(true)}
          />
        </div>
      </div>
    </div>
  );
}
