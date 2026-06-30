import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/"], // Keep admin dashboard off search engines
    },
    sitemap: "https://alexgonzalez.dev/sitemap.xml",
  };
}
