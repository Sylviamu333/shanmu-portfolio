"use client";

import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/Arrow";
import { ProjectHero } from "@/components/ProjectHero";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { photographySeries } from "./photography";
import "./PhotographyExperience.css";

gsap.registerPlugin(ScrollTrigger);

export function PhotographyExperience({ projectNumber, projectTotal }: { projectNumber: number; projectTotal: number }) {
  const root = useRef<HTMLDivElement>(null);
  const [stills, setStills] = useState(false);

  // Passive effects run after the previous page's scroll controllers clean up.
  // A layout effect here can refresh the departing Hero during route removal.
  useEffect(() => {
    if (!root.current || stills) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const sections = [...root.current!.querySelectorAll<HTMLElement>(".photo-series")];
        sections.forEach(section => {
          const cards = [...section.querySelectorAll<HTMLElement>(".photo-frame")];
          const title = section.querySelector<HTMLElement>(".photo-series-title")!;
          const fanX = [-.4, -.24, -.075, .1, .27, .43];
          const fanY = [.08, -.09, .035, -.04, .10, -.07];
          const tilt = [-7, 3, -2, 4, -3, 6];
          const cloudX = [-.30, .12, .31, -.17, .015, .27];
          const cloudY = [-.19, -.26, -.04, .14, .25, .21];
          const railX = [-.38, -.21, -.035, .14, .315, .49];
          const railY = [.06, -.07, .02, -.035, .075, -.02];
          const railScale = [.78, .91, 1, .9, .8, .72];
          const width = () => section.clientWidth;
          const height = () => section.querySelector<HTMLElement>(".photo-series-stage")!.clientHeight;
          gsap.set(cards, { xPercent: -50, yPercent: -50, transformOrigin: "50% 50%" });
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: .35,
              invalidateOnRefresh: true,
            },
          });
          timeline.fromTo(title, { x: () => width() * 1.05, opacity: 1 }, { x: () => -width() * .34, duration: .35, ease: "none" }, .04);
          cards.forEach((card, index) => {
            timeline.fromTo(card,
              { x: index ? (index % 2 ? 1 : -1) * index * 5 : 0, y: index * -2, rotation: index ? (index % 2 ? 1 : -1) * 1.3 : 0, scale: 1 - index * .012 },
              { x: () => fanX[index] * width(), y: () => fanY[index] * height(), rotation: tilt[index], scale: .91 + (index % 3) * .045, duration: .2, ease: "power2.inOut" }, .18);
            timeline.to(card, { x: () => cloudX[index] * width(), y: () => cloudY[index] * height(), scale: .22 + (index % 3) * .05, rotation: tilt[index] * 2.2, duration: .17, ease: "power2.inOut" }, .4);
            timeline.to(card, { x: () => railX[index] * width(), y: () => railY[index] * height(), scale: railScale[index], rotation: tilt[index] * .4, duration: .17, ease: "power2.inOut" }, .62);
            timeline.to(card, { x: () => (railX[index] - .36) * width(), rotation: 0, duration: .21, ease: "none" }, .79);
          });
          timeline.to(title, { opacity: .07, x: () => -width() * .48, duration: .15 }, .4);
          timeline.to(title, { opacity: 1, x: () => -width() * .23, duration: .17 }, .62);
          timeline.to(title, { x: () => -width() * .72, duration: .21, ease: "none" }, .79);
        });
      }, root);
      return () => context.revert();
    });
    let disposed = false;
    void document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
    return () => { disposed = true; media.revert(); };
  }, [stills]);

  return (
    <div ref={root} className="photo-experience" data-stills={stills}>
      <noscript><style>{`.photo-experience .photo-stills-toggle{display:none}.photo-experience .photo-series{height:auto}.photo-experience .photo-series-stage{position:relative;height:auto;overflow:visible;padding:50px 6vw}.photo-experience .photo-series-title{position:static;white-space:normal;font-size:12vw;margin:40px 0}.photo-experience .photo-series-label{position:static}.photo-experience .photo-frames{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.photo-experience .photo-frame{position:relative;left:auto;top:auto;width:100%;height:auto;transform:none!important}.photo-experience .photo-frame img{width:100%;height:auto}`}</style></noscript>
      <section className="case-hero" aria-labelledby="photo-detail-title">
        <ProjectHero index={projectNumber} total={projectTotal} headingId="photo-detail-title" title="Visual Experiments" category="Photography & Art Direction" description="Three photography series. Color, silhouette, and life in motion.">
          <nav className="photo-hero-series" aria-label="Photography series">
            {photographySeries.map(series => <a key={series.id} href={`#${series.id}`}>{series.number} — {series.title}</a>)}
          </nav>
          <button className="photo-stills-toggle" type="button" aria-pressed={stills} onClick={() => setStills(value => !value)}>{stills ? "Enable scroll motion" : "View as stills"}<Arrow diagonal /></button>
        </ProjectHero>
      </section>
      {photographySeries.map(series => (
        <section id={series.id} key={series.id} className={`photo-series photo-tone-${series.tone}`} aria-labelledby={`${series.id}-heading`}>
          <div className="photo-series-stage">
            <div className="photo-series-label">
              <span>{series.number} — {series.title}</span>
              <span>{series.client}</span>
            </div>
            <h2 className="photo-series-title" id={`${series.id}-heading`}>{series.title}</h2>
            <div className="photo-frames">
              {series.photos.map((photo, index) => (
                <figure key={photo.src} className="photo-frame" style={{ "--photo-ratio": `${photo.width} / ${photo.height}`, zIndex: 20 - index } as CSSProperties}>
                  <Image src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} sizes="(max-width: 700px) 65vw, 38vw" loading={series.number === "01" ? "eager" : "lazy"} />
                  <figcaption>{series.number} / {String(index + 1).padStart(2, "0")}</figcaption>
                </figure>
              ))}
            </div>
            <p className="photo-scroll-cue" aria-hidden="true">Scroll to explore ↓</p>
          </div>
        </section>
      ))}
      <div className="photo-detail-outro">
        <p>End of selected photography</p>
        <Link href="/#work">Back to Work <Arrow diagonal /></Link>
      </div>
    </div>
  );
}
