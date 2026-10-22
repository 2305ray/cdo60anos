import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Site de uma página só: o sitemap tem apenas a home
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: SITE_URL, changeFrequency: "weekly", priority: 1 }];
}
