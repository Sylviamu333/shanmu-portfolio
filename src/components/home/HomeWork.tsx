import type { Project } from "@/data/projects";
import { homepage } from "@/data/homepage";
import { HomeProject } from "./HomeProject";
import { HomeAbout } from "./HomeAbout";
import { Flower, PixelSprout } from "./Decorations";
import { Reveal } from "@/components/Motion";
export function HomeWork({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="home-work" aria-labelledby="work-heading">
      <div className="home-work-heading">
        <Flower />
        <h2 id="work-heading">{homepage.workTitle}</h2>
        <PixelSprout />
      </div>
      <div className="home-container">
        <div className="home-project-grid">
          {projects.map((project) => (
            <Reveal key={project.slug} className="home-project-reveal">
              <HomeProject project={project} />
            </Reveal>
          ))}
          <Reveal className="home-about-reveal">
            <HomeAbout />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
