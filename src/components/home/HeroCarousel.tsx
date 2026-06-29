"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroSlide } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/button";
import { useCallback, useMemo } from "react";

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000 }),
  ]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const tickerItems = useMemo(
    () =>
      slides.flatMap((slide) => [
        `${slide.artistName} — ${slide.title}`,
        slide.statusLabel,
      ]),
    [slides],
  );

  return (
    <section
      aria-label="Featured releases"
      className="relative grain-overlay scanline-overlay broadcast-frame signal-boot bg-[var(--color-panel)]"
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={slide._id} className="relative min-w-0 flex-[0_0_100%]">
              <div className="relative min-h-[70vh] w-full md:min-h-[75vh]">
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={slide.image}
                    alt={`${slide.artistName} — ${slide.title}`}
                    fill
                    className="hero-drift object-cover"
                    priority={index === 0}
                    sizes="100vw"
                  />
                </div>
                <div className="absolute inset-0 bg-[var(--color-panel)]/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-panel)] via-[var(--color-panel)]/85 to-[var(--color-panel)]/40" />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-panel)]/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 top-0 z-10 flex justify-between px-4 pt-5 sm:px-6 sm:pt-6 md:px-10 md:pt-8">
                  <span className="signal-label">Broadcast // Live</span>
                  <span className="manual-label text-[var(--color-subtle)]">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(slides.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 z-10 max-w-4xl px-4 pb-20 pr-16 pt-6 text-[var(--color-surface)] sm:px-6 sm:pb-20 sm:pr-6 md:p-10 md:pb-14 md:pr-10">
                  <div className="reveal-up">
                    <Badge variant="preorder" className="mb-3 md:mb-4">
                      {slide.statusLabel}
                    </Badge>
                  </div>
                  <p className="manual-label reveal-up reveal-up-delay-1 text-[var(--color-surface)]/85">
                    {slide.artistName}
                  </p>
                  <h1 className="font-display reveal-up reveal-up-delay-2 mt-1.5 text-[clamp(2rem,7vw,5.5rem)] leading-[0.94] tracking-tight md:mt-2 md:leading-[0.92]">
                    {slide.title}
                  </h1>
                  {slide.subtitle && (
                    <p className="manual-label reveal-up reveal-up-delay-3 mt-3 max-w-xl text-[var(--color-subtle)] md:mt-4">
                      {slide.subtitle}
                    </p>
                  )}
                  <div className="reveal-up reveal-up-delay-3 mt-5 md:mt-8">
                    <Button href={slide.ctaHref} variant="accent" size="lg">
                      {slide.ctaLabel}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={scrollPrev}
        className="hardware-btn absolute left-2 top-[38%] z-20 rounded-full p-2 sm:left-4 sm:top-1/2 sm:-translate-y-1/2 sm:p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        className="hardware-btn absolute right-2 top-[38%] z-20 rounded-full p-2 sm:right-4 sm:top-1/2 sm:-translate-y-1/2 sm:p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      {tickerItems.length > 0 && (
        <div className="ticker relative z-20" aria-hidden>
          <div className="ticker-track">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <span key={`${item}-${i}`} className="ticker-item manual-label">
                {item}
                <span className="mx-4 text-[var(--color-accent)]">◆</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
