'use client'

import { AlertCircle, RefreshCw } from 'lucide-react'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export default function ErrorState({
  title = 'Something went wrong',
  message = 'We couldn\'t load this data. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
        <AlertCircle className="w-6 h-6 text-red-500" />
      </div>
      <p className="text-base font-semibold text-foreground mb-1">{title}</p>
      <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Try Again
        </button>
      )}
    </div>
  )
}
