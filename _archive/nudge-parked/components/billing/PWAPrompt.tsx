'use client'

import { useEffect, useState } from 'react'
import { X, Smartphone, Download, Share2, ExternalLink, Check, ChevronDown } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function PWAPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [installed, setInstalled] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const DISMISSED_KEY = 'nudge_pwa_prompt_dismissed'
  const DISMISS_DURATION_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

  // Check if previously dismissed (within cooldown)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(DISMISSED_KEY)
      if (stored) {
        const dismissedAt = parseInt(stored, 10)
        if (Date.now() - dismissedAt < DISMISS_DURATION_MS) {
          setDismissed(true)
        }
      }
    } catch {}
  }, [])

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true)
      return
    }

    // Check if iOS (needs manual install)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    if (isIOS && !(window.matchMedia('(display-mode: standalone)').matches)) {
      // Show iOS instructions after a delay
      const timer = setTimeout(() => setShowPrompt(true), 5000)
      return () => clearTimeout(timer)
    }

    // Android / Chrome — capture install prompt
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Show prompt after delay
      setTimeout(() => setShowPrompt(true), 5000)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Listen for successful installation
    window.addEventListener('appinstalled', () => {
      setInstalled(true)
      setShowPrompt(false)
      setDeferredPrompt(null)
    })

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    if (choice.outcome === 'accepted') {
      setInstalled(true)
      setShowPrompt(false)
    } else {
      // Dismissed — persist for cooldown
      try {
        localStorage.setItem(DISMISSED_KEY, Date.now().toString())
      } catch {}
    }
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    try {
      localStorage.setItem(DISMISSED_KEY, Date.now().toString())
    } catch {}
    setDismissed(true)
    setShowPrompt(false)
  }

  if (installed || dismissed || !showPrompt) return null

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-fade-in-up md:bottom-auto md:top-24 md:right-4 md:left-auto md:w-80">
      <div className="glass-card-premium rounded-2xl p-4 shadow-elevated border border-border/60">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">Install Nudge</p>
              <p className="text-2xs text-muted-foreground">Add to home screen</p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Install button for Android/Chrome */}
        {deferredPrompt && (
          <button
            onClick={handleInstall}
            className="w-full btn-primary text-sm flex items-center justify-center gap-2 mb-2"
          >
            <Download className="w-4 h-4" /> Install App
          </button>
        )}

        {/* iOS instructions */}
        {isIOS && (
          <div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-secondary/60 text-sm text-foreground font-medium"
            >
              <span className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-primary" />
                How to install on iOS
              </span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>

            {expanded && (
              <ol className="mt-3 space-y-2 px-1">
                {[
                  'Tap the Share button in Safari',
                  'Scroll down & tap "Add to Home Screen"',
                  'Tap "Add" in the top-right corner',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}

        {/* Quick benefits */}
        <div className="mt-3 flex items-center justify-center gap-3 text-2xs text-muted-foreground">
          <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> Faster</span>
          <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> Offline</span>
          <span className="flex items-center gap-1"><Check className="w-3 h-3 text-emerald-500" /> Voice ready</span>
        </div>
      </div>
    </div>
  )
}
