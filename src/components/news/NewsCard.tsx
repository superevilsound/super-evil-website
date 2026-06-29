import Link from "next/link";
import Image from "next/image";
import type { NewsPost } from "@/lib/types";
import { formatDate } from "@/lib/format";

export function NewsCard({ post }: { post: NewsPost }) {
  return (
    <article className="catalog-card group reveal-up">
      <Link href={`/news/${post.slug}`} className="block">
        <div className="catalog-frame relative m-2 aspect-[4/3] overflow-hidden md:aspect-[16/10]">
          <Image
            src={post.heroImage}
            alt=""
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        </div>
        <div className="divider-dashed mx-2" aria-hidden />
        <div className="p-3 pt-2.5">
          <time
            className="manual-label text-[var(--color-subtle)]"
            dateTime={post.publishedAt}
          >
            {formatDate(post.publishedAt)}
          </time>
          <h3 className="font-display mt-1.5 text-lg leading-tight text-[var(--color-ink)]">
            {post.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm text-[var(--color-subtle)]">
            {post.excerpt}
          </p>
          <span className="manual-label mt-3 inline-block text-[var(--color-accent)] transition-opacity group-hover:opacity-80">
            Read More…
          </span>
        </div>
      </Link>
    </article>
  );
}
