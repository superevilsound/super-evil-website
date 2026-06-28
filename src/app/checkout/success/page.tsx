import { Button } from "@/components/ui/button";

export const metadata = { title: "Order Confirmed" };

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; demo?: string }>;
}) {
  const params = await searchParams;

  return (
    <section className="py-[var(--section-py)]">
      <div className="container-main max-w-lg text-center">
        <h1 className="font-display text-3xl">Thank you!</h1>
        <p className="mt-4 text-[var(--color-subtle)]">
          {params.demo
            ? "Demo checkout complete. Configure Stripe to process live payments."
            : "Your order is confirmed. Check your email for receipt and download links."}
        </p>
        {params.session_id && (
          <p className="mt-2 text-xs text-[var(--color-subtle)]">
            Session: {params.session_id}
          </p>
        )}
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/store">Continue shopping</Button>
          <Button href="/account" variant="outline">
            Account
          </Button>
        </div>
      </div>
    </section>
  );
}
