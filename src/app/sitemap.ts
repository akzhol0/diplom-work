import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/forum`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/projects`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/services`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/feedback`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/register`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/edit`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/users[token]`,
    },
  ];
}
