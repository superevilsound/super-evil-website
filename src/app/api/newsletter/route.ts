import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const apiKey = process.env.KLAVIYO_API_KEY || process.env.MAILCHIMP_API_KEY;

  if (apiKey && process.env.KLAVIYO_LIST_ID) {
    try {
      await fetch("https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/", {
        method: "POST",
        headers: {
          Authorization: `Klaviyo-API-Key ${apiKey}`,
          "Content-Type": "application/json",
          revision: "2024-10-15",
        },
        body: JSON.stringify({
          data: {
            type: "profile-subscription-bulk-create-job",
            attributes: {
              profiles: {
                data: [
                  {
                    type: "profile",
                    attributes: {
                      email: parsed.data.email,
                      first_name: parsed.data.name,
                    },
                  },
                ],
              },
            },
          },
        }),
      });
    } catch {
      /* log in production */
    }
  }

  return NextResponse.json({ ok: true });
}
