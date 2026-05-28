'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, Check, ArrowRight, Smartphone, Mic, Bell, ExternalLink, RefreshCw } from 'lucide-react'

export default function StepConnectTelegram({
  onComplete,
  userId,
}: {
  onComplete: () => void
  userId?: string
}) {
  const [connected, setConnected] = useState(false)
  const [checking, setChecking] = useState(false)
  const [connectionError, setConnectionError] = useState('')

  // Poll for connection status every 3 seconds after opening bot link
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (!connected && checking) {
      interval = setInterval(async () => {
        try {
          const res = await fetch('/api/telegram/status')
          if (res.ok) {
            const data = await res.json()
            if (data.connected) {
              setConnected(true)
              setChecking(false)
            }
          }
        } catch {
          // Network error — wait and retry
        }
      }, 3000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [connected, checking])

  const handleOpenBot = () => {
    setChecking(true)
    setConnectionError('')
    window.open('https://t.me/NudgeFamilyBot?start=connect', '_blank')
  }

  const handleStopChecking = () => {
    setChecking(false)
  }

  const benefits = [
    { icon: Mic, text: 'Send tasks via voice or text messages' },
    { icon: Bell, text: 'Get reminders and notifications on the go' },
    { icon: Smartphone, text: 'Track completions from anywhere' },
  ]

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-xl font-bold text-foreground mb-1">Connect Telegram</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Manage tasks from anywhere. Send a message to the bot.
      </p>

      {/* Bot card */}
      <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-2xl border border-blue-100/50 dark:border-blue-900/30 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-foreground">@NudgeFamilyBot</p>
          <p className="text-xs text-muted-foreground truncate">Available on Telegram</p>
        </div>
        {connected ? (
          <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <Check className="w-3.5 h-3.5" />
            Connected
          </div>
        ) : null}
      </div>

      {/* Connection status */}
      {checking && (
        <div className="flex items-center gap-2 p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-100/50 dark:border-indigo-900/30 mb-6 animate-fade-in">
          <RefreshCw className="w-4 h-4 text-indigo-500 animate-spin shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-indigo-700 dark:text-indigo-300">
              Waiting for connection...
            </p>
            <p className="text-2xs text-indigo-600/70 dark:text-indigo-400/70">
              Send a message to @NudgeFamilyBot to verify
            </p>
          </div>
          <button
            onClick={handleStopChecking}
            className="text-2xs text-indigo-500 hover:text-indigo-600 underline"
          >
            Cancel
          </button>
        </div>
      )}

      {connectionError && (
        <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800/50 mb-6 animate-fade-in">
          <span className="text-sm">⚠</span>
          <span className="text-xs text-red-600 dark:text-red-400">{connectionError}</span>
        </div>
      )}

      {/* QR code representation (text-based for simplicity) */}
      <div className="flex justify-center mb-6">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-2xl border border-border/50 shadow-sm">
          <div className="w-36 h-36 bg-gradient-to-br from-blue-500/10 to-blue-400/5 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-blue-200 dark:border-blue-800/50">
            <MessageSquare className="w-10 h-10 text-blue-500 mb-2" />
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 text-center leading-tight px-2">
              Scan with<br />Telegram camera
            </span>
            <div className="mt-2 flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-3 mb-6">
        {benefits.map((benefit, i) => {
          const Icon = benefit.icon
          return (
            <div key={i} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl animate-fade-in-up stagger-{i+1}">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-sm text-foreground">{benefit.text}</span>
            </div>
          )
        })}
      </div>

      {/* Quick connect hint */}
      <div className="p-4 bg-secondary rounded-xl mb-6">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">Pro tip:</span> After connecting, just send
          &ldquo;Remind Jake to take out trash at 8pm&rdquo; to the bot. Nudge handles everything.
        </p>
      </div>

      <div className="space-y-3">
        {connected ? (
          <button
            onClick={onComplete}
            className="btn-success w-full flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            Connected! Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <>
            <button
              onClick={handleOpenBot}
              disabled={checking}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {checking ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Waiting for Telegram...
                </>
              ) : (
                <>
                  <ExternalLink className="w-4 h-4" />
                  Open Telegram Bot
                </>
              )}
            </button>

            <button
              onClick={onComplete}
              className="btn-ghost w-full text-sm text-muted-foreground"
              disabled={checking}
            >
              Skip, I&rsquo;ll do it later
            </button>
          </>
        )}
      </div>
    </div>
  )
}
