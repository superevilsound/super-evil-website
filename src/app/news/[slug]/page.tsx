import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getNewsBySlug, getNewsPosts, getSiteSettings } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { JsonLd, articleJsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getNewsPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [post.heroImage] },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getNewsBySlug(slug);
  if (!post) notFound();

  const settings = await getSiteSettings();
  const baseUrl = `https://${settings.domain}`;

  return (
    <article className="py-[var(--section-py)]">
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.excerpt,
          image: post.heroImage,
          datePublished: post.publishedAt,
          url: `${baseUrl}/news/${post.slug}`,
        })}
      />
      <div className="container-main max-w-3xl">
        <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src={post.heroImage}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="(max-width:768px) 100vw, 768px"
          />
        </div>
        <time className="text-sm text-[var(--color-subtle)]" dateTime={post.publishedAt}>
          {formatDate(post.publishedAt)}
        </time>
        <h1 className="mt-2 font-display text-3xl md:text-4xl">{post.title}</h1>
        <div className="prose prose-neutral mt-6 max-w-none">
          <p className="leading-relaxed">{post.body}</p>
        </div>
        {post.ctaLinks && post.ctaLinks.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {post.ctaLinks.map((cta) => (
              <Button
                key={cta.href}
                href={cta.href}
                variant={cta.href.startsWith("http") ? "outline" : "solid"}
              >
                {cta.label}
              </Button>
            ))}
          </div>
        )}
        <div className="mt-12 border-t border-[var(--color-border)] pt-8">
          <Link href="/news" className="text-sm underline">
            See More News
          </Link>
        </div>
      </div>
    </article>
  );
}
