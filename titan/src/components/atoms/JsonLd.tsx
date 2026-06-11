'use client';

import { useEffect } from 'react';

interface JsonLdProps {
  schema: Record<string, unknown>;
}

/**
 * Injects JSON-LD structured data into <head> via a script tag.
 * Handles dedup by data-jsonld attribute to avoid duplicates on re-renders.
 */
export default function JsonLd({ schema }: JsonLdProps) {
  useEffect(() => {
    const id = `jsonld-${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.setAttribute('data-jsonld', 'true');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, [schema]);

  return null;
}
