import Link from "next/link";
import { InternalPage } from "@/components/InternalPage";
export default function NotFound() {
  return (
    <InternalPage>
      <main id="main" className="not-found">
        <span className="eyebrow">404 / A little off the grid</span>
        <h1>
          This page
          <br />
          is missing.
        </h1>
        <Link className="text-link" href="/">
          Return to selected work ↗
        </Link>
      </main>
    </InternalPage>
  );
}
