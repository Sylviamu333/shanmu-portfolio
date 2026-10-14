"use client";
import Image from "next/image";
import { useState } from "react";
import type { Comparison } from "@/data/projects";
export function BeforeAfter({ comparisons }: { comparisons: Comparison[] }) {
  const [index, setIndex] = useState(0);
  const current = comparisons[index];
  if (!current) return null;
  return (
    <div className="comparison">
      <div className="comparison-tabs" aria-label="Choose page comparison">
        {comparisons.map((comparison, i) => (
          <button
            key={comparison.label}
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
          >
            {comparison.label}
          </button>
        ))}
      </div>
      <div className="comparison-grid">
        <figure>
          <figcaption>
            <span>01 / Before</span>
            <span>Original website</span>
          </figcaption>
          <div
            className="comparison-scroll"
            tabIndex={0}
            role="region"
            aria-label={`Scroll the original ${current.label.toLowerCase()} screenshot`}
          >
            <Image
              src={current.before.src}
              alt={current.before.alt}
              width={current.before.width}
              height={current.before.height}
              sizes="(max-width:700px) 100vw,50vw"
            />
          </div>
          <a
            href={current.before.original || current.before.src}
            target="_blank"
            rel="noreferrer"
            className="original-link"
          >
            Open complete original ↗
          </a>
        </figure>
        <figure>
          <figcaption>
            <span>02 / After</span>
            <span>Redesigned website</span>
          </figcaption>
          {current.after ? (
            <div
              className="comparison-scroll"
              tabIndex={0}
              role="region"
              aria-label={`Scroll the redesigned ${current.label.toLowerCase()} screenshot`}
            >
              <Image
                src={current.after.src}
                alt={current.after.alt}
                width={current.after.width}
                height={current.after.height}
                sizes="(max-width:700px) 100vw,50vw"
              />
            </div>
          ) : (
            <div className="missing-screenshot">
              <span className="eyebrow">Redesigned {current.label}</span>
              <p>Next chapter.</p>
              <span>Confirmed screenshot to be added.</span>
              <span>No reconstructed screen is shown.</span>
            </div>
          )}
        </figure>
      </div>
    </div>
  );
}
