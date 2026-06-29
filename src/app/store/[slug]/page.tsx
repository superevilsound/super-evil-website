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
  const isHardware = product.type === "pedal";

  return (
    <article className="signal-boot py-[var(--section-py)]">
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
        <p className="signal-label mb-6">Signal acquired // Product module</p>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="reveal-up space-y-5">
            {product.images.map((img, i) => (
              <div
                key={img}
                className={`product-plate relative aspect-square overflow-hidden rounded-sm p-3 ${
                  isHardware || i === 0 ? "bg-[var(--color-panel)]" : "bg-[var(--color-surface-muted)]"
                }`}
              >
                <div className="catalog-frame relative h-full w-full overflow-hidden">
                  <Image
                    src={img}
                    alt={`${product.title} ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                    priority={i === 0}
                    sizes="(max-width:1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="buy-module reveal-up reveal-up-delay-1">
            <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm md:p-6 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
              <p className="manual-label text-[var(--color-subtle)]">
                {productTypeLabel(product.type)}
              </p>
              <h1 className="font-display mt-1 text-3xl leading-tight text-[var(--color-ink)] md:text-4xl">
                {product.title}
              </h1>
              <p className="manual-label mt-2 text-[var(--color-subtle)]">
                {product.shipWindow}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.preorder && <Badge variant="preorder">Pre-order</Badge>}
                {!product.inStock && !product.preorder && (
                  <Badge variant="soldout">Sold out</Badge>
                )}
                {product.inStock && !product.preorder && (
                  <Badge variant="instock">In stock</Badge>
                )}
              </div>
              <div className="mt-5">
                <VariantSelector product={product} />
              </div>
              <p className="mt-5 line-clamp-6 text-sm leading-relaxed text-[var(--color-ink)] lg:text-base">
                {product.description}
              </p>
              {product.specs.length > 0 && (
                <div className="mt-8">
                  <h2 className="manual-label mb-3 text-[var(--color-subtle)]">
                    Specifications
                  </h2>
                  <dl className="specs-table">
                    {product.specs.map((s) => (
                      <div key={s.key} className="specs-table-row">
                        <dt>{s.key}</dt>
                        <dd>{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
              {product.audioDemos.length > 0 && (
                <div className="mt-8">
                  <h2 className="manual-label mb-3 text-[var(--color-subtle)]">
                    Signal tests
                  </h2>
                  <div className="space-y-3">
                    {product.audioDemos.map((demo) => (
                      <div key={demo.url} className="audio-demo-panel">
                        <p className="manual-label text-[var(--color-surface)]/90">
                          {demo.label}
                        </p>
                        <audio controls className="w-full" preload="none">
                          <source src={demo.url} type="audio/mpeg" />
                          <track kind="captions" />
                        </audio>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="signal-control mt-8 sm:max-w-xs">
                <AddToCartButton product={product} className="w-full" />
              </div>
              <p className="manual-label mt-4 text-[var(--color-subtle)]">
                <Link
                  href="/returns"
                  className="text-[var(--color-accent)] hover:underline"
                >
                  Shipping & returns
                </Link>
                {product.type === "sample_pack" && (
                  <>
                    {" · "}
                    <Link
                      href="/eula"
                      className="text-[var(--color-accent)] hover:underline"
                    >
                      License / EULA
                    </Link>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
        {related.length > 0 && (
          <section className="reveal-up mt-16">
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
