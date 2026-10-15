import Image from "next/image";
import Link from "next/link";
import type { Project, ProjectImage } from "@/data/projects";
import { Arrow } from "@/components/Arrow";
import { ElevenOasisPreview } from "./ElevenOasisPreview";
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
  const elevenOasis = project.slug === "eleven-oasis";
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
          {elevenOasis ? (
            <ElevenOasisPreview />
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
        <div
          className={`home-project-caption${elevenOasis ? " eleven-oasis-caption" : ""}`}
        >
          <h3>{elevenOasis ? "SHOPIFY/E-COMMERCE WEBSITE" : project.title}</h3>
          <p>
            {elevenOasis ? (
              "UI/UX DESIGN - 2026"
            ) : (
              <>
                {project.category.split(" / ")[0].trim()}
                {project.year && <span> · {project.year}</span>}
              </>
            )}
          </p>
        </div>
        <span className="home-project-description">{project.description}</span>
      </Link>
    </article>
  );
}
