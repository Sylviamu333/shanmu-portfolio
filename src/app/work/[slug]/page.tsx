import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, orderedProjects } from "@/data/projects";
import { CaseStudySection, ProjectNavigation } from "@/components/CaseStudy";
import { Contact } from "@/components/Contact";
import { Arrow } from "@/components/Arrow";
import { RelatedProjects } from "@/components/RelatedProjects";
import { PhotographyExperience } from "@/components/photography/PhotographyExperience";
import "./castle.css";
export const dynamicParams = false;
export function generateStaticParams() {
  return orderedProjects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  const description = slug === "visual-experiments"
    ? "Photography and art direction: STAY FOR THE NIGHT, THE ORIGINAL 1, and Early Birds Club Drop 1."
    : project.description;
  return {
    title: project.title,
    description,
    openGraph: {
      title: `${project.title} — SHAN MU`,
      description,
    },
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  if (slug === "visual-experiments") {
    return (
      <main id="main" className="visual-photography-page">
        <PhotographyExperience />
        <Contact />
      </main>
    );
  }
  const index = orderedProjects.findIndex((item) => item.slug === slug);
  const next = orderedProjects[(index + 1) % orderedProjects.length];
  const previous =
    orderedProjects[
      (index - 1 + orderedProjects.length) % orderedProjects.length
    ];
  return (
    <main id="main" className={`project-page project-${slug}`}>
      <section className="case-hero">
        <div className="case-topline">
          <Link href="/#work">← Selected work</Link>
          <span>
            {String(project.order).padStart(2, "0")} /{" "}
            {String(orderedProjects.length).padStart(2, "0")}
          </span>
        </div>
        {project.overviewLabel && <p className="eyebrow">{project.overviewLabel}</p>}
        <p className="eyebrow">
          {project.category}
          {project.year ? ` · ${project.year}` : ""}
        </p>
        <h1>
          {project.title}
          <span style={{ color: project.accent }}>.</span>
        </h1>
        <div className="case-intro">
          <h2>{project.subtitle}</h2>
          <p>{project.description}</p>
        </div>
        <dl className="project-facts">
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
        {project.website && (
          <a
            className="text-link"
            href={project.website}
            target="_blank"
            rel="noreferrer"
          >
            Visit live website <Arrow diagonal />
          </a>
        )}
        <div className={`case-cover case-cover-${slug}`}>
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            width={project.cover.width}
            height={project.cover.height}
            sizes="100vw"
            preload
          />
        </div>
        <p className="asset-caption">
          {project.cover.caption || project.title}
        </p>
      </section>
      <nav className="case-index" aria-label="Case study sections">
        {project.sections.map((section) => (
          <a key={section.id} href={`#${section.id}`}>
            {section.id.replaceAll("-", " ")}
          </a>
        ))}
      </nav>
      <div className="case-sections">
        {project.sections.map((section, index) => (
          <CaseStudySection
            key={section.id}
            section={section}
            index={index}
            project={project}
          />
        ))}
      </div>
      <ProjectNavigation next={next} previous={previous} />
      <RelatedProjects current={project} projects={orderedProjects} />
      <Contact />
    </main>
  );
}
