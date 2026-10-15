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
import { HERO_WASH_PATH } from "./HeroAtmosphere";

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
    const wash = element?.querySelector<SVGPathElement>(
      ".hero-wash-stroke",
    );
    if (!element || !wash) return;
    const hero = element.querySelector<HTMLElement>(".home-intro")!;
    const work = element.querySelector<HTMLElement>(".home-work")!;
    const guide = element.querySelector<SVGPathElement>(".hero-wash-guide")!;
    const filter = element.querySelector<SVGFilterElement>(".hero-wash-filter")!;
    const ink = element.querySelector<SVGLinearGradientElement>(".hero-wash-ink")!;
    const heroTone = element.querySelector<SVGStopElement>(".hero-wash-hero-tone")!;
    const workTone = element.querySelector<SVGStopElement>(".hero-wash-work-tone")!;
    let metrics = { heroDistance: 1, connectionDistance: 2, totalDistance: 3, heroShare: 1, connectionShare: 1 };
    let paintWash: (() => void) | undefined;
    // Keep the existing Hero SVG viewport/scale. Only the path continues beyond
    // that viewport, so the approved Hero shape and diffusion stay unchanged.
    const measure = () => {
      const h = hero.offsetHeight;
      const heading = work.querySelector<HTMLElement>(".home-work-heading")!;
      const grid = work.querySelector<HTMLElement>(".home-project-grid")!;
      const origin = hero.getBoundingClientRect().top;
      const yScale = (h * 0.85) / 280;
      const y = (pixels: number) => (pixels - h * 0.28) / yScale - 80;
      const x = (fraction: number) => fraction * 590 - 125;
      const gridTop = grid.getBoundingClientRect().top - origin;
      const length = Math.max(1, grid.offsetHeight - 220);
      const gy = (fraction: number) => y(gridTop + length * fraction);
      const join = y(work.getBoundingClientRect().top - origin + heading.offsetHeight / 2);
      const end = gy(1);
      const connection = `${HERO_WASH_PATH} C405 92 430 ${y(h + heading.offsetHeight * 0.1)} 170 ${join}`;
      wash.setAttribute("d", `${connection}
        C${x(.22)} ${gy(.03)} ${x(.02)} ${gy(.13)} ${x(.08)} ${gy(.25)}
        C${x(.28)} ${gy(.34)} ${x(.98)} ${gy(.42)} ${x(.92)} ${gy(.5)}
        C${x(.78)} ${gy(.58)} ${x(.02)} ${gy(.67)} ${x(.08)} ${gy(.75)}
        C${x(.3)} ${gy(.86)} ${x(.92)} ${gy(.94)} ${x(.78)} ${end}`);
      filter.setAttribute("filterUnits", "userSpaceOnUse");
      filter.setAttribute("x", "-185");
      filter.setAttribute("y", "-200");
      filter.setAttribute("width", "710");
      filter.setAttribute("height", `${end + 264}`);
      ink.setAttribute("y2", `${end}`);
      heroTone.setAttribute("offset", `${(y(h) - 67) / (end - 67)}`);
      workTone.setAttribute("offset", `${(gy(.2) - 67) / (end - 67)}`);
      const heroLength = guide.getTotalLength();
      guide.setAttribute("d", connection);
      const connectionLength = guide.getTotalLength();
      guide.setAttribute("d", HERO_WASH_PATH);
      metrics = {
        heroDistance: h * 0.6,
        // Reach the connector while the Work heading is still in view.
        connectionDistance: Math.max(h * 0.6 + 1, h + heading.offsetHeight / 2 - innerHeight * 0.25),
        totalDistance: Math.max(h * 0.6 + 1, work.getBoundingClientRect().bottom - origin - innerHeight * 0.65),
        heroShare: heroLength / wash.getTotalLength(),
        connectionShare: connectionLength / wash.getTotalLength(),
      };
      paintWash?.();
    };
    const media = gsap.matchMedia();
    let disposed = false;
    let resizeFrame = 0;
    let resize: ResizeObserver | undefined;
    const setup = () => {
      if (disposed) return;
      measure();
      resize = new ResizeObserver(() => {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(() => {
          measure();
          ScrollTrigger.refresh();
        });
      });
      resize.observe(hero);
      resize.observe(work);
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const context = gsap.context(() => {
          const progress = { distance: 0 };
          const paint = () => {
            const { distance } = progress;
            const { heroDistance, connectionDistance, totalDistance, heroShare, connectionShare } = metrics;
            const revealed = distance <= heroDistance
              ? heroShare * (0.06 + 0.94 * Math.max(0, distance) / heroDistance)
              : distance <= connectionDistance
                ? heroShare + (connectionShare - heroShare) * (distance - heroDistance) / (connectionDistance - heroDistance)
                : connectionShare + (1 - connectionShare) * (distance - connectionDistance) / (totalDistance - connectionDistance);
            wash.style.strokeDashoffset = `${1 - Math.min(1, revealed)}`;
          };
          paintWash = paint;
          const draw = gsap.fromTo(
            progress,
            { distance: 0 },
            {
              distance: () => metrics.totalDistance,
              ease: "none",
              autoRound: false,
              onUpdate: paint,
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: () => `+=${metrics.totalDistance}`,
                scrub: 0.18,
                invalidateOnRefresh: true,
                onRefreshInit: measure,
                onRefresh: paint,
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
              } else {
                // A resize while paused skips disabled triggers. Refresh their
                // range on resume while keeping the frozen drawing progress.
                draw.scrollTrigger?.enable(false);
              }
            },
          };
          controller.current.pause(pausedRef.current);
          cleanups.push(() => {
            for (const tween of revealTweens) tween.kill();
            observer.disconnect();
            gsap.ticker.remove(tick);
            controller.current = null;
          });
        }, element);
        return () => {
          for (const cleanup of cleanups.splice(0)) cleanup();
          context.revert();
          paintWash = undefined;
          wash.style.removeProperty("stroke-dashoffset");
        };
      });
    };
    const cleanups: (() => void)[] = [];
    void document.fonts.ready.then(setup);
    return () => {
      disposed = true;
      cancelAnimationFrame(resizeFrame);
      resize?.disconnect();
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
