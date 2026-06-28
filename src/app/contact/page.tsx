import { ContactForm } from "@/components/forms/ContactForm";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="py-[var(--section-py)]">
      <div className="container-main max-w-lg">
        <h1 className="font-display text-3xl">Contact</h1>
        <p className="mt-2 text-sm text-[var(--color-subtle)]">
          For store and order issues, email support@superevil.com. Do not use social media for order support.
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
