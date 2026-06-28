import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "support@superevil.com";

  if (resendKey) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Super Evil <hello@superevil.com>",
        to: [to],
        subject: `Contact from ${parsed.data.name}`,
        text: `${parsed.data.message}\n\n— ${parsed.data.name} (${parsed.data.email})`,
      }),
    });
  }

  return NextResponse.json({ ok: true });
}
