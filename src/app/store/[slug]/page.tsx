import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getProductBySlug,
  getProducts,
  getSiteSettings,
} from "@/lib/data";
import { storeProductTypeLabel } from "@/lib/store-display-labels";
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
  const hardwareStickers = [
    "Connie Approved",
    "Signal Damage Ready",
    "Tested in the Pit",
  ] as const;

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
        <p className="connievision-boot mb-6">Connievision // Product module online</p>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="reveal-up space-y-5">
            {product.images.map((img, i) => {
              const isHero = i === 0;
              return (
                <div
                  key={img}
                  className={`product-plate relative overflow-hidden rounded-sm p-3 ${
                    isHero
                      ? "product-plate-hero grain-overlay scanline-overlay"
                      : "aspect-square"
                  } ${isHardware || isHero ? "bg-[var(--color-panel)]" : "bg-[var(--color-surface-muted)]"}`}
                >
                  <div className="catalog-frame relative h-full min-h-[280px] w-full overflow-hidden">
                    <Image
                      src={img}
                      alt={`${product.title} ${i + 1}`}
                      fill
                      className={`object-cover ${isHero ? "hero-drift" : "transition-transform duration-700 hover:scale-[1.03]"}`}
                      priority={isHero}
                      sizes="(max-width:1024px) 100vw, 50vw"
                    />
                  </div>
                  {isHero && isHardware && (
                    <span className="sticker-label sticker-label--orange absolute bottom-6 left-6 z-10">
                      Hardware plate // 01
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="buy-module reveal-up reveal-up-delay-1">
            <div className="buy-panel">
              <p className="manual-label text-[var(--color-subtle)]">
                {storeProductTypeLabel(product.type)}
              </p>
              <h1 className="font-poster mt-1 text-3xl leading-none md:text-4xl">
                {product.title}
              </h1>
              <p className="manual-label mt-2 text-[var(--color-subtle)]">
                {product.shipWindow}
              </p>
              {isHardware && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {hardwareStickers.map((label) => (
                    <span key={label} className="sticker-label sticker-in text-[0.6rem]">
                      {label}
                    </span>
                  ))}
                </div>
              )}
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
              <p className="mt-5 text-sm leading-relaxed lg:text-base">
                {product.description}
              </p>
              {product.specs.length > 0 && (
                <div className="buy-panel-section mt-8">
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
                <div className="buy-panel-section mt-8">
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
              <div className="mt-8">
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
