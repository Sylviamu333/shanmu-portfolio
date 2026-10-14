import { personal } from "@/data/personal";
import { Arrow } from "./Arrow";
export function Contact() {
  const links = [
    { label: "Email", url: personal.email ? `mailto:${personal.email}` : null },
    { label: "LinkedIn", url: personal.linkedin },
    { label: "Behance", url: personal.behance },
    { label: "Instagram", url: personal.instagram },
    { label: "Resume", url: personal.resume },
  ];
  return (
    <section id="contact" className="contact-section">
      <div className="section-kicker">
        <span>03 / Contact</span>
        <span>Good work starts with a conversation.</span>
      </div>
      <div className="contact-layout">
        <h2>
          Let’s make
          <br />
          something
          <br />
          <em>meaningful.</em>
          <span className="contact-period">↗</span>
        </h2>
        <div className="contact-links">
          {links.map((link) =>
            link.url ? (
              <a
                href={link.url}
                key={link.label}
                target={link.label === "Email" ? undefined : "_blank"}
                rel="noreferrer"
              >
                <span>{link.label}</span>
                <Arrow diagonal />
              </a>
            ) : (
              <div className="contact-pending" key={link.label}>
                <span>{link.label}</span>
                <span>Coming soon</span>
              </div>
            ),
          )}
        </div>
      </div>
      <div className="footer">
        <span>© {new Date().getFullYear()} SHAN MU</span>
        <span>Digital experiences. Visual identities.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </section>
  );
}
