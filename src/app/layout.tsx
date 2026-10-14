import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { personal } from "@/data/personal";
import "./globals.css";
import "./homepage.css";
export const metadata: Metadata = {
  ...(personal.siteUrl ? { metadataBase: new URL(personal.siteUrl) } : {}),
  title: {
    default: "SHAN MU — UI/UX & Visual Design",
    template: "%s — SHAN MU",
  },
  description: personal.introduction,
  openGraph: {
    title: "SHAN MU — Independent Designer",
    description: personal.introduction,
    type: "website",
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div id="top" />
        <Header />
        {children}
      </body>
    </html>
  );
}
