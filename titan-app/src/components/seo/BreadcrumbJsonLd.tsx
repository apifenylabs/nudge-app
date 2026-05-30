"use client";

import { useEffect } from "react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

/**
 * Injects a Schema.org BreadcrumbList JSON-LD structured data script tag
 * into the document <head>.
 *
 * Usage in any "use client" page:
 *   <BreadcrumbJsonLd items={[
 *     { label: "Home", href: "/" },
 *     { label: "Pricing", href: "/pricing" },
 *   ]} />
 */
export default function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  useEffect(() => {
    // Build the JSON-LD object
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: `https://titan.phasrforge.com${item.href}`,
      })),
    };

    const scriptTag = document.createElement("script");
    scriptTag.type = "application/ld+json";
    scriptTag.id = `breadcrumb-jsonld-${items.map((i) => i.href).join("-")}`;
    scriptTag.textContent = JSON.stringify(jsonLd);

    // Remove previous breadcrumb JSON-LD if it exists (prevents duplicates on SPA nav)
    const existing = document.querySelectorAll("script[id^='breadcrumb-jsonld-']");
    existing.forEach((el) => el.remove());

    document.head.appendChild(scriptTag);

    return () => {
      // Clean up on unmount
      document.getElementById(scriptTag.id)?.remove();
    };
  }, [items]);

  // This component renders nothing visible
  return null;
}
