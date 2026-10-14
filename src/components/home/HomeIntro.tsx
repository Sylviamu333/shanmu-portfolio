"use client";
import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { personal } from "@/data/personal";
import { homepage } from "@/data/homepage";
import {
  Flower,
  CursorSticker,
  DeviceSticker,
  SketchBook,
} from "./Decorations";
export function HomeIntro() {
  const stage = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stage,
    offset: ["start start", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const tilt = useTransform(scrollYProgress, [0, 1], [0, -4]);
  const still = paused || reduced;
  const roles = personal.positioning.split(" · ");
  return (
    <section
      ref={stage}
      className="home-intro"
      data-motion-paused={paused}
      aria-labelledby="home-title"
    >
      <div className="hero-pink-shapes" aria-hidden="true">
        <svg viewBox="0 0 1440 810" preserveAspectRatio="none">
          <path
            d="M-190 166C126 177 315 256 463 477S662 747 886 643 1192 396 1556 195"
            stroke="#FFA3D6"
            strokeWidth="195"
            fill="none"
          />
          <path
            d="M-154 89C77 106 274 177 399 310"
            stroke="#FFD1EC"
            strokeWidth="113"
            fill="none"
          />
        </svg>
      </div>
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
        <motion.div
          className="hero-art-stage"
          style={still ? undefined : { y: drift, rotate: tilt }}
          aria-hidden="true"
        >
          <SketchBook className="hero-sketchbook" />
          <Flower className="hero-flower" />
          <DeviceSticker className="hero-device" />
          <CursorSticker className="hero-cursor" />
          <span className="hero-note">
            {homepage.heroNote[0]}
            <br />
            {homepage.heroNote[1]}
          </span>
        </motion.div>
        <span className="hero-spark spark-blue" aria-hidden="true" />
        <span className="hero-spark spark-lime" aria-hidden="true" />
        <span className="hero-spark spark-pink" aria-hidden="true" />
        <button
          className="home-motion-control"
          aria-pressed={paused}
          onClick={() => setPaused(!paused)}
        >
          <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
          {paused ? "Resume motion" : "Pause motion"}
        </button>
      </div>
    </section>
  );
}
