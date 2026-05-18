export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded" />
            <div className="h-4 w-44 bg-gray-200 rounded" />
          </div>
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>
      </header>

      {/* Blog title */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-10">
          <div className="h-4 w-16 bg-teal-100 rounded-full mb-4" />
          <div className="h-8 w-72 bg-gray-200 rounded mb-3" />
          <div className="h-5 w-96 bg-gray-100 rounded" />
        </div>

        {/* Post cards */}
        <div className="space-y-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-3 w-24 bg-gray-200 rounded" />
                <div className="h-3 w-20 bg-gray-200 rounded" />
              </div>
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-full bg-gray-100 rounded mb-1" />
              <div className="h-4 w-5/6 bg-gray-100 rounded mb-3" />
              <div className="flex gap-1.5">
                <div className="h-5 w-20 bg-teal-50 rounded-full" />
                <div className="h-5 w-16 bg-gray-100 rounded-full" />
                <div className="h-5 w-24 bg-gray-100 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
