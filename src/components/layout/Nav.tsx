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
      <ul className="flex flex-wrap items-center gap-4 text-sm md:gap-6">
        {navItems.map(({ href, label }) => {
          const active =
            pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "hover:opacity-80",
                  active && "font-semibold underline underline-offset-4",
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
