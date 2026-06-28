import Link from "next/link";
import type { Event } from "@/lib/types";
import { formatShowDate } from "@/lib/format";
import { Badge, Button } from "@/components/ui/button";

const statusLabels: Record<Event["status"], string> = {
  announced: "Announced",
  on_sale: "On Sale",
  sold_out: "Sold Out",
  cancelled: "Cancelled",
};

export function ShowRow({ event }: { event: Event }) {
  return (
    <div className="flex flex-col gap-3 border-b border-[var(--color-border)] py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-subtle)]">
          {formatShowDate(event.dateTime)} · {event.city}
        </p>
        <p className="font-medium">
          {event.title} — {event.venue}
        </p>
        <Badge className="mt-1">{statusLabels[event.status]}</Badge>
      </div>
      <div className="flex gap-2">
        {event.rsvpLink && (
          <Button href={event.rsvpLink} variant="outline" size="sm">
            RSVP
          </Button>
        )}
        {event.ticketLink && event.status !== "sold_out" && event.status !== "cancelled" && (
          <Button href={event.ticketLink} variant="solid" size="sm">
            Tickets
          </Button>
        )}
      </div>
    </div>
  );
}

export function ArtistTourSection({
  artistName,
  artistSlug,
  events,
}: {
  artistName: string;
  artistSlug: string;
  events: Event[];
}) {
  if (!events.length) return null;

  return (
    <section id={artistSlug} className="scroll-mt-24">
      <h2 className="font-display text-2xl">{artistName}</h2>
      <div className="mt-4">
        {events.map((ev) => (
          <ShowRow key={ev._id} event={ev} />
        ))}
      </div>
      <Link href={`/artists/${artistSlug}`} className="mt-2 inline-block text-sm underline">
        View artist
      </Link>
    </section>
  );
}
