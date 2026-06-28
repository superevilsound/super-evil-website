import { getSiteSettings } from "@/lib/data";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Account" };

export default async function AccountPage() {
  const settings = await getSiteSettings();
  const portalUrl = process.env.STRIPE_CUSTOMER_PORTAL_URL;

  return (
    <section className="py-[var(--section-py)]">
      <div className="container-main max-w-lg">
        <h1 className="font-display text-3xl">Account</h1>
        <p className="mt-4 text-[var(--color-subtle)]">
          View order history and manage subscriptions via the Stripe customer portal.
        </p>
        {portalUrl ? (
          <Button href={portalUrl} className="mt-6">
            Manage orders
          </Button>
        ) : (
          <p className="mt-6 text-sm text-[var(--color-subtle)]">
            Configure STRIPE_CUSTOMER_PORTAL_URL for live order management. Contact{" "}
            <a href={`mailto:${settings.supportEmail}`} className="underline">
              {settings.supportEmail}
            </a>{" "}
            for order help.
          </p>
        )}
      </div>
    </section>
  );
}
