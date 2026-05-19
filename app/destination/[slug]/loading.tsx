// Destination page loading skeleton — instant perceived performance
export default function DestinationLoading() {
  return (
    <div className="min-h-screen bg-gray-50 mb-16 md:mb-0 animate-pulse">
      {/* Hero skeleton */}
      <div className="h-[50vh] sm:h-[60vh] min-h-[360px] bg-gradient-to-br from-gray-300 via-gray-200 to-gray-300" />

      {/* Content skeleton */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 pb-16 md:pb-20">

        {/* Quick overview card */}
        <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg p-6 mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="h-8 w-16 bg-gray-200 rounded-lg mx-auto mb-2" />
                <div className="h-3 w-20 bg-gray-100 rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Section 1 skeleton */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-full bg-gray-200" />
            <div className="h-6 w-64 bg-gray-200 rounded" />
          </div>
          <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/5" />
            </div>
          </div>
        </div>

        {/* Age guide skeleton */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-full bg-gray-200" />
            <div className="h-6 w-48 bg-gray-200 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-200" />
                  <div className="h-4 w-28 bg-gray-200 rounded" />
                </div>
                <div className="h-2 bg-gray-200 rounded-full mb-3" />
                <div className="h-3 bg-gray-100 rounded w-full mb-1" />
                <div className="h-3 bg-gray-100 rounded w-4/5" />
              </div>
            ))}
          </div>
        </div>

        {/* Additional section skeletons */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-full bg-gray-200" />
            <div className="h-6 w-40 bg-gray-200 rounded" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-200 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
