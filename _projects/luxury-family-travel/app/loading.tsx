export default function Loading() {
  return (
    <div className="min-h-screen bg-cream-light dark:bg-navy-dark animate-pulse">
      {/* Hero skeleton — luxury style */}
      <div className="relative bg-gradient-to-b from-warm-white to-cream dark:from-navy-dark dark:to-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="h-4 w-32 bg-cream-dark dark:bg-navy-light rounded-full mb-6" />
          <div className="h-10 w-3/4 bg-cream-dark dark:bg-navy-light rounded mb-4 max-w-2xl" />
          <div className="h-5 w-1/2 bg-cream-dark/60 dark:bg-navy-light/60 rounded mb-8 max-w-xl" />
          <div className="h-12 w-40 bg-cream-dark dark:bg-navy-light rounded-xl" />
        </div>
      </div>

      {/* Feature cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/70 dark:bg-navy/70 backdrop-blur-sm rounded-2xl border border-cream-dark/30 dark:border-navy-light/30 p-6 shadow-lg">
              <div className="w-12 h-12 bg-cream-dark dark:bg-navy-light rounded-xl mb-4" />
              <div className="h-5 w-2/3 bg-cream-dark dark:bg-navy-light rounded mb-2" />
              <div className="h-4 w-full bg-cream-dark/50 dark:bg-navy-light/50 rounded mb-1" />
              <div className="h-4 w-4/5 bg-cream-dark/50 dark:bg-navy-light/50 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Section heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="h-7 w-48 bg-cream-dark dark:bg-navy-light rounded mb-2" />
        <div className="h-4 w-80 bg-cream-dark/50 dark:bg-navy-light/50 rounded" />
      </div>

      {/* Grid cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white/70 dark:bg-navy/70 backdrop-blur-sm rounded-2xl border border-cream-dark/30 dark:border-navy-light/30 overflow-hidden shadow-lg">
              <div className="h-44 bg-cream-dark dark:bg-navy-light" />
              <div className="p-6">
                <div className="flex gap-3 mb-3">
                  <div className="h-4 w-24 bg-cream-dark dark:bg-navy-light rounded" />
                  <div className="h-4 w-20 bg-cream-dark dark:bg-navy-light rounded" />
                </div>
                <div className="h-5 w-3/4 bg-cream-dark dark:bg-navy-light rounded mb-2" />
                <div className="h-4 w-full bg-cream-dark/50 dark:bg-navy-light/50 rounded mb-1" />
                <div className="h-4 w-2/3 bg-cream-dark/50 dark:bg-navy-light/50 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
