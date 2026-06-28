import Link from "next/link";
import { getFeaturedArtists } from "@/lib/data";
import { ArtistGridTile } from "@/components/artists/ArtistGridTile";
import { SectionTitle, Button } from "@/components/ui/button";

export const metadata = { title: "Artists" };
export const revalidate = 300;

export default async function ArtistsPage() {
  const artists = await getFeaturedArtists();

  return (
    <section className="py-[var(--section-py)]">
      <div className="container-main">
        <SectionTitle
          eyebrow="Roster"
          title="Artists"
          action={
            <Button href="/artists/roster" variant="outline">
              Full Roster
            </Button>
          }
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist) => (
            <ArtistGridTile key={artist._id} artist={artist} />
          ))}
        </div>
        <p className="mt-8 text-sm text-[var(--color-subtle)]">
          <Link href="/artists/roster" className="underline">
            View full roster →
          </Link>
        </p>
      </div>
    </section>
  );
}
