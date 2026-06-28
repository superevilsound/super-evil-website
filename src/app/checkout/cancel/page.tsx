import { Button } from "@/components/ui/button";

export const metadata = { title: "Checkout Cancelled" };

export default function CheckoutCancelPage() {
  return (
    <section className="py-[var(--section-py)]">
      <div className="container-main max-w-lg text-center">
        <h1 className="font-display text-3xl">Checkout cancelled</h1>
        <p className="mt-4 text-[var(--color-subtle)]">
          Your cart is still saved. Return when you are ready.
        </p>
        <Button href="/cart" className="mt-8">
          Back to cart
        </Button>
      </div>
    </section>
  );
}
