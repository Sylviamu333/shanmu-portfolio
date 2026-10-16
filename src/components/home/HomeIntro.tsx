"use client";
import { useLayoutEffect, useRef } from "react";
import { HeroParticles, useHomepageMotion } from "./HomeMotion";
import { personal } from "@/data/personal";
import { homepage } from "@/data/homepage";
import { HeroFolder } from "./HeroFolder";
import { HeroAtmosphere } from "./HeroAtmosphere";
import "./HeroRefinements.css";
export function HomeIntro() {
  const intro = useRef<HTMLElement>(null);
  const { paused, toggle } = useHomepageMotion();
  const roles = homepage.heroRoles;

  useLayoutEffect(() => {
    const root = intro.current;
    if (!root) return;
    const content = root.querySelector<HTMLElement>(".hero-content")!;
    const greeting = root.querySelector<HTMLElement>(".hero-greeting")!;
    const composition = root.querySelector<HTMLElement>(".hero-art-composition")!;
    const stage = root.querySelector<HTMLElement>(".hero-art-stage")!;
    const image = root.querySelector<HTMLImageElement>(".folder-original")!;
    const note = root.querySelector<HTMLElement>(".hero-note")!;
    const control = root.querySelector<HTMLElement>(".home-motion-control")!;
    const update = () => {
      const mobile = matchMedia("(max-width: 700px)").matches;
      const css = getComputedStyle(content);
      const noteCSS = getComputedStyle(note);
      const controlCSS = getComputedStyle(control);
      const oldStage = parseFloat(css.getPropertyValue("--hero-stage-height"));
      const oldPadding = mobile ? 24 : 40;
      const imageHeight = image.getBoundingClientRect().height;
      const visibleInset = imageHeight * 121 / 881;
      // The former stage's 8px bottom margin collapsed with the in-flow
      // label's top margin. Count their maximum, rather than both margins.
      const noteHeight = noteCSS.position === "absolute" ? 0
        : parseFloat(noteCSS.height) + Math.max(0, parseFloat(noteCSS.marginTop) - 8)
          + parseFloat(noteCSS.marginBottom);
      // Recover the previous viewport/flex layout's free space, then halve the
      // actual text-to-art gap. The new layout has no viewport min-height,
      // auto spacer or negative offsets; only this explicit positive padding.
      const natural = parseFloat(css.paddingTop) + greeting.getBoundingClientRect().height
        + oldPadding + oldStage + 8 + noteHeight + control.getBoundingClientRect().height
        + parseFloat(controlCSS.marginTop) + parseFloat(css.paddingBottom);
      const previousMinimum = mobile ? 0 : innerHeight
        - parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--portfolio-header-height"))
        + oldStage * .66 + 66;
      const oldGap = Math.max(0, previousMinimum - natural) + oldPadding
        + (oldStage - imageHeight) / 2 + visibleInset;
      composition.style.setProperty("--hero-folder-gap", `${Math.max(0, oldGap / 2 - visibleInset)}px`);
    };
    const observer = new ResizeObserver(update);
    for (const element of [greeting, stage, note, control]) observer.observe(element);
    window.addEventListener("resize", update);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      ref={intro}
      className="home-intro"
      data-motion-paused={paused}
      aria-labelledby="home-title"
    >
      <HeroAtmosphere />
      <HeroParticles />
      <div className="home-container hero-content">
        <a
          href="#work"
          className="hero-greeting"
          aria-label="Explore my work"
          onClick={(event) => {
            const work = document.getElementById("work");
            if (!work) return;
            event.preventDefault();
            work.scrollIntoView({
              behavior: paused || matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
              block: "start",
            });
            // Keep the native anchor destination and keyboard reading position.
            history.replaceState(null, "", "#work");
            work.focus({ preventScroll: true });
          }}
        >
          <h1 id="home-title">
            {homepage.greeting} <span>{personal.name}</span>
          </h1>
          <p className="home-role" aria-label={roles.join(" · ")}>
            <span className="hero-lime">{roles[0]}</span>
            <span className="hero-role-divider" aria-hidden="true">
              ·
            </span>
            <span className="hero-blue">{roles[1]}</span>
          </p>
          <p className="home-introduction">{personal.introduction}</p>
        </a>
        <div className="hero-art-composition">
          <div className="hero-art-stage">
            <HeroFolder />
          </div>
          <span className="hero-note" aria-hidden="true">
            {homepage.heroNote[0]}
            <br />
            {homepage.heroNote[1]}
          </span>
        </div>
        <button
          className="home-motion-control"
          aria-pressed={paused}
          onClick={toggle}
        >
          <span className="home-motion-visible">
            <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
            {paused ? "Resume motion" : "Pause motion"}
          </span>
        </button>
      </div>
    </section>
  );
}
