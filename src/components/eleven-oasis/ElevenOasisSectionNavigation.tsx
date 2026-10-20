"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "problem", label: "PROBLEM" },
  { id: "strategy", label: "STRATEGY" },
  { id: "decisions", label: "DECISIONS" },
  { id: "results", label: "RESULTS" },
] as const;

type SectionId = typeof sections[number]["id"];

export function ElevenOasisSectionNavigation() {
  const navigation = useRef<HTMLElement>(null);
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const nav = navigation.current;
    const root = nav?.parentElement;
    if (!nav || !root) return;
    const header = document.querySelector<HTMLElement>(".site-header");
    const entryHash = location.hash;
    const targets = sections.map(section => ({
      id: section.id,
      element: document.getElementById(section.id),
    }));
    let frame = 0;
    let entryFrame = 0;
    let disposed = false;

    const update = () => {
      frame = 0;
      const headerHeight = header?.getBoundingClientRect().height ?? 0;
      const clearance = headerHeight + nav.getBoundingClientRect().height + 16;
      const anchorOffset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      root.style.setProperty("--eleven-nav-header-height", `${headerHeight}px`);
      // Native anchors already include html scroll-padding. Add only the
      // remaining clearance for the chapter bar and its reading gap.
      root.style.setProperty("--eleven-nav-scroll-margin", `${Math.max(0, clearance - anchorOffset)}px`);
      const readingLine = Math.max(clearance, anchorOffset) + 2;
      let current: typeof targets[number] | undefined;
      targets.forEach(target => {
        if (target.element && target.element.getBoundingClientRect().top <= readingLine) current = target;
      });
      // A short final section cannot always reach the top landing line. At
      // the document end, select it only once its heading is actually visible.
      const last = targets.at(-1);
      const lastBounds = last?.element?.getBoundingClientRect();
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
        && lastBounds && lastBounds.top < window.innerHeight && lastBounds.bottom > clearance) {
        current = last;
      }
      setActive(current?.id ?? null);
    };
    // Four bounds, at most once per rendered frame; no continuous animation
    // loop or click-selected state that could get ahead of the actual content.
    const schedule = () => {
      if (!disposed && !frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(nav);
    if (header) observer.observe(header);
    for (const { element } of targets) if (element) observer.observe(element);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    update();
    void document.fonts.ready.then(() => {
      if (disposed) return;
      entryFrame = requestAnimationFrame(() => {
        update();
        // A direct hash can land before the measured offsets are available.
        // Re-align once after fonts settle, without timers or scroll loops.
        if (location.hash !== entryHash) return;
        const target = targets.find(target => `#${target.id}` === entryHash)?.element;
        target?.scrollIntoView({ behavior: "instant" });
      });
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(entryFrame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, []);

  useEffect(() => {
    const nav = navigation.current;
    const link = nav?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!nav || !link || nav.scrollWidth <= nav.clientWidth) return;
    const container = nav.getBoundingClientRect(), item = link.getBoundingClientRect();
    // Reveal the active mobile link horizontally without moving the page.
    if (item.left < container.left) nav.scrollLeft += item.left - container.left;
    else if (item.right > container.right) nav.scrollLeft += item.right - container.right;
  }, [active]);

  return (
    <nav ref={navigation} className="eleven-section-navigation" aria-label="Case study sections">
      <ul>
        {sections.map(section => (
          <li key={section.id}>
            <a href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined}>
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
