"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import "./AboutPhotoCollage.css";

const photos = [
  { id: "about-portrait", label: "Portrait", alt: "Shan standing at a city crossing at night", width: 1080, height: 1440 },
  { id: "about-life-01", label: "In the sunlight", alt: "Shan standing beside stone columns in warm sunlight", width: 1536, height: 2048 },
  { id: "about-life-02", label: "A day exploring", alt: "Shan in front of a classical stone temple under a blue sky", width: 2304, height: 4096 },
];
const sizes = "(max-width: 700px) 75vw, (max-width: 1200px) 42vw, 462px";

export function AboutPhotoCollage() {
  // Photo elements keep their identity and DOM order; only their slot changes.
  // Motion's layout projection animates the measured before/after rectangles.
  const [order, setOrder] = useState(photos.map(photo => photo.id));
  const [announcement, setAnnouncement] = useState("");
  const reduced = useReducedMotion();
  const hint = useId();

  function feature(id: string) {
    const slot = order.indexOf(id);
    if (slot === 0) return;
    setOrder(current => {
      const next = [...current];
      const position = next.indexOf(id);
      [next[0], next[position]] = [next[position], next[0]];
      return next;
    });
    setAnnouncement(`${photos.find(photo => photo.id === id)!.label} is now the featured photo.`);
  }

  return (
    <section className="about-photos" aria-label="Personal photo collage">
      <div className="about-photos-heading">
        <span className="eyebrow">A few moments</span>
        <p id={hint}>Select a smaller photo to bring it into focus.</p>
      </div>
      <div className="about-photo-stage">
        {photos.map((photo, index) => {
          const slot = order.indexOf(photo.id);
          const featured = slot === 0;
          const widths = [480, 960, Math.min(1600, photo.width)];
          return (
            <motion.button
              key={photo.id}
              type="button"
              layout={reduced !== true}
              transition={{ layout: { duration: reduced ? 0 : .56, ease: [.22, 1, .36, 1] } }}
              className="about-photo"
              data-photo={photo.id}
              data-slot={slot}
              aria-pressed={featured}
              aria-label={`${featured ? "Featured photo" : "Feature photo"}: ${photo.label}`}
              aria-describedby={hint}
              onClick={() => feature(photo.id)}
            >
              <span className="about-photo-image">
                <picture>
                  <source type="image/webp" srcSet={widths.map(width => `/about/${photo.id}-${width}.webp ${width}w`).join(", ")} sizes={sizes} />
                  <Image src={`/about/${photo.id}.jpg`} alt={photo.alt} width={photo.width} height={photo.height} sizes={sizes} loading="eager" />
                </picture>
              </span>
              <span className="about-photo-number" aria-hidden="true">0{index + 1}</span>
            </motion.button>
          );
        })}
      </div>
      <p className="about-photo-status" role="status" aria-live="polite">{announcement}</p>
    </section>
  );
}
