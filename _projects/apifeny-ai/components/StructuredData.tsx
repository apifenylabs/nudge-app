'use client';

import { useEffect } from 'react';

interface StructuredDataProps {
 /** The JSON-LD schema object(s) to inject into the page head */
 data: Record<string, unknown> | Record<string, unknown>[];
}

/**
 * Injects JSON-LD structured data into the document head.
 * Replaces any previously injected script from this component on unmount or rerender.
 * Use for breadcrumbs, local business / item list schemas, FAQ, etc.
 */
export default function StructuredData({ data }: StructuredDataProps) {
 useEffect(() => {
 const scriptId = '__structured_data__';

 // Remove any existing instance
 const existing = document.getElementById(scriptId);
 if (existing) existing.remove();

 const script = document.createElement('script');
 script.id = scriptId;
 script.type = 'application/ld+json';
 script.textContent = JSON.stringify(data);
 document.head.appendChild(script);

 return () => {
 document.getElementById(scriptId)?.remove();
 };
 }, [data]);

 return null;
}
