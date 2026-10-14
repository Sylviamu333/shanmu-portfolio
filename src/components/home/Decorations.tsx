// Original SVG illustrations drawn for SHAN MU. No reference paths or assets are reused.
export function Flower({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M59 50C32 20 9 37 26 57C-4 63 8 94 37 81C40 113 69 116 76 86C103 108 120 86 98 67C128 49 111 25 85 39C82 7 52 17 59 50Z"
        fill="#AFE3FF"
        stroke="#2755C5"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <circle
        cx="65"
        cy="65"
        r="17"
        fill="#E7FF7D"
        stroke="#2755C5"
        strokeWidth="2.2"
      />
      <path
        d="M57 63v1m14-1v1m-14 7c3 5 11 6 15 0"
        stroke="#2755C5"
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function PixelSprout({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M42 66V36m0 13C22 49 13 38 12 20c18 0 31 7 30 24m0-10C42 15 54 8 69 9c-1 18-11 27-27 29"
        stroke="#3153BE"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M13 20c20 0 29 8 29 24-21-1-28-10-29-24Z"
        fill="#E7FF7D"
        stroke="#3153BE"
        strokeWidth="2.5"
      />
      <path
        d="M69 9C54 8 42 18 43 37c18-2 24-10 26-28Z"
        fill="#FFADD9"
        stroke="#3153BE"
        strokeWidth="2.5"
      />
      <path
        d="M23 67h39"
        stroke="#3153BE"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function SketchBook({
  className = "",
  footer = false,
}: {
  className?: string;
  footer?: boolean;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 500 320"
      fill="none"
      aria-hidden="true"
    >
      <ellipse cx="252" cy="278" rx="184" ry="13" fill="#C9538920" />
      <g className={footer ? "folio-book-cover" : "folio-book-body"}>
        <path
          d="m48 92 191-27 34 12 179-18 13 185-185 30-39-13-183 25Z"
          fill="#E85798"
          stroke="#9E275D"
          strokeWidth="2"
        />
        <path
          d="m57 89 178-20 35 18 165-27 12 176-176 28-36-16-167 28Z"
          fill="#FFF8EB"
          stroke="#9E275D"
          strokeWidth="2"
        />
        <path d="m57 89 181-20 33 18 3 171-35-10L68 276Z" fill="#FFFDF5" />
        <path
          d="m271 88 2 171m-34-189 3 175"
          stroke="#E2B4BE"
          strokeWidth="1.5"
        />
        <path
          d="m85 130 121-14 4 83-119 15Z"
          fill="#AFE3FF"
          stroke="#305FCB"
          strokeWidth="2"
        />
        <path
          d="m98 144 97-11m-89 25 52-6m-45 22 71-8"
          stroke="#305FCB"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="m108 224 61-7m-58 18 86-10"
          stroke="#9E275D"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="m286 119 121-19 6 97-120 20Z"
          fill="#E7FF7D"
          stroke="#527724"
          strokeWidth="2"
        />
        <path
          d="m342 158-18-28-12 14 12 31-21 15 14 7 23-20 19 26 12-12-19-26 32-15-5-15-31 14Z"
          fill="#FF9CCD"
          stroke="#BB326F"
          strokeWidth="2"
        />
        <path
          d="m304 239 102-17m-95 30 71-12"
          stroke="#9E275D"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      <g className="folio-book-pencil">
        <path
          d="m391 51 11 5 37 182-10 25-14-20Z"
          fill="#4968D5"
          stroke="#243F95"
          strokeWidth="2"
        />
        <path
          d="m425 244 10 3-6 16Z"
          fill="#FFE4B9"
          stroke="#243F95"
          strokeWidth="1.5"
        />
        <path d="m391 51 11 5-3-12c-2-6-12-7-10 0Z" fill="#F29ABD" />
      </g>
    </svg>
  );
}
export function CursorSticker({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 90 110"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 14 74 51 49 58l-14 27Z"
        fill="#E7FF7D"
        stroke="#2B50BD"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="m50 59 16 24-13 8-15-25"
        fill="#E7FF7D"
        stroke="#2B50BD"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M5 19 1 14m23-9V1m49 27 8-3"
        stroke="#E36C9D"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function DeviceSticker({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 190"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="18"
        y="7"
        width="106"
        height="173"
        rx="18"
        fill="#AFE3FF"
        stroke="#2E52BD"
        strokeWidth="3"
      />
      <rect
        x="28"
        y="28"
        width="86"
        height="128"
        rx="4"
        fill="#FFF8EF"
        stroke="#2E52BD"
        strokeWidth="2"
      />
      <path
        d="M55 18h34"
        stroke="#2E52BD"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="71" cy="168" r="4" fill="#2E52BD" />
      <rect x="39" y="40" width="64" height="39" rx="5" fill="#FFADD9" />
      <path
        d="M42 96h55m-55 11h34"
        stroke="#3058C1"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <rect
        x="40"
        y="124"
        width="59"
        height="15"
        rx="7"
        fill="#E7FF7D"
        stroke="#3058C1"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function PortfolioCard({ name, role }: { name: string; role: string }) {
  return (
    <svg
      className="footer-sketchbook"
      viewBox="0 0 500 320"
      fill="none"
      aria-hidden="true"
    >
      <ellipse cx="249" cy="270" rx="192" ry="14" fill="#C953891A" />
      <g transform="rotate(-4 250 160)">
        <rect
          x="43"
          y="54"
          width="412"
          height="224"
          rx="8"
          fill="#E85C97"
          stroke="#B53A73"
          strokeWidth="2"
        />
        <path d="M62 54v224" stroke="#A9396E" strokeWidth="5" />
        <g className="footer-paper">
          <rect
            x="79"
            y="69"
            width="351"
            height="185"
            rx="3"
            fill="#FFF8EF"
            stroke="#EFBBD0"
            strokeWidth="2"
          />
          <path
            d="m352 90 15-14 16 15-15 14Z"
            fill="#AFE3FF"
            stroke="#3153BE"
            strokeWidth="2"
          />
          <circle
            cx="390"
            cy="102"
            r="10"
            fill="#E7FF7D"
            stroke="#577522"
            strokeWidth="2"
          />
          <path
            d="M108 223h183m-183 10h87"
            stroke="#F0BCD0"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <text x="109" y="166" className="footer-card-name">
            {name}
          </text>
          <text x="111" y="196" className="footer-card-role">
            {role}
          </text>
        </g>
      </g>
      <path
        d="M174 67V39c0-18 24-19 24 0v56c0 15-15 15-15 0V49"
        stroke="#4D71D9"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}
