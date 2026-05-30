import { BookOpen } from "lucide-react";

export default function BlogLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-950 via-purple-950 to-slate-950">
      {/* Hero skeleton */}
      <section className="relative overflow-hidden border-b border-violet-200/20 pb-20 pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.12),transparent_70%)]" />
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto h-12 w-72 animate-pulse rounded-lg bg-violet-800/30" />
          <div className="mx-auto mt-4 h-5 w-96 animate-pulse rounded-lg bg-violet-800/20" />
          <div className="mx-auto mt-8 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-9 w-24 animate-pulse rounded-full bg-violet-800/30"
                style={{ animationDelay: `${i * 80}ms` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Grid skeleton */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 h-4 w-32 animate-pulse rounded bg-violet-800/20" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-violet-500/20 bg-violet-900/20 p-6"
            >
              <div className="mb-4 h-40 animate-pulse rounded-lg bg-violet-800/30" />
              <div className="h-3 w-20 animate-pulse rounded bg-violet-800/30" />
              <div className="mt-3 h-5 w-full animate-pulse rounded bg-violet-800/30" />
              <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-violet-800/20" />
              <div className="mt-4 flex gap-3">
                <div className="h-3 w-16 animate-pulse rounded bg-violet-800/20" />
                <div className="h-3 w-16 animate-pulse rounded bg-violet-800/20" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
