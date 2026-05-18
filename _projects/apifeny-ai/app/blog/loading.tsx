export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-tech-900 animate-pulse">
      {/* Hero section */}
      <section className="relative overflow-hidden border-b border-tech-500/20">
        <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 bg-tech-600 rounded" />
            <div className="h-4 w-24 bg-tech-600 rounded" />
          </div>
          <div className="h-10 w-3/4 bg-tech-600 rounded mb-4 max-w-3xl" />
          <div className="h-10 w-1/2 bg-tech-600 rounded mb-4 max-w-2xl" />
          <div className="h-5 w-2/3 bg-tech-700 rounded max-w-2xl" />
        </div>
      </section>

      {/* Blog posts grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-tech-800/40 border border-tech-500/20 rounded-xl overflow-hidden">
              <div className="p-6 sm:p-8">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="h-5 w-16 bg-tech-600 rounded-full" />
                  <div className="h-5 w-20 bg-tech-600 rounded-full" />
                  <div className="h-5 w-14 bg-tech-600 rounded-full" />
                </div>
                {/* Date & reading time */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-3 w-24 bg-tech-600 rounded" />
                  <div className="h-3 w-16 bg-tech-700 rounded" />
                </div>
                {/* Title */}
                <div className="h-6 w-4/5 bg-tech-600 rounded mb-3" />
                {/* Excerpt */}
                <div className="space-y-1 mb-4">
                  <div className="h-4 w-full bg-tech-700 rounded" />
                  <div className="h-4 w-full bg-tech-700 rounded" />
                  <div className="h-4 w-3/4 bg-tech-700 rounded" />
                </div>
                {/* Read more */}
                <div className="h-4 w-24 bg-tech-600 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
