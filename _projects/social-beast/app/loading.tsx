export default function Loading() {
  return (
    <div className="min-h-screen bg-cream dark:bg-dark-surface animate-pulse">
      {/* App shell — sidebar + top bar */}
      <div className="flex h-screen">
        {/* Sidebar skeleton */}
        <div className="hidden md:flex w-64 bg-surface dark:bg-dark-surface-2 border-r border-border dark:border-dark-border flex-col">
          <div className="p-6 border-b border-border dark:border-dark-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg" />
              <div className="h-5 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
          <div className="p-4 space-y-3 flex-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2.5">
                <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
          <div className="h-16 bg-surface dark:bg-dark-surface-2 border-b border-border dark:border-dark-border flex items-center px-6 justify-between">
            <div className="flex items-center gap-3">
              <div className="md:hidden w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full" />
            </div>
          </div>

          {/* Dashboard content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-surface dark:bg-dark-surface-2 rounded-xl border border-border dark:border-dark-border p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                  </div>
                  <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                  <div className="h-3 w-24 bg-gray-100 dark:bg-gray-800 rounded" />
                </div>
              ))}
            </div>

            {/* Recent posts */}
            <div className="bg-surface dark:bg-dark-surface-2 rounded-xl border border-border dark:border-dark-border p-6">
              <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
                      <div className="h-3 w-1/2 bg-gray-100 dark:bg-gray-800 rounded" />
                    </div>
                    <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
