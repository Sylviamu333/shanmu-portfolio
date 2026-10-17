"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { elevenCampaigns, type ElevenCampaign } from "@/data/eleven-oasis-strategy";
import "./Strategy03CampaignShowcase.css";

function CampaignBrowser({ campaign, active }: { campaign: ElevenCampaign; active: boolean }) {
  const viewport = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const selected = useRef(active);
  const synchronize = useRef((restart = false) => { void restart; });
  const hover = useRef((value: boolean) => { void value; });
  const toggle = useRef(() => {});
  const [playback, setPlayback] = useState("loading");

  useEffect(() => {
    const frame = viewport.current;
    const picture = image.current;
    if (!frame || !picture) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let animation: Animation | null = null;
    let disposed = false;
    let decoded = false;
    let visible = false;
    let hovered = false;
    let userPaused = false;
    let failed = false;
    const update = (restart = false) => {
      if (disposed) return;
      if (restart) {
        userPaused = false;
        if (animation) animation.currentTime = 0;
      }
      const allowed = selected.current && visible && !document.hidden && !hovered && !userPaused && !reduced.matches && !failed;
      if (animation && allowed) animation.play();
      else animation?.pause();
      setPlayback(failed ? "error" : reduced.matches ? "reduced" : !decoded ? "loading" : allowed ? "playing" : "paused");
    };
    const measure = () => {
      if (!decoded || disposed) return;
      const distance = Math.max(0, picture.getBoundingClientRect().height - frame.getBoundingClientRect().height);
      frame.dataset.scrollDistance = String(distance);
      const { hold, down, bottom, back } = campaign.timing;
      const duration = hold + down + bottom + back;
      const top = "translate3d(0, 0px, 0)";
      const end = `translate3d(0, ${-distance}px, 0)`;
      const keyframes = [
        { transform: top, offset: 0 },
        { transform: top, offset: hold / duration, easing: "cubic-bezier(.45, 0, .55, 1)" },
        { transform: end, offset: (hold + down) / duration },
        { transform: end, offset: (hold + down + bottom) / duration, easing: "cubic-bezier(.45, 0, .55, 1)" },
        { transform: top, offset: 1 },
      ];
      // Resize changes the travel, not the current phase or animation count.
      if (animation) (animation.effect as KeyframeEffect).setKeyframes(keyframes);
      else {
        animation = picture.animate(keyframes, { duration, iterations: Infinity });
        animation.pause();
        animation.currentTime = 0;
      }
      update();
    };
    synchronize.current = update;
    hover.current = value => { hovered = value; update(); };
    toggle.current = () => {
      userPaused = animation?.playState === "running";
      if (!userPaused) hovered = false;
      update();
    };
    const preference = () => {
      if (animation) animation.currentTime = 0;
      update();
    };
    const visibility = () => update();
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && selected.current) picture.loading = "eager";
      update();
    });
    observer.observe(frame);
    const resize = new ResizeObserver(measure);
    resize.observe(frame);
    resize.observe(picture);
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", preference);
    void picture.decode().then(() => {
      if (disposed) return;
      decoded = true;
      measure();
    }).catch(() => {
      if (!disposed) { failed = true; update(); }
    });
    return () => {
      disposed = true;
      animation?.cancel();
      observer.disconnect();
      resize.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", preference);
      synchronize.current = () => {};
      hover.current = () => {};
      toggle.current = () => {};
    };
  }, [campaign]);

  useEffect(() => {
    selected.current = active;
    synchronize.current(active);
  }, [active]);

  return <figure className="eleven-campaign-browser" data-campaign={campaign.id} data-playback={playback}>
    <figcaption>{campaign.label}</figcaption>
    <div ref={viewport} className="eleven-campaign-viewport" role="group" aria-label={`${campaign.name} campaign preview`}
      onPointerEnter={event => { if (event.pointerType === "mouse") hover.current(true); }}
      onPointerLeave={event => { if (event.pointerType === "mouse") hover.current(false); }}>
      <Image ref={image} className="eleven-campaign-image" src={campaign.image.src} alt={campaign.image.alt}
        width={campaign.image.width} height={campaign.image.height}
        sizes="(max-width:700px) 88vw, (max-width:950px) 44vw, 32vw" />
    </div>
    <button type="button" className="eleven-campaign-playback" disabled={["loading", "reduced", "error"].includes(playback)}
      aria-label={playback === "reduced" ? `${campaign.name} scrolling disabled by reduced motion preference` : `${playback === "playing" ? "Pause" : "Resume"} ${campaign.name} campaign preview`}
      onClick={() => toggle.current()}>
      {playback === "reduced" ? "Still preview" : playback === "error" ? "Preview unavailable" : playback === "playing" ? "Pause preview" : "Resume preview"}
    </button>
  </figure>;
}

export function Strategy03CampaignShowcase({ active }: { active: boolean }) {
  return <div className="eleven-campaign-visual" aria-label="Two campaign experiences">
    <div className="eleven-campaign-browser-grid">
      {elevenCampaigns.map(campaign => <CampaignBrowser key={campaign.id} campaign={campaign} active={active} />)}
    </div>
  </div>;
}
