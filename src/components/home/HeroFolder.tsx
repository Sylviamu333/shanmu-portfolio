"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { useHomepageMotion } from "./HomeMotion";
import "./HeroFolder.css";

const original = "/hero/hero-foreground.webp";
const resting = "/hero/hero-resting-foreground.webp";
const layers = ["memoji-rest", "memoji-blink", "memoji-notice"].map(
  (name) => `/hero/${name}.webp`,
);
// Coordinates are measured against the exact uploaded 1785 × 881 image.
// The glass folder and tool cards are never used as facial-animation layers.
const headOutline =
  "M938 169C963 162 1026 178 1061 196L1064 220C1082 242 1084 282 1074 320L1066 430L1008 432L971 433L952 418L905 405L886 399L891 345L890 307C889 269 902 240 920 215Z";
const handOutline =
  "M862 250Q867 242 876 247Q883 250 882 263L881 283Q894 295 888 319L880 343L876 402L831 403L832 349Q823 328 826 304Q824 286 840 282Q847 270 859 281Z";
const bulbOutline =
  "M929 24H1139V153L1103 190L1080 190L1067 155L1046 174L1007 175L984 157L978 145L940 147L937 128L970 115L929 111Z";
const foreground =
  "M810 402L948 409L957 516L805 510Z M967 423L1110 434L1100 538L955 515Z M1086 310L1245 325L1239 445L1068 433Z";

// Only this card has a complete visible boundary in the flattened artwork.
// Its revealed backing reuses a neighboring strip of the same pink paper.
// Occluded tool bases are not invented; the other icons and folder stay intact.
const toolCard = "M731 164L820 160Q858 161 860 198L863 276Q863 302 835 309L746 314Q712 316 706 284L701 203Q698 175 731 164Z";

export function HeroFolder() {
  const id = useId().replaceAll(":", "");
  const root = useRef<HTMLDivElement>(null);
  const playRef = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const { paused } = useHomepageMotion();
  const pausedRef = useRef(paused);
  const availabilityRef = useRef<() => void>(() => {});
  useEffect(() => {
    pausedRef.current = paused;
    availabilityRef.current();
  }, [paused]);

  useEffect(() => {
    let cancelled = false;
    // Decode transparent foregrounds and facial states before changing poses.
    void Promise.all(
      [original, resting, ...layers].map(async (src) => {
        const image = new window.Image();
        image.src = src;
        await image.decode();
      }),
    )
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        // A failed state asset keeps the transparent original-pose fallback.
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const element = root.current;
    if (!element || !ready) return;
    const find = (selector: string) => element.querySelector<SVGElement>(selector)!;
    const head = find(".folder-character-head");
    const rest = find(".folder-face-rest");
    const blink = find(".folder-face-blink");
    const notice = find(".folder-face-notice");
    const happy = find(".folder-face-happy");
    const hand = find(".folder-character-hand");
    const bulb = find(".folder-bulb");
    const glow = find(".folder-bulb-glow");
    const rays = find(".folder-bulb-rays");
    const sparks = [...element.querySelectorAll<SVGElement>(".folder-idea-spark")];
    const card = find(".folder-content-card");
    const parallax = element.querySelector<HTMLElement>(".folder-depth")!;
    const button = element.querySelector<HTMLButtonElement>(".folder-character-trigger")!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let idle: gsap.core.Timeline | null = null;
    let hovering = false;
    let focused = false;
    let visible = true;
    let active = false;
    let disposed = false;
    let blinks = 0;

    gsap.set([blink, notice, happy, hand, bulb, glow, rays, ...sparks], { opacity: 0 });
    gsap.set(rest, { opacity: 1 });
    gsap.set(head, { svgOrigin: "985 390" });
    gsap.set(hand, { y: 65, rotation: 10, scale: .86, svgOrigin: "853 401" });
    gsap.set(bulb, { y: 15, scale: .8, svgOrigin: "1036 135" });
    gsap.set(rays, { scale: .75, svgOrigin: "1038 104" });
    gsap.set(sparks, { scale: .4, transformOrigin: "50% 50%" });

    // One reversible timeline holds the idea pose until the stable hit area is
    // left. Reversing mid-flight never resets poses or queues another animation.
    const reaction = gsap.timeline({
      paused: true,
      onUpdate: () => {
        element.dataset.expression = reaction.progress() === 0 ? "idle"
          : reaction.reversed() ? "returning"
          : reaction.progress() === 1 ? "holding" : "happy";
      },
      onReverseComplete: () => {
        element.dataset.expression = "idle";
        scheduleBlink();
      },
    });
    reaction
      .to(card, { y: -82, rotation: -3, svgOrigin: "780 310", duration: .56, ease: "back.out(1.25)" }, 0)
      .to(head, { y: -52, rotation: -1, scale: 1.01, duration: .56, ease: "back.out(1.2)" }, .08)
      .to(notice, { opacity: 1, duration: .14 }, .08)
      .to(happy, { opacity: 1, duration: .18 }, .22)
      .to(hand, { opacity: 1, y: -30, rotation: 0, scale: 1, duration: .5, ease: "back.out(1.3)" }, .22)
      .to(bulb, { opacity: 1, y: -62, scale: 1, duration: .4, ease: "back.out(1.4)" }, .3)
      .to(glow, { opacity: .75, y: -62, duration: .4, ease: "sine.inOut" }, .38)
      .to(rays, { opacity: .8, y: -62, scale: 1.06, duration: .35, ease: "sine.out" }, .45)
      .to(sparks, { opacity: .85, y: -62, scale: 1, duration: .22, stagger: .045, ease: "power2.out" }, .46);

    function scheduleBlink() {
      clearTimeout(idleTimer);
      if (disposed || active || pausedRef.current || reduced.matches || !visible || document.hidden) return;
      idleTimer = setTimeout(() => {
        if (active) return;
        blinks++;
        idle = gsap.timeline({ onComplete: scheduleBlink });
        idle.set(blink, { opacity: 1 }).to(blink, { opacity: 0, duration: .08 }, .13);
        if (blinks % 3 === 0)
          idle.to(happy, { opacity: 1, duration: .16 }, .4).to(happy, { opacity: 0, duration: .2 }, 1.05);
      }, 4000 + Math.random() * 3000);
    }
    const update = () => {
      clearTimeout(idleTimer);
      idle?.kill();
      idle = null;
      if (reaction.progress() === 0) gsap.set(happy, { opacity: 0 });
      gsap.set(blink, { opacity: 0 });
      if (pausedRef.current) {
        reaction.pause();
        gsap.killTweensOf(parallax);
        return;
      }
      const next = visible && !document.hidden && (hovering || focused);
      if (next !== active) {
        active = next;
        setAnnouncement(active ? "Aha! An idea." : "");
      }
      if (reduced.matches || !visible || document.hidden) {
        reaction.progress(next ? 1 : 0).pause();
        element.dataset.expression = next ? "holding" : "idle";
      } else if (next) {
        reaction.timeScale(1).play();
      } else {
        reaction.timeScale(1.25).reverse();
        if (reaction.progress() === 0) {
          gsap.set(happy, { opacity: 0 });
          scheduleBlink();
        }
      }
    };
    availabilityRef.current = update;
    const enter = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !fine.matches) return;
      hovering = true;
      update();
    };
    const leave = () => { hovering = false; update(); };
    const focus = () => { focused = button.matches(":focus-visible"); update(); };
    const blur = () => { focused = false; update(); };
    playRef.current = () => { focused = button.matches(":focus-visible"); update(); };
    const pointer = (event: PointerEvent) => {
      if (pausedRef.current || reduced.matches || event.pointerType !== "mouse") return;
      const bounds = element.getBoundingClientRect();
      gsap.to(parallax, {
        x: ((event.clientX - bounds.left) / bounds.width - .5) * 4,
        y: ((event.clientY - bounds.top) / bounds.height - .5) * 3,
        duration: .55, ease: "sine.out", overwrite: true,
      });
    };
    const resetParallax = () => {
      if (pausedRef.current) return;
      gsap.to(parallax, { x: 0, y: 0, duration: .65, ease: "sine.out", overwrite: true });
    };
    const availability = () => {
      hovering = fine.matches && button.matches(":hover");
      focused = button.matches(":focus-visible");
      update();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      availability();
    });
    observer.observe(element);
    button.addEventListener("pointerenter", enter);
    button.addEventListener("pointerleave", leave);
    button.addEventListener("focus", focus);
    button.addEventListener("blur", blur);
    element.addEventListener("pointermove", pointer, { passive: true });
    element.addEventListener("pointerleave", resetParallax);
    reduced.addEventListener("change", availability);
    fine.addEventListener("change", availability);
    document.addEventListener("visibilitychange", availability);
    availability();
    return () => {
      disposed = true;
      clearTimeout(idleTimer);
      idle?.kill();
      reaction.kill();
      gsap.killTweensOf(parallax);
      observer.disconnect();
      button.removeEventListener("pointerenter", enter);
      button.removeEventListener("pointerleave", leave);
      button.removeEventListener("focus", focus);
      button.removeEventListener("blur", blur);
      element.removeEventListener("pointermove", pointer);
      element.removeEventListener("pointerleave", resetParallax);
      reduced.removeEventListener("change", availability);
      fine.removeEventListener("change", availability);
      document.removeEventListener("visibilitychange", availability);
      playRef.current = () => {};
      availabilityRef.current = () => {};
    };
  }, [ready]);

  const clip = (name: string) => `url(#${id}-${name})`;
  const frame = (src: string, className?: string) => (
    <image
      href={src}
      width="1785"
      height="881"
      preserveAspectRatio="none"
      className={className}
    />
  );
  return (
    <div
      ref={root}
      className="hero-folder"
      data-ready={ready}
      data-expression="idle"
    >
      <div className="folder-interaction">
        <div className="folder-depth">
          <div className="folder-float">
            <Image
              src={ready ? resting : original}
              alt="Pink glass folder filled with creative tools and SHAN MU’s blonde Memoji."
              width={1785}
              height={881}
              sizes="(max-width: 700px) 90vw, (max-width: 1100px) 470px, 540px"
              priority
              className="folder-original"
            />
            <svg
              className="folder-layers"
              viewBox="0 0 1785 881"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <mask
                  id={`${id}-alpha`}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="1785"
                  height="881"
                  style={{ maskType: "alpha" }}
                >
                  {frame(original)}
                </mask>
                <clipPath id={`${id}-tool-card`}><path d={toolCard} /></clipPath>
                <clipPath id={`${id}-head`}>
                  <path d={headOutline} />
                </clipPath>
                <clipPath id={`${id}-hand`}>
                  <path d={handOutline} />
                </clipPath>
                <clipPath id={`${id}-bulb`}>
                  <path d={bulbOutline} />
                </clipPath>
                <clipPath id={`${id}-foreground`}>
                  <path d={foreground} />
                </clipPath>
                <radialGradient id={`${id}-warm`}>
                  <stop stopColor="#FFE283" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#FFD45C" stopOpacity="0" />
                </radialGradient>
              </defs>
              <g clipPath={clip("tool-card")}>
                <svg x="698" y="158" width="170" height="160" viewBox="866 185 41 122" preserveAspectRatio="none">
                  {frame(resting)}
                </svg>
              </g>
              <g className="folder-content-card" clipPath={clip("tool-card")}>{frame(resting)}</g>
              <g className="folder-character-breathe">
                <g
                  className="folder-character-head"
                  clipPath={clip("head")}
                  mask={clip("alpha")}
                >
                  {frame(layers[0], "folder-face-rest")}
                  {frame(layers[1], "folder-face-blink")}
                  {frame(layers[2], "folder-face-notice")}
                  {frame(original, "folder-face-happy")}
                </g>
              </g>
              <g className="folder-character-hand" clipPath={clip("hand")}>
                {frame(original)}
              </g>
              <g clipPath={clip("foreground")}>{frame(original)}</g>
              <circle
                className="folder-bulb-glow"
                cx="1038"
                cy="104"
                r="115"
                fill={clip("warm")}
              />
              <g className="folder-bulb" clipPath={clip("bulb")}>
                {frame(original)}
              </g>
              <g
                className="folder-bulb-rays"
                stroke="#F4BF45"
                strokeWidth="5"
                strokeLinecap="round"
              >
                <path d="M1010 27l-7-14M1096 47l12-10M1130 113l16 3M1087 186l6 12M959 131l-15 7" />
              </g>
              {[
                [944, 49],
                [1147, 80],
                [1114, 193],
              ].map(([x, y], i) => (
                <path
                  key={i}
                  className="folder-idea-spark"
                  d={`M${x} ${y - 8}q0 8 8 8q-8 0-8 8q0-8-8-8q8 0 8-8Z`}
                  fill="#F6C94F"
                />
              ))}
            </svg>
          </div>
        </div>
        <button
          type="button"
          className="folder-character-trigger"
          aria-label="Play SHAN MU’s aha moment"
          aria-describedby={`${id}-hint`}
          disabled={!ready || paused}
          onClick={() => playRef.current()}
        />
      </div>
      <span id={`${id}-hint`} className="folder-sr-only">
        Hover over the folder or focus this button to reveal a creative idea. Move away to close it.
      </span>
      <span className="folder-sr-only" role="status" aria-live="polite">
        {announcement}
      </span>
    </div>
  );
}
