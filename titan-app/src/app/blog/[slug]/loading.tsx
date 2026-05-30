export default function BlogDetailLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-950 via-purple-950 to-slate-950">
      {/* Back button skeleton */}
      <div className="mx-auto max-w-4xl px-4 pt-8">
        <div className="h-4 w-32 animate-pulse rounded bg-violet-800/30" />
      </div>

      {/* Hero skeleton */}
      <section className="relative overflow-hidden border-b border-violet-200/20 pb-12 pt-8">
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex gap-3">
            <div className="h-6 w-20 animate-pulse rounded-full bg-violet-800/30" />
            <div className="h-6 w-20 animate-pulse rounded-full bg-violet-800/20" />
          </div>
          <div className="mt-6 h-12 w-full animate-pulse rounded-lg bg-violet-800/30" />
          <div className="mt-3 h-12 w-3/4 animate-pulse rounded-lg bg-violet-800/20" />
          <div className="mt-6 flex gap-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-4 w-24 animate-pulse rounded bg-violet-800/20"
                style={{ animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
          <div className="mt-6 h-5 w-full animate-pulse rounded bg-violet-800/20" />
          <div className="mt-2 h-5 w-5/6 animate-pulse rounded bg-violet-800/15" />
        </div>
      </section>

      {/* Content skeleton */}
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-8">
          {[1, 2, 3].map((section) => (
            <div key={section}>
              <div className="mb-4 h-7 w-64 animate-pulse rounded bg-violet-800/30" />
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-violet-800/20" />
                <div className="h-4 w-full animate-pulse rounded bg-violet-800/20" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-violet-800/15" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
