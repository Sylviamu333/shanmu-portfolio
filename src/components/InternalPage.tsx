import { HomeFooter } from "./home/HomeFooter";

// All internal routes share the white canvas and the original homepage footer.
export function InternalPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="internal-page">
      {children}
      <HomeFooter workHref="/#work" />
    </div>
  );
}
