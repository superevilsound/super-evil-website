import { getNewsPosts } from "@/lib/data";
import { NewsLoadMore } from "@/components/news/NewsLoadMore";
import { SectionTitle } from "@/components/ui/button";

export const metadata = { title: "News" };
export const revalidate = 60;

export default async function NewsPage() {
  const posts = await getNewsPosts();

  return (
    <section className="py-[var(--section-py)]">
      <div className="container-main">
        <SectionTitle title="News" />
        <NewsLoadMore posts={posts} />
      </div>
    </section>
  );
}
