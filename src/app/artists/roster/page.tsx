import { getArtists } from "@/lib/data";
import { ArtistGridTile } from "@/components/artists/ArtistGridTile";
import { SectionTitle } from "@/components/ui/button";

export const metadata = { title: "Current Roster" };
export const revalidate = 300;

export default async function RosterPage() {
  const artists = await getArtists();

  return (
    <section className="py-[var(--section-py)]">
      <div className="container-main">
        <SectionTitle title="Current Roster" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {artists.map((artist) => (
            <ArtistGridTile key={artist._id} artist={artist} />
          ))}
        </div>
      </div>
    </section>
  );
}
