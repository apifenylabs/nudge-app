#!/usr/bin/env python3
"""Write the final closing section of the blog post."""
import os

path = '/home/captain/.openclaw/workspace/apifeny-ai/app/blog/ai-supply-chain-logistics-asia-2026/page.tsx'

part6 = r'''
        {/* Related Posts */}
        <section className="border-t border-gray-200 pt-10 mt-10">
          <div className="bg-gradient-to-r from-blue-50 via-white to-cyan-50 rounded-xl p-6 sm:p-8 text-center border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Optimize Your Supply Chain with AI</h2>
            <p className="text-gray-600 max-w-xl mx-auto mb-6">Apifeny AI ranks every tool for Asian market readiness, local language support, and regional compliance.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/tools" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5">
                Browse All 85+ AI Tools <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:border-blue-300 hover:text-blue-700 text-sm font-medium transition-all">
                Explore More Guides <BookOpen className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {categoryRelated.length > 0 && (
          <section className="border-t border-gray-200 pt-10 mt-10">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Continue Reading</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {categoryRelated.map(({ post: related, category }) => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-all flex flex-col shadow-sm">
                  {category && (
                    <span className="self-start inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border border-blue-200 text-blue-700 bg-blue-50 mb-3">
                      <Layers className="w-2.5 h-2.5" />
                      {category.title.length > 28 ? category.title.substring(0, 26) + '\u2026' : category.title}
                    </span>
                  )}
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition mb-2 line-clamp-2">{related.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-3 mb-3 flex-1">{related.excerpt}</p>
                  <div className="flex items-center gap-1 text-xs text-blue-700 group-hover:gap-2 transition-all mt-auto">
                    Read Article <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-10 pt-6 border-t border-gray-200">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-700 transition">
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>
        </div>
      </article>
    </div>
  );
}
'''

with open(path, 'a') as f:
    f.write(part6)

line_count = sum(1 for _ in open(path))
print(f"Part 6 written. File: {os.path.getsize(path)} bytes, {line_count} lines")
