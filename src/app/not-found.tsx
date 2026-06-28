import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="py-[var(--section-py)]">
      <div className="container-main text-center">
        <h1 className="font-display text-5xl">404</h1>
        <p className="mt-4 text-[var(--color-subtle)]">Page not found.</p>
        <Button href="/" className="mt-8">
          Go Home
        </Button>
      </div>
    </section>
  );
}
