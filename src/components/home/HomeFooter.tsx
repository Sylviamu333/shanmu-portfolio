import Link from "next/link";
import { personal } from "@/data/personal";
import { Arrow } from "@/components/Arrow";
export function HomeFooter() {
  const socialLinks = [
    { label: "LinkedIn", url: personal.linkedin },
    { label: "Behance", url: personal.behance },
    { label: "Instagram", url: personal.instagram },
    { label: "Resume", url: personal.resume },
  ].filter((link) => link.url);
  return (
    <footer id="contact" className="home-footer">
      <div className="home-footer-top">
        <div>
          <p className="home-small-label">Contact</p>
          <h2>
            Let’s connect<span>.</span>
          </h2>
        </div>
        <div className="home-footer-contact">
          {personal.email ? (
            <a className="home-email-link" href={`mailto:${personal.email}`}>
              {personal.email}
              <Arrow diagonal />
            </a>
          ) : (
            <p>Contact details will be added soon.</p>
          )}
          <div className="home-social-links">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url!}
                target="_blank"
                rel="noreferrer"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="home-footer-bottom">
        <Link href="/">{personal.name}</Link>
        <span>© {new Date().getFullYear()}</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
