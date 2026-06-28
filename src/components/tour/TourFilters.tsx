"use client";

import { useMemo, useState } from "react";
import type { Event } from "@/lib/types";
import { formatMonthKey } from "@/lib/format";
import { ArtistTourSection } from "@/components/tour/ShowRow";

export function TourFilters({
  events,
}: {
  events: Event[];
}) {
  const artists = useMemo(
    () => [...new Map(events.map((e) => [e.artist.slug, e.artist])).values()],
    [events],
  );
  const cities = useMemo(
    () => [...new Set(events.map((e) => e.city))].sort(),
    [events],
  );
  const months = useMemo(
    () => [...new Set(events.map((e) => formatMonthKey(e.dateTime)))].sort(),
    [events],
  );

  const [artist, setArtist] = useState("");
  const [city, setCity] = useState("");
  const [month, setMonth] = useState("");

  const filtered = events.filter((e) => {
    if (artist && e.artist.slug !== artist) return false;
    if (city && e.city !== city) return false;
    if (month && formatMonthKey(e.dateTime) !== month) return false;
    return true;
  });

  const grouped = useMemo(() => {
    const map = new Map<string, Event[]>();
    for (const ev of filtered) {
      const key = ev.artist.slug;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(ev);
    }
    return map;
  }, [filtered]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3">
        <label className="text-sm">
          <span className="sr-only">Filter by artist</span>
          <select
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            className="rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
          >
            <option value="">All artists</option>
            {artists.map((a) => (
              <option key={a.slug} value={a.slug}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="sr-only">Filter by city</span>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
          >
            <option value="">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm">
          <span className="sr-only">Filter by month</span>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
          >
            <option value="">All months</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="space-y-12">
        {[...grouped.entries()].map(([slug, evs]) => (
          <ArtistTourSection
            key={slug}
            artistSlug={slug}
            artistName={evs[0].artist.name}
            events={evs}
          />
        ))}
        {!grouped.size && (
          <p className="text-[var(--color-subtle)]">No shows match your filters.</p>
        )}
      </div>
    </div>
  );
}
