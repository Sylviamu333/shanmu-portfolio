import { brandAssets, brandColors, type BrandAssetKey } from "@/data/eleven-oasis-branding";

function Artwork({ asset, x, y, width, height, piece, paper = false }: {
  asset: BrandAssetKey; x: number; y: number; width: number; height?: number; piece?: string; paper?: boolean;
}) {
  const image = brandAssets[asset];
  const h = height ?? width * image.height / image.width;
  return <g data-piece={piece}>
    {paper && <rect x={x} y={y} width={width} height={h} fill="#fff" className="eleven-brand-paper" />}
    <image href={image.src} x={x} y={y} width={width} height={h} preserveAspectRatio="xMidYMid meet" />
  </g>;
}

function IdentityHero({ compact }: { compact: boolean }) {
  const x = compact ? 40 : 80, y = compact ? 100 : 110, w = 920, h = compact ? 520 : 630;
  return <g data-piece="identity-hero">
    <rect x={x} y={y} width={w} height={h} fill="#fff" />
    <Artwork asset="logo" x={x + 80} y={y + h * .33} width={w - 160} />
    <text x={x + w / 2} y={y + h - 48} textAnchor="middle" className="eleven-brand-caption">Guidelines</text>
  </g>;
}

export function ElevenOasisBrandArtboard({ compact }: { compact: boolean }) {
  const W = compact ? 1000 : 1600, H = compact ? 720 : 958;
  return <svg className="eleven-brand-artboard" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
    <g data-scene="identity" className="eleven-brand-scene eleven-brand-first">
      <text x="64" y="65" className="eleven-brand-kicker">01 / BRAND IDENTITY</text>
      <IdentityHero compact={compact} />
      <Artwork asset="page3" x={compact ? 580 : 1010} y={compact ? 48 : 90} width={compact ? 360 : 460} piece="identity-support" paper />
      <Artwork asset="page7" x={compact ? 610 : 1050} y={compact ? 345 : 475} width={compact ? 350 : 440} piece="identity-support" paper />
      <Artwork asset="page5" x={compact ? 40 : 760} y={compact ? 405 : 390} width={compact ? 320 : 400} piece="identity-support" paper />
      <g data-piece="identity-rules">
        {["page4", "page6", "page8", "page9"].map((asset, index) => <Artwork key={asset} asset={asset as BrandAssetKey}
          x={compact ? (index % 2 ? 530 : 80) : (index % 2 ? 650 : 200)}
          y={compact ? (index > 1 ? 395 : 85) : (index > 1 ? 490 : 140)} width={compact ? 390 : 420} paper />)}
      </g>
      {!compact && <Artwork asset="page13" x={1120} y={260} width={360} piece="identity-intro" paper />}
    </g>

    <g data-scene="colors" className="eleven-brand-scene">
      <text x="64" y="65" className="eleven-brand-kicker">02 / COLOR SYSTEM</text>
      {brandColors.map((color, index) => {
        const x = index < 2 ? (compact ? 50 + index * 470 : 80 + index * 730) : (compact ? 50 + (index - 2) * 230 : 80 + (index - 2) * 365);
        const y = index < 2 ? (compact ? 110 : 135) : (compact ? 385 : 530);
        const width = index < 2 ? (compact ? 430 : 650) : (compact ? 210 : 335);
        const height = index < 2 ? (compact ? 230 : 350) : (compact ? 270 : 300);
        const ink = [0,2,4].includes(index) ? "#F8F8F8" : "#252525";
        return <g key={color.name} data-piece="color-card" data-color={color.value}>
          <rect x={x} y={y} width={width} height={height} fill={color.value} stroke="#252525" strokeOpacity={.08} />
          <text x={x + 24} y={y + 48} fill={ink} className="eleven-brand-color-name" fontSize={index < 2 ? 40 : compact ? 28 : 31}>
            {compact && index > 1 ? color.name.split(" ").map((word, line) => <tspan key={line} x={x + 24} dy={line ? 34 : 0}>{word}</tspan>) : color.name}
          </text>
          <text x={x + 24} y={y + height - 55} fill={ink} className="eleven-brand-color-value">{color.value}</text>
          <text x={x + 24} y={y + height - 24} fill={ink} className="eleven-brand-color-role">{color.core ? "Main colors" : "Accent colors"}</text>
        </g>;
      })}
    </g>

    <g data-scene="typography" className="eleven-brand-scene">
      <text x="64" y="65" className="eleven-brand-kicker">03 / TYPOGRAPHY SYSTEM</text>
      <g data-piece="type-hero">
        <text x={compact ? 50 : 80} y={compact ? 165 : 185} className="eleven-brand-type-label">ROBOTO BLACK</text>
        <Artwork asset="alphabet" x={compact ? 50 : 80} y={compact ? 230 : 270} width={compact ? 900 : 1440} />
      </g>
      <Artwork asset="robotoBlack" x={compact ? 50 : 80} y={compact ? 110 : 150} width={compact ? 900 : 700} piece="type-detail" />
      <Artwork asset="robotoRegular" x={compact ? 50 : 820} y={compact ? 400 : 150} width={compact ? 900 : 700} piece="type-detail" />
      {!compact && <>
        <Artwork asset="impact" x={80} y={510} width={700} piece="type-detail" />
        <Artwork asset="gillSans" x={820} y={510} width={700} piece="type-detail" />
      </>}
      {compact && <text x="50" y="700" className="eleven-brand-caption" data-piece="type-detail">Substitutes: Impact / Gill Sans</text>}
    </g>

    <g data-scene="photography" className="eleven-brand-scene">
      <text x="64" y="65" className="eleven-brand-kicker">04 / PHOTOGRAPHY &amp; ART DIRECTION</text>
      <Artwork asset="desert" x={compact ? 50 : 80} y={compact ? 100 : 140} width={compact ? 590 : 870} piece="photo-landscape" />
      <Artwork asset="car" x={compact ? 50 : 80} y={compact ? 100 : 140} width={compact ? 590 : 870} piece="photo-car" />
      <Artwork asset="model" x={compact ? 700 : 1040} y={compact ? 95 : 115} width={compact ? 240 : 300} piece="photo-model" />
      <Artwork asset="friends" x={compact ? 500 : 910} y={compact ? 430 : 565} width={compact ? 450 : 610} piece="photo-friends" />
      <Artwork asset="coast" x={compact ? 500 : 910} y={compact ? 430 : 565} width={compact ? 450 : 610} piece="photo-coast" />
      <Artwork asset="preview16" x={compact ? 50 : 120} y={compact ? 500 : 710} width={compact ? 250 : 300} piece="photo-guide" paper />
      <Artwork asset="preview18" x={compact ? 310 : 450} y={compact ? 520 : 730} width={compact ? 220 : 260} piece="photo-guide" paper />
    </g>

    <g data-scene="story" className="eleven-brand-scene">
      <rect width={W} height={H} fill="#252525" />
      <g data-piece="story-camera">
        <Artwork asset="closingHeadline" x={compact ? 50 : 80} y={compact ? 100 : 170} width={compact ? 900 : 1000} piece="story-headline" />
        <Artwork asset="preview14" x={compact ? 610 : 1130} y={compact ? 330 : 125} width={compact ? 340 : 390} piece="story-support" paper />
        <Artwork asset="friends" x={compact ? 50 : 1140} y={compact ? 335 : 470} width={compact ? 430 : 380} piece="story-support" />
        <Artwork asset="closingLine" x={compact ? 50 : 80} y={compact ? 590 : 670} width={compact ? 900 : 1000} piece="story-line" />
      </g>
    </g>
  </svg>;
}
