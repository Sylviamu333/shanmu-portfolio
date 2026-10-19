import type { ReactNode } from "react";
import { Arrow } from "./Arrow";
import "./ProjectHero.css";

type ProjectHeroProps = {
  index: number;
  total: number;
  title: ReactNode;
  category: string;
  description: string;
  summary?: string;
  facts?: { label: string; value: string }[];
  website?: string;
  overviewLabel?: string;
  headingId?: string;
  children?: ReactNode;
};

function keepTogether(text: string) {
  return text.split(/(\be-commerce\b|\d+–\d+)/i).map((part, index) =>
    /^(e-commerce|\d+–\d+)$/i.test(part)
      ? <span className="project-introduction-nowrap" key={index}>{part}</span>
      : part,
  );
}

/** The measured Eleven Oasis editorial introduction, shared by every Work route. */
export function ProjectHero({ index, total, title, category, description, summary, facts = [], website, overviewLabel, headingId, children }: ProjectHeroProps) {
  return <div className="project-hero">
    <div className="case-topline">
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- A full navigation avoids departing scroll timelines resetting the hash position. */}
      <a href="/#work">← Selected work</a>
      <span>{String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
    </div>
    <div className="project-introduction">
      <div className="project-introduction-columns">
        <div className="project-introduction-title">
          <p className="project-introduction-category">{overviewLabel && <span className="project-introduction-overview">{overviewLabel}</span>}{category}</p>
          <h1 id={headingId}>{title}</h1>
          <p className="project-introduction-body">{keepTogether(description)}</p>
        </div>
        <div className="project-introduction-details">
          {summary && <p className="project-introduction-summary">{summary}</p>}
          {facts.length > 0 && <dl className="project-introduction-facts">
            {facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{keepTogether(fact.value)}</dd></div>)}
          </dl>}
          {website && <a className="project-introduction-link" href={website} target="_blank" rel="noreferrer">Visit live website <Arrow diagonal /></a>}
          {children}
        </div>
      </div>
    </div>
  </div>;
}
