import Link from "next/link";
import { getSiteSettings } from "@/lib/data";
import { SocialLinks } from "@/components/layout/SocialLinks";

export async function Footer() {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-surface-muted)]">
      <div className="container-main py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-xl">{settings.name}</p>
            <p className="mt-1 text-sm text-[var(--color-subtle)]">{settings.slogan}</p>
            <p className="mt-4 text-sm">{settings.address}</p>
            <a
              href={`mailto:${settings.contactEmail}`}
              className="mt-1 block text-sm underline"
            >
              {settings.contactEmail}
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold">Follow</p>
            <div className="mt-3">
              <SocialLinks socials={settings.socials} />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold">Legal</p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <Link href="/privacy" className="hover:underline">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:underline">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/eula" className="hover:underline">
                  EULA
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-[var(--color-border)] pt-6 text-xs text-[var(--color-subtle)]">
          © {year} {settings.name} · {settings.domain}
        </p>
      </div>
    </footer>
  );
}
