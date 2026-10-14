import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { Arrow } from "./Arrow";
export function ProjectCard({
  project,
  featured = false,
  index = 0,
}: {
  project: Project;
  featured?: boolean;
  index?: number;
}) {
  return (
    <article
      className={`project-card ${featured ? "featured-card" : `card-${index}`}`}
    >
      <Link
        href={`/work/${project.slug}/`}
        className={`project-cover cover-${project.slug}`}
        aria-label={`View ${project.title} case study`}
      >
        {featured ? (
          <div className="digital-presentation">
            <div className="project-cover-title">
              <p className="eyebrow">
                {project.discipline} experience /{" "}
                {String(project.order).padStart(2, "0")}
              </p>
              <h3>
                {project.title.split(" ").map((word) => (
                  <span className="cover-title-word" key={word}>
                    {word}
                  </span>
                ))}
              </h3>
              <p>{project.coverStatement || project.subtitle}</p>
              <span className="project-cover-note">
                {project.coverContext || project.cover.caption}
              </span>
            </div>
            <div className="browser-frame">
              <div className="browser-chrome">
                <i />
                <i />
                <i />
                <span>
                  {project.website
                    ? new URL(project.website).hostname.replace(/^www\./, "")
                    : project.title}
                </span>
              </div>
              <div className="browser-screen">
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  width={project.cover.width}
                  height={project.cover.height}
                  sizes="(max-width: 700px) 80vw, 60vw"
                />
              </div>
            </div>
          </div>
        ) : (
          <Image
            className="cover-image"
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(max-width: 700px) 100vw, 60vw"
          />
        )}
        <span className="project-open">
          <Arrow diagonal />
        </span>
      </Link>
      <div className="project-caption">
        <div>
          <Link href={`/work/${project.slug}/`}>
            <h3>{project.title}</h3>
          </Link>
          <p>{project.category}</p>
        </div>
        <span className="project-index">
          {String(project.order).padStart(2, "0")} <Arrow diagonal />
        </span>
      </div>
      {featured && (
        <div
          className="featured-results"
          aria-label="Reported Eleven Oasis results"
        >
          {project.results?.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
          <Link href={`/work/${project.slug}/#results`} className="text-link">
            Explore the impact <Arrow />
          </Link>
          {project.resultsSummary && (
            <p className="featured-result-note">{project.resultsSummary}</p>
          )}
        </div>
      )}
    </article>
  );
}
