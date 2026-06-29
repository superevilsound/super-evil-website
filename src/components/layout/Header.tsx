import Link from "next/link";
import { getSiteSettings } from "@/lib/data";
import { Nav } from "@/components/layout/Nav";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { CartButton } from "@/components/store/CartButton";

export async function Header() {
  const settings = await getSiteSettings();

  return (
    <header className="hardware-panel sticky top-0 z-50 border-b border-[var(--color-border)] border-b-[var(--color-accent)]/30 bg-[var(--color-panel)]/95 text-[var(--color-surface)] backdrop-blur-md">
      <div className="container-main flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group shrink-0">
          <span className="font-display text-lg leading-none text-[var(--color-surface)] transition-opacity group-hover:opacity-90">
            {settings.name}
          </span>
          <span className="manual-label mt-0.5 block text-[10px] text-[var(--color-subtle)]">
            {settings.slogan}
          </span>
        </Link>
        <div className="hidden items-center gap-6 lg:flex">
          <Nav />
          <SocialLinks socials={settings.socials} />
        </div>
        <div className="flex items-center gap-3 text-[var(--color-surface)]">
          <div className="lg:hidden">
            <Nav />
          </div>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
