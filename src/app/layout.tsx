import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { CartProvider } from "@/components/store/CartProvider";
import { CartToast } from "@/components/store/CartToast";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Analytics } from "@/components/layout/Analytics";
import { getSiteSettings } from "@/lib/data";
import { JsonLd, organizationJsonLd } from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      default: settings.name,
      template: `%s // ${settings.name}`,
    },
    description: settings.mission.slice(0, 160),
    metadataBase: new URL(`https://${settings.domain}`),
    openGraph: {
      siteName: settings.name,
      type: "website",
      locale: "en_US",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const baseUrl = `https://${settings.domain}`;

  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <JsonLd
          data={organizationJsonLd({
            name: settings.name,
            url: baseUrl,
            email: settings.contactEmail,
          })}
        />
        <CartProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <BackToTop />
          <CartToast />
          <CookieBanner />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
