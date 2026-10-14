import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { Arrow } from "./Arrow";
export function RelatedProjects({
  current,
  projects,
}: {
  current: Project;
  projects: Project[];
}) {
  const sameDiscipline = projects.filter(
    (project) =>
      project.slug !== current.slug &&
      project.discipline === current.discipline,
  );
  const related = (
    sameDiscipline.length
      ? sameDiscipline
      : projects.filter((project) => project.slug !== current.slug)
  ).slice(0, 2);
  return (
    <aside className="related-projects" aria-label="Related projects">
      <p className="eyebrow">More perspectives / Related work</p>
      <div className="related-project-list">
        {related.map((project) => (
          <Link key={project.slug} href={`/work/${project.slug}/`}>
            <div className="related-thumb">
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                sizes="100px"
              />
            </div>
            <div>
              <h3>{project.title}</h3>
              <p>{project.category}</p>
            </div>
            <Arrow diagonal />
          </Link>
        ))}
      </div>
    </aside>
  );
}
