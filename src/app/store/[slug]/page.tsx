import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getProductBySlug,
  getProducts,
  getSiteSettings,
} from "@/lib/data";
import { productTypeLabel } from "@/lib/cart";
import { AddToCartButton } from "@/components/store/AddToCartButton";
import { VariantSelector } from "@/components/store/VariantSelector";
import { ProductCard } from "@/components/store/ProductCard";
import { Badge, SectionTitle } from "@/components/ui/button";
import { JsonLd, productJsonLd } from "@/components/seo/JsonLd";
import type { Metadata } from "next";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Not Found" };
  return {
    title: product.title,
    description: product.description,
    openGraph: { images: product.images },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const allProducts = await getProducts();
  const related = allProducts.filter(
    (p) =>
      p.slug !== product.slug &&
      (product.relatedSlugs?.includes(p.slug) ||
        p.relatedSlugs?.includes(product.slug)),
  );
  const settings = await getSiteSettings();
  const baseUrl = `https://${settings.domain}`;

  return (
    <article className="py-[var(--section-py)]">
      <JsonLd
        data={productJsonLd({
          name: product.title,
          description: product.description,
          image: product.images[0],
          price: product.price,
          sku: product.sku,
          url: `${baseUrl}/store/${product.slug}`,
        })}
      />
      <div className="container-main">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-3">
            {product.images.map((img, i) => (
              <div key={img} className="relative aspect-square overflow-hidden rounded-lg border border-[var(--color-border)]">
                <Image
                  src={img}
                  alt={`${product.title} ${i + 1}`}
                  fill
                  className="object-cover"
                  priority={i === 0}
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-[var(--color-subtle)]">
              {productTypeLabel(product.type)}
            </p>
            <h1 className="font-display text-3xl md:text-4xl">{product.title}</h1>
            <p className="mt-1 text-sm text-[var(--color-subtle)]">{product.shipWindow}</p>
            <div className="mt-4 flex gap-2">
              {product.preorder && <Badge>Pre-order</Badge>}
              {!product.inStock && !product.preorder && (
                <Badge className="bg-red-700">Sold out</Badge>
              )}
            </div>
            <div className="mt-4">
              <VariantSelector product={product} />
            </div>
            <p className="mt-4 leading-relaxed">{product.description}</p>
            {product.specs.length > 0 && (
              <div className="mt-6">
                <h2 className="text-sm font-semibold uppercase">Specs</h2>
                <dl className="mt-2 space-y-1 text-sm">
                  {product.specs.map((s) => (
                    <div key={s.key} className="flex gap-2">
                      <dt className="font-medium">{s.key}:</dt>
                      <dd className="text-[var(--color-subtle)]">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            {product.audioDemos.length > 0 && (
              <div className="mt-6">
                <h2 className="text-sm font-semibold uppercase">Audio demos</h2>
                <div className="mt-2 space-y-3">
                  {product.audioDemos.map((demo) => (
                    <div key={demo.url}>
                      <p className="mb-1 text-sm">{demo.label}</p>
                      <audio controls className="w-full" preload="none">
                        <source src={demo.url} type="audio/mpeg" />
                        <track kind="captions" />
                      </audio>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-8">
              <AddToCartButton product={product} />
            </div>
            <p className="mt-4 text-xs text-[var(--color-subtle)]">
              <Link href="/returns" className="underline">
                Shipping & returns
              </Link>
              {product.type === "sample_pack" && (
                <>
                  {" · "}
                  <Link href="/eula" className="underline">
                    License / EULA
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
        {related.length > 0 && (
          <section className="mt-16">
            <SectionTitle title="Related" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
