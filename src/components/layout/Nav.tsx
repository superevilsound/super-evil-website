"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/news", label: "News" },
  { href: "/artists", label: "Artists" },
  { href: "/tour", label: "Tour" },
  { href: "/store", label: "Store" },
  { href: "/about", label: "About / FAQ" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary">
      <ul className="flex flex-wrap items-center gap-4 md:gap-5">
        {navItems.map(({ href, label }) => {
          const active =
            pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "manual-label relative inline-flex items-center gap-1.5 py-1 text-[var(--color-surface)]/75 transition-colors hover:text-[var(--color-surface)]",
                  active && "font-semibold text-[var(--color-surface)]",
                )}
              >
                {active && (
                  <span
                    className="machine-btn-led shrink-0"
                    aria-hidden
                  />
                )}
                <span
                  className={cn(
                    "border-b-2 border-transparent pb-0.5",
                    active && "border-[var(--color-accent)]",
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
