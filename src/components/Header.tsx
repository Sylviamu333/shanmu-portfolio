"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];
  return (
    <header className="site-header">
      <Link
        href="/"
        className="wordmark"
        aria-label="SHAN MU home"
        onClick={() => setOpen(false)}
      >
        SHAN MU
        <span className="brand-dot" />
      </Link>
      <span className="header-caption">Independent design practice</span>
      <button
        className="menu-button"
        aria-expanded={open}
        aria-controls="main-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close −" : "Menu +"}
      </button>
      <nav
        id="main-navigation"
        className={open ? "navigation is-open" : "navigation"}
        aria-label="Main navigation"
      >
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={() => setOpen(false)}
            aria-current={
              link.label === "Work" && pathname.startsWith("/work")
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
