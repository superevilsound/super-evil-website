import { NextResponse } from "next/server";
import { z } from "zod";
import { stripe, isStripeConfigured } from "@/lib/stripe";
import { cartHasPhysical } from "@/lib/cart";
import type { CartItem } from "@/lib/types";

const schema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      slug: z.string(),
      title: z.string(),
      price: z.number(),
      quantity: z.number().min(1),
      image: z.string(),
      type: z.enum(["pedal", "sample_pack", "merch"]),
    }),
  ),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid cart" }, { status: 400 });
  }

  const items = parsed.data.items as CartItem[];
  const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (!isStripeConfigured || !stripe) {
    return NextResponse.json({ url: `${origin}/checkout/success?demo=1` });
  }

  const lineItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.title,
        images: item.image ? [item.image] : undefined,
        metadata: { productId: item.productId, slug: item.slug, type: item.type },
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout/cancel`,
    allow_promotion_codes: true,
    automatic_tax: { enabled: true },
    shipping_address_collection: cartHasPhysical(items)
      ? { allowed_countries: ["US"] }
      : undefined,
    metadata: {
      items: JSON.stringify(items.map((i) => ({ id: i.productId, slug: i.slug, qty: i.quantity, type: i.type }))),
    },
  });

  return NextResponse.json({ url: session.url });
}
