"use client";

import Link from "next/link";
import { Music2 } from "lucide-react";
import type { SocialLinks as SocialLinksType } from "@/lib/types";

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.7 15.5V8.5L15.8 12l-6.1 3.5z" />
    </svg>
  );
}

export function SocialLinks({ socials }: { socials: SocialLinksType }) {
  const links = [
    { href: socials.spotify, label: "Spotify", icon: Music2 },
    { href: socials.instagram, label: "Instagram", icon: InstagramIcon },
    { href: socials.x, label: "X", icon: XIcon },
    { href: socials.youtube, label: "YouTube", icon: YoutubeIcon },
    { href: socials.bandcamp, label: "Bandcamp", icon: Music2 },
  ].filter((l) => l.href && l.href !== "#");

  if (!links.length) return null;

  return (
    <ul className="flex items-center gap-3" aria-label="Social links">
      {links.map(({ href, label, icon: Icon }) => (
        <li key={label}>
          <Link
            href={href!}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-[var(--color-ink)] hover:opacity-70"
          >
            <Icon className="h-4 w-4" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
