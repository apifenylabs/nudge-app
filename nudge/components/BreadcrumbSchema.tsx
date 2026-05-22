'use client'

import { useEffect } from 'react'

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

/**
 * Injects BreadcrumbList JSON-LD structured data.
 * Uses useEffect cleanup to prevent duplicates.
 */
export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  useEffect(() => {
    const existing = document.querySelector('script[data-breadcrumb-schema]')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-breadcrumb-schema', 'true')

    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    }

    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      const s = document.querySelector('script[data-breadcrumb-schema]')
      if (s) s.remove()
    }
  }, [items])

  return null
}
