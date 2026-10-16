import type { Project } from "@/data/projects";
import { homepage } from "@/data/homepage";
import { HomeProject } from "./HomeProject";
export function HomeWork({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="home-work" aria-labelledby="work-heading" tabIndex={-1}>
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
        </div>
      </div>
    </section>
  );
}
