"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ImageGallery } from "@/components/ImageGallery";
import { Arrow } from "@/components/Arrow";
import { heatPages, heatViews, shopLookExperiments, mobileAudienceResults, separateTestMetrics, relativeChange, formatMetric, formatChange, type ResearchMetric } from "@/data/eleven-oasis-research";
import manifest from "../../../public/projects/eleven-oasis/research/manifest.json";
import "./ElevenOasisResearch.css";

const assets: Record<string, typeof manifest[keyof typeof manifest]> = manifest;
const sourceKeys = [...Array.from({ length: 9 }, (_, index) => `hotjar${index + 1}`), ...Array.from({ length: 5 }, (_, index) => `abtest${index + 1}`)];
const sources = sourceKeys.map(key => assets[key]);
type OpenEvidence = (index: number, trigger: HTMLButtonElement) => void;

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

const groups = [
  { id: "behavioral-analysis", title: "Behavioral analysis", heading: "Understanding Where Shoppers Focus" },
  { id: "insight-to-action", title: "From insight to action", heading: "Turning Evidence into Design Decisions" },
  { id: "research-experiments", title: "A/B testing & validation", heading: "Testing Design Hypotheses" },
  { id: "research-outcomes", title: "Measured outcomes", heading: "What the Experiments Revealed" },
];
const heatAssets = [...new Set(heatViews.map(view => view.asset))];
const insightAssets = insightCards.map(card => card.asset);
const experimentAssets = ["abtest3", "abtest4", "abtest5"];
const previewAssets = [...new Set([...heatAssets, ...insightAssets, ...experimentAssets, "abtest1", "abtest2", "mobileTestTitle", "desktopTestTitle"])];
const decodedImages = new Map<string, Promise<void>>();
function prepareImage(key: string) {
  let promise = decodedImages.get(key);
  if (!promise) {
    const image = new window.Image();
    image.src = assets[key].src;
    promise = image.decode().catch(error => { decodedImages.delete(key); throw error; });
    decodedImages.set(key, promise);
  }
  return promise;
}

/** Mounted layers fade through white within the accordion's 400ms transition. */
function EvidenceFrame({ entries, selected, source, open }: { entries: string[]; selected: string; source: string; open: OpenEvidence }) {
  return <button type="button" className="eo-research-image-frame" aria-haspopup="dialog" aria-label={`Expand ${assets[source].caption}`} onClick={event => open(sourceKeys.indexOf(source), event.currentTarget)}>
    {entries.map(key => <span key={key} className="eo-research-image-layer" data-active={selected === key} aria-hidden={selected !== key}>
      <Image src={assets[key].src} width={assets[key].width} height={assets[key].height} alt={assets[key].alt} loading="eager" sizes="(max-width:950px) 90vw, 58vw" />
    </span>)}<span className="eo-research-enlarge">EXPAND EVIDENCE <Arrow diagonal /></span>
  </button>;
}

export function ElevenOasisResearch() {
  const root = useRef<HTMLElement>(null);
  const request = useRef({ revision: 0 });
  const [active, setActive] = useState(0);
  const [heatId, setHeatId] = useState(heatViews[0].id);
  const [insight, setInsight] = useState(0);
  const [device, setDevice] = useState<"mobile" | "desktop">("mobile");
  const [audience, setAudience] = useState("all");
  const [snapshot, setSnapshot] = useState("abtest1");
  const [status, setStatus] = useState("");
  const [readerOpen, setReaderOpen] = useState(false);
  const view = heatViews.find(item => item.id === heatId)!;
  const card = insightCards[insight];
  const experiment = shopLookExperiments[device];
  const cohort = device === "mobile" && audience !== "all" ? mobileAudienceResults[Number(audience)] : null;
  const experimentSource = cohort ? "abtest4" : experiment.source;
  const currentAssets = [view.asset, card.asset, experimentSource, snapshot];

  useEffect(() => {
    const lifecycle = request.current;
    previewAssets.forEach(key => { void prepareImage(key).catch(() => { /* Selection can retry a failed image. */ }); });
    return () => { lifecycle.revision++; };
  }, []);
  useEffect(() => {
    const followHash = () => {
      const index = groups.findIndex(group => `#${group.id}` === location.hash);
      if (index >= 0) { request.current.revision++; setActive(index); setStatus(""); }
    };
    followHash(); window.addEventListener("hashchange", followHash);
    return () => window.removeEventListener("hashchange", followHash);
  }, []);
  useEffect(() => {
    if (!readerOpen) return;
    const overflow = document.body.style.overflow, padding = document.body.style.paddingRight;
    const scrollbar = innerWidth - document.documentElement.clientWidth;
    if (scrollbar) document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbar}px`;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; document.body.style.paddingRight = padding; };
  }, [readerOpen]);

  async function selectImage(key: string, update: () => void) {
    const ticket = ++request.current.revision;
    setStatus("Loading research evidence.");
    try { await prepareImage(key); }
    catch {
      if (ticket === request.current.revision) setStatus("This evidence could not load. Please try again.");
      return;
    }
    if (ticket !== request.current.revision) return;
    update(); setStatus("");
  }

  function explanation(index: number) {
    if (index === 0) return <>
      <p>Hotjar click and scroll analysis helped reveal how visitors interacted with key shopping pages, where attention concentrated, and which areas needed closer UX review.</p>
      <dl className="eo-research-observation"><div><dt>OBSERVATION / {view.label}</dt><dd>{view.observation}</dd></div><div><dt>DESIGN IMPLICATION</dt><dd>{view.implication}</dd></div></dl>
      {view.marker && <div className="eo-research-markers">{view.marker.map(marker => <p key={marker.value}><strong>{marker.value}</strong><span>{marker.label}</span></p>)}</div>}
      <p className="eo-research-note">Click maps record interactions; scroll markers describe exposure at a page depth. Capture periods and populations are not consistently shown, so these views are not treated as a controlled device comparison.</p>
    </>;
    if (index === 1) return <>
      <h4>{card.title}</h4><dl className="eo-research-observation"><div><dt>OBSERVED</dt><dd>{card.observed}</dd></div><div><dt>DESIGN RESPONSE</dt><dd>{card.response}</dd></div></dl>
      <p className="eo-research-note">These responses connect research observations to design hypotheses. The screenshots do not establish that a particular experiment caused a specific redesign decision.</p>
    </>;
    if (index === 2) return <>
      <h4>{experiment.name}{cohort ? ` / ${cohort.name}` : ""}</h4><p>{experiment.summary}</p>
      <p className="eo-research-note">Variant refers to “New Group 1” in the captured report. Exact layout modifications are not shown. Changes here are calculated from the displayed source rates.</p>
      {device === "mobile" ? <>
        <p className="eo-research-note">The dashboard reports +24.53%, +3.33% and +1.49%. Its more precise underlying rates account for the small differences from calculations using the rounded chart labels.</p>
        <p className="eo-research-note">New and returning visitors are separate cohorts within the mobile experiment. Their relative changes are not added together.</p>
      </> : <p className="eo-research-note">This desktop screenshot shows aggregate results; a desktop audience breakdown is not supplied.</p>}
    </>;
    return <>
      <p>A separate report snapshot records higher conversion, add-to-cart and average order value for New Group 1. Its test name, device and date are not shown, so these figures stand on their own.</p>
      <p className="eo-research-note">Observed test results; statistical significance and long-term impact are not established by the available screenshots.</p>
      <p className="eo-research-note">This unnamed snapshot remains separate from the Mobile and Desktop Shop the Look experiments.</p>
    </>;
  }

  function evidence(index: number, instance: string, open: OpenEvidence) {
    const prefix = `eo-${instance}-${index}`;
    if (index === 0) return <div className="eo-research-evidence" data-view={view.id}>
      <ResearchTabs options={heatPages} value={view.page} onChange={page => { const next = heatViews.find(item => item.page === page && item.device === view.device)!; void selectImage(next.asset, () => setHeatId(next.id)); }} label="Behavioral evidence page type" controls={`${prefix}-panel`} prefix={`${prefix}-page`} />
      <div id={`${prefix}-panel`} role="tabpanel" aria-labelledby={`${prefix}-page-${view.page}`} className="eo-research-evidence-content">
        <div className="eo-research-viewer-controls"><div role="group" aria-label="Evidence device" className="eo-research-device-controls">{(["Desktop", "Mobile"] as const).map(item => <button type="button" key={item} aria-pressed={view.device === item} onClick={() => { const next = heatViews.find(entry => entry.page === view.page && entry.device === item)!; void selectImage(next.asset, () => setHeatId(next.id)); }}>{item.toUpperCase()}</button>)}</div>
          <label><span className="eo-research-sr">Evidence capture</span><select aria-label="Evidence capture" value={view.id} onChange={event => { const next = heatViews.find(item => item.id === event.target.value)!; void selectImage(next.asset, () => setHeatId(next.id)); }}>{heatViews.filter(item => item.page === view.page && item.device === view.device).map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        </div>
        <EvidenceFrame entries={heatAssets} selected={view.asset} source={`hotjar${view.source}`} open={open} />
        <p className="eo-research-caption">{view.device} · {view.label}<span>Source: {assets[`hotjar${view.source}`].source.split("/").at(-1)}</span></p>
      </div>
    </div>;
    if (index === 1) return <div className="eo-research-evidence">
      <ResearchTabs options={insightCards.map((item, i) => ({ id: String(i), label: item.category }))} value={String(insight)} onChange={value => { const next = Number(value); void selectImage(insightCards[next].asset, () => setInsight(next)); }} label="Design insight" controls={`${prefix}-panel`} prefix={`${prefix}-insight`} />
      <div id={`${prefix}-panel`} role="tabpanel" aria-labelledby={`${prefix}-insight-${insight}`} className="eo-research-evidence-content">
        <p className="eo-research-evidence-heading">{card.category} / OBSERVATION → DESIGN RESPONSE</p>
        <EvidenceFrame entries={insightAssets} selected={card.asset} source={`hotjar${card.source}`} open={open} />
        <p className="eo-research-caption">{card.title}<span>Source: hotjar{card.source}.{card.source < 7 ? "png" : "jpg"}</span></p>
      </div>
    </div>;
    if (index === 2) return <div className="eo-research-evidence" data-experiment={device} data-audience={audience}>
      <ResearchTabs options={[{ id: "mobile", label: "MOBILE" }, { id: "desktop", label: "DESKTOP" }]} value={device} onChange={value => { void selectImage(shopLookExperiments[value].source, () => { setDevice(value); setAudience("all"); }); }} label="Shop the Look experiment device" controls={`${prefix}-panel`} prefix={`${prefix}-device`} />
      <div id={`${prefix}-panel`} role="tabpanel" aria-labelledby={`${prefix}-device-${device}`} className="eo-research-evidence-content">
        <div className="eo-research-experiment-context"><p>CONTROL GROUP → NEW GROUP 1</p>{device === "mobile" && <label><span className="eo-research-sr">Mobile audience</span><select aria-label="Mobile audience" value={audience} onChange={event => { const value = event.target.value; void selectImage(value === "all" ? experiment.source : "abtest4", () => setAudience(value)); }}><option value="all">All visitors</option><option value="0">New visitors</option><option value="1">Returning visitors</option></select></label>}</div>
        <MetricComparison metrics={cohort?.metrics || experiment.metrics} caption={`${experiment.name}${cohort ? `, ${cohort.name}` : ""}: Control Group versus New Group 1`} />
        <p className="eo-research-evidence-heading">{cohort ? `${cohort.name} / separate mobile cohort` : experiment.name} · ORIGINAL EVIDENCE</p>
        <Image className="eo-research-test-title" src={assets[experiment.titleAsset].src} width={assets[experiment.titleAsset].width} height={assets[experiment.titleAsset].height} alt={assets[experiment.titleAsset].alt} loading="eager" sizes="(max-width:950px) 90vw, 58vw" />
        <EvidenceFrame entries={experimentAssets} selected={experimentSource} source={experimentSource} open={open} />
        <p className="eo-research-caption">Source: {assets[experimentSource].source.split("/").at(-1)}<span>Relative change = (variant / control − 1) × 100</span></p>
      </div>
    </div>;
    return <div className="eo-research-evidence">
      <ResearchTabs options={[{ id: "abtest1", label: "SOURCE TABLE" }, { id: "abtest2", label: "DASHBOARD" }]} value={snapshot} onChange={value => { void selectImage(value, () => setSnapshot(value)); }} label="Separate test evidence" controls={`${prefix}-panel`} prefix={`${prefix}-snapshot`} />
      <div id={`${prefix}-panel`} role="tabpanel" aria-labelledby={`${prefix}-snapshot-${snapshot}`} className="eo-research-evidence-content">
        <p className="eo-research-evidence-heading">SEPARATE TEST SNAPSHOT / CONTROL → VARIANT</p>
        <div className="eo-research-kpis">{separateTestMetrics.map(metric => <article key={metric.id} data-kpi={metric.id}><p>{metric.name}</p><strong>{formatChange(relativeChange(metric.control, metric.variant))}</strong><p className="eo-research-kpi-values"><span>{formatMetric(metric, metric.control)}</span><span aria-hidden="true">→</span><span>{formatMetric(metric, metric.variant)}</span></p><span className="eo-research-kpi-label">RELATIVE CHANGE</span></article>)}</div>
        <EvidenceFrame entries={["abtest1", "abtest2"]} selected={snapshot} source={snapshot} open={open} />
        <p className="eo-research-caption">Source: {snapshot}.png<span>Test identity, significance and long-term impact are not supplied.</span></p>
      </div>
    </div>;
  }

  return <section ref={root} id="decisions" className="eleven-main-section eo-research" aria-labelledby="eleven-decisions-title" tabIndex={-1} data-research-group={groups[active].id}>
    <header className="eo-research-intro"><div><p className="eo-research-eyebrow">03 / RESEARCH &amp; VALIDATION</p><h2 id="eleven-decisions-title">DATA-DRIVEN DESIGN</h2><p className="eo-research-subtitle">Turning behavioral insights into better shopping experiences.</p></div><div><p className="eo-research-intro-copy">By combining behavioral analysis, UX observations, and controlled experiments, I used evidence to identify friction points, guide design decisions, and evaluate opportunities to improve the shopping experience.</p><ol className="eo-research-process"><li>01 / OBSERVE <span>Behavioral insights</span></li><li>02 / OPTIMIZE <span>Design hypotheses</span></li><li>03 / VALIDATE <span>A/B testing</span></li></ol></div></header>
    <ImageGallery images={sources} onOpenChange={setReaderOpen} renderPreview={open => <>
      <div className="eo-research-workspace">
        <div className="eo-research-accordion">
          {groups.map((group, index) => <div className="eo-research-item" key={group.id} data-expanded={active === index}>
            <h3 id={group.id}><button type="button" className="eo-research-trigger" id={`eo-research-trigger-${index}`} aria-expanded={active === index} aria-disabled={active === index || undefined} aria-controls={`eo-research-copy-${index}`} onClick={() => { void selectImage(currentAssets[index], () => setActive(index)); }} onKeyDown={event => {
              let next: number | undefined;
              if (event.key === "ArrowDown") next = (index + 1) % groups.length;
              if (event.key === "ArrowUp") next = (index + groups.length - 1) % groups.length;
              if (event.key === "Home") next = 0;
              if (event.key === "End") next = groups.length - 1;
              if (next !== undefined) { event.preventDefault(); root.current?.querySelectorAll<HTMLButtonElement>(".eo-research-trigger")[next].focus(); }
            }}><span className="eo-research-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{group.title}</span><svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 7.5 5 5 5-5" /></svg></button></h3>
            <div className="eo-research-copy-panel" id={`eo-research-copy-${index}`} role="region" aria-labelledby={`eo-research-trigger-${index}`} aria-hidden={active !== index} inert={active !== index}><div className="eo-research-clip"><div className="eo-research-copy"><p className="eo-research-panel-heading">{group.heading}</p>{explanation(index)}<div className="eo-research-mobile-visual">{evidence(index, "mobile", open)}</div></div></div></div>
          </div>)}
        </div>
        <div className="eo-research-desktop-visual" role="region" aria-labelledby={`eo-research-trigger-${active}`}>{groups.map((group, index) => <div key={group.id} className="eo-research-visual-layer" data-active={active === index} aria-hidden={active !== index} inert={active !== index}>{evidence(index, "desktop", open)}</div>)}</div>
      </div>
      <p className="eo-research-sr" role="status">{status}</p>
      <article id="research-takeaways" className="eo-research-takeaway"><div><p className="eo-research-eyebrow">KEY TAKEAWAYS</p><h3>Designing with Evidence, Not Assumptions</h3></div><p>Behavioral analysis helped identify where shoppers focused their attention and where friction appeared. Experimentation added another layer of evidence, highlighting promising improvements as well as opportunities for continued iteration.</p></article>
      <details className="eo-research-proof eo-research-source-index"><summary>Research sources / 14 uploaded screenshots<span aria-hidden="true">＋</span></summary><ol>{sources.map((source, index) => <li key={source.src}><button type="button" onClick={event => open(index, event.currentTarget)}>{source.source.split("/").at(-1)}<span>{source.caption.split(" · ").slice(1).join(" · ")}</span></button></li>)}</ol></details>
    </>} />
  </section>;
}
