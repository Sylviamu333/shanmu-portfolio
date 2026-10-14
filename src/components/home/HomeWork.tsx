import type { Project } from "@/data/projects";
import { homepage } from "@/data/homepage";
import { HomeProject } from "./HomeProject";
import { HomeAbout } from "./HomeAbout";
import { Flower, PixelSprout } from "./Decorations";
export function HomeWork({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="home-work" aria-labelledby="work-heading">
      <div className="home-work-heading" data-home-reveal="0">
        <Flower />
        <h2 id="work-heading">{homepage.workTitle}</h2>
        <PixelSprout />
      </div>
      <div className="home-container">
        <div className="home-project-grid">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="home-project-reveal"
              data-home-reveal={index % 2 ? "0.09" : "0"}
            >
              <HomeProject project={project} />
            </div>
          ))}
          <div className="home-about-reveal" data-home-reveal="0.09">
            <HomeAbout />
          </div>
        </div>
      </div>
    </section>
  );
}
