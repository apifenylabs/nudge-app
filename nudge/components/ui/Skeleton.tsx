export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-shimmer rounded-xl bg-gradient-to-r from-secondary via-secondary/50 to-secondary bg-[length:400%_100%] ${className}`}
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="p-4 rounded-xl border border-border/40 bg-white dark:bg-gray-900 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="w-5 h-5 rounded-full" />
        <Skeleton className="h-4 flex-1" />
      </div>
      <div className="flex items-center gap-2 ml-8">
        <Skeleton className="w-4 h-4 rounded-full" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="p-4 space-y-4">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
        <Skeleton className="w-9 h-9 rounded-xl" />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-border/40 space-y-2">
            <Skeleton className="w-7 h-7 rounded-lg" />
            <Skeleton className="h-5 w-10" />
            <Skeleton className="h-2.5 w-14" />
          </div>
        ))}
      </div>

      {/* Quick-add skeleton */}
      <Skeleton className="h-12 w-full rounded-xl" />

      {/* Task cards skeleton */}
      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-3 px-4 py-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-border/40 flex flex-col items-center gap-2">
          <Skeleton className="w-7 h-7 rounded-lg" />
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-2.5 w-16" />
        </div>
      ))}
    </div>
  )
}
