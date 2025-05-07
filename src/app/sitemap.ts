import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      lastModified: new Date().toISOString(),
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/forum`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/projects`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/services`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/feedback`,
      lastModified: new Date().toISOString(),
    },
  ];
}
