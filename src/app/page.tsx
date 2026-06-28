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
      <section className="py-[var(--section-py)]">
        <div className="container-main">
          <SectionTitle
            eyebrow="News"
            title="Latest News"
            action={
              <Button href="/news" variant="ghost">
                See More News
              </Button>
            }
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {news.map((post) => (
              <NewsCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-[var(--color-border)] bg-[var(--color-surface-muted)] py-[var(--section-py)]">
        <div className="container-main">
          <SectionTitle eyebrow="Releases" title="Recent Releases" />
          <ReleaseCarousel releases={releases} />
        </div>
      </section>
      <section className="py-[var(--section-py)]">
        <div className="container-main">
          <SectionTitle title="Join Our Mailing List" />
          <NewsletterForm copy={settings.newsletterCopy} />
        </div>
      </section>
    </>
  );
}
