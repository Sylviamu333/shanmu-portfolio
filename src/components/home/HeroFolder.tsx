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

export function HeroFolder() {
  const id = useId().replaceAll(":", "");
  const root = useRef<HTMLDivElement>(null);
  const playRef = useRef<() => void>(() => {});
  const [ready, setReady] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const { paused } = useHomepageMotion();

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
    const find = (selector: string) =>
      element.querySelector<SVGElement>(selector)!;
    const head = find(".folder-character-head");
    const rest = find(".folder-face-rest");
    const blink = find(".folder-face-blink");
    const notice = find(".folder-face-notice");
    const happy = find(".folder-face-happy");
    const hand = find(".folder-character-hand");
    const bulb = find(".folder-bulb");
    const glow = find(".folder-bulb-glow");
    const rays = find(".folder-bulb-rays");
    const sparks = [
      ...element.querySelectorAll<SVGElement>(".folder-idea-spark"),
    ];
    const parallax = element.querySelector<HTMLElement>(".folder-depth")!;
    const button = element.querySelector<HTMLButtonElement>(
      ".folder-character-trigger",
    )!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let staticTimer: ReturnType<typeof setTimeout> | undefined;
    let reaction: gsap.core.Timeline | null = null;
    let idle: gsap.core.Timeline | null = null;
    let busy = false;
    let visible = true;
    let blinks = 0;
    let disposed = false;

    const phase = (value: string) => {
      element.dataset.expression = value;
      button.setAttribute("aria-busy", String(value !== "idle"));
    };
    const reset = () => {
      gsap.set([blink, notice, happy, hand, bulb, glow, rays, ...sparks], {
        opacity: 0,
      });
      gsap.set(rest, { opacity: 1 });
      gsap.set(head, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        svgOrigin: "985 390",
      });
      gsap.set(hand, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        svgOrigin: "853 401",
      });
      gsap.set(bulb, { y: 0, scale: 1, svgOrigin: "1036 135" });
      phase("idle");
    };
    const scheduleBlink = () => {
      clearTimeout(idleTimer);
      if (disposed || paused || reduced.matches || !visible || document.hidden)
        return;
      idleTimer = setTimeout(
        () => {
          if (busy) return;
          blinks++;
          idle = gsap.timeline({ onComplete: scheduleBlink });
          idle
            .set(blink, { opacity: 1 })
            .to(blink, { opacity: 0, duration: 0.08 }, 0.13);
          if (blinks % 3 === 0) {
            // An actual mouth-state change, separate from breathing/tilting.
            idle
              .to(happy, { opacity: 1, duration: 0.16 }, 0.4)
              .to(happy, { opacity: 0, duration: 0.2 }, 1.05);
          }
        },
        4000 + Math.random() * 3000,
      );
    };
    const stop = () => {
      clearTimeout(idleTimer);
      clearTimeout(staticTimer);
      idle?.kill();
      reaction?.kill();
      busy = false;
      reset();
      gsap.set(parallax, { x: 0, y: 0 });
    };
    reset();
    scheduleBlink();
    playRef.current = () => {
      if (busy || paused || !visible || document.hidden) return;
      clearTimeout(idleTimer);
      idle?.kill();
      reset();
      busy = true;
      setAnnouncement("Aha! An idea.");
      phase("noticed");
      if (reduced.matches) {
        // Reduced motion keeps the interaction as a still expression change.
        gsap.set(rest, { opacity: 0 });
        gsap.set([happy, hand, bulb], { opacity: 1 });
        phase("happy");
        staticTimer = setTimeout(() => {
          busy = false;
          reset();
          setAnnouncement("");
        }, 2500);
        return;
      }
      reaction = gsap.timeline({
        onComplete: () => {
          busy = false;
          reset();
          setAnnouncement("");
          scheduleBlink();
        },
      });
      reaction
        .to(
          head,
          { y: -2, rotation: -0.5, duration: 0.2, ease: "power2.out" },
          0,
        )
        .call(() => phase("curious"), [], 0.2)
        .to(notice, { opacity: 1, duration: 0.16, ease: "sine.inOut" }, 0.2)
        .call(() => phase("happy"), [], 0.4)
        .to(happy, { opacity: 1, duration: 0.18, ease: "sine.inOut" }, 0.4)
        .to(
          head,
          {
            y: -5,
            rotation: -1,
            scale: 1.01,
            duration: 0.55,
            ease: "back.out(1.35)",
          },
          0.4,
        )
        .fromTo(
          hand,
          { opacity: 0, y: 65, rotation: 10, scale: 0.86 },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.3)",
          },
          0.5,
        )
        .fromTo(
          bulb,
          { opacity: 0, y: 15, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.4)" },
          0.6,
        )
        .to(glow, { opacity: 0.75, duration: 0.4, ease: "sine.inOut" }, 0.8)
        .fromTo(
          sparks,
          { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" },
          {
            opacity: 0.85,
            scale: 1,
            duration: 0.22,
            stagger: 0.045,
            ease: "power2.out",
          },
          0.8,
        )
        .to(bulb, { y: -8, duration: 0.17, ease: "power2.out" }, 1.1)
        .to(bulb, { y: 0, duration: 0.35, ease: "back.out(1.25)" }, 1.27)
        .fromTo(
          rays,
          { opacity: 0, scale: 0.75, svgOrigin: "1038 104" },
          { opacity: 0.8, scale: 1.12, duration: 0.4, ease: "sine.out" },
          1.1,
        )
        .to(sparks, { opacity: 0, duration: 0.45, stagger: 0.035 }, 1.35)
        .call(() => phase("holding"), [], 1.5)
        .call(() => phase("returning"), [], 2.5)
        .to(
          [happy, notice, hand, bulb, glow, rays],
          { opacity: 0, duration: 0.5, ease: "sine.inOut" },
          2.5,
        )
        .to(
          head,
          { y: 0, rotation: 0, scale: 1, duration: 0.6, ease: "sine.inOut" },
          2.5,
        );
    };
    const pointer = (event: PointerEvent) => {
      if (paused || reduced.matches || event.pointerType !== "mouse") return;
      const bounds = element.getBoundingClientRect();
      gsap.to(parallax, {
        x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 4,
        y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 3,
        duration: 0.55,
        ease: "sine.out",
        overwrite: true,
      });
    };
    const leave = () => {
      gsap.to(parallax, {
        x: 0,
        y: 0,
        duration: 0.65,
        ease: "sine.out",
        overwrite: true,
      });
    };
    const availability = () => {
      stop();
      scheduleBlink();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      availability();
    });
    observer.observe(element);
    element.addEventListener("pointermove", pointer, { passive: true });
    element.addEventListener("pointerleave", leave);
    reduced.addEventListener("change", availability);
    document.addEventListener("visibilitychange", availability);
    return () => {
      disposed = true;
      stop();
      gsap.killTweensOf(parallax);
      observer.disconnect();
      element.removeEventListener("pointermove", pointer);
      element.removeEventListener("pointerleave", leave);
      reduced.removeEventListener("change", availability);
      document.removeEventListener("visibilitychange", availability);
      playRef.current = () => {};
    };
  }, [ready, paused]);

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
        <button
          type="button"
          className="folder-character-trigger"
          aria-label="Play SHAN MU’s aha moment"
          aria-describedby={`${id}-hint`}
          disabled={!ready || paused}
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") playRef.current();
          }}
          onClick={() => playRef.current()}
        />
      </div>
      <span id={`${id}-hint`} className="folder-sr-only">
        Hover, tap, or press Enter to spark an idea.
      </span>
      <span className="folder-sr-only" role="status" aria-live="polite">
        {announcement}
      </span>
    </div>
  );
}
