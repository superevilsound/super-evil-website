import {
  getHeroSlides,
  getNewsPosts,
  getReleases,
  getSiteSettings,
} from "@/lib/data";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { NewsCard } from "@/components/news/NewsCard";
import { ReleaseCarousel } from "@/components/releases/ReleaseCarousel";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { SectionTitle, Button } from "@/components/ui/button";
import { ConnieMark } from "@/components/brand/ConnieMark";

export const revalidate = 60;

const collageTilts = ["collage-tilt-a", "collage-tilt-b", "collage-tilt-c"] as const;

export default async function HomePage() {
  const [slides, news, releases, settings] = await Promise.all([
    getHeroSlides(),
    getNewsPosts(6),
    getReleases(),
    getSiteSettings(),
  ]);

  return (
    <>
      <HeroCarousel slides={slides} />
      <section className="visual-module visual-module--cream relative overflow-hidden">
        <ConnieMark variant="sticker-light" className="connie-sticker connie-sticker--corner sticker-in" />
        <div className="container-main relative z-[1] reveal-up">
          <SectionTitle
            eyebrow="Transmissions"
            title="Connie's Dispatches"
            action={
              <div className="flex flex-wrap items-center gap-2">
                <Button href="/store" variant="accent" size="sm">
                  Shop Machines
                </Button>
                <Button href="/news" variant="outline" size="sm">
                  All Transmissions
                </Button>
              </div>
            }
          />
          <div className="collage-grid grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((post, i) => (
              <div
                key={post._id}
                className={
                  i % 3 === 1
                    ? "reveal-up reveal-up-delay-1"
                    : i % 3 === 2
                      ? "reveal-up reveal-up-delay-2"
                      : "reveal-up"
                }
              >
                <NewsCard post={post} tilt={collageTilts[i % 3]} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="visual-module visual-module--dark grain-overlay relative overflow-hidden border-y-4 border-[var(--color-accent)]">
        <ConnieMark variant="watermark-dark" className="connie-watermark" />
        <div className="container-main relative z-[1] reveal-up">
          <SectionTitle eyebrow="Archive" title="Recent Noise" />
          <ReleaseCarousel releases={releases} />
        </div>
      </section>
      <section className="visual-module visual-module--poster relative overflow-hidden">
        <ConnieMark
          variant="sticker-light"
          className="connie-sticker bottom-4 left-[6%] top-auto wobble-hold opacity-20"
        />
        <div className="container-main relative z-[1] reveal-up">
          <SectionTitle title="Join the Signal" />
          <div className="mx-auto max-w-xl">
            <NewsletterForm copy={settings.newsletterCopy} />
          </div>
        </div>
      </section>
    </>
  );
}
