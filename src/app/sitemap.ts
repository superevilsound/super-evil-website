import type { MetadataRoute } from "next";
import {
  getArtists,
  getNewsPosts,
  getProducts,
  getSiteSettings,
} from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [settings, artists, products, news] = await Promise.all([
    getSiteSettings(),
    getArtists(),
    getProducts(),
    getNewsPosts(),
  ]);

  const base = `https://${settings.domain}`;

  const staticRoutes = ["", "/news", "/artists", "/artists/roster", "/tour", "/store", "/about", "/contact", "/privacy", "/terms", "/returns", "/eula"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  return [
    ...staticRoutes,
    ...artists.map((a) => ({
      url: `${base}/artists/${a.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...products.map((p) => ({
      url: `${base}/store/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...news.map((n) => ({
      url: `${base}/news/${n.slug}`,
      lastModified: new Date(n.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
