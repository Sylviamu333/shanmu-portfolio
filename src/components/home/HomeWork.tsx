"use client";
import { useState } from "react";
import type { Project } from "@/data/projects";
import { HomeProject } from "./HomeProject";
import { Reveal } from "@/components/Motion";
export function HomeWork({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const visible =
    filter === "All"
      ? projects
      : projects.filter((project) => project.discipline === filter);
  return (
    <section id="work" className="home-work" aria-labelledby="work-heading">
      <div className="home-section-top">
        <div>
          <p className="home-small-label">
            Portfolio / {String(projects.length).padStart(2, "0")} projects
          </p>
          <h2 id="work-heading">
            Selected work<span>.</span>
          </h2>
        </div>
        <div className="home-work-filters" aria-label="Filter projects">
          {["All", "Digital", "Brand", "Graphic"].map((option) => (
            <button
              key={option}
              aria-pressed={filter === option}
              onClick={() => setFilter(option)}
            >
              {option}
              <span>
                {option === "All"
                  ? projects.length
                  : projects.filter((project) => project.discipline === option)
                      .length}
              </span>
            </button>
          ))}
        </div>
      </div>
      <p className="home-filter-status" aria-live="polite">
        Showing {visible.length}{" "}
        {filter === "All" ? "selected" : filter.toLowerCase()} projects
      </p>
      <div className="home-project-grid">
        {visible.map((project) => (
          <Reveal
            key={project.slug}
            className={
              project.slug === "eleven-oasis"
                ? "home-project-reveal home-feature-reveal"
                : "home-project-reveal"
            }
          >
            <HomeProject project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
