"use client";

import { useRef, useState } from "react";
import type { ProjectImage } from "@/data/projects";
import { elevenStrategies } from "@/data/eleven-oasis-strategy";
import { ImageGallery } from "@/components/ImageGallery";
import "./ElevenOasisStrategyShowcase.css";

export function ElevenOasisStrategyShowcase({ brandingImages, brandingNotes }: {
  brandingImages: ProjectImage[];
  brandingNotes: string[];
}) {
  const notes = useRef<HTMLDetailsElement>(null);
  const [selected, setSelected] = useState(0);
  const [visited, setVisited] = useState([0]);
  const select = (index: number) => {
    if (index !== 4 && notes.current) notes.current.open = false;
    setSelected(index);
    setVisited(current => current.includes(index) ? current : [...current, index]);
  };
  return (
    <div className="eleven-strategy-showcase">
      <div id="eleven-strategy-media" className="eleven-strategy-media" aria-label="Selected strategy evidence">
        {elevenStrategies.map((strategy, index) => {
          const images = index === 4 ? brandingImages : strategy.images;
          return (
            <div key={strategy.number} className={`eleven-strategy-panel ${images.length > 1 ? "eleven-strategy-branding" : ""}`}
              data-selected={selected === index} aria-hidden={selected !== index} inert={selected !== index}>
              {visited.includes(index) && (images.length ? (
                <ImageGallery images={images} layout={images.length > 1 ? "grid" : "full"} />
              ) : (
                <div className="eleven-strategy-unavailable">
                  <p className="eleven-strategy-evidence-label">{strategy.number} / DESIGN INTENT</p>
                  <h3>{strategy.title}</h3>
                  <p>{strategy.unavailable}</p>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div className="eleven-strategy-selectors" role="group" aria-label="Select a design strategy">
        {elevenStrategies.map((strategy, index) => (
          <button type="button" key={strategy.number} aria-label={`${strategy.number} / ${strategy.label}`} aria-pressed={selected === index}
            aria-controls="eleven-strategy-media eleven-strategy-description" onClick={() => select(index)}>
            <span className="eleven-strategy-number">{strategy.number}</span>
            <span className="eleven-strategy-label">{strategy.label}</span>
          </button>
        ))}
      </div>
      <div id="eleven-strategy-description" className="eleven-strategy-descriptions" aria-live="polite" aria-atomic="true">
        {elevenStrategies.map((strategy, index) => (
          <div key={strategy.number} className="eleven-strategy-description" data-selected={selected === index}
            aria-hidden={selected !== index} inert={selected !== index}>
            <h3>{strategy.title}</h3>
            <p>{strategy.description}</p>
            {index === 4 && <details ref={notes} className="eleven-strategy-brand-notes">
              <summary>Brand specifications</summary>
              {brandingNotes.map(note => <p key={note}>{note}</p>)}
            </details>}
          </div>
        ))}
      </div>
    </div>
  );
}
