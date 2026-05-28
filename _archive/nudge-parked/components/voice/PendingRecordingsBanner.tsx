'use client'

import { useState, useEffect, useCallback } from 'react'
import { WifiOff, RefreshCw, CheckCircle, HardDrive, Mic } from 'lucide-react'
import { getPendingRecordingCount, syncPendingRecordings } from '@/lib/voice-indexeddb'

interface PendingRecordingsBannerProps {
  /** Fallback if we can't get the actual count */
  userId: string
  getAuthToken: () => Promise<string | null>
}

/**
 * Offline Recording Banner
 *
 * Shows when the user has saved voice recordings while offline that are
 * pending transcription. Displays a count and a "sync now" button.
 */
export default function PendingRecordingsBanner({ userId, getAuthToken }: PendingRecordingsBannerProps) {
  const [pendingCount, setPendingCount] = useState(0)
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncResult, setSyncResult] = useState<{ transcribed: number; failed: number } | null>(null)
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true)

  useEffect(() => {
    const count = async () => {
      try {
        const { getPendingRecordingCount } = await import('@/lib/voice-indexeddb')
        const c = await getPendingRecordingCount()
        setPendingCount(c)
      } catch {
        setPendingCount(0)
      }
    }
    count()

    const interval = setInterval(count, 10000)
    const goOnline = () => {
      setIsOnline(true)
      count()
    }
    const goOffline = () => {
      setIsOnline(false)
      count()
    }

    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)

    return () => {
      clearInterval(interval)
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  const handleSyncNow = useCallback(async () => {
    if (isSyncing || !isOnline) return
    setIsSyncing(true)
    setSyncResult(null)

    try {
      const result = await syncPendingRecordings(getAuthToken)
      setSyncResult(result)
      setPendingCount(0)
    } catch (err) {
      console.error('[PendingRecordingsBanner] Sync error:', err)
    } finally {
      setIsSyncing(false)
    }
  }, [isSyncing, isOnline, getAuthToken])

  if (pendingCount === 0 && !syncResult) return null

  return (
    <div className="mx-4 mb-3 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className={`rounded-xl p-3 border ${
        syncResult
          ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
          : isOnline
            ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
            : 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      }`}>
        <div className="flex items-center gap-2">
          {syncResult ? (
            <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
          ) : !isOnline ? (
            <WifiOff className="w-4 h-4 text-muted-foreground shrink-0" />
          ) : (
            <HardDrive className="w-4 h-4 text-amber-500 shrink-0" />
          )}
          <div className="flex-1 text-xs">
            {syncResult ? (
              <span className="text-emerald-700 dark:text-emerald-300 font-medium">
                Transcribed {syncResult.transcribed} recording{syncResult.transcribed !== 1 ? 's' : ''}
                {syncResult.failed > 0 && ` (${syncResult.failed} failed)`}
              </span>
            ) : !isOnline ? (
              <span className="text-muted-foreground">
                <strong className="text-foreground">{pendingCount}</strong> recording{pendingCount !== 1 ? 's' : ''} saved offline
                — will transcribe when connected
              </span>
            ) : (
              <span className="text-amber-700 dark:text-amber-300 font-medium">
                <Mic className="w-3 h-3 inline mr-1" />
                <strong>{pendingCount}</strong> voice recording{pendingCount !== 1 ? 's' : ''} ready to transcribe
              </span>
            )}
          </div>
          {isOnline && pendingCount > 0 && !syncResult && (
            <button
              onClick={handleSyncNow}
              disabled={isSyncing}
              className="text-xs font-semibold flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-700 transition-colors disabled:opacity-50"
            >
              {isSyncing ? (
                <RefreshCw className="w-3 h-3 animate-spin" />
              ) : (
                <RefreshCw className="w-3 h-3" />
              )}
              Transcribe
            </button>
          )}
          {syncResult && (
            <button
              onClick={() => setSyncResult(null)}
              className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              Dismiss
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
