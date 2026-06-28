import { getSiteSettings } from "@/lib/data";
import { FaqAccordion } from "@/components/about/FaqAccordion";
import { SectionTitle } from "@/components/ui/button";

export const metadata = { title: "About / FAQ" };
export const revalidate = 300;

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <section className="py-[var(--section-py)]">
      <div className="container-main max-w-3xl">
        <SectionTitle title="About Super Evil" />
        <div className="prose prose-neutral max-w-none">
          <p className="leading-relaxed">{settings.mission}</p>
          {settings.demoPolicy && (
            <>
              <h2 className="mt-8 font-display text-xl">Demo policy</h2>
              <p className="leading-relaxed text-[var(--color-subtle)]">
                {settings.demoPolicy}
              </p>
            </>
          )}
          <h2 className="mt-8 font-display text-xl">Contact</h2>
          <p className="text-sm">
            General:{" "}
            <a href={`mailto:${settings.contactEmail}`} className="underline">
              {settings.contactEmail}
            </a>
          </p>
          <p className="text-sm">
            Store support:{" "}
            <a href={`mailto:${settings.supportEmail}`} className="underline">
              {settings.supportEmail}
            </a>
          </p>
        </div>
        <section className="mt-12">
          <SectionTitle title="FAQ" />
          <FaqAccordion faqs={settings.faqs} />
        </section>
      </div>
    </section>
  );
}
