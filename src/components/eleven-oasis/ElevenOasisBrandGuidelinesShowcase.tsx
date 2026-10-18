"use client";

import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { ImageGallery } from "@/components/ImageGallery";
import { brandChapterAt, brandChapters, brandDocument, brandPages } from "@/data/eleven-oasis-branding";
import { ElevenOasisBrandArtboard } from "./ElevenOasisBrandArtboard";
import { buildBrandGuidelinesTimeline } from "./brandGuidelinesTimeline";
import "./ElevenOasisBrandGuidelinesShowcase.css";

type Playback = "loading" | "playing" | "paused" | "reduced" | "error";
type Commands = { toggle: () => void; chapter: (index: number) => void; modal: (open: boolean) => void };

export function ElevenOasisBrandGuidelinesShowcase({ active }: { active: boolean }) {
  return <BrandSession key={active ? "active" : "inactive"} active={active} />;
}

function BrandSession({ active }: { active: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const saved = useRef({ time: 0, userPaused: false, modal: false });
  const commands = useRef<Commands>({ toggle: () => {}, chapter: () => {}, modal: () => {} });
  const [compact, setCompact] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [playback, setPlayback] = useState<Playback>("loading");
  const [readerOpen, setReaderOpen] = useState(false);
  const helpId = useId();

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const measure = () => setCompact(element.getBoundingClientRect().width < 600);
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    measure();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = root.current;
    const svg = element?.querySelector<SVGSVGElement>("svg.eleven-brand-artboard");
    if (!element || !svg) return;
    const session = saved.current;
    let disposed = false;
    let ready = false;
    let failed = false;
    let visible = false;
    let currentChapter = -1;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let master: gsap.core.Timeline;
    const publish = () => {
      if (!master) return;
      const time = master.time();
      element.dataset.time = time.toFixed(4);
      const next = brandChapterAt(time);
      if (next !== currentChapter) { currentChapter = next; setChapter(next); }
    };
    const context = gsap.context(() => { master = buildBrandGuidelinesTimeline(svg, compact, publish); }, svg);
    const update = () => {
      if (disposed) return;
      const allowed = active && ready && visible && !document.hidden && !session.userPaused && !session.modal && !preference.matches && !failed;
      if (allowed) master.play();
      else master.pause();
      setPlayback(failed ? "error" : !ready ? "loading" : preference.matches ? "reduced" : allowed ? "playing" : "paused");
    };
    master!.seek(session.time, true);
    publish();
    commands.current = {
      toggle: () => {
        if (preference.matches || !ready || failed) return;
        session.userPaused = !session.userPaused;
        update();
      },
      chapter: index => {
        const target = brandChapters[index];
        if (!target) return;
        const time = preference.matches || session.userPaused ? target.pose : target.start;
        master.pause().seek(time, true);
        session.time = time;
        publish();
        update();
      },
      modal: open => { session.modal = open; update(); },
    };
    const onPreference = () => {
      if (preference.matches && master.time() < .1) master.seek(brandChapters[0].pose, true);
      publish();
      update();
    };
    const observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= .15);
      update();
    }, { threshold: .15 });
    observer.observe(element);
    preference.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", update);
    // Decode the small on-canvas assets once. Full reader pages load only when requested.
    const urls = [...new Set([...svg.querySelectorAll("image")].map(image => image.getAttribute("href")!))];
    void Promise.all(urls.map(src => {
      const image = new window.Image();
      image.src = src;
      return image.decode();
    })).then(() => {
      if (disposed) return;
      ready = true;
      if (preference.matches && master.time() < .1) master.seek(brandChapters[0].pose, true);
      publish();
      update();
    }).catch(() => {
      if (!disposed) { failed = true; update(); }
    });
    return () => {
      disposed = true;
      session.time = master.time();
      observer.disconnect();
      preference.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", update);
      commands.current = { toggle: () => {}, chapter: () => {}, modal: () => {} };
      context.revert();
    };
  }, [active, compact]);

  useEffect(() => {
    if (!readerOpen) return;
    const overflow = document.body.style.overflow;
    const padding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbar) document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbar}px`;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; document.body.style.paddingRight = padding; };
  }, [readerOpen]);

  const selected = brandChapters[chapter];
  return <div ref={root} className="eleven-brand-showcase" data-compact={compact} data-playback={playback} data-chapter={selected.id}>
    <ImageGallery images={brandPages} onOpenChange={open => { commands.current.modal(open); setReaderOpen(open); }} renderPreview={open => <>
      <button type="button" className="eleven-brand-stage" aria-haspopup="dialog" aria-label={`Enlarge ${selected.title} guideline pages`}
        onClick={event => open(selected.page - 1, event.currentTarget)}>
        <ElevenOasisBrandArtboard compact={compact} />
        <span className="eleven-brand-reader-hint">View guideline</span>
      </button>
      <div className="eleven-brand-controls" role="group" aria-label="Brand guideline presentation controls">
        <button type="button" className="eleven-brand-toggle" aria-label={playback === "playing" ? "Pause brand presentation" : "Play brand presentation"}
          disabled={["loading", "error", "reduced"].includes(playback)} aria-describedby={playback === "reduced" ? helpId : undefined} onClick={() => commands.current.toggle()}>
          <svg viewBox="0 0 16 16" width="13" height="13" fill="currentColor" aria-hidden="true">
            {playback === "playing" ? <><rect x="4" y="3" width="2.5" height="10" rx=".6" /><rect x="9.5" y="3" width="2.5" height="10" rx=".6" /></> : <path d="M5 2.5 13 8 5 13.5Z" />}
          </svg>
        </button>
        <div className="eleven-brand-chapters" role="group" aria-label="Choose a brand guideline chapter">
          {brandChapters.map((item, index) => <button type="button" key={item.id} aria-label={`${String(index + 1).padStart(2, "0")} / ${item.title}`}
            aria-current={chapter === index ? "true" : undefined} onClick={() => commands.current.chapter(index)}>
            <span>{String(index + 1).padStart(2, "0")}</span><span className="eleven-brand-chapter-name">{item.label}</span>
          </button>)}
        </div>
        <a className="eleven-brand-open" href={brandDocument.src} target="_blank" rel="noreferrer" aria-label="Open original 20-page brand guideline PDF in a new tab">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M9 3h4v4m0-4L7 9M7 3H3v10h10V9" /></svg>
        </a>
      </div>
    </>} />
    <span className="eleven-brand-sr" aria-live="polite" aria-atomic="true">{selected.title}. {chapter === 4 ? "Your personality, amplified." : ""} {playback === "error" ? "Some artwork could not load. The complete guideline reader remains available." : ""}</span>
    {playback === "reduced" && <span id={helpId} className="eleven-brand-sr">Automatic motion is disabled. Select a chapter or open the complete guideline to read its pages.</span>}
  </div>;
}
