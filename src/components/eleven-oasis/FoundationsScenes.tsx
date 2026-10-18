import Image from "next/image";
import assets from "../../../public/projects/eleven-oasis/foundations/manifest.json";

type Asset = keyof typeof assets;
function Crop({ name, className = "" }: { name: Asset; className?: string }) {
  const image = assets[name];
  return <Image src={image.src} width={image.width} height={image.height} alt={image.alt} className={className} loading="eager" sizes="(max-width:950px) 80vw, 50vw" />;
}

const iconGroups: { title: string; icons: Asset[] }[] = [
  { title: "Fabric properties", icons: ["linen", "breathable", "wrinkle"] },
  { title: "Product features", icons: ["stripe", "cocktail", "shortSleeve"] },
  { title: "Care instructions", icons: ["wash", "bleach", "iron"] },
  { title: "Purchase reassurance", icons: ["guarantee", "payLater", "shipping"] },
];

export function FoundationsScenes({ selected }: { selected: number }) {
  return <>
    <div className="eo-foundations-scene eo-foundations-type" data-foundation-scene="typography" aria-hidden={selected !== 0}>
      <div className="eo-foundations-type-display" data-foundation-piece="display">
        <span className="eo-foundations-eyebrow">Oswald · Semibold 600</span>
        <p className="eo-foundations-heading">FRESH AIR.<span className="eo-foundations-display-second"><br />FRESH LAYERS.</span></p>
        <span className="eo-foundations-cta" data-foundation-piece="type-sample">SHOP NOW</span>
        <p className="eo-foundations-spec" data-foundation-piece="type-spec">Headings <b>32 / 26 px</b><span className="eo-foundations-extra-spec"><br />Banner <b>32 / 28 px</b> · CTA <b>24 / 18 px</b></span></p>
      </div>
      <div className="eo-foundations-type-body">
        <div data-foundation-piece="type-sample"><span className="eo-foundations-eyebrow">Open Sans · Regular / Semibold</span><p className="eo-foundations-product">Men’s Easygoing 100% Cotton<br />Button Down Shirt</p></div>
        <div className="eo-foundations-price" data-foundation-piece="type-sample"><s>$49.99</s> <span>$42.49</span></div>
        <p className="eo-foundations-body" data-foundation-piece="type-sample">Cotton · Breathable · Everyday Wear</p>
        <div className="eo-foundations-spec" data-foundation-piece="type-spec"><span>Desktop / Mobile</span><p>PDP price <b>24 / 24 px · 600</b><br />Product-card price <b>18 / 16 px · 600</b><br />Body & labels <b>14 / 14 px</b></p></div>
      </div>
    </div>
    <div className="eo-foundations-scene eo-foundations-icons" data-foundation-scene="icons" aria-hidden={selected !== 1}>
      {iconGroups.map(group => <div className="eo-foundations-icon-group" key={group.title}>
        <div className="eo-foundations-icon-row">{group.icons.map(name => <figure key={name} data-foundation-piece="icon"><Crop name={name} /><figcaption>{assets[name].alt}</figcaption></figure>)}</div>
        <p data-foundation-piece="icon-label">{group.title}</p>
      </div>)}
    </div>
    <div className="eo-foundations-scene eo-foundations-patterns" data-foundation-scene="patterns" aria-hidden={selected !== 2}>
      <figure className="eo-foundations-pattern-card" data-foundation-piece="pattern"><Crop name="productCard" /><figcaption>Product card</figcaption></figure>
      <div className="eo-foundations-pattern-stack">
        <figure className="eo-foundations-actions" data-foundation-piece="pattern"><div className="eo-foundations-cta-pair"><Crop name="heroCta" /><Crop name="secondaryCta" /></div><Crop name="cartCta" /><figcaption>Primary & secondary actions</figcaption></figure>
        <figure data-foundation-piece="pattern"><Crop name="price" /><Crop name="rating" /><figcaption>Pricing, promotion & reviews</figcaption></figure>
      </div>
      <div className="eo-foundations-pattern-stack">
        <figure data-foundation-piece="pattern"><Crop name="selectors" /><div className="eo-foundations-selection-compact"><Crop name="colorSwatches" /><Crop name="sizeOptions" /></div><figcaption>Color & size selection</figcaption></figure>
        <figure data-foundation-piece="pattern"><Crop name="reassurance" /><figcaption>Trust & reassurance</figcaption></figure>
      </div>
    </div>
    <div className="eo-foundations-scene eo-foundations-devices" data-foundation-scene="devices" aria-hidden={selected !== 3}>
      <figure className="eo-foundations-desktop" data-foundation-piece="desktop"><div className="eo-foundations-browser"><span /><span /><span /></div><Crop name="desktop" /><figcaption>Desktop homepage</figcaption></figure>
      <figure className="eo-foundations-mobile" data-foundation-piece="mobile"><Crop name="mobile" /><figcaption>Mobile shopping</figcaption></figure>
      <div className="eo-foundations-touchpoints">
        <figure data-foundation-piece="touchpoint"><Crop name="pdp" /><figcaption>Product detail</figcaption></figure>
        <figure data-foundation-piece="touchpoint"><Crop name="campaign" /><figcaption>Campaign landing page</figcaption></figure>
      </div>
    </div>
  </>;
}
