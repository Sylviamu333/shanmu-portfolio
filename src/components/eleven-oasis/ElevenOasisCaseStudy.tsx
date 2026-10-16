import Link from "next/link";
import type { Project } from "@/data/projects";
import { homepageUX, uxDecisions, collectionImages, productDetailImages, interfaceSystemImages } from "@/data/eleven-oasis-case-study";
import { ImageGallery } from "@/components/ImageGallery";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Reveal } from "@/components/Motion";
import { ElevenOasisMacbookVideo } from "./ElevenOasisMacbookVideo";
import { ElevenOasisSectionNavigation } from "./ElevenOasisSectionNavigation";
import "./ElevenOasisCaseStudy.css";

export function ElevenOasisCaseStudy({ project, previous, next }: {
  project: Project;
  previous: Project;
  next: Project;
}) {
  const guidelines = project.sections.find(section => section.id === "visual-system");
  const originals = [...(project.comparisons || [])].reverse();
  return (
    <div className="eleven-case-study">
      <ElevenOasisSectionNavigation />
      <div className="eleven-project-preview">
        <p className="eleven-preview-label">PROJECT PREVIEW / FINAL DESIGN</p>
        <ElevenOasisMacbookVideo />
      </div>

      <section id="problem" className="eleven-study-section eleven-main-section eleven-problem" aria-labelledby="eleven-problem-title" tabIndex={-1}>
        <header className="eleven-study-heading">
          <p>01 / THE CHALLENGE</p>
          <h2 id="eleven-problem-title">PROBLEM</h2>
          <p className="eleven-problem-headline">A visually functional storefront, but a fragmented shopping experience.</p>
        </header>
        <ol className="eleven-problem-statements">
          <li>
            <h3>01 / FRAGMENTED WEBSITE ARCHITECTURE</h3>
            <p>Disorganized page structures and weak SEO foundations limited usability, discoverability, and scalability.</p>
          </li>
          <li>
            <h3>02 / UNDIFFERENTIATED SHOPPING JOURNEYS</h3>
            <p>PRINT and CLASSIC GEAR lacked distinct shopping paths tailored to different product categories and customer needs.</p>
          </li>
          <li>
            <h3>03 / INSUFFICIENT PURCHASE TRUST</h3>
            <p>Limited visibility of customer reviews, social proof, and purchase guarantees made it harder to build customer confidence.</p>
          </li>
          <li>
            <h3>04 / DISCONNECTED BRAND &amp; CONVERSION</h3>
            <p>Brand-focused content lacked clear product entry points and purchase actions, creating friction between discovery and conversion.</p>
          </li>
        </ol>
      </section>

      <section id="strategy" className="eleven-study-section eleven-main-section" aria-labelledby="eleven-strategy-title" tabIndex={-1}>
        <header className="eleven-study-heading">
          <p>02 / STRATEGY</p>
          <h2 id="eleven-strategy-title">Four Homepage UX Strategies</h2>
        </header>
        <p className="eleven-study-copy eleven-strategy-summary">Dual-Collection Navigation, Shoppable Hero, Trust &amp; Conversion, and Responsive Design connect the homepage experience to a clearer shopping journey.</p>
        <div id="homepage" className="eleven-homepage">
          <ImageGallery images={[homepageUX]} layout="full" />
        </div>
      </section>

      <section id="decisions" className="eleven-main-section" aria-labelledby="eleven-decisions-title" tabIndex={-1}>
        <div id="ux-design-details" className="eleven-study-section">
          <header className="eleven-study-heading">
            <p>03 / DECISIONS</p>
            <h2 id="eleven-decisions-title">Key UX Decisions</h2>
          </header>
          {uxDecisions.map(decision => (
            <Reveal key={decision.id}>
              <article id={decision.id} className="eleven-editorial-row">
                <div>
                  <p className="eleven-subsection-label">{decision.number} / {decision.label}</p>
                  <h3>{decision.title}</h3>
                </div>
                <div className="eleven-study-copy">
                  <p>{decision.body}</p>
                  <ul>{decision.points.map(point => <li key={point}>{point}</li>)}</ul>
                  {!!decision.images?.length && <ImageGallery images={decision.images} layout="pair" />}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div id="collection-pdp-design-system" className="eleven-study-section">
          <header className="eleven-study-heading">
            <h2 id="eleven-system-title">COLLECTION, PDP &amp; DESIGN SYSTEM</h2>
          </header>
          <Reveal>
            <article id="collection" className="eleven-editorial-row">
              <div>
                <p className="eleven-subsection-label">03.5 / Collection Page</p>
                <h3>Simplifying Product Discovery</h3>
              </div>
              <div className="eleven-study-copy">
                <p>The collection-page design focus is a clear product-listing structure: organize categories, make filtering and sorting easy to find, and keep imagery, product names and prices easy to scan.</p>
                <p>The same browsing logic should carry from desktop to mobile, helping shoppers narrow their choices efficiently without losing their place in the collection.</p>
                {!!collectionImages.length && <ImageGallery images={collectionImages} layout="pair" />}
              </div>
            </article>
          </Reveal>
          <Reveal>
            <article id="product-detail" className="eleven-editorial-row">
              <div>
                <p className="eleven-subsection-label">03.6 / Product Detail Page</p>
                <h3>Designing for Purchase Confidence</h3>
              </div>
              <div className="eleven-study-copy">
                <p>The product-page priorities are a readable information hierarchy, a useful image gallery, clear pricing and promotions, and easy-to-understand size and color selection. Add-to-cart actions should stay prominent as shoppers evaluate the product.</p>
                <p>The original PDP includes fit and fabric information, bundle offers, payment options, reviews and FAQs. Reorganizing this information around the purchase decision is the focus across desktop and mobile.</p>
                {!!productDetailImages.length && <ImageGallery images={productDetailImages} layout="pair" />}
                <details className="eleven-original-context">
                  <summary>Original storefront context <span aria-hidden="true">＋</span></summary>
                  <p>Authentic pre-redesign screens, retained as research context. Switch pages, scroll the complete captures, or open the original PNGs.</p>
                  <BeforeAfter comparisons={originals} originalOnly />
                </details>
              </div>
            </article>
          </Reveal>
          <Reveal>
            <article id="visual-system" className="eleven-system-article">
              <div className="eleven-editorial-row">
                <div>
                  <p className="eleven-subsection-label">03.7 / Design System</p>
                  <h3>Building a Consistent &amp; Scalable Design System</h3>
                </div>
                <div className="eleven-study-copy">
                  {guidelines?.body?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                  <p>The interface-system focus connects these brand foundations to reusable icons, buttons, interaction states and product-card components, with responsive typography specifications for a consistent Shopify storefront.</p>
                </div>
              </div>
              {!!guidelines?.images?.length && <div className="eleven-brand-guidelines"><ImageGallery images={guidelines.images} layout="pair" /></div>}
              {!!interfaceSystemImages.length && <ImageGallery images={interfaceSystemImages} layout="pair" />}
            </article>
          </Reveal>
        </div>
      </section>

      <section id="results" className="eleven-study-section eleven-main-section" aria-labelledby="eleven-results-title" tabIndex={-1}>
        <header className="eleven-study-heading">
          <p>04 / RESULTS</p>
          <h2 id="eleven-results-title">Design Deliverables &amp; Reflection</h2>
        </header>
        <div className="eleven-study-copy">
          <p>The documented output brings together collection navigation, shoppable campaign entry points, purchase reassurance and responsive layout decisions, supported by the homepage presentation and brand guidelines.</p>
          <p>A consistent collection-switching pattern is the organizing idea: it keeps two shopping journeys legible while preserving a shared storefront.</p>
          <p>No verified post-launch conversion data is available here, so these deliverables are not presented as measured business improvements.</p>
        </div>
      </section>
      <nav className="eleven-case-pagination" aria-label="More projects">
        <Link href={`/work/${previous.slug}/`}>← Previous project</Link>
        <Link href={`/work/${next.slug}/`}>Next project →</Link>
      </nav>
    </div>
  );
}
