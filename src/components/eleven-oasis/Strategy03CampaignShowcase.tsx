"use client";

import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { elevenCampaigns, type ElevenCampaign } from "@/data/eleven-oasis-strategy";
import "./Strategy03CampaignShowcase.css";

const CAMPAIGN_SCROLL = {
  topHold: 1.5,
  down: 20,
  bottomHold: 1.5,
  back: 3,
  endHold: 1.5,
} as const;

type Playback = "loading" | "playing" | "paused" | "reduced" | "error";

function CampaignBrowser({ campaign, playback, onHover, onToggle }: {
  campaign: ElevenCampaign;
  playback: Playback;
  onHover: (id: string, value: boolean) => void;
  onToggle: () => void;
}) {
  return <figure className="eleven-campaign-browser" data-campaign={campaign.id} data-playback={playback}>
    <figcaption>{campaign.label}</figcaption>
    <div className="eleven-campaign-viewport" role="group" aria-label={`${campaign.name} campaign preview`}
      onPointerEnter={event => { if (event.pointerType === "mouse") onHover(campaign.id, true); }}
      onPointerLeave={event => { if (event.pointerType === "mouse") onHover(campaign.id, false); }}>
      <Image className="eleven-campaign-image" src={campaign.image.src} alt={campaign.image.alt}
        width={campaign.image.width} height={campaign.image.height}
        sizes="(max-width:700px) 88vw, (max-width:950px) 44vw, 32vw" />
    </div>
    <button type="button" className="eleven-campaign-playback" disabled={["loading", "reduced", "error"].includes(playback)}
      aria-label={playback === "reduced" ? `${campaign.name} scrolling disabled by reduced motion preference` : `${playback === "playing" ? "Pause" : "Resume"} ${campaign.name} campaign preview`}
      onClick={onToggle}>
      {playback === "reduced" ? "Still preview" : playback === "error" ? "Preview unavailable" : playback === "playing" ? "Pause preview" : "Resume preview"}
    </button>
  </figure>;
}

export function Strategy03CampaignShowcase({ active }: { active: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const selected = useRef(active);
  const synchronize = useRef((restart = false) => { void restart; });
  const hover = useRef((id: string, value: boolean) => { void id; void value; });
  const toggle = useRef(() => {});
  const leave = useRef(() => {});
  const [playback, setPlayback] = useState<Playback>("loading");

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const frames = [...element.querySelectorAll<HTMLDivElement>(".eleven-campaign-viewport")];
    const pictures = [...element.querySelectorAll<HTMLImageElement>(".eleven-campaign-image")];
    if (pictures.length !== elevenCampaigns.length || frames.length !== pictures.length) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const progress = { value: 0 };
    let distances = pictures.map(() => 0);
    let master: gsap.core.Timeline | null = null;
    let disposed = false;
    let requested = false;
    let decoded = false;
    let visible = false;
    let userPaused = false;
    let hovered = false;
    let failed = false;

    const render = () => {
      // One scalar is sampled once and applied to both images in the same frame.
      const value = Math.max(0, Math.min(1, progress.value));
      pictures.forEach((picture, index) => {
        picture.style.transform = `translate3d(0, ${-distances[index] * value}px, 0)`;
      });
    };
    const update = (restart = false) => {
      if (disposed) return;
      if (restart) {
        userPaused = false;
        master?.pause(0);
        progress.value = 0;
        render();
      }
      if (selected.current && visible && !requested) load();
      const allowed = decoded && selected.current && visible && !document.hidden && !hovered && !userPaused && !reduced.matches && !failed;
      if (allowed) master?.play();
      else master?.pause();
      setPlayback(failed ? "error" : reduced.matches ? "reduced" : !decoded ? "loading" : allowed ? "playing" : "paused");
    };
    const measure = () => {
      if (!decoded || disposed) return;
      distances = pictures.map((picture, index) => {
        const distance = Math.max(0, picture.getBoundingClientRect().height - frames[index].getBoundingClientRect().height);
        frames[index].dataset.scrollDistance = String(distance);
        return distance;
      });
      if (!master) {
        const { topHold, down, bottomHold, back, endHold } = CAMPAIGN_SCROLL;
        // Animate only the shared scalar. Neither image owns an animation.
        master = gsap.timeline({ paused: true, repeat: -1, onUpdate: render })
          .to(progress, { value: 0, duration: topHold, ease: "none" })
          .to(progress, { value: 1, duration: down, ease: "none" })
          .to(progress, { value: 1, duration: bottomHold, ease: "none" })
          .to(progress, { value: 0, duration: back, ease: "power1.inOut" })
          .to(progress, { value: 0, duration: endHold, ease: "none" });
      }
      // Resizing changes distances only; the master phase remains untouched.
      render();
      update();
    };
    function load() {
      requested = true;
      pictures.forEach(picture => { picture.loading = "eager"; });
      void Promise.all(pictures.map(picture => picture.decode())).then(() => {
        if (disposed) return;
        decoded = true;
        measure();
      }).catch(() => {
        if (!disposed) { failed = true; update(); }
      });
    }

    synchronize.current = update;
    hover.current = (_id, value) => {
      if (value) { hovered = true; update(); }
    };
    // Leaving a single window does not resume: the pointer must leave the pair.
    leave.current = () => { hovered = false; update(); };
    toggle.current = () => {
      userPaused = master ? !master.paused() : false;
      if (!userPaused) hovered = false;
      update();
    };
    const preference = () => update(true);
    const visibility = () => update();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    const resize = new ResizeObserver(measure);
    [...frames, ...pictures].forEach(target => resize.observe(target));
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", preference);

    return () => {
      disposed = true;
      master?.kill();
      observer.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", preference);
      pictures.forEach(picture => { picture.style.removeProperty("transform"); });
      synchronize.current = () => {};
      hover.current = () => {};
      toggle.current = () => {};
      leave.current = () => {};
    };
  }, []);

  useEffect(() => {
    selected.current = active;
    synchronize.current(active);
  }, [active]);

  return <div ref={root} className="eleven-campaign-visual" aria-label="Two campaign experiences"
    onPointerLeave={event => { if (event.pointerType === "mouse") leave.current(); }}>
    <div className="eleven-campaign-browser-grid">
      {elevenCampaigns.map(campaign => <CampaignBrowser key={campaign.id} campaign={campaign} playback={playback}
        onHover={(id, value) => hover.current(id, value)} onToggle={() => toggle.current()} />)}
    </div>
  </div>;
}
