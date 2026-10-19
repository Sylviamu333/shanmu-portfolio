import "./ElevenOasisSectionHeading.css";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: string;
};

/** Shared chapter typography; section descriptions and layouts stay independent. */
export function ElevenOasisSectionHeading({ id, eyebrow, title }: SectionHeadingProps) {
  return <div className="eo-section-heading">
    <p className="eo-section-eyebrow">{eyebrow}</p>
    <h2 id={id} className="eo-section-title">{title}</h2>
  </div>;
}
