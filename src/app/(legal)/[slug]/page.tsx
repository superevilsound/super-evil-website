import { notFound } from "next/navigation";
import { getAllLegalPages, getLegalPage } from "@/lib/data";
import type { Metadata } from "next";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const pages = await getAllLegalPages();
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLegalPage(slug);
  if (!page) return { title: "Not Found" };
  return { title: page.title };
}

export default async function LegalPage({ params }: Props) {
  const { slug } = await params;
  const page = await getLegalPage(slug);
  if (!page) notFound();

  return (
    <section className="py-[var(--section-py)]">
      <div className="container-main max-w-3xl">
        <h1 className="font-display text-3xl">{page.title}</h1>
        <div className="prose prose-neutral mt-6 max-w-none">
          <p className="leading-relaxed whitespace-pre-wrap">{page.body}</p>
        </div>
      </div>
    </section>
  );
}
