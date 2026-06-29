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

export const revalidate = 60;

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
      <section className="visual-module visual-module--cream">
        <div className="container-main reveal-up">
          <SectionTitle
            eyebrow="News"
            title="Latest News"
            action={
              <Button href="/news" variant="outline">
                See More News
              </Button>
            }
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                <NewsCard post={post} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="visual-module visual-module--dark grain-overlay border-y border-[var(--color-border)]">
        <div className="container-main reveal-up">
          <SectionTitle eyebrow="Releases" title="Recent Releases" />
          <ReleaseCarousel releases={releases} />
        </div>
      </section>
      <section className="visual-module visual-module--muted">
        <div className="container-main reveal-up">
          <SectionTitle title="Join Our Mailing List" />
          <div className="mx-auto max-w-xl">
            <NewsletterForm copy={settings.newsletterCopy} />
          </div>
        </div>
      </section>
    </>
  );
}
