import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: "https://thecorpi.com", lastModified, priority: 1 },
    { url: "https://thecorpi.com/uz", lastModified, priority: 0.9 },
    { url: "https://thecorpi.com/en", lastModified, priority: 0.9 },
  ];
}
