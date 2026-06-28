"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
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
    <>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="mt-1 w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm"
          />
        </div>
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Send message"}
        </Button>
        {status === "success" && (
          <p className="text-sm text-green-700" role="status">
            Message sent. We will reply soon.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600" role="alert">
            Failed to send. Email support@superevil.com directly.
          </p>
        )}
      </form>
    </>
  );
}
