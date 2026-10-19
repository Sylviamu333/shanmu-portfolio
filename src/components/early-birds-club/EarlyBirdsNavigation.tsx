"use client";

import { useEffect, useRef, useState } from "react";
import { earlyBirdsSections } from "./sections";

export function EarlyBirdsNavigation() {
  const nav = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string>(earlyBirdsSections[0].id);

  useEffect(() => {
    const navigation = nav.current;
    const root = navigation?.parentElement;
    if (!navigation || !root) return;
    const header = document.querySelector<HTMLElement>(".site-header");
    const targets = earlyBirdsSections.map(section => document.getElementById(section.id));
    let frame = 0;
    let initialFrame = 0;
    let disposed = false;

    const update = () => {
      frame = 0;
      const headerHeight = header?.getBoundingClientRect().height ?? 0;
      const compact = matchMedia("(max-width: 700px)").matches;
      const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const clearance = headerHeight + (compact ? navigation.getBoundingClientRect().height + 16 : 24);
      // Native anchors already include html's scroll-padding. Add only the
      // remaining clearance, including the compact mobile navigation itself.
      root.style.setProperty("--ebc-scroll-margin", `${Math.max(0, clearance - padding)}px`);
      const readingLine = Math.max(clearance, padding) + 2;
      let index = 0;
      targets.forEach((target, candidate) => {
        if (target && target.getBoundingClientRect().top <= readingLine) index = candidate;
      });
      const last = targets.at(-1)?.getBoundingClientRect();
      if (last && last.top < innerHeight && last.bottom > headerHeight
        && scrollY + innerHeight >= document.documentElement.scrollHeight - 2) index = targets.length - 1;
      setActive(earlyBirdsSections[index].id);
    };
    const schedule = () => { if (!disposed && !frame) frame = requestAnimationFrame(update); };
    const resize = new ResizeObserver(schedule);
    resize.observe(navigation);
    if (header) resize.observe(header);
    targets.forEach(target => { if (target) resize.observe(target); });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    update();
    void document.fonts.ready.then(() => {
      if (disposed) return;
      // Re-align direct hash entry once fonts and the measured offset settle.
      initialFrame = requestAnimationFrame(() => {
        update();
        const id = location.hash.slice(1);
        const target = id ? root.querySelector<HTMLElement>(`[id="${CSS.escape(id)}"]`) : null;
        target?.scrollIntoView({ behavior: "instant" });
      });
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(initialFrame);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, []);

  useEffect(() => {
    const navigation = nav.current;
    const link = navigation?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!navigation || !link || !matchMedia("(max-width: 700px)").matches) return;
    const a = navigation.getBoundingClientRect(), b = link.getBoundingClientRect();
    if (b.left < a.left) navigation.scrollLeft += b.left - a.left;
    else if (b.right > a.right) navigation.scrollLeft += b.right - a.right;
  }, [active]);

  return <nav ref={nav} className="ebc-section-navigation" aria-label="Early Birds Club project sections">
    {earlyBirdsSections.map(section => <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined}>{section.label}</a>)}
  </nav>;
}
