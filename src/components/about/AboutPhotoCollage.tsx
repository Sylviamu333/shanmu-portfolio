"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import "./AboutPhotoCollage.css";

const photos = [
  { id: "about-portrait", label: "Portrait", alt: "Shan at a city crossing at night", width: 1080, height: 1440, position: "50% 55%" },
  { id: "about-life-01", label: "In the sunlight", alt: "Shan standing beside stone columns in sunlight", width: 1536, height: 2048, position: "50% 44%" },
  { id: "about-life-02", label: "A day exploring", alt: "Shan in front of a classical stone temple under a blue sky", width: 2304, height: 4096, position: "50% 57%" },
  { id: "about-life-04", label: "With Team Wang Design", alt: "A group photograph outside a TEAM WANG DESIGN venue", width: 1620, height: 1080, position: "50% 50%" },
  { id: "about-life-03", label: "A moment in the city", alt: "Two people walking past a brick wall as pigeons take flight", width: 1920, height: 1080, position: "50% 52%" },
  { id: "about-life-05", label: "Together on the green", alt: "A group photograph on a golf course beside golf bags and event signage", width: 1290, height: 834, position: "50% 50%" },
];
// Fixed rectangles reproduce the reference's large / pair / large / pair mosaic.
// Animating only two absolute frame bounds leaves every surrounding row intact.
const slots = [
  { left: "0%", top: "0%", width: "100%", height: "28.45%" },
  { left: "0%", top: "30.1%", width: "57%", height: "20.8%" },
  { left: "60%", top: "30.1%", width: "40%", height: "20.8%" },
  { left: "0%", top: "53.3%", width: "100%", height: "24.3%" },
  { left: "0%", top: "79.5%", width: "46%", height: "20.5%" },
  { left: "49%", top: "79.5%", width: "51%", height: "20.5%" },
];
const sizes = "(max-width: 1100px) calc(100vw - 100px), (max-width: 1920px) 44vw, 744px";

export function AboutPhotoCollage() {
  const [order, setOrder] = useState(photos.map(photo => photo.id));
  const [announcement, setAnnouncement] = useState("");
  const reduced = useReducedMotion();
  const hint = useId();

  function feature(id: string) {
    if (order[0] === id) return;
    setOrder(current => {
      const next = [...current];
      const position = next.indexOf(id);
      [next[0], next[position]] = [next[position], next[0]];
      return next;
    });
    setAnnouncement(`${photos.find(photo => photo.id === id)!.label} is now the featured photo.`);
  }

  return (
    <section className="about-photos" aria-label="Personal photo mosaic">
      <p className="about-photo-status" id={hint}>Select a photograph to swap it with the featured photo.</p>
      <div className="about-photo-stage">
        {photos.map(photo => {
          const slot = order.indexOf(photo.id);
          const widths = [480, 960, Math.min(1600, photo.width)];
          return (
            <motion.button key={photo.id} type="button" initial={false}
              animate={slots[slot]}
              transition={{ duration: reduced ? 0 : .56, ease: [.22, 1, .36, 1] }}
              className="about-photo" data-photo={photo.id} data-slot={slot}
              aria-pressed={slot === 0}
              aria-label={`${slot === 0 ? "Featured photo" : "Feature photo"}: ${photo.label}`}
              aria-describedby={hint} onClick={() => feature(photo.id)}>
              <span className="about-photo-image">
                <picture>
                  <source type="image/webp" srcSet={widths.map(width => `/about/${photo.id}-${width}.webp ${width}w`).join(", ")} sizes={sizes} />
                  <Image src={`/about/${photo.id}.jpg`} alt={photo.alt} width={photo.width} height={photo.height} sizes={sizes} loading="eager" style={{ objectPosition: photo.position }} />
                </picture>
              </span>
            </motion.button>
          );
        })}
      </div>
      <p className="about-photo-status" role="status" aria-live="polite">{announcement}</p>
    </section>
  );
}
