"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/types";

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const categories = ["shipping", "returns", "downloads", "general"] as const;
  const labels: Record<(typeof categories)[number], string> = {
    shipping: "Shipping",
    returns: "Returns",
    downloads: "Downloads",
    general: "General",
  };

  return (
    <div className="space-y-8">
      {categories.map((cat) => {
        const items = faqs.filter((f) => f.category === cat);
        if (!items.length) return null;
        return (
          <div key={cat}>
            <h3 className="mb-3 font-semibold">{labels[cat]}</h3>
            <Accordion.Root type="multiple" className="space-y-2">
              {items.map((faq, i) => (
                <Accordion.Item
                  key={faq.question}
                  value={`${cat}-${i}`}
                  className="overflow-hidden rounded-md border border-[var(--color-border)]"
                >
                  <Accordion.Header>
                    <Accordion.Trigger className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium hover:bg-[var(--color-surface-muted)] [&[data-state=open]>svg]:rotate-180">
                      {faq.question}
                      <ChevronDown className="h-4 w-4 shrink-0 transition-transform" />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                    <p className="px-4 pb-3 text-sm text-[var(--color-subtle)]">{faq.answer}</p>
                  </Accordion.Content>
                </Accordion.Item>
              ))}
            </Accordion.Root>
          </div>
        );
      })}
    </div>
  );
}
