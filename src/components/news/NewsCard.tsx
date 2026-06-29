import Link from "next/link";
import Image from "next/image";
import type { NewsPost } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export function NewsCard({
  post,
  tilt = "collage-tilt-a",
}: {
  post: NewsPost;
  tilt?: "collage-tilt-a" | "collage-tilt-b" | "collage-tilt-c";
}) {
  return (
    <article className={cn("catalog-card group", tilt)}>
      <Link href={`/news/${post.slug}`} className="block">
        <div className="relative px-2 pt-2">
          <span className="sticker-label absolute left-4 top-4 z-10">Dispatch</span>
          <div className="catalog-frame relative aspect-[4/3] overflow-hidden md:aspect-[16/10]">
            <Image
              src={post.heroImage}
              alt=""
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
              sizes="(max-width:768px) 100vw, 33vw"
            />
          </div>
        </div>
        <div className="divider-torn mx-3" aria-hidden />
        <div className="p-3 pt-2.5">
          <time
            className="manual-label text-[var(--color-subtle)]"
            dateTime={post.publishedAt}
          >
            {formatDate(post.publishedAt)}
          </time>
          <h3 className="font-poster mt-1.5 text-xl leading-none text-[var(--color-ink)]">
            {post.title}
          </h3>
          <p className="font-editorial mt-1.5 line-clamp-2 text-sm text-[var(--color-subtle)]">
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
