import Image from "next/image";
import Link from "next/link";
import type { Project, ProjectImage } from "@/data/projects";
import { Arrow } from "@/components/Arrow";
function Artwork({ image }: { image: ProjectImage }) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes="(max-width: 700px) 95vw, 48vw"
    />
  );
}
export function HomeProject({ project }: { project: Project }) {
  return (
    <article
      className={`home-project project-discipline-${project.discipline.toLowerCase()}`}
    >
      <Link
        href={`/work/${project.slug}/`}
        className="home-project-link"
        aria-label={`View ${project.title} case study`}
      >
        <div className={`home-project-art art-${project.slug}`}>
          {project.slug === "eleven-oasis" ? (
            <div className="home-site-window">
              <div className="home-window-top">
                <span>Eleven Oasis</span>
                <span>Original website · before redesign</span>
              </div>
              <div className="home-site-screenshot">
                <Artwork image={project.cover} />
              </div>
            </div>
          ) : project.slug === "pix-metaborg" ? (
            <div className="home-poster-pair">
              <Artwork image={project.cover} />
              {project.gallery[1] && <Artwork image={project.gallery[1]} />}
            </div>
          ) : project.slug === "visual-experiments" ? (
            <div className="home-visual-fan">
              {project.gallery.slice(0, 3).map((image) => (
                <Artwork key={image.src} image={image} />
              ))}
            </div>
          ) : (
            <div className="home-single-art">
              <Artwork image={project.cover} />
            </div>
          )}
          <span className="home-view-project" aria-hidden="true">
            <Arrow diagonal />
          </span>
        </div>
        <div className="home-project-caption">
          <h3>{project.title}</h3>
          <p>
            {project.category.split(" / ")[0].trim()}
            {project.year && <span> · {project.year}</span>}
          </p>
        </div>
        <span className="home-project-description">{project.description}</span>
      </Link>
    </article>
  );
}
