"use client";

import { useSyncExternalStore, useState } from "react";
import Link from "next/link";

export function CookieBanner() {
  const hasConsent = useSyncExternalStore(
    () => () => {},
    () => typeof window !== "undefined" && !!localStorage.getItem("se_cookie_consent"),
    () => true,
  );
  const [dismissed, setDismissed] = useState(false);
  const visible = !hasConsent && !dismissed;

  function accept() {
    localStorage.setItem("se_cookie_consent", "all");
    setDismissed(true);
    window.dispatchEvent(new Event("se-cookie-consent"));
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[var(--color-border)] bg-white p-4 shadow-lg"
    >
      <div className="container-main flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--color-subtle)]">
          We use cookies for analytics and email marketing.{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={accept}
            className="rounded-md bg-[var(--color-ink)] px-4 py-2 text-sm text-white"
          >
            Allow All
          </button>
        </div>
      </div>
    </div>
  );
}
