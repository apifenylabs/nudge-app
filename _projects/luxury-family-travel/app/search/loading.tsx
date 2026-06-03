export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-cream-light dark:bg-navy-dark animate-pulse">
      {/* Search header */}
      <div className="bg-white/70 dark:bg-navy/70 backdrop-blur-sm border-b border-cream-dark/20 dark:border-navy-light/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="h-7 w-64 bg-cream-dark dark:bg-navy-light rounded mb-2" />
          <div className="h-5 w-80 bg-cream-dark/50 dark:bg-navy-light/50 rounded" />
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-3 flex-wrap">
          <div className="h-10 w-36 bg-white/70 dark:bg-navy/70 rounded-xl border border-cream-dark/20 dark:border-navy-light/20" />
          <div className="h-10 w-40 bg-white/70 dark:bg-navy/70 rounded-xl border border-cream-dark/20 dark:border-navy-light/20" />
          <div className="h-10 w-32 bg-white/70 dark:bg-navy/70 rounded-xl border border-cream-dark/20 dark:border-navy-light/20" />
          <div className="h-10 w-28 bg-white/70 dark:bg-navy/70 rounded-xl border border-cream-dark/20 dark:border-navy-light/20" />
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white/70 dark:bg-navy/70 backdrop-blur-sm rounded-2xl border border-cream-dark/20 dark:border-navy-light/20 overflow-hidden shadow-lg">
              <div className="h-44 bg-cream-dark dark:bg-navy-light" />
              <div className="p-6">
                <div className="h-5 w-3/4 bg-cream-dark dark:bg-navy-light rounded mb-2" />
                <div className="h-4 w-full bg-cream-dark/50 dark:bg-navy-light/50 rounded mb-1" />
                <div className="h-4 w-2/3 bg-cream-dark/50 dark:bg-navy-light/50 rounded mb-3" />
                <div className="flex gap-2">
                  <div className="h-5 w-16 bg-cream-dark/40 dark:bg-navy-light/40 rounded-full" />
                  <div className="h-5 w-20 bg-cream-dark/40 dark:bg-navy-light/40 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
