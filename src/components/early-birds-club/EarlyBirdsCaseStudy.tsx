import type { ReactNode } from "react";
import type { Project } from "@/data/projects";
import { ImageGallery } from "@/components/ImageGallery";
import { Reveal } from "@/components/Motion";
import { photographySeries } from "@/components/photography/photography";
import { EarlyBirdsNavigation } from "./EarlyBirdsNavigation";
import { earlyBirdsSections } from "./sections";
import { earlyBirdsActivations } from "./activations";
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
      <Chapter index={4}>
        <p className="ebc-activation-intro">From retail pop-ups to golf events and community collaborations, the identity extends into physical spaces and shared experiences.</p>
        <div className="ebc-activations">
          {earlyBirdsActivations.map((activation, index) => <article className="ebc-activation" key={activation.id} aria-labelledby={`activation-${activation.id}`}>
            <Reveal>
              <p className="ebc-activation-kind">{String(index + 1).padStart(2, "0")} / {activation.kind}</p>
              <div className="ebc-activation-heading">
                <h3 id={`activation-${activation.id}`}>{activation.title}</h3>
                <p className="ebc-activation-location">{activation.location}</p>
              </div>
              <p className="ebc-activation-context">{activation.context}</p>
              <ImageGallery images={activation.photos} layout="pair" />
            </Reveal>
          </article>)}
        </div>
        <div className="ebc-activation-concepts">
          <h3>Identity application concepts</h3>
          <ImageGallery images={[project.gallery[5], project.gallery[11]]} layout="pair" />
        </div>
      </Chapter>
    </div>
  </div>;
}
