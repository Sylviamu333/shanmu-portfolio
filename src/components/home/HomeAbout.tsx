import { personal } from "@/data/personal";
import { homepage } from "@/data/homepage";
import { Flower } from "./Decorations";
export function HomeAbout() {
  return (
    <aside id="about" className="home-about" aria-labelledby="about-heading">
      <Flower className="about-flower" />
      <p className="home-small-label">{homepage.aboutLabel}</p>
      <h2 id="about-heading">
        {homepage.aboutTitle[0]}
        <br />
        {homepage.aboutTitle[1]}
      </h2>
      <ul>
        {personal.specialties.map((specialty) => (
          <li key={specialty}>{specialty}</li>
        ))}
      </ul>
      {personal.resume ? (
        <a href={personal.resume} target="_blank" rel="noreferrer">
          View resume ↗
        </a>
      ) : (
        <a href="#contact">{homepage.contactAction}</a>
      )}
    </aside>
  );
}
