import type { Project } from "@/data/projects";
export function Results({ project }: { project: Project }) {
  return (
    <div className="results-panel">
      <div className="results-grid">
        {project.results?.map((metric) => (
          <div className="metric" key={metric.label}>
            <strong>{metric.value}</strong>
            <h3>{metric.label}</h3>
            <p>{metric.detail}</p>
            {metric.note && <span>{metric.note}</span>}
          </div>
        ))}
      </div>
      {project.resultsNote && (
        <p className="results-note">{project.resultsNote}</p>
      )}
    </div>
  );
}
