"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroSlide } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/button";
import { useCallback } from "react";

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000 }),
  ]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section aria-label="Featured releases" className="relative grain-overlay">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide._id} className="relative min-w-0 flex-[0_0_100%]">
              <div className="relative aspect-[16/9] max-h-[520px] w-full md:aspect-[21/9]">
                <Image
                  src={slide.image}
                  alt={`${slide.artistName} — ${slide.title}`}
                  fill
                  className="object-cover"
                  priority={slide._id === slides[0]?._id}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white md:p-10">
                  <Badge className="mb-2 bg-white/20 text-white">
                    {slide.statusLabel}
                  </Badge>
                  <p className="font-display text-sm uppercase tracking-wider opacity-90">
                    {slide.artistName}
                  </p>
                  <h1 className="font-display text-3xl md:text-5xl">{slide.title}</h1>
                  {slide.subtitle && (
                    <p className="mt-1 text-sm opacity-80">{slide.subtitle}</p>
                  )}
                  <Button href={slide.ctaHref} variant="accent" className="mt-4">
                    {slide.ctaLabel}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </section>
  );
}
