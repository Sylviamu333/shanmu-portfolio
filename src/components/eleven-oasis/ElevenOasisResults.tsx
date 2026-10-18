"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { ImageGallery } from "@/components/ImageGallery";
import type { ProjectImage } from "@/data/projects";
import { brandAssets } from "@/data/eleven-oasis-branding";
import { shopLookExperiments, separateTestMetrics, formatMetric, relativeChange, formatChange } from "@/data/eleven-oasis-research";
import researchManifest from "../../../public/projects/eleven-oasis/research/manifest.json";
import homepagePreview from "../../../public/projects/eleven-oasis/results/manifest.json";
import "./ElevenOasisResults.css";

const researchAssets: Record<string, typeof researchManifest[keyof typeof researchManifest]> = researchManifest;
const researchKeys = [...Array.from({ length: 9 }, (_, index) => `hotjar${index + 1}`), ...Array.from({ length: 5 }, (_, index) => `abtest${index + 1}`)];
const pdpPreview: ProjectImage = {
  src: "/projects/eleven-oasis/foundations/pdp.webp", width: 1179, height: 1990,
  alt: "Eleven Oasis mobile PDP: product hierarchy, collection choice, imagery and purchase reassurance",
};
const brandPreview: ProjectImage = {
  ...brandAssets.page10, alt: "Original Eleven Oasis guideline color system, page 10", caption: "Brand guideline / original PDF page 10",
};
const evidence: ProjectImage[] = [
  ...researchKeys.map(key => researchAssets[key]),
  { src: "/previews/eleven-oasis/website-classic.png", width: 1921, height: 6767, alt: "Existing full Eleven Oasis Classic homepage screenshot", caption: "Homepage / original supplied website screenshot" },
  { src: "/projects/eleven-oasis/strategy/mobile/pdp-mobile-full.webp", width: 1179, height: 16382, alt: "Existing full-length Eleven Oasis mobile product page", caption: "Product detail / original supplied mobile screenshot" },
  brandPreview,
];
type OpenEvidence = (index: number, trigger: HTMLButtonElement) => void;
type ExperimentId = "mobile" | "desktop" | "separate";
const experimentOptions: { id: ExperimentId; label: string }[] = [
  { id: "mobile", label: "MOBILE" }, { id: "desktop", label: "DESKTOP" }, { id: "separate", label: "SEPARATE TEST" },
];

function ResultImage({ image, className = "" }: { image: ProjectImage; className?: string }) {
  return <Image className={className} src={image.src} width={image.width} height={image.height} alt={image.alt} sizes="(max-width: 800px) 90vw, 52vw" />;
}

/** Progressive enhancement: SSR stays readable, and every reveal runs once. */
function useResultsReveals(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = root.current;
    if (!element || typeof IntersectionObserver === "undefined") return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const compact = matchMedia("(max-width: 800px)");
    const seen = new WeakSet<Element>();
    let cleanup = () => {};
    const setup = () => {
      cleanup();
      if (preference.matches) return;
      const context = gsap.context(() => {}, element);
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const target = entry.target as HTMLElement;
          seen.add(target);
          observer.unobserve(target);
          const kind = target.dataset.resultsReveal;
          context.add(() => gsap.to(target, {
            opacity: 1, y: 0, scale: 1, duration: compact.matches ? .6 : .75,
            delay: kind === "note" ? .14 : 0, ease: "power2.out",
          }));
        }
      }, { threshold: .12 });
      context.add(() => {
        element.querySelectorAll<HTMLElement>("[data-results-reveal]").forEach(target => {
          if (seen.has(target)) return;
          const kind = target.dataset.resultsReveal;
          gsap.set(target, { opacity: kind === "metric" ? .18 : 0, y: kind === "heading" ? (compact.matches ? 12 : 24) : 0, scale: kind === "image" ? 1.03 : 1 });
          observer.observe(target);
        });
      });
      cleanup = () => { observer.disconnect(); context.revert(); };
    };
    setup();
    preference.addEventListener("change", setup);
    return () => { cleanup(); preference.removeEventListener("change", setup); };
  }, [root]);
}

function ExperimentResults({ open }: { open: OpenEvidence }) {
  const [selected, setSelected] = useState<ExperimentId>("mobile");
  const experiment = selected === "separate" ? {
    name: "Separate test snapshot", source: "abtest1", metrics: separateTestMetrics,
    summary: "This separate table records higher conversion, add-to-cart rate and average order value for New Group 1. The test’s name, device, date and exact design change are not shown.",
  } : shopLookExperiments[selected];
  const conversion = experiment.metrics[0];
  const sources = selected === "mobile" ? ["abtest5", "abtest4"] : selected === "desktop" ? ["abtest3"] : ["abtest1", "abtest2"];
  return <article className="eo-results-row eo-results-testing" aria-labelledby="eo-results-testing-title">
    <header className="eo-results-testing-heading"><p className="eo-results-eyebrow">02 / TESTING DESIGN DECISIONS</p><h3 id="eo-results-testing-title" data-results-reveal="heading">From Assumptions<br />to Evidence</h3></header>
    <div className="eo-results-comparison" data-results-reveal="image">
      <div className="eo-results-tabs" role="tablist" aria-label="Results experiment">
        {experimentOptions.map((option, index) => <button key={option.id} type="button" role="tab" id={`eo-results-tab-${option.id}`} aria-selected={selected === option.id} aria-controls="eo-results-comparison-panel" tabIndex={selected === option.id ? 0 : -1} onClick={() => setSelected(option.id)} onKeyDown={event => {
          let next: number | undefined;
          if (event.key === "ArrowRight") next = (index + 1) % experimentOptions.length;
          if (event.key === "ArrowLeft") next = (index + experimentOptions.length - 1) % experimentOptions.length;
          if (event.key === "Home") next = 0;
          if (event.key === "End") next = experimentOptions.length - 1;
          if (next !== undefined) { event.preventDefault(); setSelected(experimentOptions[next].id); event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("button")[next].focus(); }
        }}>{option.label}</button>)}
      </div>
      <div id="eo-results-comparison-panel" role="tabpanel" aria-labelledby={`eo-results-tab-${selected}`} data-result-experiment={selected}>
        <h4>{experiment.name}</h4>
        <dl className="eo-results-control-variant">
          <div><dt>CONTROL GROUP</dt><dd data-result-value="control">{formatMetric(conversion, conversion.control)}</dd></div>
          <div><dt>NEW GROUP 1 / VARIANT</dt><dd data-result-value="variant">{formatMetric(conversion, conversion.variant)}</dd></div>
        </dl>
        <p className="eo-results-caption">CONVERSION / {formatMetric(conversion, conversion.control)} → {formatMetric(conversion, conversion.variant)}<br />{researchAssets[experiment.source].source.split("/").at(-1)}</p>
        <figure className="eo-results-test-evidence"><button type="button" aria-haspopup="dialog" aria-label={`Expand ${experiment.name} source evidence`} onClick={event => open(researchKeys.indexOf(experiment.source), event.currentTarget)}><ResultImage image={researchAssets[experiment.source]} /></button><figcaption>Original report excerpt. Exact control/variant layouts are not supplied. Tool forecasts are not adopted as measured outcomes.</figcaption></figure>
        <details className="eo-results-sources" key={selected}><summary>Read the supporting test evidence<span aria-hidden="true">＋</span></summary><ul>{sources.map(key => <li key={key}><button type="button" aria-haspopup="dialog" onClick={event => open(researchKeys.indexOf(key), event.currentTarget)}>{key === "abtest4" ? "Mobile new / returning visitor breakdown" : key === "abtest2" ? "Matching dashboard and reported ranges" : "Original metric comparison"}<span>{researchAssets[key].source.split("/").at(-1)} ↗</span></button></li>)}</ul></details>
      </div>
    </div>
    <div className="eo-results-test-insight">
      <div className="eo-results-dashed" data-results-reveal="note"><p>{experiment.summary}</p></div>
      <div className="eo-results-test-result" data-results-reveal="metric" aria-live="polite" aria-atomic="true"><strong data-result-value="change">{formatChange(relativeChange(conversion.control, conversion.variant))}</strong><p>Relative conversion change<br /><span>{selected === "separate" ? "Separate snapshot / not Shop the Look" : `${selected === "mobile" ? "Mobile" : "Desktop"} homepage / Shop the Look`}</span></p></div>
      <dl className="eo-results-secondary">{experiment.metrics.slice(1).map(metric => <div key={metric.id}><dt>{metric.name}</dt><dd><span>{formatMetric(metric, metric.control)} → {formatMetric(metric, metric.variant)}</span><span>{formatChange(relativeChange(metric.control, metric.variant))}</span></dd></div>)}</dl>
      <p className="eo-results-caption">Calculated from displayed source values.{selected === "mobile" && " The dashboard’s +24.53% conversion change uses more precise rates; the visible 5.82% and 7.24% labels yield +24.4%."} Statistical significance and long-term impact are not established.</p>
    </div>
  </article>;
}

export function ElevenOasisResults() {
  const root = useRef<HTMLElement>(null);
  const [readerOpen, setReaderOpen] = useState(false);
  useResultsReveals(root);
  useEffect(() => {
    if (!readerOpen) return;
    const overflow = document.body.style.overflow, padding = document.body.style.paddingRight;
    const scrollbar = innerWidth - document.documentElement.clientWidth;
    if (scrollbar) document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbar}px`;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; document.body.style.paddingRight = padding; };
  }, [readerOpen]);
  return <section ref={root} id="results" className="eleven-main-section eo-results" aria-labelledby="eleven-results-title" tabIndex={-1}>
    <ImageGallery images={evidence} onOpenChange={setReaderOpen} renderPreview={open => <>
      <header className="eo-results-opening"><div><p className="eo-results-eyebrow">04 / RESULTS</p><h2 id="eleven-results-title" data-results-reveal="heading">The Results</h2></div><p data-results-reveal="note">From behavioral insights to clearer shopping journeys, the redesign brought research, experimentation, and visual consistency into one more considered e-commerce experience.</p></header>
      <article className="eo-results-row eo-results-behavior" aria-labelledby="eo-results-behavior-title">
        <div className="eo-results-behavior-copy"><p className="eo-results-eyebrow">01 / UNDERSTANDING SHOPPER BEHAVIOR</p><h3 id="eo-results-behavior-title" data-results-reveal="heading">Making Shopping<br />Behavior Visible</h3><p className="eo-results-body">Navigation, product choices and scroll depth made the shopping journey visible—revealing what visitors interacted with and which content received less exposure.</p><div className="eo-results-dashed" data-results-reveal="note"><p>In this desktop capture, 53.3% reached the Best Sellers boundary and 24.7% reached the deeper Shop the Look boundary. That supports testing the order and accessibility of shopping entry points.</p></div><p className="eo-results-caption">Scroll exposure is an observation, not a conversion result or an explanation of why a visitor stopped.</p><button type="button" className="eo-results-text-link" aria-haspopup="dialog" onClick={event => open(0, event.currentTarget)}>Explore the nine Hotjar research boards ↗</button></div>
        <div className="eo-results-behavior-visual"><figure data-results-reveal="image"><button type="button" className="eo-results-heatmap" aria-haspopup="dialog" aria-label="Expand original homepage scroll research board" onClick={event => open(2, event.currentTarget)}><ResultImage image={researchAssets.homeDesktopScroll} /></button><figcaption>Desktop homepage / Hotjar scroll captures · hotjar3.png</figcaption></figure><dl className="eo-results-depths" data-results-reveal="metric"><div><dt>Reached the Best Sellers boundary</dt><dd>53.3<span>%</span></dd></div><div><dt>Reached the Shop the Look boundary</dt><dd>24.7<span>%</span></dd></div></dl></div>
      </article>
      <ExperimentResults open={open} />
      <article className="eo-results-row eo-results-cohesion" aria-labelledby="eo-results-cohesion-title">
        <div className="eo-results-cohesion-copy"><p className="eo-results-eyebrow">03 / A MORE CONSISTENT EXPERIENCE</p><h3 id="eo-results-cohesion-title" data-results-reveal="heading">One More Cohesive<br />Shopping Journey</h3><p className="eo-results-statement" data-results-reveal="metric">Clearer paths.<br />Consistent details.</p><div className="eo-results-dashed" data-results-reveal="note"><p>Homepage discovery and campaign stories lead into a more consistent product hierarchy. Reusable components, relevant trust signals and a shared brand identity connect the touchpoints.</p></div><ul className="eo-results-touchpoints"><li>Homepage discovery</li><li>Campaign landing pages</li><li>Product information</li><li>Trust signals</li><li>Brand identity</li></ul><p className="eo-results-caption">A design outcome demonstrated through existing project assets; not a claim of measured revenue or overall conversion growth.</p></div>
        <div className="eo-results-collage-wrap"><div className="eo-results-collage" data-results-reveal="image"><button type="button" className="eo-results-collage-home" aria-haspopup="dialog" aria-label="Expand the existing homepage design" onClick={event => open(14, event.currentTarget)}><ResultImage image={homepagePreview} /></button><button type="button" className="eo-results-collage-pdp" aria-haspopup="dialog" aria-label="Expand the existing mobile product page" onClick={event => open(15, event.currentTarget)}><ResultImage image={pdpPreview} /></button><button type="button" className="eo-results-collage-brand" aria-haspopup="dialog" aria-label="Expand original brand guideline color page" onClick={event => open(16, event.currentTarget)}><ResultImage image={brandPreview} /></button></div><p className="eo-results-caption">Existing homepage, mobile PDP and original brand guideline.<br />Select an image to explore its source.</p></div>
      </article>
      <p className="eo-results-closing">Research informed the direction. Experiments revealed opportunities.<br />A consistent design language brought the experience together.</p>
    </>} />
  </section>;
}
