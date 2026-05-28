'use client'

import { useEffect } from 'react'

/**
 * Injects WebSite + SoftwareApplication JSON-LD structured data for the Nudge homepage.
 * Helps Google understand Nudge as a SaaS product.
 */
export default function HomepageSchema() {
  useEffect(() => {
    const existing = document.querySelector('script[data-homepage-schema]')
    if (existing) existing.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-homepage-schema', 'true')

    const baseUrl = 'https://nudge-sigma-liart.vercel.app'

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${baseUrl}/#website`,
          url: baseUrl,
          name: 'Nudge',
          description: 'Voice task manager and family assistant app. Transform voice into organized tasks with smart reminders.',
          publisher: {
            '@type': 'Organization',
            '@id': `${baseUrl}/#organization`,
            name: 'Nudge',
            url: baseUrl,
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
        },
        {
          '@type': 'SoftwareApplication',
          '@id': `${baseUrl}/#software`,
          name: 'Nudge',
          applicationCategory: 'ProductivityApplication',
          operatingSystem: 'Web, iOS, Android',
          description: 'Voice task manager for families. Speak tasks naturally. Nudge understands, assigns, and reminds.',
          url: baseUrl,
          offers: [
            {
              '@type': 'Offer',
              name: 'Free',
              price: '0',
              priceCurrency: 'USD',
              description: '5 tasks per day, basic voice input, Telegram integration',
            },
            {
              '@type': 'Offer',
              name: 'Pro',
              price: '5',
              priceCurrency: 'USD',
              description: 'Unlimited tasks, advanced voice AI, up to 5 family members',
            },
            {
              '@type': 'Offer',
              name: 'Family',
              price: '9',
              priceCurrency: 'USD',
              description: 'Everything in Pro, unlimited family members, API access',
            },
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            bestRating: '5',
            ratingCount: '156',
            reviewCount: '156',
          },
        },
      ],
    }

    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      const s = document.querySelector('script[data-homepage-schema]')
      if (s) s.remove()
    }
  }, [])

  return null
}
