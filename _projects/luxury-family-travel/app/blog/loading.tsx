export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-cream-light dark:bg-navy-dark animate-pulse">
      {/* Header */}
      <header className="bg-white/70 dark:bg-navy/70 backdrop-blur-sm border-b border-cream-dark/20 dark:border-navy-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-cream-dark dark:bg-navy-light rounded" />
            <div className="h-4 w-44 bg-cream-dark dark:bg-navy-light rounded" />
          </div>
          <div className="flex items-center gap-4">
            <div className="h-3 w-20 bg-cream-dark dark:bg-navy-light rounded" />
            <div className="h-3 w-16 bg-cream-dark dark:bg-navy-light rounded" />
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="h-3 w-32 bg-cream-dark dark:bg-navy-light rounded mb-8" />
      </div>

      {/* Title section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 bg-cream-dark dark:bg-navy-light rounded" />
          <div className="h-4 w-32 bg-cream-dark dark:bg-navy-light rounded-full" />
        </div>
        <div className="h-8 w-72 bg-cream-dark dark:bg-navy-light rounded mb-3" />
        <div className="h-5 w-96 bg-cream-dark/50 dark:bg-navy-light/50 rounded" />
        <div className="h-4 w-28 bg-cream-dark/50 dark:bg-navy-light/50 rounded mt-1" />
      </div>

      {/* Featured post skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-white/70 dark:bg-navy/70 backdrop-blur-sm border border-cream-dark/20 dark:border-navy-light/20 rounded-2xl overflow-hidden shadow-lg">
          <div className="md:grid md:grid-cols-2 md:gap-0">
            <div className="h-48 md:h-full bg-cream-dark dark:bg-navy-light" />
            <div className="p-6 md:p-8">
              <div className="flex gap-4 mb-3">
                <div className="h-4 w-28 bg-cream-dark dark:bg-navy-light rounded" />
                <div className="h-4 w-20 bg-cream-dark dark:bg-navy-light rounded" />
              </div>
              <div className="h-7 w-5/6 bg-cream-dark dark:bg-navy-light rounded mb-3" />
              <div className="h-4 w-full bg-cream-dark/50 dark:bg-navy-light/50 rounded mb-1" />
              <div className="h-4 w-full bg-cream-dark/50 dark:bg-navy-light/50 rounded mb-1" />
              <div className="h-4 w-3/4 bg-cream-dark/50 dark:bg-navy-light/50 rounded mb-4" />
              <div className="flex gap-2">
                <div className="h-6 w-20 bg-cream-dark/40 dark:bg-navy-light/40 rounded-full" />
                <div className="h-6 w-24 bg-cream-dark/40 dark:bg-navy-light/40 rounded-full" />
              </div>
              <div className="h-4 w-24 bg-cream-dark dark:bg-navy-light rounded mt-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Blog card grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white/70 dark:bg-navy/70 backdrop-blur-sm border border-cream-dark/20 dark:border-navy-light/20 rounded-2xl overflow-hidden shadow-lg">
              <div className="p-6 md:p-8">
                <div className="flex gap-4 mb-3">
                  <div className="h-4 w-28 bg-cream-dark dark:bg-navy-light rounded" />
                  <div className="h-4 w-20 bg-cream-dark dark:bg-navy-light rounded" />
                </div>
                <div className="h-6 w-4/5 bg-cream-dark dark:bg-navy-light rounded mb-3" />
                <div className="h-4 w-full bg-cream-dark/50 dark:bg-navy-light/50 rounded mb-1" />
                <div className="h-4 w-full bg-cream-dark/50 dark:bg-navy-light/50 rounded mb-1" />
                <div className="h-4 w-2/3 bg-cream-dark/50 dark:bg-navy-light/50 rounded mb-4" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-cream-dark/40 dark:bg-navy-light/40 rounded-full" />
                  <div className="h-6 w-20 bg-cream-dark/40 dark:bg-navy-light/40 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
