import Link from "next/link";
import type { Project } from "@/data/projects";
import { homepageUX, uxDecisions, collectionImages, productDetailImages, interfaceSystemImages } from "@/data/eleven-oasis-case-study";
import { ImageGallery } from "@/components/ImageGallery";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Reveal } from "@/components/Motion";
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
      <section id="homepage" className="eleven-homepage" aria-labelledby="eleven-homepage-title">
        <div className="eleven-section-topline">
          <h2 id="eleven-homepage-title">01 / HOMEPAGE</h2>
          <nav aria-label="Eleven Oasis case study sections">
            <a href="#homepage">Homepage</a>
            <a href="#ux-design-details">UX Design Details</a>
            <a href="#collection-pdp-design-system">Collection, PDP &amp; Design System</a>
          </nav>
        </div>
        <ImageGallery images={[homepageUX]} layout="full" />
      </section>

      <section id="ux-design-details" className="eleven-study-section" aria-labelledby="eleven-decisions-title">
        <header className="eleven-study-heading">
          <p>02 / UX DESIGN DETAILS</p>
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
      </section>

      <section id="collection-pdp-design-system" className="eleven-study-section" aria-labelledby="eleven-system-title">
        <header className="eleven-study-heading">
          <h2 id="eleven-system-title">03 / COLLECTION, PDP &amp; DESIGN SYSTEM</h2>
        </header>
        <Reveal>
          <article id="collection" className="eleven-editorial-row">
            <div>
              <p className="eleven-subsection-label">03.1 / Collection Page</p>
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
              <p className="eleven-subsection-label">03.2 / Product Detail Page</p>
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
                <p className="eleven-subsection-label">03.3 / Design System</p>
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
        <nav className="eleven-case-pagination" aria-label="More projects">
          <Link href={`/work/${previous.slug}/`}>← Previous project</Link>
          <Link href={`/work/${next.slug}/`}>Next project →</Link>
        </nav>
      </section>
    </div>
  );
}
