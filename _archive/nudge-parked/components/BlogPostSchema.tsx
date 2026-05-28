'use client'

import { useEffect } from 'react'

interface BlogPostSchemaProps {
  title: string
  description: string
  datePublished: string
  dateModified?: string
  authorName: string
  authorUrl?: string
  imageUrl?: string
  url: string
  articleBody?: string
}

/**
 * Injects BlogPosting JSON-LD structured data into the page <head>.
 * Uses useEffect cleanup to prevent duplicates on re-render.
 */
export default function BlogPostSchema({
  title,
  description,
  datePublished,
  dateModified,
  authorName,
  authorUrl,
  imageUrl,
  url,
  articleBody,
}: BlogPostSchemaProps) {
  useEffect(() => {
    // Remove any previously injected BlogPosting schema to avoid duplicates
    const existing = document.querySelector('script[data-blogposting-schema]')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-blogposting-schema', 'true')

    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description,
      datePublished,
      dateModified: dateModified || datePublished,
      author: {
        '@type': 'Person',
        name: authorName,
        ...(authorUrl ? { url: authorUrl } : {}),
      },
      publisher: {
        '@type': 'Organization',
        name: 'Nudge',
        url: 'https://nudge-sigma-liart.vercel.app',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      ...(imageUrl ? { image: imageUrl } : {}),
      ...(articleBody ? { articleBody } : {}),
    }

    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      const s = document.querySelector('script[data-blogposting-schema]')
      if (s) s.remove()
    }
  }, [title, description, datePublished, dateModified, authorName, authorUrl, imageUrl, url, articleBody])

  return null
}
