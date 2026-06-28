export type ProductType = "pedal" | "sample_pack" | "merch";
export type EventStatus = "announced" | "on_sale" | "sold_out" | "cancelled";

export interface SeoFields {
  title?: string;
  description?: string;
  image?: string;
}

export interface SocialLinks {
  instagram?: string;
  x?: string;
  youtube?: string;
  bandcamp?: string;
  spotify?: string;
}

export interface MusicLinks {
  spotify?: string;
  apple?: string;
  soundcloud?: string;
  bandcamp?: string;
}

export interface StreamingLinks {
  spotify?: string;
  apple?: string;
  bandcamp?: string;
  ffmTo?: string;
}

export interface Artist {
  _id: string;
  name: string;
  slug: string;
  featured?: boolean;
  heroImage: string;
  gallery: string[];
  shortBio: string;
  socials: SocialLinks;
  musicLinks: MusicLinks;
  spotifyEmbedId?: string;
  contactEmail?: string;
  bookingEmail?: string;
  videoIds?: string[];
  seo?: SeoFields;
}

export interface Release {
  _id: string;
  title: string;
  slug: string;
  artist: Pick<Artist, "_id" | "name" | "slug">;
  coverArt: string;
  releaseDate: string;
  streamingLinks: StreamingLinks;
  description?: string;
}

export interface Event {
  _id: string;
  artist: Pick<Artist, "_id" | "name" | "slug" | "heroImage">;
  title: string;
  venue: string;
  city: string;
  dateTime: string;
  ticketLink?: string;
  rsvpLink?: string;
  status: EventStatus;
}

export interface ProductSpec {
  key: string;
  value: string;
}

export interface AudioDemo {
  label: string;
  url: string;
}

export interface Product {
  _id: string;
  title: string;
  slug: string;
  type: ProductType;
  images: string[];
  price: number;
  stripePriceId?: string;
  sku: string;
  preorder: boolean;
  shipWindow: string;
  inventory: number;
  inStock: boolean;
  specs: ProductSpec[];
  audioDemos: AudioDemo[];
  description: string;
  artistTags?: string[];
  relatedSlugs?: string[];
  seo?: SeoFields;
}

export interface NewsPost {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  heroImage: string;
  excerpt: string;
  body: string;
  relatedArtistSlug?: string;
  ctaLinks?: { label: string; href: string }[];
}

export interface HeroSlide {
  _id: string;
  artistName: string;
  title: string;
  subtitle?: string;
  image: string;
  statusLabel: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: "shipping" | "returns" | "downloads" | "general";
}

export interface SiteSettings {
  name: string;
  slogan: string;
  domain: string;
  mission: string;
  demoPolicy?: string;
  contactEmail: string;
  supportEmail: string;
  socials: SocialLinks;
  newsletterCopy: string;
  address: string;
  faqs: FaqItem[];
  defaultOgImage?: string;
}

export interface LegalPage {
  slug: string;
  title: string;
  body: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  type: ProductType;
}
