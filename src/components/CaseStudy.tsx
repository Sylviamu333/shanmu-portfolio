import Link from "next/link";
import type { CaseSection, Project } from "@/data/projects";
import { ImageGallery } from "./ImageGallery";
import { BeforeAfter } from "./BeforeAfter";
import { Results } from "./Results";
import { Arrow } from "./Arrow";
import { Reveal } from "./Motion";
export function CaseStudySection({
  section,
  index,
  project,
}: {
  section: CaseSection;
  index: number;
  project: Project;
}) {
  return (
    <section id={section.id} className={`case-section section-${section.type}`}>
      <Reveal>
        <div className="case-section-heading">
          <span className="eyebrow">
            {String(index + 2).padStart(2, "0")} /{" "}
            {section.id.replaceAll("-", " ")}
          </span>
          <h2>{section.title}</h2>
        </div>
        {section.body && (
          <div className="case-body">
            {section.body.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        )}
        {section.bullets && (
          <ul className="strategy-list">
            {section.bullets.map((text, i) => (
              <li key={text}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {text}
              </li>
            ))}
          </ul>
        )}
        {section.type === "comparison" && project.comparisons && (
          <BeforeAfter comparisons={project.comparisons} />
        )}
        {section.type === "brand" && (
          <>
            <div className="brand-palette">
              {(project.brandColors || []).map((color) => (
                <div key={color.name}>
                  <div
                    className="color-chip"
                    style={{ background: color.hex }}
                  />
                  <p>
                    {color.name}
                    <span>{color.hex}</span>
                  </p>
                </div>
              ))}
            </div>
            <p className="asset-caption">
              Palette from the supplied Eleven Oasis guidelines · page 10
            </p>
          </>
        )}
        {section.images && (
          <ImageGallery
            images={section.images}
            layout={section.layout || "pair"}
          />
        )}
        {section.type === "results" && <Results project={project} />}
        {section.type === "external" && project.website && (
          <a
            className="external-project-link"
            href={project.website}
            target="_blank"
            rel="noreferrer"
          >
            Visit the live website <Arrow diagonal />
          </a>
        )}
      </Reveal>
    </section>
  );
}
export function ProjectNavigation({
  next,
  previous,
}: {
  next: Project;
  previous: Project;
}) {
  return (
    <nav className="project-navigation" aria-label="More projects">
      <Link className="previous-project" href={`/work/${previous.slug}/`}>
        <span className="eyebrow">← Previous project</span>
        <span>{previous.title}</span>
      </Link>
      <Link className="next-project" href={`/work/${next.slug}/`}>
        <span className="eyebrow">
          Next project / {String(next.order).padStart(2, "0")}
        </span>
        <strong>
          {next.title} <Arrow diagonal />
        </strong>
      </Link>
    </nav>
  );
}
