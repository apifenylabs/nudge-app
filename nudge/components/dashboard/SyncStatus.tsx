'use client'

import { useEffect, useState, useCallback } from 'react'
import {
  Cloud, CloudOff, RefreshCw, CheckCircle2, Wifi, WifiOff,
  HardDrive, Mic
} from 'lucide-react'
import { useOfflineQueue, getPendingCount } from '@/lib/offline-queue'
import { getPendingRecordingCount } from '@/lib/voice-indexeddb'

interface SyncStatusProps {
  familyId: string
  userId: string
  supabaseToken: string | (() => Promise<string | null>)
}

type SyncState =
  | 'synced'      // All good
  | 'syncing'     // Actively syncing
  | 'pending'     // Has pending task operations
  | 'pending-voice' // Has pending voice recordings
  | 'offline'     // No connection
  | 'offline-pending' // Offline + pending operations

/**
 * Enhanced SyncStatus — shows sync state for both task operations
 * AND offline voice recordings.
 *
 * Integrates with the existing offline queue AND the new voice IndexedDB storage.
 */
export default function SyncStatus({ familyId, userId, supabaseToken }: SyncStatusProps) {
  const { isOnline, pendingCount, syncing, syncNow } = useOfflineQueue({
    familyId,
    userId,
    supabaseToken,
  })

  const [voicePending, setVoicePending] = useState(0)
  const [syncState, setSyncState] = useState<SyncState>('synced')

  // Poll voice pending count
  useEffect(() => {
    const updateVoicePending = async () => {
      try {
        const count = await getPendingRecordingCount()
        setVoicePending(count)
      } catch {
        setVoicePending(0)
      }
    }

    updateVoicePending()
    const interval = setInterval(updateVoicePending, 5000)
    return () => clearInterval(interval)
  }, [])

  // Derive state
  useEffect(() => {
    if (syncing) {
      setSyncState('syncing')
    } else if (!isOnline && (pendingCount > 0 || voicePending > 0)) {
      setSyncState('offline-pending')
    } else if (!isOnline) {
      setSyncState('offline')
    } else if (pendingCount > 0 || voicePending > 0) {
      setSyncState(voicePending > 0 ? 'pending-voice' : 'pending')
    } else {
      setSyncState('synced')
    }
  }, [isOnline, pendingCount, voicePending, syncing])

  const getConfig = () => {
    switch (syncState) {
      case 'synced':
        return {
          bg: 'bg-emerald-500/10',
          text: 'text-emerald-600 dark:text-emerald-400',
          icon: CheckCircle2,
          label: 'Synced',
          show: true,
          expiresAfter: 3000,
        }
      case 'syncing':
        return {
          bg: 'bg-blue-500/10',
          text: 'text-blue-600 dark:text-blue-400',
          icon: RefreshCw,
          label: 'Syncing...',
          show: true,
        }
      case 'pending':
        return {
          bg: 'bg-amber-500/10',
          text: 'text-amber-600 dark:text-amber-400',
          icon: HardDrive,
          label: `${pendingCount} pending`,
          show: true,
        }
      case 'pending-voice':
        return {
          bg: 'bg-indigo-500/10',
          text: 'text-indigo-600 dark:text-indigo-400',
          icon: Mic,
          label: `${pendingCount + voicePending} pending`,
          secondary: `${voicePending} voice`,
          show: true,
        }
      case 'offline':
        return {
          bg: 'bg-gray-500/10',
          text: 'text-gray-500 dark:text-gray-400',
          icon: WifiOff,
          label: 'Offline',
          show: true,
        }
      case 'offline-pending':
        return {
          bg: 'bg-red-500/10',
          text: 'text-red-600 dark:text-red-400',
          icon: CloudOff,
          label: `${pendingCount + voicePending} pending`,
          secondary: 'Offline',
          show: true,
        }
    }
  }

  const config = getConfig()

  if (!config.show) return null

  const Icon = config.icon

  // Brief "synced" flash then auto-hide
  const [showSynced, setShowSynced] = useState(true)
  useEffect(() => {
    if (syncState === 'synced') {
      setShowSynced(true)
      const t = setTimeout(() => setShowSynced(false), 2000)
      return () => clearTimeout(t)
    } else {
      setShowSynced(true)
    }
  }, [syncState])

  if (syncState === 'synced' && !showSynced) return null

  return (
    <div
      className={`flex items-center gap-1.5 px-2 py-1 rounded-lg ${config.bg} ${config.text} animate-in fade-in duration-300 ${
        syncState === 'synced' ? 'animate-out fade-out duration-500 delay-1000' : ''
      }`}
    >
      <Icon className={`w-3 h-3 ${syncState === 'syncing' ? 'animate-spin' : ''}`} />
      <span className="text-2xs font-medium">{config.label}</span>
      {'secondary' in config && config.secondary && (
        <span className="text-2xs opacity-60">({config.secondary})</span>
      )}
    </div>
  )
}
