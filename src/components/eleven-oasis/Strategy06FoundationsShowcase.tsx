"use client";

import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { FoundationsScenes } from "./FoundationsScenes";
import { buildFoundationsTimeline, foundationScenes } from "./foundationsTimeline";
import "./PdpUxDecisionsCarousel.css";
import "./Strategy06FoundationsShowcase.css";

type Playback = "loading" | "playing" | "paused" | "reduced" | "error";
type Commands = { sync: () => void; toggle: () => void; choose: (index: number) => void };

export function Strategy06FoundationsShowcase({ active }: { active: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const gates = useRef({ active, visible: false, paused: false });
  const commands = useRef<Commands>({ sync: () => {}, toggle: () => {}, choose: () => {} });
  const touch = useRef<{ x: number; y: number } | null>(null);
  const [selected, setSelected] = useState(0);
  const [playback, setPlayback] = useState<Playback>("loading");
  const helpId = useId();

  useEffect(() => { gates.current.active = active; commands.current.sync(); }, [active]);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let disposed = false;
    let ready = false;
    let failed = false;
    let chapter = -1;
    let master: gsap.core.Timeline | undefined;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const publish = () => {
      if (!master || disposed) return;
      const time = master.time();
      const next = Math.min(3, Math.floor(time / 3));
      element.dataset.time = time.toFixed(4);
      element.style.setProperty("--pdp-progress", String((time % 3) / 3));
      if (chapter !== next) { chapter = next; setSelected(next); }
    };
    const context = gsap.context(() => { master = buildFoundationsTimeline(element, publish); }, element);
    const sync = () => {
      if (disposed) return;
      const allowed = ready && !failed && gates.current.active && gates.current.visible && !gates.current.paused && !document.hidden && !preference.matches;
      if (allowed) master!.play();
      else master!.pause();
      setPlayback(failed ? "error" : !ready ? "loading" : preference.matches ? "reduced" : allowed ? "playing" : "paused");
    };
    commands.current = {
      sync,
      toggle: () => { if (!ready || failed || preference.matches) return; gates.current.paused = !gates.current.paused; sync(); },
      choose: index => {
        const scene = foundationScenes[((index % 4) + 4) % 4];
        master!.pause().seek(gates.current.paused || preference.matches ? scene.pose : scene.start, true);
        publish();
        sync();
      },
    };
    const onPreference = () => {
      if (preference.matches) master!.seek(foundationScenes[Math.max(0, chapter)].pose, true);
      publish();
      sync();
    };
    const observer = new IntersectionObserver(entries => {
      gates.current.visible = entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= .15);
      sync();
    }, { threshold: .15 });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    preference.addEventListener("change", onPreference);
    const images = [...new Set([...element.querySelectorAll("img")].map(image => image.getAttribute("src")!))];
    void Promise.all([
      ...images.map(src => { const image = new window.Image(); image.src = src; return image.decode(); }),
      document.fonts.load('600 32px "EO Foundations Oswald"'),
      document.fonts.load('400 14px "EO Foundations Open Sans"'),
      document.fonts.load('600 24px "EO Foundations Open Sans"'),
    ]).then(() => { if (!disposed) { ready = true; if (preference.matches) master!.seek(foundationScenes[0].pose, true); publish(); sync(); } })
      .catch(() => { if (!disposed) { failed = true; sync(); } });
    publish();
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      preference.removeEventListener("change", onPreference);
      commands.current = { sync: () => {}, toggle: () => {}, choose: () => {} };
      context.revert();
    };
  }, []);

  const scene = foundationScenes[selected];
  return <div ref={root} className="eo-foundations" data-playback={playback} data-scene={scene.id}
    role="region" aria-roledescription="carousel" aria-label="Design foundations" onKeyDown={event => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); commands.current.choose(selected + (event.key === "ArrowRight" ? 1 : -1)); }
    }}>
    <div className="eo-foundations-stage" onPointerDown={event => {
      if (event.pointerType === "touch") touch.current = { x: event.clientX, y: event.clientY };
    }} onPointerUp={event => {
      const start = touch.current; touch.current = null;
      if (!start || event.pointerType !== "touch") return;
      const dx = event.clientX - start.x, dy = event.clientY - start.y;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) commands.current.choose(selected + (dx < 0 ? 1 : -1));
    }} onPointerCancel={() => { touch.current = null; }}>
      <header className="eo-foundations-header"><h4>{scene.title}</h4><p>{scene.subtitle}</p></header>
      <div className="eo-foundations-canvas"><FoundationsScenes selected={selected} /></div>
    </div>
    <div className="eleven-pdp-carousel-controls">
      <div className="eleven-pdp-carousel-dots" role="group" aria-label="Choose a design foundation scene">
        {foundationScenes.map((item, index) => <button type="button" key={item.id} aria-label={item.title} aria-current={selected === index ? "true" : undefined} onClick={() => commands.current.choose(index)}>
          <span className="eleven-pdp-indicator" aria-hidden="true"><span className="eleven-pdp-progress-fill" /></span>
        </button>)}
      </div>
      <button type="button" className="eleven-pdp-carousel-toggle" aria-label={playback === "playing" ? "Pause design foundations" : "Play design foundations"}
        disabled={["loading", "reduced", "error"].includes(playback)} aria-describedby={playback === "reduced" ? helpId : undefined} onClick={() => commands.current.toggle()}>
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="currentColor">{playback === "playing" ? <><rect x="4" y="3" width="2.5" height="10" rx=".6" /><rect x="9.5" y="3" width="2.5" height="10" rx=".6" /></> : <path d="M5 2.5 13 8 5 13.5Z" />}</svg>
      </button>
    </div>
    <span className="eo-foundations-status" aria-live="polite" aria-atomic="true">{scene.title}. {scene.subtitle}. {playback === "error" ? "Some presentation assets could not load." : ""}</span>
    {playback === "reduced" && <span className="eo-foundations-status" id={helpId}>Automatic motion is disabled. Use the four scene controls to explore the design foundations.</span>}
  </div>;
}
