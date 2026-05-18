export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Search header */}
      <div className="bg-gradient-to-b from-orange-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="h-7 w-64 bg-gray-200 rounded mb-2" />
          <div className="h-5 w-96 bg-gray-100 rounded" />
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-3 flex-wrap">
          <div className="h-10 w-32 bg-white rounded-xl border border-gray-200" />
          <div className="h-10 w-36 bg-white rounded-xl border border-gray-200" />
          <div className="h-10 w-40 bg-white rounded-xl border border-gray-200" />
          <div className="h-10 w-28 bg-white rounded-xl border border-gray-200" />
        </div>
      </div>

      {/* Results grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="h-44 bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-50" />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-5 w-20 bg-orange-100 rounded-full" />
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                </div>
                <div className="h-5 w-4/5 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-full bg-gray-100 rounded mb-1" />
                <div className="h-4 w-2/3 bg-gray-100 rounded mb-3" />
                <div className="flex gap-1.5">
                  <div className="h-4 w-8 bg-yellow-100 rounded-full" />
                  <div className="h-4 w-10 bg-green-100 rounded-full" />
                  <div className="h-4 w-12 bg-blue-100 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
