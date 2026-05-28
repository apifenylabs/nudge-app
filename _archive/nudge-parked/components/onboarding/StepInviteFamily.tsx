'use client'

import { useState, useCallback, useRef } from 'react'
import { Mail, Check, ArrowRight, Send, Users, Link2, Share2, Smartphone, X } from 'lucide-react'

export default function StepInviteFamily({
  inviteLink,
  onSkip,
  onSendInvite,
}: {
  inviteLink?: string
  onSkip: () => void
  onSendInvite: (email: string) => Promise<void>
}) {
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [shareError, setShareError] = useState('')
  const emailRef = useRef<HTMLInputElement>(null)
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const supportsNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  const handleSend = async () => {
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email (e.g. partner@example.com)')
      return
    }
    setSending(true)
    setError('')
    try {
      await onSendInvite(email.trim())
      setSent((prev) => [...prev, email.trim()])
      setEmail('')
      // Auto-focus back to email input after success
      setTimeout(() => emailRef.current?.focus(), 300)
    } catch (err: any) {
      setError(err.message || 'Failed to send invite. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const handleCopyLink = useCallback(async () => {
    if (inviteLink) {
      try {
        if (navigator.share && typeof navigator.canShare === 'function' && navigator.canShare()) {
          await navigator.share({
            title: 'Join our family on Nudge',
            text: `We're using Nudge to keep our family organized! 🎯 Join us:\n${inviteLink}`,
            url: inviteLink,
          })
        } else {
          await navigator.clipboard.writeText(inviteLink)
          setCopied(true)
          setTimeout(() => setCopied(false), 2500)
        }
      } catch (err: any) {
        // User cancelled native share — not a real error
        if (err.name !== 'AbortError') {
          setShareError(err.message || 'Could not copy link')
        }
      }
    }
  }, [inviteLink])

  const handleSMSInvite = () => {
    if (inviteLink) {
      const text = encodeURIComponent(
        `Join our family on Nudge! We're using it to stay organized. 🏠\n\n${inviteLink}`
      )
      window.open(`sms:?&body=${text}`, '_blank')
    }
  }

  const getInviteMessage = (platform: string): string => {
    const messages: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(
        `Join our family on Nudge! We're using it to stay organized. 🏠\n\n${inviteLink}`
      )}`,
      telegram: `tg://msg_url?url=${encodeURIComponent(inviteLink || '')}&text=${encodeURIComponent(
        `Join our family on Nudge! We're using it to stay organized. 🏠`
      )}`,
    }
    return messages[platform] || ''
  }

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-xl font-bold text-foreground mb-1">Invite Your Family</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Task management works best when everyone&apos;s in the loop.
      </p>

      {/* Stats preview */}
      <div className="flex items-center gap-2 p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-100/50 dark:border-indigo-900/30 mb-6">
        <Users className="w-5 h-5 text-indigo-500 shrink-0" />
        <p className="text-xs text-indigo-700 dark:text-indigo-300">
          Families with 3+ members complete 78% more tasks. Invite your team!
        </p>
      </div>

      {/* Email invite */}
      <div className="mb-4">
        <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider flex items-center justify-between">
          <span>Invite by email</span>
          {sent.length > 0 && (
            <span className="text-2xs text-emerald-500 font-normal normal-case">
              {sent.length} invite{sent.length !== 1 ? 's' : ''} sent
            </span>
          )}
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field pl-10"
              placeholder="partner@email.com"
              autoComplete="email"
              enterKeyHint="send"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSend()
                }
              }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={sending || !email.trim()}
            className="btn-primary px-4 flex items-center justify-center gap-1.5"
            title="Send invite"
          >
            {sending ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        {error && (
          <p className="text-xs text-red-500 mt-1 animate-fade-in flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}

        {/* Sent invites list */}
        {sent.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {sent.map((addr) => (
              <div
                key={addr}
                className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-lg animate-fade-in"
              >
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{addr}</span>
              </div>
            ))}
            <p className="text-2xs text-muted-foreground mt-1">
              They&apos;ll receive an email with the invite link
            </p>
          </div>
        )}
      </div>

      {/* Invite link section */}
      {inviteLink && (
        <div className="mb-6">
          <div className="border-t border-border/50 pt-4">
            <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
              Or share invite link
            </label>
            <div className="flex gap-2">
              <div className="flex-1 p-3 bg-secondary rounded-xl text-xs text-muted-foreground truncate border border-border/50 flex items-center">
                <Link2 className="w-3.5 h-3.5 shrink-0 mr-1.5" />
                <span className="truncate">{inviteLink}</span>
              </div>
              <button
                onClick={handleCopyLink}
                className="btn-secondary px-3 flex items-center gap-1.5 shrink-0"
                title={supportsNativeShare ? 'Share link' : 'Copy link'}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs">Copied</span>
                  </>
                ) : supportsNativeShare ? (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span className="text-xs">Share</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-4 h-4" />
                    <span className="text-xs">Copy</span>
                  </>
                )}
              </button>
            </div>
            {shareError && (
              <p className="text-2xs text-red-500 mt-1">{shareError}</p>
            )}
          </div>
        </div>
      )}

      {/* Platform quick-share buttons */}
      {inviteLink && (
        <div className="mb-4">
          <div className="border-t border-border/50 pt-4">
            <div className="flex gap-2">
              <button
                onClick={() => window.open(getInviteMessage('whatsapp'), '_blank')}
                className="btn-ghost flex-1 text-xs flex items-center justify-center gap-1.5 border border-border/50"
              >
                <span className="text-base">💬</span>
                WhatsApp
              </button>
              <button
                onClick={() => window.open(getInviteMessage('telegram'), '_blank')}
                className="btn-ghost flex-1 text-xs flex items-center justify-center gap-1.5 border border-border/50"
              >
                <Send className="w-3.5 h-3.5" />
                Telegram
              </button>
              <button
                onClick={handleSMSInvite}
                className="btn-ghost flex-1 text-xs flex items-center justify-center gap-1.5 border border-border/50"
              >
                <Smartphone className="w-3.5 h-3.5" />
                SMS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Increased invites motivation */}
      {sent.length === 0 && (
        <p className="text-2xs text-center text-muted-foreground mb-4">
          You can always invite more people from the dashboard later
        </p>
      )}

      <div className="flex gap-3">
        <button
          onClick={onSkip}
          className="btn-primary flex-1 flex items-center justify-center gap-2"
        >
          {sent.length > 0 ? (
            <>Continue to Next Step <ArrowRight className="w-4 h-4" /></>
          ) : (
            <>Skip for now <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </div>

      {/* Keyboard help */}
      <div className="mt-3 p-2 rounded-lg bg-secondary/40 border border-border/20">
        <p className="text-2xs text-muted-foreground flex items-center gap-1.5 justify-center">
          <kbd className="px-1.5 py-0.5 bg-background rounded text-2xs font-mono border border-border/60">Enter</kbd>
          <span>to send invite</span>
        </p>
      </div>
    </div>
  )
}
