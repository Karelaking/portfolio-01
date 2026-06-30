import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://alexgonzalez.dev";
  const lastModified = new Date();

  const routes = [
    { url: "", changeFrequency: "monthly", priority: 1.0 },
    { url: "/projects", changeFrequency: "weekly", priority: 0.9 },
    { url: "/about", changeFrequency: "monthly", priority: 0.8 },
    { url: "/experience", changeFrequency: "monthly", priority: 0.8 },
    { url: "/expertise", changeFrequency: "monthly", priority: 0.8 },
    { url: "/blogs", changeFrequency: "weekly", priority: 0.7 },
    { url: "/gallery", changeFrequency: "monthly", priority: 0.6 },
    { url: "/contact", changeFrequency: "monthly", priority: 0.5 },
  ] as const;

  return routes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
