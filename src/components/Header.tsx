"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
export function Header() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const home = pathname === "/";
  const links = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];
  return (
    <header className={home ? "site-header home-header" : "site-header"}>
      <Link
        href="/"
        className="wordmark"
        aria-label="SHAN MU home"
        onClick={() => setOpen(false)}
      >
        {home ? (
          <>
            <svg
              className="home-brand-monogram"
              viewBox="284 384 684 560"
              aria-hidden="true"
              focusable="false"
            >
              {/* Crop only the transparent padding; retain the uploaded pixels. */}
              <image href="/brand/s-monogram.png" width="1254" height="1254" />
            </svg>
            <span className="home-brand-name">SHAN MU</span>
          </>
        ) : (
          <>
            SHAN MU
            <span className="brand-dot" />
          </>
        )}
      </Link>
      {!home && (
        <span className="header-caption">Independent design practice</span>
      )}
      <button
        className="menu-button"
        ref={menuButton}
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
            menuButton.current?.focus();
          }
        }}
      >
        {open ? "Close −" : "Menu +"}
      </button>
      <nav
        id="main-navigation"
        className={open ? "navigation is-open" : "navigation"}
        aria-label="Main navigation"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setOpen(false);
            menuButton.current?.focus();
          }
        }}
      >
        {links
          .filter((link) => !home || link.label !== "Home")
          .map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={
                (link.label === "Work" && pathname.startsWith("/work")) ||
                (link.label === "Home" && home)
                  ? "page"
                  : undefined
              }
            >
              {link.label}
              <span className="nav-dot" />
            </Link>
          ))}
      </nav>
    </header>
  );
}
