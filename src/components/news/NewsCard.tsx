import Link from "next/link";
import Image from "next/image";
import type { NewsPost } from "@/lib/types";
import { formatDate } from "@/lib/format";

export function NewsCard({ post }: { post: NewsPost }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-[var(--color-border)] bg-white">
      <Link href={`/news/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.heroImage}
            alt=""
            fill
            className="object-cover transition-transform group-hover:scale-[1.02]"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </div>
        <div className="p-4">
          <time className="text-xs text-[var(--color-subtle)]" dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
          <h3 className="mt-1 text-lg font-semibold leading-snug">{post.title}</h3>
          <p className="mt-2 line-clamp-3 text-sm text-[var(--color-subtle)]">
            {post.excerpt}
          </p>
          <span className="mt-3 inline-block text-sm underline">Read More…</span>
        </div>
      </Link>
    </article>
  );
}
