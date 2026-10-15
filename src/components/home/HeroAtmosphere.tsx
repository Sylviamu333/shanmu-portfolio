import { useId } from "react";

export const HERO_WASH_PATH = "M-25 28 C55 -2 90 85 175 65 S285 17 365 67";

export function HeroAtmosphere() {
  const filter = `hero-wash-${useId().replaceAll(":", "")}`;
  const ink = `${filter}-ink`;
  return (
    <div className="hero-atmosphere" aria-hidden="true">
      <svg
        className="hero-atmosphere-art"
        viewBox="-125 -80 590 280"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <filter className="hero-wash-filter" id={filter} x="-30%" y="-100%" width="160%" height="300%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <path className="hero-wash-guide" d={HERO_WASH_PATH} />
          <linearGradient className="hero-wash-ink" id={ink} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="67" y2="10000">
            <stop offset="0" stopColor="#F48CCB" stopOpacity=".65" />
            <stop className="hero-wash-hero-tone" offset=".2" stopColor="#F48CCB" stopOpacity=".65" />
            <stop className="hero-wash-work-tone" offset=".4" stopColor="#F48CCB" stopOpacity=".32" />
            <stop offset="1" stopColor="#F48CCB" stopOpacity=".18" />
          </linearGradient>
        </defs>
        {/* The approved Hero curve is the start of one continuous wash. The
            scroll controller extends it through Work in the same coordinates. */}
        <path
          className="hero-wash-stroke"
          d={HERO_WASH_PATH}
          pathLength="1"
          strokeDasharray="1 1"
          fill="none"
          stroke={`url(#${ink})`}
          strokeWidth="43"
          filter={`url(#${filter})`}
        />
      </svg>
    </div>
  );
}
