"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { ReferenceCursor } from "./ReferenceCursor";

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("folio-reveal", "0.22,1,0.36,1");
CustomEase.create("folio-fade", "0.25,0.1,0.25,1");
const MotionContext = createContext({ paused: false, toggle: () => {} });
export const useHomepageMotion = () => useContext(MotionContext);

// Positions and velocities are independently authored from observed motion,
// rather than taken from the reference's runtime or illustration assets.
const particles = [
  [12, 48, -11, -26, 0],
  [71, 15, -5, -6, 0],
  [22, 27, 1, 6, 0],
  [87, 42, 1, 8, 0],
  [75, 85, 5, -5, 0],
  [51, 92, -8, 4, 0],
  [24, 21, 4, -2, 1],
  [87, 56, -7, 3, 1],
  [15, 84, 7, -3, 1],
  [9, 94, 3, -7, 1],
  [12, 29, -13, 4, 2],
  [87, 15, -17, 11, 2],
  [12, 55, 1, 22, 2],
  [50, 40, 5, -5, 2],
  [80, 82, -10, -6, 2],
];

export function HeroParticles() {
  return (
    <div className="hero-particles" aria-hidden="true">
      {particles.map(([x, y, , , color], index) => (
        <span
          key={index}
          className={`hero-particle particle-${color}`}
          style={{ left: `${x}%`, top: `${y}%` }}
        />
      ))}
    </div>
  );
}

export function HomeMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const controller = useRef<{ pause: (value: boolean) => void } | null>(null);

  useEffect(() => {
    const element = root.current;
    const atmosphere = element?.querySelector<SVGSVGElement>(
      ".hero-atmosphere-art",
    );
    if (!element || !atmosphere) return;
    const media = gsap.matchMedia();
    let disposed = false;
    let resizeFrame = 0;
    const setup = () => {
      if (disposed) return;
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const context = gsap.context(() => {
          const hero = element.querySelector<HTMLElement>(".home-intro")!;
          const work = element.querySelector<HTMLElement>(".home-work")!;
          const draw = gsap.fromTo(
            atmosphere,
            { xPercent: -1, y: 0 },
            {
              xPercent: 1,
              y: 28,
              ease: "none",
              autoRound: false,
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 0.35,
                invalidateOnRefresh: true,
              },
            },
          );
          const revealTweens: gsap.core.Tween[] = [];
          const reveals = [
            ...element.querySelectorAll<HTMLElement>("[data-home-reveal]"),
          ];
          for (const target of reveals) {
            // Keep SSR/no-JS content visible; only conceal content below the viewport.
            if (target.getBoundingClientRect().top < innerHeight) continue;
            gsap.set(target, { opacity: 0, y: 24 });
            const show = () => {
              if (pausedRef.current) {
                gsap.set(target, { opacity: 1, y: 0 });
                return;
              }
              const delay =
                innerWidth > 900 ? Number(target.dataset.homeReveal || 0) : 0;
              revealTweens.push(
                gsap.to(target, {
                  opacity: 1,
                  duration: 0.7,
                  delay,
                  ease: "folio-fade",
                }),
              );
              revealTweens.push(
                gsap.to(target, {
                  y: 0,
                  duration: 0.85,
                  delay,
                  ease: "folio-reveal",
                }),
              );
            };
            ScrollTrigger.create({
              trigger: target,
              start: "top 97%",
              once: true,
              onEnter: show,
            });
            const focus = () =>
              gsap.set(target, { opacity: 1, y: 0, overwrite: true });
            target.addEventListener("focusin", focus);
            cleanups.push(() => target.removeEventListener("focusin", focus));
          }
          const dots = [
            ...element.querySelectorAll<HTMLElement>(".hero-particle"),
          ];
          const positions = dots.map((dot) => ({
            x: gsap.quickSetter(dot, "x", "px"),
            y: gsap.quickSetter(dot, "y", "px"),
          }));
          let elapsed = 0;
          let visible = true;
          const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
          });
          observer.observe(hero);
          const tick = (_time: number, delta: number) => {
            if (pausedRef.current || document.hidden || !visible) return;
            elapsed += Math.min(delta, 50) / 1000;
            const scale = Math.min(1.2, element.clientWidth / 1280);
            particles.forEach(([, , vx, vy], i) => {
              const t = elapsed * 0.38;
              positions[i].x(
                ((vx / 0.38) * Math.sin(t) +
                  7 * (Math.cos(t * 0.6 + i) - Math.cos(i))) *
                  scale,
              );
              positions[i].y(
                ((vy / 0.38) * Math.sin(t) +
                  5 * (Math.cos(t * 0.8 + i) - Math.cos(i))) *
                  scale,
              );
            });
          };
          gsap.ticker.add(tick);
          controller.current = {
            pause(value) {
              if (value) {
                draw.scrollTrigger?.disable(false);
                for (const tween of revealTweens) tween.progress(1);
              } else draw.scrollTrigger?.enable(false, false);
            },
          };
          controller.current.pause(pausedRef.current);
          const resize = new ResizeObserver(() => {
            cancelAnimationFrame(resizeFrame);
            resizeFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
          });
          resize.observe(work);
          cleanups.push(() => {
            for (const tween of revealTweens) tween.kill();
            resize.disconnect();
            observer.disconnect();
            gsap.ticker.remove(tick);
            controller.current = null;
          });
        }, element);
        return () => {
          for (const cleanup of cleanups.splice(0)) cleanup();
          context.revert();
        };
      });
    };
    const cleanups: (() => void)[] = [];
    void document.fonts.ready.then(setup);
    return () => {
      disposed = true;
      cancelAnimationFrame(resizeFrame);
      media.revert();
    };
  }, []);

  function toggle() {
    const next = !pausedRef.current;
    pausedRef.current = next;
    controller.current?.pause(next);
    setPaused(next);
  }

  return (
    <MotionContext.Provider value={{ paused, toggle }}>
      <main
        ref={root}
        id="main"
        className="homepage"
        data-motion-paused={paused}
      >
        {children}
      </main>
      <ReferenceCursor paused={paused} />
    </MotionContext.Provider>
  );
}
