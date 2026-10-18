import Link from "next/link";
import type { Project } from "@/data/projects";
import { designOutcomes } from "@/data/eleven-oasis-case-study";
import { ElevenOasisMacbookVideo } from "./ElevenOasisMacbookVideo";
import { ElevenOasisMobileBrowsing } from "./ElevenOasisMobileBrowsing";
import { ElevenOasisStrategyShowcase } from "./ElevenOasisStrategyShowcase";
import { ElevenOasisResearch } from "./ElevenOasisResearch";
import { ElevenOasisSectionNavigation } from "./ElevenOasisSectionNavigation";
import "./ElevenOasisCaseStudy.css";
import "./ElevenOasisTypography.css";

export function ElevenOasisCaseStudy({ project, previous, next }: {
  project: Project;
  previous: Project;
  next: Project;
}) {
  const guidelines = project.sections.find(section => section.id === "visual-system");
  return (
    <div className="eleven-case-study">
      <ElevenOasisSectionNavigation />
      <section id="problem" className="eleven-study-section eleven-main-section eleven-problem" aria-labelledby="eleven-problem-title" tabIndex={-1}>
        <div className="eleven-problem-content">
          <header className="eleven-study-heading">
            <p>01 / THE CHALLENGE</p>
            <h2 id="eleven-problem-title">PROBLEM</h2>
            <p className="eleven-problem-headline">A recognizable brand, but a fragmented shopping experience.</p>
          </header>
          <ol className="eleven-problem-statements">
            <li>
              <h3>01 / FRAGMENTED INFORMATION ARCHITECTURE</h3>
              <p>An inconsistent content hierarchy made navigation and product discovery less intuitive.</p>
            </li>
            <li>
              <h3>02 / ONE-SIZE-FITS-ALL SHOPPING JOURNEY</h3>
              <p>PRINT and CLASSIC GEAR lacked distinct pathways tailored to different shopping intentions.</p>
            </li>
            <li>
              <h3>03 / LIMITED PURCHASE CONFIDENCE</h3>
              <p>Customer reviews, social proof, and purchase assurances were not prominently communicated.</p>
            </li>
            <li>
              <h3>04 / DISCONNECTED BRAND &amp; COMMERCE</h3>
              <p>Brand storytelling wasn&apos;t effectively translated into clear product entry points and purchase actions.</p>
            </li>
          </ol>
        </div>
        <div className="eleven-project-preview">
          <section className="eleven-desktop-journey" aria-labelledby="eleven-desktop-journey-title">
            <p id="eleven-desktop-journey-title" className="eleven-journey-eyebrow">PC SHOPPING JOURNEY</p>
            <ElevenOasisMacbookVideo />
          </section>
          <ElevenOasisMobileBrowsing />
        </div>
      </section>

      <section id="strategy" className="eleven-study-section eleven-main-section" aria-labelledby="eleven-strategy-title" tabIndex={-1}>
        <header className="eleven-study-heading">
          <p>02 / STRATEGY</p>
          <h2 id="eleven-strategy-title">STRATEGY</h2>
          <p className="eleven-section-headline">Designing a clearer path from discovery to purchase.</p>
        </header>
        <ElevenOasisStrategyShowcase brandingImages={guidelines?.images || []} brandingNotes={guidelines?.body || []} />
      </section>

      <ElevenOasisResearch />

      <section id="results" className="eleven-study-section eleven-main-section" aria-labelledby="eleven-results-title" tabIndex={-1}>
        <header className="eleven-study-heading">
          <p>04 / DESIGN DELIVERABLES</p>
          <h2 id="eleven-results-title">RESULTS</h2>
          <p className="eleven-section-headline">A more cohesive foundation for the Eleven Oasis shopping experience.</p>
        </header>
        <div className="eleven-outcomes">
          {designOutcomes.map(outcome => (
            <article key={outcome.number}>
              <h3><span className="eleven-outcome-number">{outcome.number} / </span>{outcome.title}</h3>
              <p>{outcome.body}</p>
            </article>
          ))}
        </div>
        <p className="eleven-outcomes-note">These outcomes describe design deliverables. Verified post-launch business performance data is not presented.</p>
        <div className="eleven-reflection eleven-editorial-row">
          <h3>REFLECTION</h3>
          <p className="eleven-study-copy">This project reinforced the importance of connecting brand expression with practical shopping behavior. A successful DTC experience needs more than strong visuals—it needs clear pathways, useful product information, and consistent interactions that help customers move forward with confidence.</p>
        </div>
      </section>
      <nav className="eleven-case-pagination" aria-label="More projects">
        <Link href={`/work/${previous.slug}/`}>← Previous project</Link>
        <Link href={`/work/${next.slug}/`}>Next project →</Link>
      </nav>
    </div>
  );
}
