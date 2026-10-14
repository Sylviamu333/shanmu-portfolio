import { personal } from "@/data/personal";
import { Arrow } from "@/components/Arrow";
export function HomeIntro() {
  return (
    <section className="home-intro" aria-labelledby="home-title">
      <div className="home-intro-heading">
        <div>
          <p className="home-role">{personal.positioning}</p>
          <h1 id="home-title">
            {personal.name}
            <span className="home-name-period">.</span>
          </h1>
        </div>
        <div className="home-signature" aria-hidden="true">
          <span>sm</span>
          <svg viewBox="0 0 100 100" fill="none">
            <path
              d="M15 66C4 22 54 3 83 29c22 21 8 69-35 62C19 87 0 57 25 30c26-30 69-9 67 22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      <p className="home-introduction">{personal.introduction}</p>
      <a className="home-work-link" href="#work">
        <span>Explore my work</span>
        <span className="home-link-arrow">
          <Arrow />
        </span>
      </a>
    </section>
  );
}
