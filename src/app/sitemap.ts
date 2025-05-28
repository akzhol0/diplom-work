import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `https://diplomwork-akzhol.site/`,
      lastModified: new Date().toISOString(),
      priority: 1,
    },
    {
      url: `https://diplomwork-akzhol.site/forum`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `https://diplomwork-akzhol.site/projects`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `https://diplomwork-akzhol.site/services`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `https://diplomwork-akzhol.site/feedback`,
      lastModified: new Date().toISOString(),
    },
  ];
}
