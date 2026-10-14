import { personal } from "@/data/personal";
import { orderedProjects } from "@/data/projects";
import { WorkGallery } from "@/components/WorkGallery";
import { Contact } from "@/components/Contact";
import { Arrow } from "@/components/Arrow";
import { OrbitMark, Reveal } from "@/components/Motion";
export default function Home() {
  return (
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-topline">
          <span className="eyebrow">
            Digital experiences & visual identities
          </span>
          <span className="eyebrow">Portfolio / Selected work</span>
        </div>
        <h1 id="hero-title">
          SHAN MU<span className="hero-dot">.</span>
        </h1>
        <div className="hero-bottom">
          <div className="hero-mark">
            <OrbitMark />
            <span>
              Thoughtful by design.
              <br />
              Distinctive by nature.
            </span>
          </div>
          <p>{personal.introduction}</p>
          <a
            href="#work"
            className="hero-scroll"
            aria-label="Explore selected work"
          >
            <Arrow />
            <span>Explore work</span>
          </a>
        </div>
      </section>
      <section id="work" className="work-section">
        <div className="section-kicker">
          <span>01 / Selected work</span>
          <span>A meeting of clarity & character.</span>
        </div>
        <Reveal>
          <div className="section-title">
            <h2>
              Work with
              <br />
              <em>perspective.</em>
            </h2>
            <p>
              From how it works
              <br />
              to how it feels.
            </p>
          </div>
        </Reveal>
        <WorkGallery projects={orderedProjects} />
      </section>
      <section id="about" className="about-section">
        <div className="section-kicker">
          <span>02 / About</span>
          <span>One practice. Many perspectives.</span>
        </div>
        <Reveal>
          <div className="about-layout">
            <h2>
              Connecting
              <br />
              the useful
              <br />& the <em>expressive.</em>
            </h2>
            <div className="about-copy">
              <span className="eyebrow">Hello, I’m Shan.</span>
              <p>{personal.biography}</p>
              <span className="personal-positioning">
                {personal.positioning}
              </span>
              <div className="specialties">
                {personal.specialties.map((specialty, i) => (
                  <div key={specialty}>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <h3>{specialty}</h3>
                  </div>
                ))}
              </div>
              <dl className="personal-details">
                <div>
                  <dt>Location</dt>
                  <dd>{personal.location || "To be added"}</dd>
                </div>
                <div>
                  <dt>Experience</dt>
                  <dd>{personal.experience || "To be added"}</dd>
                </div>
                <div>
                  <dt>Skills</dt>
                  <dd>{personal.skills.join(" · ")}</dd>
                </div>
              </dl>
              {personal.resume ? (
                <a
                  className="text-link"
                  href={personal.resume}
                  target="_blank"
                  rel="noreferrer"
                >
                  View resume <Arrow diagonal />
                </a>
              ) : (
                <span className="resume-pending">Resume · Coming soon</span>
              )}
            </div>
          </div>
        </Reveal>
      </section>
      <Contact />
    </main>
  );
}
