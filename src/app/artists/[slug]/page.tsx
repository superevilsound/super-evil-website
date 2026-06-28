import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getArtistBySlug,
  getArtists,
  getEventsByArtist,
  getNewsByArtist,
  getReleasesByArtist,
  getSiteSettings,
} from "@/lib/data";
import { GalleryCarousel } from "@/components/artists/GalleryCarousel";
import { NewsCard } from "@/components/news/NewsCard";
import { ReleaseCarousel } from "@/components/releases/ReleaseCarousel";
import { ShowRow } from "@/components/tour/ShowRow";
import { SectionTitle, Button } from "@/components/ui/button";
import { JsonLd, musicGroupJsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const artists = await getArtists();
  return artists.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);
  if (!artist) return { title: "Artist Not Found" };
  return {
    title: artist.name,
    description: artist.shortBio,
    openGraph: { images: [artist.heroImage] },
  };
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;
  const artist = await getArtistBySlug(slug);
  if (!artist) notFound();

  const settings = await getSiteSettings();
  const [releases, news, events] = await Promise.all([
    getReleasesByArtist(slug),
    getNewsByArtist(slug),
    getEventsByArtist(slug),
  ]);

  const baseUrl = `https://${settings.domain}`;

  return (
    <article className="py-[var(--section-py)]">
      <JsonLd
        data={musicGroupJsonLd({
          name: artist.name,
          url: `${baseUrl}/artists/${artist.slug}`,
          image: artist.heroImage,
          description: artist.shortBio,
        })}
      />
      <div className="container-main">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <GalleryCarousel
            images={[artist.heroImage, ...artist.gallery]}
            alt={artist.name}
          />
          <div>
            <h1 className="font-display text-4xl">{artist.name}</h1>
            <h2 className="mt-6 text-sm font-semibold uppercase tracking-wide">
              Artist Bio
            </h2>
            <p className="mt-2 leading-relaxed text-[var(--color-subtle)]">
              {artist.shortBio}
            </p>
            {(artist.contactEmail || artist.bookingEmail) && (
              <div className="mt-8">
                <h2 className="text-sm font-semibold uppercase tracking-wide">
                  Contact
                </h2>
                {artist.contactEmail && (
                  <p className="mt-2 text-sm">
                    Label:{" "}
                    <a href={`mailto:${artist.contactEmail}`} className="underline">
                      {artist.contactEmail}
                    </a>
                  </p>
                )}
                {artist.bookingEmail && (
                  <p className="mt-1 text-sm">
                    Booking:{" "}
                    <a href={`mailto:${artist.bookingEmail}`} className="underline">
                      {artist.bookingEmail}
                    </a>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {releases.length > 0 && (
          <section className="mt-16">
            <SectionTitle title="Store" />
            <ReleaseCarousel releases={releases} />
          </section>
        )}

        {news.length > 0 && (
          <section className="mt-16">
            <SectionTitle
              title="News"
              action={
                <Button href="/news" variant="ghost">
                  See More News
                </Button>
              }
            />
            <div className="grid gap-6 md:grid-cols-2">
              {news.map((post) => (
                <NewsCard key={post._id} post={post} />
              ))}
            </div>
          </section>
        )}

        {events.length > 0 && (
          <section className="mt-16">
            <SectionTitle title="Tour" />
            <div>
              {events.map((ev) => (
                <ShowRow key={ev._id} event={ev} />
              ))}
            </div>
            <Link href="/tour" className="mt-4 inline-block text-sm underline">
              See all touring artists
            </Link>
          </section>
        )}

        {artist.spotifyEmbedId && (
          <section className="mt-16">
            <SectionTitle title="Audio" />
            <iframe
              title={`${artist.name} on Spotify`}
              src={`https://open.spotify.com/embed/playlist/${artist.spotifyEmbedId}`}
              className="h-80 w-full rounded-lg border border-[var(--color-border)]"
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            />
          </section>
        )}

        {artist.videoIds && artist.videoIds.length > 0 && (
          <section className="mt-16">
            <SectionTitle title="Videos" />
            <div className="grid gap-4 md:grid-cols-2">
              {artist.videoIds.map((id) => (
                <div key={id} className="aspect-video overflow-hidden rounded-lg">
                  <iframe
                    title={`${artist.name} video`}
                    src={`https://www.youtube.com/embed/${id}`}
                    className="h-full w-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
