import { NextResponse } from "next/server";
import { stripe, isStripeConfigured } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(request: Request) {
  if (!isStripeConfigured || !stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });
  }

  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const itemsRaw = session.metadata?.items;
    if (itemsRaw) {
      const items = JSON.parse(itemsRaw) as { id: string; slug: string; type: string }[];
      const digital = items.filter((i) => i.type === "sample_pack");
      if (digital.length && process.env.DIGITAL_DOWNLOAD_BASE_URL) {
        // In production: generate signed URLs and email via Resend/Klaviyo
        console.info("Digital fulfillment pending for", session.customer_email, digital);
      }
    }
  }

  return NextResponse.json({ received: true });
}
