import { personal } from "@/data/personal";
import { Reveal } from "@/components/Motion";
export function HomeAbout() {
  return (
    <section id="about" className="home-about" aria-labelledby="about-heading">
      <Reveal>
        <div className="home-about-layout">
          <div>
            <p className="home-small-label">About my practice</p>
            <h2 id="about-heading">
              Digital thinking.
              <br />
              Visual character.
            </h2>
          </div>
          <div className="home-about-specialties">
            {personal.specialties.map((specialty) => (
              <div key={specialty}>
                <span>{specialty}</span>
                <span aria-hidden="true">↗</span>
              </div>
            ))}
            {personal.resume && (
              <a
                className="home-resume-link"
                href={personal.resume}
                target="_blank"
                rel="noreferrer"
              >
                View resume ↗
              </a>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
