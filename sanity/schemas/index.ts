import { defineArrayMember, defineField, defineType } from "sanity";

const seoFields = [
  defineField({ name: "title", type: "string", title: "SEO Title" }),
  defineField({ name: "description", type: "text", title: "SEO Description" }),
  defineField({ name: "image", type: "image", title: "Social Image" }),
];

export const artist = defineType({
  name: "artist",
  title: "Artist",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "heroImage", type: "image" }),
    defineField({ name: "gallery", type: "array", of: [{ type: "image" }] }),
    defineField({ name: "shortBio", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "socials",
      type: "object",
      fields: [
        { name: "instagram", type: "url" },
        { name: "x", type: "url" },
        { name: "youtube", type: "url" },
        { name: "bandcamp", type: "url" },
      ],
    }),
    defineField({
      name: "musicLinks",
      type: "object",
      fields: [
        { name: "spotify", type: "url" },
        { name: "apple", type: "url" },
        { name: "soundcloud", type: "url" },
      ],
    }),
    defineField({ name: "spotifyEmbedId", type: "string" }),
    defineField({ name: "contactEmail", type: "string" }),
    defineField({ name: "bookingEmail", type: "string" }),
    defineField({ name: "seo", type: "object", fields: seoFields }),
  ],
});

export const release = defineType({
  name: "release",
  title: "Release",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "artist", type: "reference", to: [{ type: "artist" }] }),
    defineField({ name: "coverArt", type: "image" }),
    defineField({ name: "releaseDate", type: "date" }),
    defineField({
      name: "streamingLinks",
      type: "object",
      fields: [
        { name: "spotify", type: "url" },
        { name: "apple", type: "url" },
        { name: "bandcamp", type: "url" },
        { name: "ffmTo", type: "url" },
      ],
    }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "seo", type: "object", fields: seoFields }),
  ],
});

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({ name: "artist", type: "reference", to: [{ type: "artist" }] }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "venue", type: "string" }),
    defineField({ name: "city", type: "string" }),
    defineField({ name: "dateTime", type: "datetime" }),
    defineField({ name: "ticketLink", type: "url" }),
    defineField({ name: "rsvpLink", type: "url" }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: ["announced", "on_sale", "sold_out", "cancelled"],
      },
    }),
    defineField({ name: "seo", type: "object", fields: seoFields }),
  ],
});

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "type",
      type: "string",
      options: { list: ["pedal", "sample_pack", "merch"] },
    }),
    defineField({ name: "images", type: "array", of: [{ type: "image" }] }),
    defineField({ name: "price", type: "number" }),
    defineField({ name: "stripePriceId", type: "string" }),
    defineField({ name: "sku", type: "string" }),
    defineField({ name: "preorder", type: "boolean" }),
    defineField({ name: "shipWindow", type: "string" }),
    defineField({ name: "inventory", type: "number" }),
    defineField({ name: "inStock", type: "boolean" }),
    defineField({
      name: "specs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "key", type: "string" },
            { name: "value", type: "string" },
          ],
        }),
      ],
    }),
    defineField({
      name: "audioDemos",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "url", type: "url" },
          ],
        }),
      ],
    }),
    defineField({ name: "description", type: "text" }),
    defineField({
      name: "artistTags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "artist" }] }],
    }),
    defineField({ name: "seo", type: "object", fields: seoFields }),
  ],
});

export const newsPost = defineType({
  name: "newsPost",
  title: "News Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "heroImage", type: "image" }),
    defineField({ name: "excerpt", type: "text" }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "relatedArtist", type: "reference", to: [{ type: "artist" }] }),
    defineField({ name: "seo", type: "object", fields: seoFields }),
  ],
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string" }),
    defineField({ name: "slogan", type: "string" }),
    defineField({ name: "mission", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "contactEmail", type: "string" }),
    defineField({ name: "supportEmail", type: "string" }),
    defineField({ name: "newsletterCopy", type: "text" }),
    defineField({
      name: "faqs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "question", type: "string" },
            { name: "answer", type: "text" },
            {
              name: "category",
              type: "string",
              options: {
                list: ["shipping", "returns", "downloads", "general"],
              },
            },
          ],
        }),
      ],
    }),
  ],
});

export const legalPage = defineType({
  name: "legalPage",
  title: "Legal Page",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
  ],
});

export const schemaTypes = [
  artist,
  release,
  event,
  product,
  newsPost,
  siteSettings,
  legalPage,
];
