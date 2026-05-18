export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded" />
            <div className="h-4 w-36 bg-gray-200 rounded" />
          </div>
          <div className="flex items-center gap-4">
            <div className="h-3 w-16 bg-gray-200 rounded" />
            <div className="h-3 w-14 bg-gray-200 rounded" />
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="h-3 w-24 bg-gray-200 rounded" />
      </div>

      {/* Featured post */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/5 h-56 md:h-auto bg-gradient-to-br from-orange-100 via-yellow-50 to-orange-50" />
            <div className="md:w-3/5 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-5 w-20 bg-orange-100 rounded-full" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </div>
              <div className="h-7 w-4/5 bg-gray-200 rounded mb-3" />
              <div className="h-4 w-full bg-gray-100 rounded mb-1" />
              <div className="h-4 w-full bg-gray-100 rounded mb-1" />
              <div className="h-4 w-3/4 bg-gray-100 rounded mb-4" />
              <div className="flex gap-2">
                <div className="h-5 w-20 bg-orange-100 rounded-full" />
                <div className="h-5 w-16 bg-gray-200 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post card grid */}
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
                  <div className="h-5 w-16 bg-purple-100 rounded-full" />
                  <div className="h-5 w-20 bg-orange-100 rounded-full" />
                  <div className="h-5 w-14 bg-green-100 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
