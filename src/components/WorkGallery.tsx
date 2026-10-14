"use client";
import { useState } from "react";
import type { Project } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
export function WorkGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("All");
  const visible =
    filter === "All"
      ? projects
      : projects.filter((p) => p.discipline === filter);
  return (
    <>
      <div className="work-toolbar">
        <p className="eyebrow">
          Selected projects /{" "}
          <span aria-live="polite">
            {String(visible.length).padStart(2, "0")}
          </span>
        </p>
        <div className="work-filters" aria-label="Filter work">
          {["All", "Digital", "Brand", "Graphic"].map((option) => (
            <button
              key={option}
              aria-pressed={filter === option}
              onClick={() => setFilter(option)}
            >
              {option}
              <sup>
                {option === "All"
                  ? projects.length
                  : projects.filter((p) => p.discipline === option).length}
              </sup>
            </button>
          ))}
        </div>
      </div>
      <div className="project-grid">
        {visible.map((project, index) => (
          <ProjectCard
            project={project}
            key={project.slug}
            featured={project.slug === "eleven-oasis"}
            index={index}
          />
        ))}
        {visible.length === 0 && <p>No projects in this category yet.</p>}
      </div>
    </>
  );
}
