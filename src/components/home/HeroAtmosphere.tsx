import { useId } from "react";

export function HeroAtmosphere() {
  const filter = `hero-wash-${useId().replaceAll(":", "")}`;
  return (
    <div className="hero-atmosphere" aria-hidden="true">
      <svg
        className="hero-atmosphere-art"
        viewBox="-125 -80 590 280"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <filter id={filter} x="-30%" y="-100%" width="160%" height="300%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>
        {/* Exact path, color, alpha, width and softness from the approved SVG.
            Only the canvas is enlarged to leave transparent space around it. */}
        <path
          d="M-25 28 C55 -2 90 85 175 65 S285 17 365 67"
          fill="none"
          stroke="#F48CCB"
          strokeOpacity=".65"
          strokeWidth="43"
          filter={`url(#${filter})`}
        />
      </svg>
    </div>
  );
}
