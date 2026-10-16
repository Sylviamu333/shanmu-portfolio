"use client";
import { HeroParticles, useHomepageMotion } from "./HomeMotion";
import { personal } from "@/data/personal";
import { homepage } from "@/data/homepage";
import { HeroFolder } from "./HeroFolder";
import { HeroAtmosphere } from "./HeroAtmosphere";
import "./HeroRefinements.css";
export function HomeIntro() {
  const { paused, toggle } = useHomepageMotion();
  const roles = homepage.heroRoles;
  return (
    <section
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
