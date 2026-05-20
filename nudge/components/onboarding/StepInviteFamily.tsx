'use client'

import { useState } from 'react'
import { Mail, UserPlus, Check, Copy, ArrowRight, Send, Users, Link2, Share2 } from 'lucide-react'

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

  const handleSend = async () => {
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email')
      return
    }
    setSending(true)
    setError('')
    try {
      await onSendInvite(email.trim())
      setSent((prev) => [...prev, email.trim()])
      setEmail('')
    } catch (err: any) {
      setError(err.message || 'Failed to send invite')
    } finally {
      setSending(false)
    }
  }

  const handleCopyLink = async () => {
    if (inviteLink) {
      try {
        await navigator.clipboard.writeText(inviteLink)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {}
    }
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
        <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
          Invite by email
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field pl-10"
              placeholder="partner@email.com"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={sending || !email.trim()}
            className="btn-primary px-4 flex items-center justify-center gap-1.5"
          >
            {sending ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
        {error && (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        )}
      </div>

      {/* Sent invites */}
      {sent.length > 0 && (
        <div className="mb-6 space-y-1.5">
          {sent.map((e) => (
            <div
              key={e}
              className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-2 rounded-lg animate-fade-in"
            >
              <Check className="w-3.5 h-3.5" />
              Invite sent to {e}
            </div>
          ))}
        </div>
      )}

      {/* Invite link */}
      {inviteLink && (
        <div className="mb-6">
          <label className="block text-xs font-semibold text-foreground mb-1.5 uppercase tracking-wider">
            Or share invite link
          </label>
          <div className="flex gap-2">
            <div className="flex-1 p-3 bg-secondary rounded-xl text-xs text-muted-foreground truncate border border-border/50">
              <Link2 className="w-3.5 h-3.5 inline mr-1.5" />
              {inviteLink}
            </div>
            <button
              onClick={handleCopyLink}
              className="btn-secondary px-3 flex items-center gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-xs">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Chat share button */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            if (inviteLink) {
              const text = encodeURIComponent(
                `Join our family on Nudge! We're using it to stay organized. 🏠\n\n${inviteLink}`
              )
              window.open(`https://wa.me/?text=${text}`, '_blank')
            }
          }}
          className="btn-ghost flex-1 text-xs flex items-center justify-center gap-1.5 border border-border/50"
        >
          <Share2 className="w-3.5 h-3.5" />
          WhatsApp
        </button>
        <button
          onClick={() => {
            if (inviteLink) {
              const text = encodeURIComponent(
                `Join our family on Nudge! We're using it to stay organized. 🏠\n\n${inviteLink}`
              )
              window.open(`tg://msg_url?url=${encodeURIComponent(inviteLink)}&text=${text}`, '_blank')
            }
          }}
          className="btn-ghost flex-1 text-xs flex items-center justify-center gap-1.5 border border-border/50"
        >
          <Send className="w-3.5 h-3.5" />
          Telegram
        </button>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onSkip}
          className="btn-primary flex-1 flex items-center justify-center gap-2"
        >
          {sent.length > 0 ? 'Continue to Dashboard' : 'Skip for now'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
