"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "problem", label: "PROBLEM" },
  { id: "strategy", label: "STRATEGY" },
  { id: "decisions", label: "DECISIONS" },
  { id: "results", label: "RESULTS" },
] as const;

type SectionId = typeof sections[number]["id"];

export function ElevenOasisSectionNavigation() {
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const targets = sections.map(section => ({
      id: section.id,
      element: document.getElementById(section.id),
    }));
    let frame = 0;
    let disposed = false;

    const update = () => {
      frame = 0;
      const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
      // Match the native anchor landing line. The shared page scroll-padding
      // already clears the actual 66px / 58px fixed header at each breakpoint.
      const anchorOffset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const readingLine = Math.max(headerBottom + 16, anchorOffset) + 2;
      let current = targets.find(({ element }) => {
        if (!element) return false;
        const bounds = element.getBoundingClientRect();
        return bounds.top <= readingLine && bounds.bottom > readingLine;
      });
      // A short final section cannot always reach the top landing line. At
      // the document end, select it only once its heading is actually visible.
      const last = targets.at(-1);
      const lastBounds = last?.element?.getBoundingClientRect();
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
        && lastBounds && lastBounds.top < window.innerHeight && lastBounds.bottom > headerBottom) {
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
    for (const { element } of targets) if (element) observer.observe(element);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    document.fonts.ready.then(schedule);
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, []);

  return (
    <nav className="eleven-section-navigation" aria-label="Case study sections">
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
