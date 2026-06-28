import { getProducts } from "@/lib/data";
import { StoreGrid } from "@/components/store/StoreGrid";
import { SectionTitle } from "@/components/ui/button";

export const metadata = { title: "Store" };
export const revalidate = 60;

export default async function StorePage() {
  const products = await getProducts();

  return (
    <section className="py-[var(--section-py)]">
      <div className="container-main">
        <SectionTitle title="Store" />
        <StoreGrid products={products} />
      </div>
    </section>
  );
}
