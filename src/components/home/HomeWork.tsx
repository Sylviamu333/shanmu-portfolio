import type { Project } from "@/data/projects";
import { homepage } from "@/data/homepage";
import { HomeProject } from "./HomeProject";
import { HomeAbout } from "./HomeAbout";
export function HomeWork({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="home-work" aria-labelledby="work-heading">
      <div className="home-work-heading" data-home-reveal="0">
        <span className="home-work-emoji" aria-hidden="true">🖌️</span>
        <h2 id="work-heading">{homepage.workTitle}</h2>
        <span className="home-work-emoji" aria-hidden="true">💻</span>
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
