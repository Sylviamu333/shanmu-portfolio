"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { ProjectImage } from "@/data/projects";
import { Arrow } from "./Arrow";
export function ImageGallery({
  images,
  layout = "pair",
  presentation,
  pdpOverlay,
}: {
  images: ProjectImage[];
  layout?: "full" | "pair" | "grid";
  presentation?: "pdp";
  pdpOverlay?: ReactNode;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (selected !== null && dialog.current && !dialog.current.open)
      dialog.current.showModal();
  }, [selected]);
  useEffect(() => {
    if (presentation !== "pdp" || selected === null) return;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbar) document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbar}px`;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [presentation, selected]);
  const active = selected !== null ? images[selected] : null;
  const navigate = (direction: number) =>
    setSelected((current) =>
      current === null
        ? null
        : (current + direction + images.length) % images.length,
    );
  return (
    <>
      <div className={`image-gallery gallery-${layout}`}>
        {images.map((image, index) => (
          <figure key={image.src}>
            <button
              className={`gallery-image ${image.height / image.width > 3 ? "screenshot-image" : ""}`}
              onClick={(event) => {
                trigger.current = event.currentTarget;
                setSelected(index);
              }}
              aria-label={`Enlarge: ${image.alt}`}
            >
              {presentation === "pdp" ? <span className="eleven-pdp-image-frame"><span className="eleven-pdp-hover">
                <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width:950px) 92vw, 65vw" />
                {pdpOverlay}
              </span></span> : <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes={
                  layout === "full" ? "100vw" : "(max-width:700px) 100vw, 50vw"
                }
              />}
              <span className="image-expand">
                View image <Arrow diagonal />
              </span>
            </button>
            {image.caption && <figcaption>{image.caption}</figcaption>}
          </figure>
        ))}
      </div>
      <dialog
        ref={dialog}
        className={`lightbox${presentation === "pdp" ? " eleven-pdp-lightbox" : ""}`}
        aria-label={active?.alt || "Project artwork"}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
        onKeyDown={(event) => {
          if (presentation === "pdp" && event.key === "Tab") {
            // This single-image viewer has one control: keep focus on Close.
            event.preventDefault();
            dialog.current?.querySelector<HTMLButtonElement>(".lightbox-toolbar button")?.focus();
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            navigate(1);
          }
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            navigate(-1);
          }
        }}
      >
        {active && (
          <>
            <div className="lightbox-toolbar">
              <span aria-live="polite">
                {(selected ?? 0) + 1} / {images.length} ·{" "}
                {active.caption || "Project artwork"}
              </span>
              <button
                autoFocus
                onClick={() => dialog.current?.close()}
                aria-label="Close image"
              >
                Close ×
              </button>
            </div>
            <div className="lightbox-scroll">
              <Image
                src={active.src}
                alt={active.alt}
                width={active.width}
                height={active.height}
                sizes="90vw"
              />
            </div>
            <div className="lightbox-footer">
              <button
                onClick={() => navigate(-1)}
                disabled={images.length < 2}
                aria-label="Previous image"
              >
                ← Previous
              </button>
              {active.original && (
                <a href={active.original} target="_blank" rel="noreferrer">
                  Open original PNG ↗
                </a>
              )}
              <button
                onClick={() => navigate(1)}
                disabled={images.length < 2}
                aria-label="Next image"
              >
                Next →
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
