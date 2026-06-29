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
    <div className="relative reveal-up">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4">
          {releases.map((release) => (
            <Link
              key={release._id}
              href={release.streamingLinks.spotify ?? `/artists/${release.artist.slug}`}
              className="catalog-card group min-w-0 flex-[0_0_78%] sm:flex-[0_0_48%] md:flex-[0_0_32%] lg:flex-[0_0_26%]"
            >
              <div className="catalog-frame relative m-2 aspect-square overflow-hidden">
                <Image
                  src={release.coverArt}
                  alt={release.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                  sizes="320px"
                />
              </div>
              <div className="border-t border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2.5">
                <span className="manual-label text-[var(--color-subtle)]">
                  Release · Archive
                </span>
                <p className="mt-1.5 leading-snug">
                  <span className="font-mono text-xs uppercase tracking-wide text-[var(--color-subtle)]">
                    {release.artist.name}
                  </span>
                  <span className="mx-1.5 text-[var(--color-border)]">·</span>
                  <span className="font-display text-base text-[var(--color-ink)]">
                    {release.title}
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={scrollPrev}
        className="hardware-btn absolute -left-2 top-[38%] rounded-full p-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        aria-label="Previous releases"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        className="hardware-btn absolute -right-2 top-[38%] rounded-full p-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        aria-label="Next releases"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
