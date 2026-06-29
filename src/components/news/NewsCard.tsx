import Link from "next/link";
import Image from "next/image";
import type { NewsPost } from "@/lib/types";
import { formatDate } from "@/lib/format";

export function NewsCard({ post }: { post: NewsPost }) {
  return (
    <article className="group overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_2px_12px_rgba(11,11,9,0.06)]">
      <Link href={`/news/${post.slug}`} className="block">
        <div className="catalog-frame relative m-3 aspect-[16/10] overflow-hidden">
          <Image
            src={post.heroImage}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </div>
        <div className="divider-dashed mx-3" aria-hidden />
        <div className="p-4 pt-3">
          <time
            className="label-mono text-[var(--color-subtle)]"
            dateTime={post.publishedAt}
          >
            {formatDate(post.publishedAt)}
          </time>
          <h3 className="font-display mt-2 text-lg leading-snug text-[var(--color-ink)]">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm text-[var(--color-subtle)]">
            {post.excerpt}
          </p>
          <span className="label-mono mt-4 inline-block text-[var(--color-accent)] transition-opacity group-hover:opacity-80">
            Read More…
          </span>
        </div>
      </Link>
    </article>
  );
}
