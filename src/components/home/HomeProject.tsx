import Image from "next/image";
import Link from "next/link";
import type { Project, ProjectImage } from "@/data/projects";
import { Arrow } from "@/components/Arrow";
import { ElevenOasisPreview } from "./ElevenOasisPreview";
import { EarlyBirdsPreview } from "./EarlyBirdsPreview";
import { CastlePreview } from "./CastlePreview";
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
  const earlyBirds = project.slug === "early-birds-club";
  const castle = project.slug === "team-wang-under-the-castle";
  const year = elevenOasis ? "2026" : earlyBirds ? "2024" : project.year;
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
          ) : earlyBirds ? (
            <EarlyBirdsPreview />
          ) : castle ? (
            <CastlePreview image={project.cover} />
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
        <div className={`home-project-caption${earlyBirds ? " ebc-caption" : castle ? " castle-caption" : ""}`}>
          <h3>{elevenOasis ? "SHOPIFY/E-COMMERCE WEBSITE" : project.title}</h3>
          <p>
            <span className="home-project-category">
              {earlyBirds ? "BRANDING" : project.category.split(" / ")[0].trim()}
            </span>
            {year && (
              <span className="home-project-year">
                {elevenOasis || earlyBirds || castle ? " - " : " · "}{year}
              </span>
            )}
          </p>
        </div>
        <span className="home-project-description">{project.description}</span>
      </Link>
    </article>
  );
}
