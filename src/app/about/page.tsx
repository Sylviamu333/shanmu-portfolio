import type { Metadata } from "next";
import Link from "next/link";
import { personal } from "@/data/personal";
import { Contact } from "@/components/Contact";
import "./about.css";

export const metadata: Metadata = {
  title: "About",
  description: personal.biography,
};

export default function AboutPage() {
  return (
    <main id="main" className="about-page">
      <section className="about-page-content" aria-labelledby="about-title">
        <Link className="eyebrow" href="/#work">← Selected work</Link>
        <h1 id="about-title">About {personal.name}</h1>
        <p className="about-page-role">{personal.positioning}</p>
        <div className="about-page-copy">
          <p>{personal.introduction}</p>
          <p>{personal.biography}</p>
          <h2>Design services</h2>
          <ul>
            {personal.specialties.map(specialty => <li key={specialty}>{specialty}</li>)}
          </ul>
          {personal.resume && (
            <a className="text-link" href={personal.resume} target="_blank" rel="noreferrer">View resume ↗</a>
          )}
        </div>
      </section>
      <Contact />
    </main>
  );
}
