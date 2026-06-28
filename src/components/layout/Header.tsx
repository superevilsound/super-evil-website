import Link from "next/link";
import { getSiteSettings } from "@/lib/data";
import { Nav } from "@/components/layout/Nav";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { CartButton } from "@/components/store/CartButton";

export async function Header() {
  const settings = await getSiteSettings();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-white/90 backdrop-blur">
      <div className="container-main flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group shrink-0">
          <span className="font-display text-lg leading-none">{settings.name}</span>
          <span className="block text-[10px] text-[var(--color-subtle)] leading-none">
            {settings.slogan}
          </span>
        </Link>
        <div className="hidden items-center gap-6 lg:flex">
          <Nav />
          <SocialLinks socials={settings.socials} />
        </div>
        <div className="flex items-center gap-3">
          <div className="lg:hidden">
            <Nav />
          </div>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
