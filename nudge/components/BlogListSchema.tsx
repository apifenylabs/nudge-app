'use client'

import { useEffect } from 'react'
import type { BlogPostMeta } from '@/lib/generated-blog-data'

interface BlogListSchemaProps {
  posts: BlogPostMeta[]
  baseUrl: string
}

/**
 * Injects Blog + ItemList JSON-LD structured data for the blog listing page.
 */
export default function BlogListSchema({ posts, baseUrl }: BlogListSchemaProps) {
  useEffect(() => {
    // Remove any previous schema
    const existingBlog = document.querySelector('script[data-bloglist-schema]')
    if (existingBlog) existingBlog.remove()

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-bloglist-schema', 'true')

    // Unique posts by slug (deduplicate)
    const seen = new Set<string>()
    const uniquePosts = posts.filter((p) => {
      if (seen.has(p.slug)) return false
      seen.add(p.slug)
      return true
    })

    const schema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Blog',
          '@id': `${baseUrl}/blog`,
          name: 'Nudge Blog',
          description: 'Tips, strategies, and insights for calmer, more organized households.',
          url: `${baseUrl}/blog`,
          publisher: {
            '@type': 'Organization',
            name: 'Nudge',
            url: baseUrl,
          },
          blogPost: uniquePosts.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            url: `${baseUrl}/blog/${post.slug}`,
            datePublished: post.date,
            author: {
              '@type': 'Person',
              name: post.author,
            },
          })),
        },
        {
          '@type': 'ItemList',
          url: `${baseUrl}/blog`,
          name: 'Nudge Blog Posts',
          description: 'All blog posts from Nudge',
          numberOfItems: uniquePosts.length,
          itemListElement: uniquePosts.map((post, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${baseUrl}/blog/${post.slug}`,
            name: post.title,
            description: post.excerpt,
          })),
        },
      ],
    }

    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      const s = document.querySelector('script[data-bloglist-schema]')
      if (s) s.remove()
    }
  }, [posts, baseUrl])

  return null
}
