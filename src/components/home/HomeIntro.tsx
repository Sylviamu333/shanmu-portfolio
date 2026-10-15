"use client";
import { HeroParticles, useHomepageMotion } from "./HomeMotion";
import { personal } from "@/data/personal";
import { homepage } from "@/data/homepage";
import { HeroFolder } from "./HeroFolder";
import { HeroAtmosphere } from "./HeroAtmosphere";
import "./HeroRefinements.css";
export function HomeIntro() {
  const { paused, toggle } = useHomepageMotion();
  const roles = personal.positioning.split(" · ");
  return (
    <section
      className="home-intro"
      data-motion-paused={paused}
      aria-labelledby="home-title"
    >
      <HeroAtmosphere />
      <HeroParticles />
      <div className="home-container hero-content">
        <h1 id="home-title">
          {homepage.greeting} <span>{personal.name}</span>
        </h1>
        <p className="home-role" aria-label={personal.positioning}>
          <span className="hero-lime">{roles[0]}</span>
          <span className="hero-role-divider" aria-hidden="true">
            ·
          </span>
          <span className="hero-blue">{roles[1]}</span>
        </p>
        <p className="home-introduction">{personal.introduction}</p>
        <svg
          className="hero-scribble"
          viewBox="0 0 390 22"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M8 15c70-12 193-13 365-8M25 17c46-5 151-11 230-8"
            stroke="#262323"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
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
