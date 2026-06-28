"use client";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useState } from "react";

export function GalleryCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [selected, setSelected] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const allImages = images.length ? images : ["/placeholder-artist.jpg"];

  return (
    <div>
      <div className="relative overflow-hidden rounded-lg">
        <div ref={emblaRef}>
          <div className="flex">
            {allImages.map((src, i) => (
              <div key={src + i} className="relative min-w-0 flex-[0_0_100%] aspect-[4/3]">
                <Image src={src} alt={`${alt} photo ${i + 1}`} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
              </div>
            ))}
          </div>
        </div>
        {allImages.length > 1 && (
          <>
            <button type="button" onClick={scrollPrev} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow" aria-label="Previous photo">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button type="button" onClick={scrollNext} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow" aria-label="Next photo">
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
      {allImages.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {allImages.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => {
                setSelected(i);
                emblaApi?.scrollTo(i);
              }}
              className={`relative aspect-square overflow-hidden rounded border-2 ${selected === i ? "border-[var(--color-ink)]" : "border-transparent"}`}
              aria-label={`View photo ${i + 1}`}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
