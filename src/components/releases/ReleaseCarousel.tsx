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
              className="min-w-0 flex-[0_0_70%] sm:flex-[0_0_45%] md:flex-[0_0_30%]"
            >
              <div className="overflow-hidden rounded-lg border border-[var(--color-border)]">
                <div className="relative aspect-square">
                  <Image
                    src={release.coverArt}
                    alt={release.title}
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium">
                    {release.artist.name} · {release.title}
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
        className="absolute -left-2 top-1/3 rounded-full border bg-white p-2 shadow"
        aria-label="Previous releases"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        className="absolute -right-2 top-1/3 rounded-full border bg-white p-2 shadow"
        aria-label="Next releases"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
