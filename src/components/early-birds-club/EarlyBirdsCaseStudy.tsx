import type { ReactNode } from "react";
import type { Project } from "@/data/projects";
import { ImageGallery } from "@/components/ImageGallery";
import { Reveal } from "@/components/Motion";
import { photographySeries } from "@/components/photography/photography";
import { EarlyBirdsNavigation } from "./EarlyBirdsNavigation";
import { earlyBirdsSections } from "./sections";
import "./EarlyBirdsCaseStudy.css";

function Chapter({ index, children }: { index: number; children: ReactNode }) {
  const section = earlyBirdsSections[index];
  return <section id={section.id} className="ebc-chapter" aria-labelledby={`${section.id}-heading`}>
    <Reveal><h2 id={`${section.id}-heading`}>{section.label}</h2>{children}</Reveal>
  </section>;
}

export function EarlyBirdsCaseStudy({ project }: { project: Project }) {
  const overview = project.sections[0];
  const directions = project.sections.slice(1);
  return <div className="ebc-case-study">
    <EarlyBirdsNavigation />
    <div className="ebc-project-content">
      <Chapter index={0}><div id="overview" className="ebc-subsection">
        <h3>{overview.title}</h3>
        <div className="ebc-story-copy">{overview.body?.map(text => <p key={text}>{text}</p>)}</div>
      </div></Chapter>
      <Chapter index={1}>{directions.map(direction => <div id={direction.id} className="ebc-subsection" key={direction.id}>
        <h3>{direction.title}</h3>
        <ImageGallery images={direction.images?.slice(0, 2) || []} layout="pair" />
      </div>)}</Chapter>
      <Chapter index={2}><ImageGallery images={project.gallery.filter((image, index) => ![0, 1, 5, 6, 7, 11].includes(index) && image.src !== "/projects/early-birds-club/cover.webp")} layout="pair" /></Chapter>
      <Chapter index={3}><ImageGallery images={photographySeries[2].photos} layout="pair" /></Chapter>
      <Chapter index={4}><ImageGallery images={[project.gallery[5], project.gallery[11]]} layout="pair" /></Chapter>
    </div>
  </div>;
}
