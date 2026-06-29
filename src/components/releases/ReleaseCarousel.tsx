"use client";

import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Release } from "@/lib/types";
import { useCallback } from "react";

export function ReleaseCarousel({ releases }: { releases: Release[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4">
          {releases.map((release) => (
            <Link
              key={release._id}
              href={release.streamingLinks.spotify ?? `/artists/${release.artist.slug}`}
              className="group min-w-0 flex-[0_0_70%] sm:flex-[0_0_45%] md:flex-[0_0_30%]"
            >
              <div className="overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm transition-shadow group-hover:shadow-md">
                <div className="catalog-frame relative m-2 aspect-square overflow-hidden">
                  <Image
                    src={release.coverArt}
                    alt={release.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="300px"
                  />
                </div>
                <div className="border-t border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2.5">
                  <span className="label-mono text-[var(--color-subtle)]">Release</span>
                  <p className="mt-1 text-sm leading-snug">
                    <span className="font-mono text-xs uppercase tracking-wide text-[var(--color-subtle)]">
                      {release.artist.name}
                    </span>
                    <span className="mx-1.5 text-[var(--color-border)]">·</span>
                    <span className="font-display text-[var(--color-ink)]">
                      {release.title}
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={scrollPrev}
        className="absolute -left-2 top-1/3 rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] p-2.5 text-[var(--color-surface)] shadow transition-colors hover:border-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        aria-label="Previous releases"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        className="absolute -right-2 top-1/3 rounded-full border border-[var(--color-border)] bg-[var(--color-panel)] p-2.5 text-[var(--color-surface)] shadow transition-colors hover:border-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        aria-label="Next releases"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
