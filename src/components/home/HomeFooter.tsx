import { personal } from "@/data/personal";
import { homepage } from "@/data/homepage";
import { PortfolioCard } from "./Decorations";
export function HomeFooter() {
  const socialLinks = [
    { label: "LinkedIn", url: personal.linkedin },
    { label: "Behance", url: personal.behance },
    { label: "Instagram", url: personal.instagram },
    { label: "Resume", url: personal.resume },
  ].filter((link) => link.url);
  return (
    <footer id="contact" className="home-footer">
      <div className="home-container">
        <div className="home-footer-inner">
          <a
            className="home-footer-art"
            href="#top"
            aria-label="SHAN MU — return to top"
            data-home-reveal="0"
          >
            <PortfolioCard name={personal.name} role={personal.positioning} />
          </a>
          <div className="home-footer-links" data-home-reveal="0.09">
            <nav aria-label="Footer navigation">
              <a href="#work">Work</a>
              <a href="#about">About</a>
              {personal.email ? (
                <a href={`mailto:${personal.email}`}>Say hello ↗</a>
              ) : (
                <a href="#top">Back to top ↑</a>
              )}
            </nav>
            {socialLinks.length > 0 && (
              <div className="home-social-links">
                {socialLinks.map((link) => (
                  <a
                    href={link.url!}
                    key={link.label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            )}
            {!personal.email && (
              <p className="home-contact-note">{homepage.contactPending}</p>
            )}
          </div>
        </div>
        <div className="home-footer-bottom" data-home-reveal="0.16">
          <span>
            © {new Date().getFullYear()} {personal.name}
          </span>
          <span>{homepage.footerCaption}</span>
        </div>
      </div>
    </footer>
  );
}
