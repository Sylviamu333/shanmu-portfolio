export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { orderedProjects } from "@/data/projects";
import { personal } from "@/data/personal";
export default function sitemap(): MetadataRoute.Sitemap {
  return personal.siteUrl
    ? [
        { url: personal.siteUrl },
        ...orderedProjects.map((p) => ({
          url: `${personal.siteUrl}/work/${p.slug}/`,
        })),
      ]
    : [];
}
