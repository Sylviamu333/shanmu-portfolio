import Image from "next/image";
import Link from "next/link";
import type { Project, ProjectImage } from "@/data/projects";
import { Arrow } from "@/components/Arrow";
function Artwork({
  image,
  priority = false,
}: {
  image: ProjectImage;
  priority?: boolean;
}) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes="(max-width: 700px) 90vw, 540px"
      loading={priority ? "eager" : "lazy"}
    />
  );
}
export function HomeProject({ project }: { project: Project }) {
  const featured = project.slug === "eleven-oasis";
  return (
    <article
      className={`home-project ${featured ? "home-project-featured" : ""}`}
    >
      <Link
        href={`/work/${project.slug}/`}
        className={`home-project-art art-${project.slug}`}
        aria-label={`View ${project.title} case study`}
      >
        {featured ? (
          <div className="home-site-stage">
            <div className="home-site-label">
              <span className="home-small-label">UI/UX / E-commerce</span>
              <span>{project.title}</span>
              <p>{project.subtitle}</p>
              <span className="home-original-label">
                {project.coverContext || project.cover.caption}
              </span>
            </div>
            <div className="home-site-window">
              <div className="home-window-top">
                <div>
                  <i />
                  <i />
                  <i />
                </div>
                <span>
                  {project.website
                    ? new URL(project.website).hostname.replace(/^www\./, "")
                    : project.title}
                </span>
                <Arrow diagonal />
              </div>
              <div className="home-site-screenshot">
                <Artwork image={project.cover} priority />
              </div>
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
        <span className="home-view-project">
          <span>View project</span>
          <Arrow diagonal />
        </span>
      </Link>
      <div className="home-project-text">
        <div className="home-project-title">
          <Link href={`/work/${project.slug}/`}>
            <h3>{project.title}</h3>
          </Link>
          <Arrow diagonal />
        </div>
        <p className="home-project-category">
          {project.category}
          {project.year ? ` · ${project.year}` : ""}
        </p>
        <p className="home-project-description">{project.description}</p>
      </div>
      {featured && project.results && (
        <div className="home-project-impact">
          {project.results.map((metric) => (
            <div key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
          {project.resultsSummary && <p>{project.resultsSummary}</p>}
        </div>
      )}
    </article>
  );
}
