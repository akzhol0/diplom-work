import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/login", "/register", "/edit", "/admin"],
      },
    ],
    sitemap: `https://diplomwork-akzhol.site/sitemap.xml`,
    host: "https://diplomwork-akzhol.site",
  };
}
