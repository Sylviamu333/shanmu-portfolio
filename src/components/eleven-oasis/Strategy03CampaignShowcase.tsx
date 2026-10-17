"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { elevenCampaigns, type ElevenCampaign } from "@/data/eleven-oasis-strategy";
import "./Strategy03CampaignShowcase.css";

const CAMPAIGN_SCROLL = {
  hold: 1000,
  down: 22000,
  bottom: 1500,
  back: 3000,
  ease: "cubic-bezier(.45, 0, .55, 1)",
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
  const [playback, setPlayback] = useState<Playback>("loading");

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const frames = [...element.querySelectorAll<HTMLDivElement>(".eleven-campaign-viewport")];
    const pictures = [...element.querySelectorAll<HTMLImageElement>(".eleven-campaign-image")];
    if (pictures.length !== elevenCampaigns.length || frames.length !== pictures.length) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const animations: Animation[] = [];
    const hovered = new Set<string>();
    let disposed = false;
    let requested = false;
    let decoded = false;
    let visible = false;
    let userPaused = false;
    let failed = false;
    let running = false;
    let pausedTime = 0;

    const clock = () => running ? Number(animations[0]?.currentTime ?? pausedTime) : pausedTime;
    const pauseAt = (time: number) => {
      animations.forEach(animation => {
        animation.pause();
        animation.currentTime = time;
      });
      pausedTime = time;
      running = false;
    };
    const playAt = (time: number) => {
      // Both effects use the same document timeline origin, including resumes.
      const startTime = Number(document.timeline.currentTime ?? 0) - time;
      animations.forEach(animation => {
        animation.play();
        animation.startTime = startTime;
      });
      pausedTime = time;
      running = true;
    };
    const update = (restart = false) => {
      if (disposed) return;
      const time = restart ? 0 : clock();
      if (restart) userPaused = false;
      if (selected.current && visible && !requested) load();
      const allowed = decoded && selected.current && visible && !document.hidden && !hovered.size && !userPaused && !reduced.matches && !failed;
      if (allowed) {
        if (!running || restart) playAt(time);
      } else if (running || restart) pauseAt(time);
      setPlayback(failed ? "error" : reduced.matches ? "reduced" : !decoded ? "loading" : allowed ? "playing" : "paused");
    };
    const measure = () => {
      if (!decoded || disposed) return;
      const { hold, down, bottom, back, ease } = CAMPAIGN_SCROLL;
      const duration = hold + down + bottom + back;
      pictures.forEach((picture, index) => {
        const distance = Math.max(0, picture.getBoundingClientRect().height - frames[index].getBoundingClientRect().height);
        frames[index].dataset.scrollDistance = String(distance);
        const top = "translate3d(0, 0px, 0)";
        const end = `translate3d(0, ${-distance}px, 0)`;
        const keyframes = [
          { transform: top, offset: 0 },
          { transform: top, offset: hold / duration, easing: ease },
          { transform: end, offset: (hold + down) / duration },
          { transform: end, offset: (hold + down + bottom) / duration, easing: ease },
          { transform: top, offset: 1 },
        ];
        // Only distance differs. Duration, easing and normalized progress match.
        if (animations[index]) (animations[index].effect as KeyframeEffect).setKeyframes(keyframes);
        else {
          const animation = picture.animate(keyframes, { duration, iterations: Infinity });
          animation.pause();
          animation.currentTime = pausedTime;
          animations.push(animation);
        }
      });
      update();
    };
    function load() {
      requested = true;
      pictures.forEach(picture => { picture.loading = "eager"; });
      // Never allow image decoding or lazy-loading to stagger the two starts.
      void Promise.all(pictures.map(picture => picture.decode())).then(() => {
        if (disposed) return;
        decoded = true;
        measure();
      }).catch(() => {
        if (!disposed) { failed = true; update(); }
      });
    }

    synchronize.current = update;
    hover.current = (id, value) => {
      if (value) hovered.add(id);
      else hovered.delete(id);
      update();
    };
    toggle.current = () => {
      userPaused = running;
      if (!userPaused) hovered.clear();
      update();
    };
    const preference = () => update(true);
    const visibility = () => update();
    // One visibility gate for the pair, including the stacked mobile layout.
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
      animations.forEach(animation => animation.cancel());
      observer.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", preference);
      synchronize.current = () => {};
      hover.current = () => {};
      toggle.current = () => {};
    };
  }, []);

  useEffect(() => {
    selected.current = active;
    synchronize.current(active);
  }, [active]);

  return <div ref={root} className="eleven-campaign-visual" aria-label="Two campaign experiences">
    <div className="eleven-campaign-browser-grid">
      {elevenCampaigns.map(campaign => <CampaignBrowser key={campaign.id} campaign={campaign} playback={playback}
        onHover={(id, value) => hover.current(id, value)} onToggle={() => toggle.current()} />)}
    </div>
  </div>;
}
