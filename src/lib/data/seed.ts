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

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

export const siteSettings: SiteSettings = {
  name: "Super Evil",
  slogan: "Super Evil Sound, Devilish Performance",
  domain: "superevil.com",
  mission:
    "Super Evil is a record label and electronics workshop based in Pittsburgh. We develop artists, host collaborative events, and hand-build music hardware like the Super Evil Fuzz. Our mission is to support the local and broader music scene—releases, shows, and gear designed for expression.",
  demoPolicy:
    "We have an open demo policy. Email a link to a few select tracks—SoundCloud, Bandcamp, etc.—to demos@superevil.com. Do not send downloads or DM demos on social media.",
  contactEmail: "hello@superevil.com",
  supportEmail: "support@superevil.com",
  address: "Pittsburgh, PA",
  newsletterCopy: "Join our list for releases, shows, and gear drops.",
  socials: {
    instagram: "https://instagram.com/superevil",
    x: "https://twitter.com/superevil",
    youtube: "https://youtube.com/@superevil",
    bandcamp: "https://bandcamp.com/superevil",
    spotify: "https://open.spotify.com/user/superevil",
  },
  faqs: [
    {
      category: "shipping",
      question: "When will my Fuzz Pedal ship?",
      answer:
        "Preorders ship by the date listed on the product page. You will receive tracking when your order leaves our workshop.",
    },
    {
      category: "returns",
      question: "What is your return policy for pedals?",
      answer:
        "Unopened pedals may be returned within 30 days. Opened units are eligible for repair or exchange within the warranty period.",
    },
    {
      category: "downloads",
      question: "How do I download my sample pack?",
      answer:
        "After purchase, you will receive an email with a secure download link valid for 72 hours. Contact support if you need a reissue.",
    },
    {
      category: "general",
      question: "Who do I contact about order issues?",
      answer:
        "Email support@superevil.com with your order number. Please do not use social media for order support.",
    },
  ],
};

export const artists: Artist[] = [
  {
    _id: "artist-catatoneya",
    name: "Catatoneya",
    slug: "catatoneya",
    featured: true,
    heroImage: img("photo-1511671782779-c97d3d27a1d4"),
    gallery: [
      img("photo-1459749411175-04bf5292ceea"),
      img("photo-1501386761578-eac5c94b800a"),
      img("photo-1492684223066-81342ee5ff30"),
    ],
    shortBio:
      "Textural dream-pop meets tape-saturated noise. Catatoneya crafts hazy anthems from Pittsburgh basements and late-night sessions.",
    socials: { instagram: "#", x: "#", youtube: "#", bandcamp: "#" },
    musicLinks: { spotify: "https://open.spotify.com/artist/example" },
    spotifyEmbedId: "37i9dQZF1DX2pSTOxoPbx9",
    contactEmail: "hello@superevil.com",
    videoIds: ["dQw4w9WgXcQ"],
  },
  {
    _id: "artist-asvadad",
    name: "Asvadad",
    slug: "asvadad",
    featured: true,
    heroImage: img("photo-1517649763962-0c623066013b"),
    gallery: [img("photo-1492684223066-81342ee5ff30"), img("photo-1511379938547-c1f69419868d")],
    shortBio: "Industrial rhythms and fractured melodies.",
    socials: { instagram: "#", x: "#", youtube: "#", bandcamp: "#" },
    musicLinks: { spotify: "https://open.spotify.com/artist/example" },
    spotifyEmbedId: "37i9dQZF1DX7F6T2n2fegs",
    contactEmail: "hello@superevil.com",
  },
  {
    _id: "artist-xula",
    name: "Xula",
    slug: "xula",
    featured: true,
    heroImage: img("photo-1515942400420-2b98fed1f515"),
    gallery: [img("photo-1483412033650-1015ddeb83d1")],
    shortBio:
      "Ethereal vocals over glitchy percussion; Xula is the quiet storm.",
    socials: { instagram: "#", x: "#", youtube: "#", bandcamp: "#" },
    musicLinks: { spotify: "https://open.spotify.com/artist/example" },
    spotifyEmbedId: "37i9dQZF1DX7F6T2n2fegs",
    contactEmail: "hello@superevil.com",
    videoIds: ["dQw4w9WgXcQ"],
  },
  {
    _id: "artist-elzera",
    name: "Elzera",
    slug: "elzera",
    featured: false,
    heroImage: img("photo-1470225620780-dba8ba36b745"),
    gallery: [
      img("photo-1511379938547-c1f69419868d"),
      img("photo-1483412033650-1015ddeb83d1"),
    ],
    shortBio: "Analog synths, FM grit, and post-club melancholia.",
    socials: { instagram: "#", x: "#", youtube: "#", bandcamp: "#" },
    musicLinks: { spotify: "https://open.spotify.com/artist/example" },
    spotifyEmbedId: "37i9dQZF1DWVY4eLfA3XFQ",
    contactEmail: "hello@superevil.com",
  },
];

export const releases: Release[] = [
  {
    _id: "rel-1",
    title: "Silver Verb / Night Bloom",
    slug: "silver-verb-night-bloom",
    artist: { _id: "artist-xula", name: "Xula", slug: "xula" },
    coverArt: img("photo-1495567720989-cebdbdd97913"),
    releaseDate: "2025-11-08",
    streamingLinks: { spotify: "https://open.spotify.com/album/example" },
    description: "Latest single from Xula.",
  },
  {
    _id: "rel-2",
    title: "Cicada Drive",
    slug: "cicada-drive",
    artist: { _id: "artist-catatoneya", name: "Catatoneya", slug: "catatoneya" },
    coverArt: img("photo-1470225620780-dba8ba36b745"),
    releaseDate: "2025-09-21",
    streamingLinks: { spotify: "https://open.spotify.com/album/example" },
  },
];

export const products: Product[] = [
  {
    _id: "prod-fuzz",
    title: "Super Evil Fuzz Pedal",
    slug: "fuzz-pedal",
    type: "pedal",
    price: 199,
    sku: "SE-FUZZ-01",
    preorder: true,
    shipWindow: "Ships by Dec 20, 2025",
    inventory: 42,
    inStock: true,
    images: [
      img("photo-1511379938547-c1f69419868d"),
      img("photo-1527691064019-b1118eaa5da3"),
    ],
    specs: [
      { key: "Bypass", value: "True-bypass" },
      { key: "Power", value: "9V DC center-negative" },
      { key: "Controls", value: "Gain, Tone, Level" },
      { key: "Footswitch", value: "Soft-click" },
    ],
    audioDemos: [
      {
        label: "Clean→Fuzz A/B",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      },
    ],
    description:
      "Tape-gnarled saturation with harmonically rich clipping. Hand-built in Pittsburgh.",
    artistTags: [],
    relatedSlugs: ["sample-pack-01"],
  },
  {
    _id: "prod-sample",
    title: "Nocturne Drums — Sample Pack",
    slug: "sample-pack-01",
    type: "sample_pack",
    price: 29,
    sku: "SE-SP-001",
    preorder: false,
    shipWindow: "Instant download",
    inventory: 9999,
    inStock: true,
    images: [img("photo-1483412033650-1015ddeb83d1")],
    specs: [
      { key: "Format", value: "WAV, 24-bit" },
      { key: "Size", value: "420 MB" },
      { key: "License", value: "Royalty-free (see EULA)" },
    ],
    audioDemos: [
      {
        label: "Kit Preview",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      },
    ],
    description:
      "Dusty one-shots and loops processed through analog units.",
    relatedSlugs: ["fuzz-pedal"],
  },
];

export const events: Event[] = [
  {
    _id: "ev-1",
    artist: {
      _id: "artist-elzera",
      name: "Elzera",
      slug: "elzera",
      heroImage: img("photo-1470225620780-dba8ba36b745", 400),
    },
    title: "Warehouse 13",
    venue: "Warehouse 13",
    city: "Pittsburgh, PA",
    dateTime: "2025-12-12T21:00:00-05:00",
    status: "on_sale",
    ticketLink: "#",
    rsvpLink: "#",
  },
  {
    _id: "ev-2",
    artist: {
      _id: "artist-xula",
      name: "Xula",
      slug: "xula",
      heroImage: img("photo-1515942400420-2b98fed1f515", 400),
    },
    title: "Night Bloom Live",
    venue: "Glassland",
    city: "Brooklyn, NY",
    dateTime: "2026-01-20T20:00:00-05:00",
    status: "announced",
    ticketLink: "#",
  },
  {
    _id: "ev-3",
    artist: {
      _id: "artist-catatoneya",
      name: "Catatoneya",
      slug: "catatoneya",
      heroImage: img("photo-1511671782779-c97d3d27a1d4"),
    },
    title: "Cicada Drive Release Show",
    venue: "Mr Roboto Project",
    city: "Pittsburgh, PA",
    dateTime: "2026-02-14T20:00:00-05:00",
    status: "on_sale",
    ticketLink: "#",
  },
];

export const newsPosts: NewsPost[] = [
  {
    _id: "news-1",
    title: "Announcing the Super Evil Fuzz",
    slug: "announcing-super-evil-fuzz",
    publishedAt: "2025-10-10",
    heroImage: img("photo-1511379938547-c1f69419868d"),
    excerpt:
      "We're launching our first pedal: Super Evil Fuzz. Preorders open now.",
    body: "We're launching our first pedal: Super Evil Fuzz. Preorders open now. Built by hand in Pittsburgh with true-bypass switching and tape-gnarled saturation.",
    relatedArtistSlug: undefined,
    ctaLinks: [{ label: "Order Now", href: "/store/fuzz-pedal" }],
  },
  {
    _id: "news-2",
    title: "New single from Xula out now",
    slug: "xula-night-bloom-out-now",
    publishedAt: "2025-11-08",
    heroImage: img("photo-1495567720989-cebdbdd97913"),
    excerpt: "Stream 'Night Bloom' on your favorite platform.",
    body: "Xula's new single 'Night Bloom' is out now across all streaming platforms.",
    relatedArtistSlug: "xula",
    ctaLinks: [{ label: "Listen", href: "https://open.spotify.com" }],
  },
  {
    _id: "news-3",
    title: "Nocturne Drums sample pack available",
    slug: "nocturne-drums-sample-pack",
    publishedAt: "2025-11-15",
    heroImage: img("photo-1483412033650-1015ddeb83d1"),
    excerpt: "Instant download — royalty-free one-shots and loops.",
    body: "Our first sample pack features dusty drums processed through analog gear. Instant delivery after purchase.",
    ctaLinks: [{ label: "Buy Sample Pack", href: "/store/sample-pack-01" }],
  },
];

export const heroSlides: HeroSlide[] = [
  {
    _id: "hero-1",
    artistName: "XULA",
    title: "SILVER VERB / NIGHT BLOOM",
    image: img("photo-1495567720989-cebdbdd97913"),
    statusLabel: "Out Now",
    ctaLabel: "Listen",
    ctaHref: "/artists/xula",
  },
  {
    _id: "hero-2",
    artistName: "SUPER EVIL ELECTRONICS",
    title: "FUZZ PEDAL",
    subtitle: "Preorder open",
    image: img("photo-1511379938547-c1f69419868d"),
    statusLabel: "Preorder",
    ctaLabel: "Order",
    ctaHref: "/store/fuzz-pedal",
  },
  {
    _id: "hero-3",
    artistName: "CATATONEYA",
    title: "CICADA DRIVE",
    image: img("photo-1470225620780-dba8ba36b745"),
    statusLabel: "Out Now",
    ctaLabel: "Listen",
    ctaHref: "/artists/catatoneya",
  },
];

export const legalPages: LegalPage[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    body: "Super Evil collects email addresses for newsletter subscriptions and order fulfillment. We use analytics (GA4) and marketing pixels with your consent. We do not sell personal data.",
  },
  {
    slug: "terms",
    title: "Terms of Service",
    body: "By using superevil.com you agree to our terms. All sales subject to availability. Digital goods are licensed, not sold.",
  },
  {
    slug: "returns",
    title: "Returns & Refunds",
    body: "Physical pedals: 30-day return on unopened items. Digital sample packs: no refunds after download link delivery unless defective.",
  },
  {
    slug: "eula",
    title: "Sample Pack License (EULA)",
    body: "Royalty-free for music production. Redistribution of raw files prohibited. One license per purchase.",
  },
];
