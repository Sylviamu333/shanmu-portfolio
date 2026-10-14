export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { personal } from "@/data/personal";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(personal.siteUrl ? { sitemap: `${personal.siteUrl}/sitemap.xml` } : {}),
  };
}
