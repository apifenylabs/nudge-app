export default function SearchLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 animate-pulse">
      {/* Search header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
          <div className="h-5 w-96 bg-gray-100 dark:bg-gray-800 rounded" />
        </div>
      </div>

      {/* Filters row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex gap-3 flex-wrap">
          <div className="h-10 w-32 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800" />
          <div className="h-10 w-36 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800" />
          <div className="h-10 w-28 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800" />
        </div>
      </div>

      {/* Results grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="h-40 bg-gray-200 dark:bg-gray-700" />
              <div className="p-4">
                <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded mb-1" />
                <div className="h-4 w-2/3 bg-gray-100 dark:bg-gray-800 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
