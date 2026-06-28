import Link from "next/link";
import Image from "next/image";
import type { Artist } from "@/lib/types";

export function ArtistGridTile({ artist }: { artist: Artist }) {
  return (
    <Link
      href={`/artists/${artist.slug}`}
      className="group block overflow-hidden rounded-lg border border-[var(--color-border)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={artist.heroImage}
          alt={artist.name}
          fill
          className="object-cover transition-transform group-hover:scale-[1.02]"
          sizes="(max-width:640px) 100vw, 25vw"
        />
      </div>
      <div className="p-4">
        <h2 className="font-display text-xl">{artist.name}</h2>
        <p className="mt-1 line-clamp-2 text-sm text-[var(--color-subtle)]">
          {artist.shortBio}
        </p>
      </div>
    </Link>
  );
}
