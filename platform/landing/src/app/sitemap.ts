import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://thecorpi.com", lastModified: new Date(), priority: 1 }];
}
