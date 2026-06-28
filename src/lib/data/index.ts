import {
  artists,
  events,
  heroSlides,
  legalPages,
  newsPosts,
  products,
  releases,
  siteSettings,
} from "@/lib/data/seed";
import type {
  Artist,
  Event,
  HeroSlide,
  LegalPage,
  NewsPost,
  Product,
  Release,
  SiteSettings,
} from "@/lib/types";

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteSettings;
}

export async function getArtists(): Promise<Artist[]> {
  return artists;
}

export async function getFeaturedArtists(): Promise<Artist[]> {
  return artists.filter((a) => a.featured);
}

export async function getArtistBySlug(slug: string): Promise<Artist | null> {
  return artists.find((a) => a.slug === slug) ?? null;
}

export async function getReleases(): Promise<Release[]> {
  return releases;
}

export async function getReleasesByArtist(slug: string): Promise<Release[]> {
  return releases.filter((r) => r.artist.slug === slug);
}

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getProductsByArtist(slug: string): Promise<Product[]> {
  return products.filter((p) => p.artistTags?.includes(slug));
}

export async function getEvents(): Promise<Event[]> {
  return [...events].sort(
    (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime(),
  );
}

export async function getEventsByArtist(slug: string): Promise<Event[]> {
  return events.filter((e) => e.artist.slug === slug);
}

export async function getNewsPosts(limit?: number): Promise<NewsPost[]> {
  const sorted = [...newsPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  return limit ? sorted.slice(0, limit) : sorted;
}

export async function getNewsBySlug(slug: string): Promise<NewsPost | null> {
  return newsPosts.find((n) => n.slug === slug) ?? null;
}

export async function getNewsByArtist(slug: string): Promise<NewsPost[]> {
  return newsPosts.filter((n) => n.relatedArtistSlug === slug);
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  return heroSlides;
}

export async function getLegalPage(slug: string): Promise<LegalPage | null> {
  return legalPages.find((p) => p.slug === slug) ?? null;
}

export async function getAllLegalPages(): Promise<LegalPage[]> {
  return legalPages;
}

export const revalidate = 60;
