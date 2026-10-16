import type { Project } from "@/data/projects";
import { Arrow } from "./Arrow";
import "./ElevenOasisIntroduction.css";

export function ElevenOasisIntroduction({ project }: { project: Project }) {
  return (
    <div className="eleven-introduction">
      <div className="eleven-introduction-columns">
        <div className="eleven-introduction-title">
          <p className="eleven-introduction-category">UI/UX DESIGN / E-COMMERCE</p>
          <h1>{project.title}</h1>
          <p className="eleven-introduction-body">{project.description.split(/(\be-commerce\b)/i).map((part, index) =>
            part.toLowerCase() === "e-commerce"
              ? <span className="eleven-introduction-nowrap" key={index}>{part}</span>
              : part,
          )}</p>
        </div>
        <div className="eleven-introduction-details">
          <p className="eleven-introduction-summary">{project.subtitle}</p>
          <dl className="eleven-introduction-facts">
            {project.facts.map(fact => {
              const value = fact.label === "Role" ? "UI/UX DESIGNER" : fact.value;
              return (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{value.split(/(\d+–\d+)/).map((part, index) =>
                    /\d+–\d+/.test(part)
                      ? <span className="eleven-introduction-nowrap" key={index}>{part}</span>
                      : part,
                  )}</dd>
                </div>
              );
            })}
          </dl>
          {project.website && (
            <a className="eleven-introduction-link" href={project.website} target="_blank" rel="noreferrer">
              Visit live website <Arrow diagonal />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
