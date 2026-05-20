'use client'

import { useEffect } from 'react'

export default function FallbackOffline() {
  useEffect(() => {
    // If we load this page while actually online, redirect home
    if (navigator.onLine) {
      window.location.href = '/'
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-950">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="text-6xl mb-6">📴</div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          You&apos;re Offline
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">
          Nudge can&apos;t reach the server right now.
        </p>
        <p className="text-gray-500 dark:text-gray-500 mb-8">
          Don&apos;t worry — your tasks are saved and will sync when you&apos;re back online.
        </p>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <span className="text-2xl">💾</span>
              <p className="text-sm text-gray-700 dark:text-gray-300 text-left">
                Tasks created offline will be saved locally and synced when you reconnect
              </p>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-2xl">🔄</span>
              <p className="text-sm text-gray-700 dark:text-gray-300 text-left">
                Auto-syncs when your internet connection is restored
              </p>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-400 dark:text-gray-500">
          Pull down to refresh when you&apos;re back online.
        </p>
      </div>
    </div>
  )
}
