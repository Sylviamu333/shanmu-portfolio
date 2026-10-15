import type { Metadata } from "next";
import Image from "next/image";
import { about } from "@/data/about";
import { AboutPhotoCollage } from "@/components/about/AboutPhotoCollage";
import "./about.css";

export const metadata: Metadata = {
  title: "About",
  description: about.biography[0],
};

export default function AboutPage() {
  return (
    <main id="main" className="about-page">
      <h1 className="about-sr-only" id="about-title">About SHAN MU</h1>
      <div className="home-container about-editorial-shell">
        <div className="about-top-rule" aria-hidden="true" />
        <div className="about-editorial-grid">
          <section className="about-introduction" aria-labelledby="about-title">
            <picture className="about-illustration">
              <source srcSet="/about/about-shan-illustration.webp" type="image/webp" />
              <Image src="/about/about-shan-illustration.png" alt="Hi, I'm SHAN MU — hand-drawn illustration of Shan at her laptop, with pink lettering, a pencil, and a yellow pen" width={1467} height={1072} loading="eager" sizes="(max-width: 700px) 80vw, 410px" />
            </picture>
            <div className="about-biography">
              {about.biography.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
              <section className="about-interests" aria-labelledby="about-interests-title">
                <h2 id="about-interests-title">What I work on</h2>
                <ul>{about.expertise.map(item => <li key={item}>{item}</li>)}</ul>
              </section>
              <p className="about-contact" id="about-contact">
                Find me on <a href={about.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>, or write to me at <a href={`mailto:${about.email}`}>{about.email}</a>.
              </p>
            </div>
          </section>
          <AboutPhotoCollage />
          <section className="about-experience" aria-labelledby="about-experience-title">
            <h2 id="about-experience-title">Experience</h2>
            <table>
              <caption className="about-sr-only">SHAN MU&apos;s professional experience</caption>
              <colgroup><col className="about-role-column" /><col className="about-company-column" /><col className="about-year-column" /></colgroup>
              <thead><tr><th scope="col">Role</th><th scope="col">Company</th><th scope="col">Year</th></tr></thead>
              <tbody>{about.experience.map(job => <tr key={`${job.company}-${job.year}`}><td>{job.role}</td><td>{job.company}</td><td>{job.year}</td></tr>)}</tbody>
            </table>
          </section>
          <section className="about-education" aria-labelledby="about-education-title">
            <h2 id="about-education-title">Education</h2>
            <ul>{about.education.map(item => <li key={item.institution}><div><p>{item.institution}</p><p className="about-degree">{item.degree}</p></div><span>{item.year}</span></li>)}</ul>
          </section>
        </div>
        <div className="about-bottom-rule" aria-hidden="true" />
      </div>
    </main>
  );
}
