import Image from "next/image";
import { useId } from "react";
import "./FooterFolder.css";

// One surrounding anchor in HomeFooter owns hover, focus and navigation.
// Photo/lettering are source-derived; no flattened folder sits under the cards.
export function FooterFolder() {
  const id = `footer-glass-${useId().replaceAll(":", "")}`;
  return (
    <div className="footer-folder" aria-hidden="true">
      <div className="footer-folder-stage">
        <svg className="footer-folder-back" viewBox="0 0 360 250" fill="none">
          <defs>
            <linearGradient id={`${id}-back`} x1="20" y1="80" x2="320" y2="235" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffb4d8" stopOpacity=".95" />
              <stop offset=".45" stopColor="#fa79b1" stopOpacity=".8" />
              <stop offset="1" stopColor="#ee4d94" stopOpacity=".88" />
            </linearGradient>
          </defs>
          <path d="M14 110Q14 80 44 80H99Q110 80 120 94L128 105H316Q346 105 346 135V216Q346 237 325 237H35Q14 237 14 216Z" fill={`url(#${id}-back)`} stroke="#ef639f" strokeWidth="2" />
          <path d="M18 111Q18 85 44 85H98Q108 85 117 97L125 109H315Q341 109 341 135V215" stroke="white" strokeOpacity=".72" strokeWidth="1.5" />
        </svg>
        <div className="footer-folder-card footer-folder-card-portrait">
          <Image src="/footer-folder/portrait.png" width={225} height={230} alt="" sizes="150px" />
        </div>
        <div className="footer-folder-card footer-folder-card-threads">
          <svg className="footer-folder-star" viewBox="0 0 50 50" fill="none">
            <path d="M25 0C27 19 31 23 50 25C31 27 27 31 25 50C23 31 19 27 0 25C19 23 23 19 25 0Z" fill="#fff9f1" />
          </svg>
        </div>
        <div className="footer-folder-card footer-folder-card-note">
          <div className="footer-folder-note-art">
            <Image src="/footer-folder/whiteboarding-ink.png" width={312} height={260} alt="" sizes="150px" />
            <svg viewBox="0 0 312 260" fill="none">
              <path d="M100 247L276 193" stroke="#392711" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div className="footer-folder-pocket">
          <Image src="/footer-folder/glass-pocket.png" width={1126} height={389} alt="" sizes="360px" />
        </div>
        <span className="footer-folder-view">View <span>↗</span></span>
      </div>
    </div>
  );
}
