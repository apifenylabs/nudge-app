'use client'

import { useState, useEffect, useCallback } from 'react'
import { Wifi, WifiOff, EyeOff } from 'lucide-react'

const DISMISS_KEY = 'nudge_offline_banner_dismissed'

/**
 * OfflineBanner — permanently-fixed top banner that shows connection status.
 *
 * Features:
 * - Shows "You're offline" banner when connection drops
 * - Slides back in when connection restores
 * - Dismissable for current session
 * - Respects PWA standalone mode (less obtrusive styling)
 */
export default function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  )
  const [wasEverOffline, setWasEverOffline] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [isPWA, setIsPWA] = useState(false)
  const [justCameOnline, setJustCameOnline] = useState(false)

  useEffect(() => {
    setIsPWA(window.matchMedia('(display-mode: standalone)').matches)

    const dismissedVal = localStorage.getItem(DISMISS_KEY)
    if (dismissedVal === 'true') {
      setDismissed(true)
    }

    if (!navigator.onLine) {
      setWasEverOffline(true)
    }

    const goOffline = () => {
      setIsOnline(false)
      setWasEverOffline(true)
      setJustCameOnline(false)
    }

    const goOnline = () => {
      setIsOnline(true)
      setJustCameOnline(true)
      // Clear the "just came online" state after 3 seconds
      setTimeout(() => setJustCameOnline(false), 3000)
    }

    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)

    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  const handleDismiss = useCallback(() => {
    setDismissed(true)
    // Don't persist permanent dismiss — only session
  }, [])

  const handleDismissPermanently = useCallback(() => {
    setDismissed(true)
    localStorage.setItem(DISMISS_KEY, 'true')
  }, [])

  if (dismissed) return null
  if (!wasEverOffline) return null

  // Coming back online — show brief "Back online" then auto-hide
  if (justCameOnline) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[60] animate-slide-down">
        <div className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 text-white text-xs font-medium shadow-lg">
          <Wifi className="w-3.5 h-3.5" />
          <span>Back online</span>
        </div>
      </div>
    )
  }

  if (isOnline) return null

  return (
    <div className={`fixed top-0 left-0 right-0 z-[60] animate-slide-down ${isPWA ? 'pt-safe-top' : ''}`}>
      <div className="flex items-center justify-between px-4 py-2.5 bg-amber-500 text-white shadow-lg">
        <div className="flex items-center gap-2 text-xs font-medium">
          <WifiOff className="w-3.5 h-3.5 shrink-0" />
          <span>You&apos;re offline — changes will sync when connected</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDismiss}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <EyeOff className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
