import Link from "next/link";
import type { Project } from "@/data/projects";
import { homepageUX, homepageDecisionImages, mobileBrowsingImages, designOutcomes, uxDecisions, collectionImages, productDetailImages, interfaceSystemImages } from "@/data/eleven-oasis-case-study";
import { ImageGallery } from "@/components/ImageGallery";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Reveal } from "@/components/Motion";
import { ElevenOasisMacbookVideo } from "./ElevenOasisMacbookVideo";
import { ElevenOasisMobileBrowsing } from "./ElevenOasisMobileBrowsing";
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
        <p className="eleven-study-copy eleven-strategy-summary">The redesign focused on connecting two distinct product collections with more intuitive shopping journeys, clearer product entry points, stronger trust communication, and a consistent experience across devices.</p>
        <div id="homepage" className="eleven-homepage">
          <ImageGallery images={[homepageUX]} layout="full" />
        </div>
      </section>

      <section id="decisions" className="eleven-main-section" aria-labelledby="eleven-decisions-title" tabIndex={-1}>
        <div id="ux-design-details" className="eleven-study-section">
          <header className="eleven-study-heading">
            <p>03 / DESIGN RATIONALE</p>
            <h2 id="eleven-decisions-title">DECISIONS</h2>
            <p className="eleven-section-headline">Turning UX strategy into a more intuitive shopping experience.</p>
          </header>
          <p className="eleven-study-copy eleven-decisions-introduction">Each design decision was shaped around how shoppers discover products, evaluate options, and move toward purchase—while preserving the distinct character of both Eleven Oasis collections.</p>
          <Reveal>
            <article id="dual-collection-navigation" className="eleven-decision-group">
              <header className="eleven-editorial-row">
                <div>
                  <p className="eleven-subsection-label">01 / HOMEPAGE EXPERIENCE</p>
                  <h3>One storefront. Two distinct shopping journeys.</h3>
                </div>
                <div className="eleven-study-copy">
                  <p>I redesigned the collection switcher beneath the primary navigation to give PRINT and CLASSIC GEAR clearer identities and more relevant shopping paths.</p>
                  <p>PRINT emphasizes theme-led exploration through graphic styles, seasonal campaigns, and curated collections. CLASSIC GEAR prioritizes category-led discovery through direct apparel entry points.</p>
                  <p>Both experiences share a consistent interface, allowing shoppers to switch between collections without disrupting their browsing journey.</p>
                </div>
              </header>
              {!!homepageDecisionImages.length && <ImageGallery images={homepageDecisionImages} layout="full" />}
              {uxDecisions.filter(decision => decision.id === "shoppable-hero" || decision.id === "trust-conversion").map(decision => (
                <div id={decision.id} key={decision.id} className="eleven-decision-note">
                  <h4>{decision.label}</h4>
                  <p>{decision.body}</p>
                </div>
              ))}
            </article>
          </Reveal>
          <Reveal>
            <article id="responsive-design" className="eleven-decision-group">
              <header className="eleven-editorial-row">
                <div>
                  <p className="eleven-subsection-label">02 / MOBILE SHOPPING EXPERIENCE</p>
                  <h3>From product discovery to purchase on mobile.</h3>
                </div>
                <div className="eleven-study-copy">
                  <p>The desktop shopping strategy was adapted for smaller screens with accessible collection switching, streamlined product browsing, clear product information, and mobile-friendly purchasing interactions.</p>
                </div>
              </header>
              {!!mobileBrowsingImages.length && <ImageGallery images={mobileBrowsingImages} layout="full" />}
            </article>
          </Reveal>
        </div>

        <div id="collection-pdp-design-system" className="eleven-study-section">
          <header className="eleven-study-heading">
            <p className="eleven-subsection-label">03 / COLLECTION &amp; PRODUCT DETAIL EXPERIENCE</p>
            <h3 id="eleven-system-title" className="eleven-decision-headline">Simplifying decisions at every step of the shopping journey.</h3>
          </header>
          <Reveal>
            <article id="collection" className="eleven-editorial-row">
              <div>
                <p className="eleven-subsection-label">Collection Page</p>
                <h3>Simplifying Product Discovery</h3>
              </div>
              <div className="eleven-study-copy">
                <p>The collection-page design prioritizes clear categories, accessible filtering and sorting, and a product-card hierarchy that makes imagery, names, prices and product variations easy to compare.</p>
                <p>The same browsing logic carries from desktop to mobile, helping shoppers narrow their choices without losing their place in the collection.</p>
                {!!collectionImages.length && <ImageGallery images={collectionImages} layout="pair" />}
              </div>
            </article>
          </Reveal>
          <Reveal>
            <article id="product-detail" className="eleven-editorial-row">
              <div>
                <p className="eleven-subsection-label">Product Detail Page</p>
                <h3>Supporting Confident Purchase Decisions</h3>
              </div>
              <div className="eleven-study-copy">
                <p>The product-detail design connects the image gallery with clear product information, pricing and promotions, size and color selection, and a prominent add-to-cart action.</p>
                <p>On mobile, the same hierarchy supports product evaluation and purchasing interactions in a readable sequence. Original product-page screens are retained below as research context.</p>
                {!!productDetailImages.length && <ImageGallery images={productDetailImages} layout="pair" />}
                <details className="eleven-original-context">
                  <summary>Original storefront context <span aria-hidden="true">＋</span></summary>
                  <p>Authentic pre-redesign screens, retained as research context. Switch pages, scroll the complete captures, or open the original PNGs.</p>
                  <BeforeAfter comparisons={originals} originalOnly />
                </details>
              </div>
            </article>
          </Reveal>
        </div>
        <Reveal>
          <article id="visual-system" className="eleven-system-article">
            <header className="eleven-editorial-row">
              <div>
                <p className="eleven-subsection-label">04 / DESIGN SYSTEM</p>
                <h3>Building consistency across a growing storefront.</h3>
              </div>
              <div className="eleven-study-copy">
                <p>To support a more cohesive shopping experience, I organized reusable typography, iconography, and interface patterns across desktop and mobile layouts.</p>
              </div>
            </header>
            <div className="eleven-system-part eleven-editorial-row">
              <h4>TYPOGRAPHY</h4>
              <div className="eleven-study-copy">
                <p>Oswald and Open Sans form the storefront interface typography. The desktop and mobile hierarchy separates display headings, product information and supporting copy.</p>
                <p>The brand identity guideline below documents a separate Roboto family for brand applications.</p>
              </div>
            </div>
            <div className="eleven-system-part eleven-editorial-row">
              <h4>ICONOGRAPHY</h4>
              <div className="eleven-study-copy">
                <p>Search, account and shopping-bag symbols repeat across the storefront navigation. Supporting icons communicate review, shipping and guarantee information alongside shopping actions.</p>
              </div>
            </div>
            <div className="eleven-system-part eleven-editorial-row">
              <h4>REUSABLE COMPONENTS</h4>
              <div className="eleven-study-copy">
                <p>Buttons, product cards, labels and collection navigation establish recurring shopping patterns. Selectors and interaction states carry the same approach into product evaluation and purchase actions.</p>
              </div>
            </div>
            {!!interfaceSystemImages.length && <ImageGallery images={interfaceSystemImages} layout="full" />}
            <div className="eleven-system-part">
              <div className="eleven-editorial-row">
                <h4>BRAND GUIDELINES</h4>
                <div className="eleven-study-copy">
                  {guidelines?.body?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>
              {!!guidelines?.images?.length && <div className="eleven-brand-guidelines"><ImageGallery images={guidelines.images} layout="pair" /></div>}
            </div>
          </article>
        </Reveal>
      </section>

      <section id="results" className="eleven-study-section eleven-main-section" aria-labelledby="eleven-results-title" tabIndex={-1}>
        <header className="eleven-study-heading">
          <p>04 / DESIGN DELIVERABLES</p>
          <h2 id="eleven-results-title">RESULTS</h2>
          <p className="eleven-section-headline">A more cohesive foundation for the Eleven Oasis shopping experience.</p>
        </header>
        <div className="eleven-outcomes">
          {designOutcomes.map(outcome => (
            <article key={outcome.number}>
              <h3>{outcome.number} / {outcome.title}</h3>
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
