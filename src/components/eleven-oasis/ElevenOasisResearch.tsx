"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import gsap from "gsap";
import { ImageGallery } from "@/components/ImageGallery";
import { heatPages, heatViews, shopLookExperiments, mobileAudienceResults, separateTestMetrics, relativeChange, formatMetric, formatChange, type HeatPage, type EvidenceDevice, type ResearchMetric } from "@/data/eleven-oasis-research";
import manifest from "../../../public/projects/eleven-oasis/research/manifest.json";
import "./ElevenOasisResearch.css";

const assets: Record<string, typeof manifest[keyof typeof manifest]> = manifest;
const sourceKeys = [...Array.from({ length: 9 }, (_, index) => `hotjar${index + 1}`), ...Array.from({ length: 5 }, (_, index) => `abtest${index + 1}`)];
const sources = sourceKeys.map(key => assets[key]);
type OpenEvidence = (index: number, trigger: HTMLButtonElement) => void;

// The installed Motion hook snapshots this preference at mount. Subscribe here
// so changing the system setting also cancels this section's in-flight motion.
const reducedQuery = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(update: () => void) {
  const query = matchMedia(reducedQuery);
  query.addEventListener("change", update);
  return () => query.removeEventListener("change", update);
}
const reducedSnapshot = () => matchMedia(reducedQuery).matches;
const reducedServerSnapshot = () => true;
const useResearchReducedMotion = () => useSyncExternalStore(subscribeReducedMotion, reducedSnapshot, reducedServerSnapshot);

function EvidenceImage({ name, className = "" }: { name: string; className?: string }) {
  const image = assets[name];
  return <Image className={className} src={image.src} width={image.width} height={image.height} alt={image.alt} sizes="(max-width:850px) 90vw, 55vw" />;
}

function ResearchReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useResearchReducedMotion();
  return <motion.div className={className} initial={false} animate={reduced ? { opacity: 1, y: 0 } : undefined} whileInView={reduced ? undefined : { opacity: [.6, 1], y: [10, 0] }} viewport={{ once: true, amount: .12 }} transition={{ duration: reduced ? 0 : .6, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}

function ResearchTabs<T extends string>({ options, value, onChange, label, controls, prefix }: {
  options: { id: T; label: string }[]; value: T; onChange: (value: T) => void; label: string; controls: string; prefix: string;
}) {
  return <div className="eo-research-tabs" role="tablist" aria-label={label}>
    {options.map((option, index) => <button type="button" role="tab" key={option.id} id={`${prefix}-${option.id}`} aria-selected={value === option.id} tabIndex={value === option.id ? 0 : -1} aria-controls={controls}
      onClick={() => onChange(option.id)} onKeyDown={event => {
        let next: number | undefined;
        if (event.key === "ArrowRight") next = (index + 1) % options.length;
        if (event.key === "ArrowLeft") next = (index + options.length - 1) % options.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = options.length - 1;
        if (next !== undefined) { event.preventDefault(); onChange(options[next].id); event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("button")[next].focus(); }
      }}>{option.label}</button>)}
  </div>;
}

function ModuleHeading({ number, label, title, children }: { number: string; label: string; title: string; children?: ReactNode }) {
  return <header className="eo-research-module-heading"><p className="eo-research-eyebrow">{number} / {label}</p><h3>{title}</h3>{children && <p className="eo-research-lead">{children}</p>}</header>;
}

function HeatmapViewer({ open }: { open: OpenEvidence }) {
  const [page, setPage] = useState<HeatPage>("homepage");
  const [device, setDevice] = useState<EvidenceDevice>("Desktop");
  const [viewId, setViewId] = useState(heatViews[0].id);
  const reduced = useResearchReducedMotion();
  const available = heatViews.filter(view => view.page === page && view.device === device);
  const view = available.find(item => item.id === viewId) || available[0];
  return <>
    <ResearchTabs options={heatPages} value={page} onChange={setPage} label="Behavioral evidence page type" controls="eo-heatmap-panel" prefix="eo-heatmap-tab" />
    <div id="eo-heatmap-panel" className="eo-research-heatmap-layout" role="tabpanel" aria-labelledby={`eo-heatmap-tab-${page}`} data-view={view.id}>
      <figure className="eo-research-heatmap">
        <div className="eo-research-viewer-controls">
          <div role="group" aria-label="Evidence device" className="eo-research-device-controls">{(["Desktop", "Mobile"] as const).map(item => <button type="button" key={item} aria-pressed={device === item} onClick={() => setDevice(item)}>{item.toUpperCase()}</button>)}</div>
          <label><span className="eo-research-sr">Evidence capture</span><select aria-label="Evidence capture" value={view.id} onChange={event => setViewId(event.target.value)}>{available.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        </div>
        <button type="button" className="eo-research-heatmap-stage" aria-haspopup="dialog" aria-label={`Open source research board: ${view.label}, ${device}`} onClick={event => open(view.source - 1, event.currentTarget)}>
          {reduced ? <span className="eo-research-heatmap-layer"><EvidenceImage name={view.asset} /></span> : <AnimatePresence initial={false}><motion.span key={view.asset} className="eo-research-heatmap-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .3, ease: "easeInOut" }}><EvidenceImage name={view.asset} /></motion.span></AnimatePresence>}
          <span className="eo-research-enlarge">EXPAND EVIDENCE ↗</span>
        </button>
        <figcaption>{device} · {view.label} <span>Source: {assets[`hotjar${view.source}`].source.split("/").at(-1)}</span></figcaption>
      </figure>
      <div className="eo-research-insight" aria-live="polite" aria-atomic="true">
        <p className="eo-research-eyebrow">CAPTURE / {String(view.source).padStart(2, "0")}</p>
        <h4>{view.label}</h4>
        <dl><div><dt>OBSERVATION</dt><dd>{view.observation}</dd></div><div><dt>DESIGN IMPLICATION</dt><dd>{view.implication}</dd></div></dl>
        {view.marker && <div className="eo-research-markers">{view.marker.map(marker => <p key={marker.value}><strong>{marker.value}</strong><span>{marker.label}</span></p>)}</div>}
        <button className="eo-research-source-link" type="button" onClick={event => open(view.source - 1, event.currentTarget)}>Read the original research board ↗</button>
      </div>
    </div>
    <p className="eo-research-note">Click maps record interactions; scroll markers describe exposure at a page depth. Capture periods and populations are not consistently shown, so these views are not treated as a controlled device comparison.</p>
  </>;
}

const insightCards = [
  { number: "01", category: "HOMEPAGE", title: "Clearer shopping entry points.", asset: "homeDesktopClick", source: 3,
    observed: "Navigation and early shopping controls attract visible clicks; deeper discovery modules have less scroll exposure in the captured homepage study.",
    response: "Prioritize explicit collection choices and shopping entry points, aligned with the existing PRINT / CLASSIC GEAR pathways." },
  { number: "02", category: "PRODUCT DETAIL PAGE", title: "More confident purchase decisions.", asset: "pdpLinenDesktop", source: 4,
    observed: "Color, size and fit choices concentrate clicks, while the mobile scroll capture shows lower exposure to supporting content.",
    response: "Clarify product hierarchy and selection feedback, with fit guidance, reassurance and purchase actions close to the decision." },
  { number: "03", category: "PRODUCT DISCOVERY", title: "Less friction in product exploration.", asset: "bigDesktop", source: 8,
    observed: "Big & Tall filter choices and pagination show visible interaction. Sale and Best Sellers captures show different browsing patterns.",
    response: "Keep browsing criteria visible and test product order, relevant filtering and more informative product previews." },
];

function MetricComparison({ metrics, caption }: { metrics: ResearchMetric[]; caption: string }) {
  return <div className="eo-research-table-scroll"><table className="eo-research-metric-table"><caption className="eo-research-sr">{caption}</caption><thead><tr><th scope="col">METRIC</th><th scope="col">CONTROL</th><th scope="col">VARIANT</th><th scope="col">RELATIVE CHANGE</th></tr></thead><tbody>
    {metrics.map(metric => {
      const change = relativeChange(metric.control, metric.variant);
      return <tr key={metric.id} data-metric={metric.id} data-direction={change > 0 ? "increase" : change < 0 ? "decrease" : "unchanged"}><th scope="row">{metric.name}</th><td data-value="control">{formatMetric(metric, metric.control)}</td><td data-value="variant">{formatMetric(metric, metric.variant)}</td><td data-value="change"><span aria-hidden="true">{change > 0 ? "↑" : change < 0 ? "↓" : "→"} </span>{formatChange(change)}</td></tr>;
    })}
  </tbody></table></div>;
}

function SourceProof({ keys, open, label, titleAsset }: { keys: string[]; open: OpenEvidence; label: string; titleAsset?: string }) {
  return <details className="eo-research-proof"><summary>{label}<span aria-hidden="true">＋</span></summary><div className="eo-research-proof-content">
    {titleAsset && <EvidenceImage name={titleAsset} className="eo-research-test-title-image" />}
    {keys.map(key => <figure key={key}><button type="button" aria-label={`Expand ${assets[key].source.split("/").at(-1)} evidence`} aria-haspopup="dialog" onClick={event => open(sourceKeys.indexOf(key), event.currentTarget)}><EvidenceImage name={key} /></button><figcaption>{assets[key].caption}</figcaption></figure>)}
  </div></details>;
}

function Experiments({ open }: { open: OpenEvidence }) {
  const [selected, setSelected] = useState<"mobile" | "desktop">("mobile");
  const experiment = shopLookExperiments[selected];
  const reduced = useResearchReducedMotion();
  return <>
    <ResearchTabs options={[{ id: "mobile", label: "MOBILE" }, { id: "desktop", label: "DESKTOP" }]} value={selected} onChange={setSelected} label="Shop the Look experiment device" controls="eo-experiment-panel" prefix="eo-experiment-tab" />
    <motion.div key={selected} id="eo-experiment-panel" role="tabpanel" aria-labelledby={`eo-experiment-tab-${selected}`} className="eo-research-experiment-panel" data-experiment={selected} initial={false} animate={reduced ? { opacity: 1 } : { opacity: [.5, 1] }} transition={{ duration: reduced ? 0 : .3 }}>
      <div className="eo-research-experiment-intro"><h4>{experiment.name}</h4><p>{experiment.summary}</p></div>
      <MetricComparison metrics={experiment.metrics} caption={`${experiment.name}: Control Group versus New Group 1`} />
      <p className="eo-research-note">Variant refers to “New Group 1” in the captured report. Exact layout modifications are not shown. Changes here are calculated from the displayed source rates.</p>
      {selected === "mobile" && <p className="eo-research-note">The dashboard reports +24.53%, +3.33% and +1.49%. Its more precise underlying rates account for the small differences from calculations using the rounded chart labels.</p>}
      <SourceProof keys={[experiment.source]} titleAsset={experiment.titleAsset} open={open} label="View the original experiment evidence" />
      <div className="eo-research-audience-slot">{selected === "mobile" ? <details className="eo-research-proof"><summary>Explore the mobile audience breakdown<span aria-hidden="true">＋</span></summary><div className="eo-research-proof-content eo-research-audiences">
        <p>New and returning visitors are separate cohorts within the mobile experiment. Their relative changes are not added together.</p>
        {mobileAudienceResults.map(audience => <div key={audience.name}><h5>{audience.name}</h5><MetricComparison metrics={audience.metrics} caption={`Mobile Shop the Look, ${audience.name}`} /></div>)}
        <button className="eo-research-source-link" type="button" onClick={event => open(12, event.currentTarget)}>Open abtest4.jpg audience evidence ↗</button>
      </div></details> : <p className="eo-research-note">This desktop screenshot shows aggregate results; a desktop audience breakdown is not supplied.</p>}</div>
    </motion.div>
  </>;
}

function CountedChange({ value }: { value: number }) {
  const root = useRef<HTMLSpanElement>(null);
  const visual = useRef<HTMLSpanElement>(null);
  const seen = useRef(false);
  const inView = useInView(root, { once: true, amount: .4 });
  const reduced = useResearchReducedMotion();
  useEffect(() => {
    const element = visual.current;
    if (!element || !inView) return;
    if (reduced || seen.current) { element.textContent = formatChange(value); seen.current = true; return; }
    seen.current = true;
    const counter = { value: 0 };
    const tween = gsap.to(counter, { value, duration: 1, ease: "power2.out", onUpdate: () => { element.textContent = formatChange(counter.value); }, onComplete: () => { element.textContent = formatChange(value); } });
    return () => { tween.kill(); element.textContent = formatChange(value); };
  }, [inView, reduced, value]);
  return <span ref={root} data-final-value={formatChange(value)}><span ref={visual} aria-hidden="true">{formatChange(value)}</span><span className="eo-research-sr">{formatChange(value)} relative change</span></span>;
}

export function ElevenOasisResearch() {
  const [readerOpen, setReaderOpen] = useState(false);
  useEffect(() => {
    if (!readerOpen) return;
    const overflow = document.body.style.overflow, padding = document.body.style.paddingRight;
    const scrollbar = innerWidth - document.documentElement.clientWidth;
    if (scrollbar) document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbar}px`;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; document.body.style.paddingRight = padding; };
  }, [readerOpen]);
  return <section id="decisions" className="eleven-main-section eo-research" aria-labelledby="eleven-decisions-title" tabIndex={-1}>
    <ImageGallery images={sources} onOpenChange={setReaderOpen} renderPreview={open => <>
      <ResearchReveal><header className="eo-research-intro"><div><p className="eo-research-eyebrow">03 / RESEARCH &amp; VALIDATION</p><h2 id="eleven-decisions-title">DATA-DRIVEN DESIGN</h2><p className="eo-research-subtitle">Turning behavioral insights into better shopping experiences.</p></div><p className="eo-research-intro-copy">By combining behavioral analysis, UX observations, and controlled experiments, I used evidence to identify friction points, guide design decisions, and evaluate opportunities to improve the shopping experience.</p></header>
        <ol className="eo-research-process">{[["01 / OBSERVE", "Behavioral insights"], ["02 / OPTIMIZE", "Design hypotheses"], ["03 / VALIDATE", "A/B testing"]].map(([label, text]) => <li key={label}><span>{label}</span><p>{text}</p></li>)}</ol>
      </ResearchReveal>
      <article id="behavioral-analysis" className="eo-research-module"><ResearchReveal><ModuleHeading number="01" label="BEHAVIORAL ANALYSIS" title="Understanding Where Shoppers Focus">Hotjar click and scroll analysis helped reveal how visitors interacted with key shopping pages, where attention concentrated, and which areas needed closer UX review.</ModuleHeading></ResearchReveal><HeatmapViewer open={open} /></article>
      <article id="insight-to-action" className="eo-research-module"><ResearchReveal><ModuleHeading number="02" label="FROM INSIGHT TO ACTION" title="Turning Evidence into Design Decisions" /></ResearchReveal>
        <div className="eo-research-cards">{insightCards.map(card => <ResearchReveal key={card.number} className="eo-research-card-wrap"><article className="eo-research-card"><p className="eo-research-eyebrow">{card.number} / {card.category}</p><h4>{card.title}</h4><button type="button" className="eo-research-card-image" aria-haspopup="dialog" aria-label={`Expand ${card.category.toLowerCase()} behavioral evidence`} onClick={event => open(card.source - 1, event.currentTarget)}><EvidenceImage name={card.asset} /></button><dl><div><dt>OBSERVED</dt><dd>{card.observed}</dd></div><div><dt>DESIGN RESPONSE</dt><dd>{card.response}</dd></div></dl><button type="button" className="eo-research-source-link" onClick={event => open(card.source - 1, event.currentTarget)}>Explore evidence ↗</button></article></ResearchReveal>)}</div>
        <p className="eo-research-note">These responses connect research observations to design hypotheses. The screenshots do not establish that a particular experiment caused a specific redesign decision.</p>
      </article>
      <article id="research-experiments" className="eo-research-module"><ResearchReveal><ModuleHeading number="03" label="EXPERIMENTATION" title="Testing Design Hypotheses">Controlled experiments provided another layer of evidence, helping compare shopping experiences and identify opportunities for further iteration.</ModuleHeading></ResearchReveal><Experiments open={open} /></article>
      <article id="research-outcomes" className="eo-research-module"><ResearchReveal><ModuleHeading number="04" label="MEASURED OUTCOMES" title="What the Experiments Revealed">A separate report snapshot records higher conversion, add-to-cart and average order value for New Group 1. Its test name, device and date are not shown, so these figures stand on their own.</ModuleHeading></ResearchReveal>
        <p className="eo-research-eyebrow">SEPARATE TEST SNAPSHOT / CONTROL GROUP → NEW GROUP 1</p>
        <div className="eo-research-kpis">{separateTestMetrics.map(metric => <article key={metric.id} data-kpi={metric.id}><p>{metric.name}</p><strong className="eo-research-kpi-change"><CountedChange value={relativeChange(metric.control, metric.variant)} /></strong><p className="eo-research-kpi-values"><span>{formatMetric(metric, metric.control)}</span><span aria-hidden="true">→</span><span>{formatMetric(metric, metric.variant)}</span></p><span className="eo-research-kpi-label">CONTROL → VARIANT · RELATIVE CHANGE ABOVE</span></article>)}</div>
        <p className="eo-research-note">Observed test results; statistical significance and long-term impact are not established by the available screenshots.</p>
        <button className="eo-research-kpi-source" type="button" aria-haspopup="dialog" onClick={event => open(9, event.currentTarget)}><EvidenceImage name="abtest1" /><span>EXPAND SOURCE TABLE / ABTEST1.PNG ↗</span></button>
        <SourceProof keys={["abtest2"]} open={open} label="View the matching dashboard excerpt" />
      </article>
      <ResearchReveal><article id="research-takeaways" className="eo-research-takeaway"><p className="eo-research-eyebrow">05 / KEY TAKEAWAYS</p><h3>Designing with Evidence, Not Assumptions</h3><p>Behavioral analysis helped identify where shoppers focused their attention and where friction appeared. Experimentation added another layer of evidence, highlighting promising improvements as well as opportunities for continued iteration.</p></article></ResearchReveal>
      <details className="eo-research-proof eo-research-source-index"><summary>Research sources / 14 uploaded screenshots<span aria-hidden="true">＋</span></summary><ol>{sources.map((source, index) => <li key={source.src}><button type="button" onClick={event => open(index, event.currentTarget)}>{source.source.split("/").at(-1)}<span>{source.caption.split(" · ").slice(1).join(" · ")}</span></button></li>)}</ol></details>
    </>} />
  </section>;
}
