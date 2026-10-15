import Image from "next/image";
import Link from "next/link";
import type { Project, ProjectImage } from "@/data/projects";
import { Arrow } from "@/components/Arrow";
import { ElevenOasisPreview } from "./ElevenOasisPreview";
import { EarlyBirdsPreview } from "./EarlyBirdsPreview";
import { CastlePreview } from "./CastlePreview";
import { KeyVisualPreview } from "./KeyVisualPreview";
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
  // Homepage presentation only: the existing photography detail keeps its identity.
  const keyVisual = project.slug === "visual-experiments";
  const title = keyVisual ? "Key Visual" : project.title;
  const year = keyVisual ? "2023 & 2024" : elevenOasis ? "2026" : earlyBirds ? "2024" : project.year;
  return (
    <article
      className={`home-project project-discipline-${project.discipline.toLowerCase()}`}
    >
      <Link
        href={`/work/${project.slug}/`}
        className="home-project-link"
        data-case-study-badge={castle ? "fixed" : undefined}
        aria-label={`View ${title} case study`}
      >
        <div className={`home-project-art art-${project.slug}`}>
          {elevenOasis ? (
            <ElevenOasisPreview />
          ) : earlyBirds ? (
            <EarlyBirdsPreview />
          ) : castle ? (
            <CastlePreview />
          ) : keyVisual ? (
            <KeyVisualPreview />
          ) : (
            <div className="home-single-art">
              <Artwork image={project.cover} />
            </div>
          )}
          {castle ? (
            <span className="castle-case-study" aria-hidden="true">Read case study ↗</span>
          ) : (
            <span className="home-view-project" aria-hidden="true">
              <Arrow diagonal />
            </span>
          )}
        </div>
        <div className={`home-project-caption${earlyBirds ? " ebc-caption" : castle ? " castle-caption" : keyVisual ? " key-visual-caption" : ""}`}>
          <h3>{elevenOasis ? "SHOPIFY/E-COMMERCE WEBSITE" : title}</h3>
          <p>
            <span className="home-project-category">
              {keyVisual ? "PHOTOGRAPHY" : earlyBirds ? "BRANDING" : project.category.split(" / ")[0].trim()}
            </span>
            {year && (
              <span className="home-project-year">
                {elevenOasis || earlyBirds || castle || keyVisual ? " - " : " · "}{year}
              </span>
            )}
          </p>
        </div>
        <span className="home-project-description">{project.description}</span>
      </Link>
    </article>
  );
}
