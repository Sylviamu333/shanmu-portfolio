"use client";

import { useRef, useState } from "react";
import type { ProjectImage } from "@/data/projects";
import { elevenStrategies, elevenCampaigns } from "@/data/eleven-oasis-strategy";
import { ImageGallery } from "@/components/ImageGallery";
import { Strategy01PhoneVideo } from "./Strategy01PhoneVideo";
import { PdpUxDecisionsCarousel } from "./PdpUxDecisionsCarousel";
import { Strategy03CampaignShowcase } from "./Strategy03CampaignShowcase";
import { ElevenOasisBrandGuidelinesShowcase } from "./ElevenOasisBrandGuidelinesShowcase";
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
    <div className="eleven-strategy-showcase" data-campaign-selected={selected === 2}>
      <div id="eleven-strategy-media" className="eleven-strategy-media" aria-label="Selected strategy evidence">
        {elevenStrategies.map((strategy, index) => {
          const images = index === 4 ? brandingImages : strategy.images;
          return (
            <div key={strategy.number} className={`eleven-strategy-panel ${index === 1 ? "eleven-strategy-pdp" : ""} ${index === 2 ? "eleven-strategy-campaign-panel" : images.length > 1 ? "eleven-strategy-branding" : ""}`}
              data-selected={selected === index} aria-hidden={selected !== index} inert={selected !== index}>
              {index === 0 ? <Strategy01PhoneVideo active={selected === 0} artwork={images[0]} /> : index === 1 && visited.includes(index) ? <PdpUxDecisionsCarousel active={selected === 1} /> : index === 2 && visited.includes(index) ? <Strategy03CampaignShowcase active={selected === 2} /> : index === 4 && visited.includes(index) ? <ElevenOasisBrandGuidelinesShowcase active={selected === 4} /> : visited.includes(index) && (images.length ? (
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
          <div key={strategy.number} className={`eleven-strategy-description${index === 2 ? " eleven-strategy-campaign-copy" : ""}`} data-selected={selected === index}
            aria-hidden={selected !== index} inert={selected !== index}>
            <h3>{strategy.title}</h3>
            {index === 2 ? <div className="eleven-campaign-copy-body">
              <p>{strategy.description}</p>
              <div className="eleven-campaign-notes">
                {elevenCampaigns.map(campaign => <div key={campaign.id}><h4>{campaign.label}</h4><p>{campaign.support}</p></div>)}
              </div>
              <p className="eleven-campaign-closing">{strategy.closing}</p>
            </div> : <p>{strategy.description}</p>}
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
