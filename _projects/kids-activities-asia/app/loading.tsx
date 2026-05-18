export default function Loading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Hero */}
      <div className="bg-gradient-to-b from-orange-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="h-4 w-40 bg-orange-100 rounded-full mb-6" />
          <div className="h-10 w-3/4 bg-gray-200 rounded mb-4 max-w-3xl" />
          <div className="h-5 w-2/3 bg-gray-100 rounded mb-8 max-w-2xl" />
          <div className="flex gap-3 flex-wrap">
            <div className="h-12 w-40 bg-gray-200 rounded-xl" />
            <div className="h-12 w-40 bg-gray-200 rounded-xl" />
            <div className="h-12 w-40 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Section heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-6 w-48 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-80 bg-gray-100 rounded" />
      </div>

      {/* Card grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-44 bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-50" />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-5 w-20 bg-orange-100 rounded-full" />
                  <div className="h-3 w-16 bg-gray-200 rounded" />
                </div>
                <div className="h-5 w-4/5 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-full bg-gray-100 rounded mb-1" />
                <div className="h-4 w-2/3 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
