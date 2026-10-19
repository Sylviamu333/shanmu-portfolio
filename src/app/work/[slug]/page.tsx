import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProject, orderedProjects } from "@/data/projects";
import { CaseStudySection, ProjectNavigation } from "@/components/CaseStudy";
import { RelatedProjects } from "@/components/RelatedProjects";
import { PhotographyExperience } from "@/components/photography/PhotographyExperience";
import { ProjectHero } from "@/components/ProjectHero";
import { ElevenOasisCaseStudy } from "@/components/eleven-oasis/ElevenOasisCaseStudy";
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
      <main id="main" className="project-page visual-photography-page">
        <PhotographyExperience projectNumber={project.order} projectTotal={orderedProjects.length} />
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
        <ProjectHero
          index={project.order}
          total={orderedProjects.length}
          title={slug === "eleven-oasis" ? project.title.toUpperCase() : <>{project.title}<span style={{ color: project.accent }}>.</span></>}
          category={slug === "eleven-oasis" ? "UI/UX DESIGN / E-COMMERCE" : `${project.category}${project.year ? ` · ${project.year}` : ""}`}
          description={project.description}
          summary={project.subtitle}
          facts={slug === "eleven-oasis" ? project.facts.map(fact => fact.label === "Role" ? { ...fact, value: "UI/UX DESIGNER" } : fact) : project.facts}
          website={project.website}
          overviewLabel={project.overviewLabel}
        />
        {slug === "eleven-oasis" && <ElevenOasisCaseStudy project={project} previous={previous} next={next} />}
        {slug !== "eleven-oasis" && <>
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
        </>}
      </section>
      {slug !== "eleven-oasis" && <>
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
      </>}
    </main>
  );
}
