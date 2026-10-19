import { ElevenOasisSectionHeading } from "./ElevenOasisSectionHeading";
import "./ElevenOasisResults.css";

// Owner-provided outcomes. The second figure is derived from the first,
// rather than an additional independently measured result.
const metrics = [
  { value: "5% → 25%", label: "Core CTA click-through rate" },
  { value: "5×", label: "CTA engagement vs. baseline" },
  { value: "≈200%", label: "Business GMV growth" },
];

export function ElevenOasisResults() {
  return <section id="results" className="eleven-main-section eo-results" aria-labelledby="eleven-results-title" tabIndex={-1}>
    <ElevenOasisSectionHeading id="eleven-results-title" eyebrow="04 / RESULTS" title="The Results" />
    <div className="eo-results-panel">
      <dl className="eo-results-metrics" aria-describedby="eo-results-provenance">
        {metrics.map(metric => <div className="eo-results-metric" key={metric.label}>
          <dt>{metric.label}</dt>
          <dd>{metric.value}</dd>
        </div>)}
      </dl>
      <p id="eo-results-provenance" className="eo-results-provenance">Figures supplied by the project owner; not independently verified. 5× = 25% ÷ 5% and is not a separate outcome. GMV growth is not attributed exclusively to the redesign.</p>
    </div>
  </section>;
}
