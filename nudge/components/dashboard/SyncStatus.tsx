'use client'

import { useEffect, useState } from 'react'
import { Cloud, CloudOff, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react'
import { useOfflineQueue, getPendingCount } from '@/lib/offline-queue'

interface SyncStatusProps {
  familyId: string
  userId: string
  supabaseToken: string | (() => Promise<string | null>)
}

export default function SyncStatus({ familyId, userId, supabaseToken }: SyncStatusProps) {
  const { isOnline, pendingCount, syncing, syncNow } = useOfflineQueue({
    familyId,
    userId,
    supabaseToken,
  })

  const [lastOnlineMessage, setLastOnlineMessage] = useState<string | null>(null)

  useEffect(() => {
    if (isOnline && pendingCount === 0 && !syncing) {
      setLastOnlineMessage('All synced')
    } else if (!isOnline) {
      setLastOnlineMessage(pendingCount > 0 ? 'Offline — changes pending' : 'Offline')
    }
  }, [isOnline, pendingCount, syncing])

  if (isOnline && pendingCount === 0 && !syncing) {
    // All good — show minimal indicator and auto-hide after showing briefly
    return (
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 animate-in fade-in duration-300">
        <CheckCircle2 className="w-3 h-3" />
        <span className="text-2xs font-medium">Synced</span>
      </div>
    )
  }

  if (syncing) {
    return (
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 animate-in fade-in">
        <RefreshCw className="w-3 h-3 animate-spin" />
        <span className="text-2xs font-medium">Syncing...</span>
      </div>
    )
  }

  if (!isOnline && pendingCount > 0) {
    return (
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 animate-in fade-in">
        <CloudOff className="w-3 h-3" />
        <span className="text-2xs font-medium">{pendingCount} pending</span>
      </div>
    )
  }

  if (!isOnline) {
    return (
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-gray-500/10 text-gray-500 dark:text-gray-400">
        <CloudOff className="w-3 h-3" />
        <span className="text-2xs font-medium">Offline</span>
      </div>
    )
  }

  return null
}
