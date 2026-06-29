"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { HeroSlide } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/button";
import { ConnieMark } from "@/components/brand/ConnieMark";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function HeroSlideBackground({
  slide,
  isActive,
  priority,
}: {
  slide: HeroSlide;
  isActive: boolean;
  priority?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !slide.video) return;

    if (isActive) {
      video.play().catch(() => {});
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [isActive, slide.video]);

  if (slide.video) {
    return (
      <video
        ref={videoRef}
        src={slide.video}
        poster={slide.image}
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
        aria-hidden
        className="hero-drift h-full w-full object-cover opacity-70"
      />
    );
  }

  return (
    <Image
      src={slide.image}
      alt=""
      fill
      className="hero-drift object-cover opacity-70"
      priority={priority}
      sizes="100vw"
    />
  );
}

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000 }),
  ]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const tickerItems = useMemo(
    () =>
      slides.flatMap((slide) => [
        `CONNIEvision // ${slide.artistName} — ${slide.title}`,
        slide.statusLabel.toUpperCase(),
      ]),
    [slides],
  );

  return (
    <section
      aria-label="Featured releases"
      className="relative grain-overlay scanline-overlay broadcast-frame signal-boot overflow-hidden bg-[var(--color-panel)]"
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={slide._id} className="relative min-w-0 flex-[0_0_100%]">
              <div className="relative min-h-[70vh] w-full md:min-h-[75vh]">
                <div className="absolute inset-0 overflow-hidden">
                  <HeroSlideBackground
                    slide={slide}
                    isActive={index === selectedIndex}
                    priority={index === 0}
                  />
                </div>
                <div className="absolute inset-0 bg-[var(--color-accent)]/10 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-panel)] via-[var(--color-panel)]/90 to-[var(--color-panel)]/55" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,9,0.85)_0%,rgba(11,11,9,0.35)_55%,transparent_100%)]" />

                <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between px-4 pt-5 sm:px-6 sm:pt-6 md:px-10 md:pt-8">
                  <div>
                    <ConnieMark
                      variant="boot"
                      className="mb-2 w-10 opacity-80 xerox-flicker md:w-12"
                    />
                    <p className="connievision-boot">Connievision // Infernal Art Broadcast</p>
                  </div>
                  <span className="manual-label text-[var(--color-poster-yellow)]">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(slides.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 z-10 max-w-[92%] px-4 pb-20 pr-14 pt-6 text-[var(--color-surface)] sm:max-w-3xl sm:px-6 sm:pb-20 sm:pr-6 md:p-10 md:pb-14">
                  <div className="reveal-up">
                    <Badge variant="preorder" className="mb-3 md:mb-4">
                      {slide.statusLabel}
                    </Badge>
                  </div>
                  <p className="manual-label reveal-up reveal-up-delay-1 text-[var(--color-poster-yellow)]">
                    {slide.artistName}
                  </p>
                  <h1 className="font-poster reveal-up reveal-up-delay-2 mt-1 text-[clamp(2.25rem,9vw,6rem)] leading-[0.88] tracking-tight md:mt-2">
                    {slide.title}
                  </h1>
                  {slide.subtitle && (
                    <p className="font-editorial reveal-up reveal-up-delay-3 mt-3 max-w-xl text-base text-[var(--color-surface)]/85 md:mt-4 md:text-lg">
                      {slide.subtitle}
                    </p>
                  )}
                  <div className="reveal-up reveal-up-delay-3 mt-5 md:mt-7">
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
              <span key={`${item}-${i}`} className="ticker-item">
                {item}
                <span className="mx-3 text-[var(--color-led)]">★</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
