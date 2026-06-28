export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd(settings: {
  name: string;
  url: string;
  email: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.name,
    url: settings.url,
    email: settings.email,
  };
}

export function musicGroupJsonLd(artist: {
  name: string;
  url: string;
  image?: string;
  description?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: artist.name,
    url: artist.url,
    image: artist.image,
    description: artist.description,
  };
}

export function productJsonLd(product: {
  name: string;
  description: string;
  image: string;
  price: number;
  sku: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    sku: product.sku,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      url: product.url,
      availability: "https://schema.org/InStock",
    },
  };
}

export function articleJsonLd(post: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.datePublished,
    url: post.url,
  };
}

export function eventJsonLd(event: {
  name: string;
  startDate: string;
  location: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    startDate: event.startDate,
    location: {
      "@type": "Place",
      name: event.location,
    },
    url: event.url,
  };
}
