"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useAnimate, useReducedMotion } from "motion/react";
import type { ProjectImage } from "@/data/projects";
import { useHomepageMotion } from "./HomeMotion";
import "./CastlePreview.css";

const base = "/projects/team-wang-under-the-castle/";
// Only unobstructed pixels from the supplied collage. The hidden parts of the
// original photographs are neither reconstructed nor left beneath these layers.
const photos = [
  { name: "entrance", w: 370, h: 453, x: 430, y: 32, size: 350, z: 2, duration: 7.2, phase: -1.3, depth: .55, ax: "-4%", ay: "2%", bx: "5%", by: "-1%", tilt: ".6deg" },
  { name: "crowd", w: 498, h: 318, x: 800, y: 125, size: 480, z: 3, duration: 8.4, phase: -4.2, depth: .7, ax: "5%", ay: "-5%", bx: "-3%", by: "4%", tilt: "-.8deg" },
  { name: "pumpkin", w: 429, h: 407, x: 15, y: 440, size: 470, z: 4, duration: 6.8, phase: -2.4, depth: 1.1, ax: "6%", ay: "-3%", bx: "-3%", by: "3%", tilt: "-.9deg" },
  { name: "interior", w: 597, h: 316, x: 1030, y: 460, size: 550, z: 5, duration: 7.8, phase: -5.1, depth: .8, ax: "-3%", ay: "5%", bx: "2%", by: "-4%", tilt: ".7deg" },
  { name: "merchandise", w: 464, h: 367, x: 880, y: 775, size: 470, z: 6, duration: 8.8, phase: -1.7, depth: 1, ax: "5%", ay: "-4%", bx: "-4%", by: "2%", tilt: "-.6deg" },
  { name: "display", w: 495, h: 334, x: 425, y: 825, size: 495, z: 7, duration: 5.9, phase: -3.8, depth: 1.25, ax: "-5%", ay: "-3%", bx: "6%", by: "-5%", tilt: ".9deg" },
];

export function CastlePreview({ image }: { image: ProjectImage }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduced = useReducedMotion();
  const { paused } = useHomepageMotion();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);
  const enteredOnce = useRef(false);
  const controls = useRef<ReturnType<typeof animate>[]>([]);
  const activeRef = useRef(false);
  const active = ready && !failed && visible && !paused && reduced === false;

  useEffect(() => {
    const root = scope.current;
    if (!root) return;
    let disposed = false;
    let intersects = false;
    const update = () => setVisible(intersects && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersects = entry.isIntersecting;
      update();
    }, { threshold: .02 });
    observer.observe(root);
    document.addEventListener("visibilitychange", update);
    const images = [...root.querySelectorAll<HTMLImageElement>("img")];
    void Promise.allSettled(images.map(img => img.decode())).then(() => {
      if (disposed) return;
      const loaded = images.every(img => img.complete && img.naturalWidth > 0);
      setFailed(!loaded);
      setReady(loaded);
    });
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [scope]);

  useEffect(() => {
    if (!ready || failed || reduced !== false || enteredOnce.current) return;
    let disposed = false;
    const elements = [...scope.current.querySelectorAll<HTMLElement>(".castle-enter")];
    const sequence = elements.map((element, index) => {
      const control = animate(element, { opacity: [0, 1], y: [14, 0], scale: [.95, 1] }, {
        duration: index ? .8 : .65,
        delay: index * .14,
        ease: [.22, 1, .36, 1],
      });
      if (!activeRef.current) control.pause();
      return control;
    });
    controls.current = sequence;
    void Promise.all(sequence).then(() => {
      if (disposed) return;
      controls.current = [];
      enteredOnce.current = true;
      setEntered(true);
    });
    return () => {
      disposed = true;
      sequence.forEach(control => control.stop());
      controls.current = [];
      elements.forEach(element => {
        element.style.removeProperty("opacity");
        element.style.removeProperty("transform");
      });
    };
  }, [animate, failed, ready, reduced, scope]);

  useEffect(() => {
    activeRef.current = active;
    // As with the existing Work reveals, pausing before arrival must still
    // expose the artwork instead of leaving an unseen entrance at opacity 0.
    controls.current.forEach(control => paused ? control.complete() : active ? control.play() : control.pause());
    if (!active && scope.current) {
      scope.current.style.setProperty("--castle-pointer-x", "0px");
      scope.current.style.setProperty("--castle-pointer-y", "0px");
    }
  }, [active, paused, ready, reduced, scope]);

  return (
    <div ref={scope} className="castle-preview" role="img" aria-label={image.alt}
      data-collage-mode={failed ? "static-fallback" : "layered"}
      data-ready={ready} data-active={active} data-floating={active && entered}
      onPointerMove={event => {
        if (!active || event.pointerType !== "mouse" || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--castle-pointer-x", `${((event.clientX - rect.left) / rect.width - .5) * 10}px`);
        event.currentTarget.style.setProperty("--castle-pointer-y", `${((event.clientY - rect.top) / rect.height - .5) * 8}px`);
      }}
      onPointerLeave={event => {
        event.currentTarget.style.setProperty("--castle-pointer-x", "0px");
        event.currentTarget.style.setProperty("--castle-pointer-y", "0px");
      }}
    >
      {failed ? <Image src={image.src} alt="" fill sizes="(max-width: 900px) 95vw, 48vw" /> : (
        <div className="castle-scene" aria-hidden="true">
          <div className="castle-logo castle-enter">
            <div className="castle-logo-pulse">
              <Image src={`${base}logo.png`} alt="" width={370} height={200} loading="eager" sizes="25vw" />
            </div>
          </div>
          {photos.map(photo => (
            <div className={`castle-photo castle-photo-${photo.name}`} key={photo.name}
              style={{ left: `${photo.x / 16}%`, top: `${photo.y / 12}%`, width: `${photo.size / 16}%`, aspectRatio: `${photo.w} / ${photo.h}`, zIndex: photo.z,
                "--castle-duration": `${photo.duration}s`, "--castle-phase": `${photo.phase}s`, "--castle-depth": photo.depth,
                "--castle-a-x": photo.ax, "--castle-a-y": photo.ay, "--castle-b-x": photo.bx, "--castle-b-y": photo.by, "--castle-tilt": photo.tilt,
              } as CSSProperties}>
              <div className="castle-arrange"><div className="castle-parallax"><div className="castle-float"><div className="castle-enter">
                <Image src={`${base}event-${photo.name}.png`} alt="" width={photo.w} height={photo.h} loading="eager" sizes="(max-width: 900px) 33vw, 17vw" />
              </div></div></div></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
