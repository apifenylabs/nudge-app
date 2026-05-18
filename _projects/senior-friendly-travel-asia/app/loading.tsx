export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-20 sm:py-24">
          <div className="h-4 w-32 bg-gray-200 rounded-full mb-6" />
          <div className="h-10 w-3/4 bg-gray-200 rounded mb-4 max-w-2xl" />
          <div className="h-5 w-2/3 bg-gray-100 rounded mb-8 max-w-xl" />
          <div className="flex gap-3">
            <div className="h-12 w-36 bg-gray-200 rounded-xl" />
            <div className="h-12 w-36 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Section title */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="h-6 w-48 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-72 bg-gray-100 rounded" />
      </div>

      {/* Card grid */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="h-40 bg-gray-200" />
              <div className="p-4">
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-full bg-gray-100 rounded mb-1" />
                <div className="h-4 w-2/3 bg-gray-100 rounded mb-3" />
                <div className="flex gap-1.5">
                  <div className="h-5 w-20 bg-teal-50 rounded-full" />
                  <div className="h-5 w-16 bg-gray-50 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
