"use client";

import { useEffect, useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqPageJsonLdProps {
  items: FaqItem[];
  pageSlug: string;
}

/**
 * Injects a Schema.org FAQPage JSON-LD structured data script tag
 * into the document <head>.
 *
 * Usage in any "use client" page with FAQ content:
 *   <FaqPageJsonLd items={faqs} pageSlug="pricing" />
 */
export default function FaqPageJsonLd({ items, pageSlug }: FaqPageJsonLdProps) {
  // Use a unique id per slug so SPA navigation replaces correctly
  const id = `faqpage-jsonld-${pageSlug}`;

  useEffect(() => {
    if (!items || items.length === 0) return;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    };

    const scriptTag = document.createElement("script");
    scriptTag.type = "application/ld+json";
    scriptTag.id = id;
    scriptTag.textContent = JSON.stringify(jsonLd);

    // Remove previous FAQPage JSON-LD to prevent duplicates on SPA nav
    const existing = document.querySelectorAll("script[id^='faqpage-jsonld-']");
    existing.forEach((el) => el.remove());

    document.head.appendChild(scriptTag);

    return () => {
      document.getElementById(id)?.remove();
    };
  }, [items, id]);

  return null;
}
