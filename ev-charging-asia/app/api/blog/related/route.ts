import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog-data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { terms = [], limit = 3 } = body;

    if (!Array.isArray(terms) || terms.length === 0) {
      return NextResponse.json({ posts: [] });
    }

    const allPosts = getAllPosts();

    // Score each post by how many of the search terms match its tags (case-insensitive)
    const lowerTerms = terms.map(t => t.toLowerCase().trim()).filter(Boolean);
    const lowerTermSet = new Set(lowerTerms);

    const scored = allPosts
      .map(post => {
        const postLowerTags = (post.tags || []).map(t => t.toLowerCase().trim());
        let score = postLowerTags.filter(t => lowerTermSet.has(t)).length;

        // Bonus: title match
        const titleLower = (post.title || '').toLowerCase();
        score += lowerTerms.filter(t => titleLower.includes(t)).length * 2;

        // Bonus: excerpt match
        const excerptLower = (post.excerpt || '').toLowerCase();
        score += lowerTerms.filter(t => excerptLower.includes(t)).length;

        return { post, score };
      })
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    const posts = scored.map(s => ({
      slug: s.post.slug,
      title: s.post.title,
      date: s.post.date,
      tags: (s.post.tags || []).slice(0, 3),
    }));

    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ posts: [] });
  }
}
