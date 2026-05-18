export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 animate-pulse">
      {/* Header skeleton */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="flex items-center gap-4">
            <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-3 w-14 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </header>

      {/* Breadcrumb + title */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
        <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
        <div className="h-5 w-72 bg-gray-100 dark:bg-gray-800 rounded mb-8" />

        {/* Post cards — vertical list matching blog page structure */}
        <div className="space-y-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
              <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
              <div className="h-4 w-full bg-gray-100 dark:bg-gray-800 rounded mb-1" />
              <div className="h-4 w-5/6 bg-gray-100 dark:bg-gray-800 rounded mb-3" />
              <div className="flex gap-1.5">
                <div className="h-5 w-16 bg-gray-100 dark:bg-gray-800 rounded-full" />
                <div className="h-5 w-20 bg-gray-100 dark:bg-gray-800 rounded-full" />
              </div>
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mt-3" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
