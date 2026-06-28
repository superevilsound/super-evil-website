"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function NewsletterForm({ copy }: { copy: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <p className="mb-4 max-w-lg text-sm text-[var(--color-subtle)]">{copy}</p>
      <form onSubmit={onSubmit} className="flex max-w-md flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor="newsletter-name">
          Full Name
        </label>
        <input
          id="newsletter-name"
          name="name"
          placeholder="Full name"
          className="flex-1 rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
        />
        <label className="sr-only" htmlFor="newsletter-email">
          Email
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="Email"
          className="flex-1 rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
        />
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "…" : "Subscribe"}
        </Button>
      </form>
      {status === "success" && (
        <p className="mt-2 text-sm text-green-700" role="status">
          Thanks for subscribing!
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
