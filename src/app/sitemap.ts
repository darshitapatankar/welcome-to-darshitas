import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/data/projects";
import { SITE_URL } from "@/lib/site";

const LAST_UPDATED = new Date("2026-07-23T00:00:00+05:30");

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages: MetadataRoute.Sitemap = getProjectSlugs().map(
    (slug) => ({
      url: `${SITE_URL}/projects/${slug}`,
      lastModified: LAST_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  return [
    {
      url: SITE_URL,
      lastModified: LAST_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${SITE_URL}/about-portrait.png`],
    },
    ...projectPages,
  ];
}
