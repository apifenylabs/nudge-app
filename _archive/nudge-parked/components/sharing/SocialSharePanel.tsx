'use client'

import { useState, useCallback } from 'react'
import { 
  Twitter, Share2, Mail, Copy, Check, Loader2, MessageCircle,
  Send, ExternalLink
} from 'lucide-react'

interface SharePlatform {
  id: string
  label: string
  icon: React.ReactNode
  color: string
  hoverColor: string
}

interface SocialSharePanelProps {
  taskId: string
  taskTitle: string
  taskDescription?: string
  completedBy: string
  familyName?: string
  userId: string
  onClose?: () => void
}

const PLATFORMS: SharePlatform[] = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: <MessageCircle className="w-5 h-5" />,
    color: 'bg-emerald-500',
    hoverColor: 'hover:bg-emerald-600',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    icon: <Send className="w-5 h-5" />,
    color: 'bg-sky-500',
    hoverColor: 'hover:bg-sky-600',
  },
  {
    id: 'twitter',
    label: 'Twitter / X',
    icon: <Twitter className="w-5 h-5" />,
    color: 'bg-black dark:bg-gray-800',
    hoverColor: 'hover:bg-gray-900 dark:hover:bg-gray-700',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    color: 'bg-blue-600',
    hoverColor: 'hover:bg-blue-700',
  },
  {
    id: 'email',
    label: 'Email',
    icon: <Mail className="w-5 h-5" />,
    color: 'bg-gray-600',
    hoverColor: 'hover:bg-gray-700',
  },
]

/**
 * SocialSharePanel — Platform-specific share buttons for completed tasks.
 * 
 * Renders a row of branded social share buttons that open platform-specific
 * share dialogs (Twitter intent, WhatsApp deep link, etc.).
 * 
 * Also includes a "Copy Link" fallback and tracks share events via API.
 */
export default function SocialSharePanel({
  taskId,
  taskTitle,
  taskDescription,
  completedBy,
  familyName,
  userId,
  onClose,
}: SocialSharePanelProps) {
  const [sharingPlatform, setSharingPlatform] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [showMore, setShowMore] = useState(false)

  const handleShare = useCallback(async (platformId: string) => {
    setSharingPlatform(platformId)

    try {
      // If it's native share on mobile, use the Web Share API
      if (platformId === 'native' && navigator.share) {
        const shareUrl = `${window.location.origin}/share/${taskId}`
        await navigator.share({
          title: `${completedBy} completed "${taskTitle}" on Nudge!`,
          text: `${completedBy} just completed "${taskTitle}" on Nudge! 🎉`,
          url: shareUrl,
        })
        setSharingPlatform(null)
        return
      }

      // Get platform-specific URL from the API
      const res = await fetch('/api/share/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId,
          userId,
          platform: platformId,
        }),
      })

      if (!res.ok) throw new Error('Failed to generate share URL')

      const data = await res.json()

      if (!data.platformUrl) {
        throw new Error('No platform URL returned')
      }

      if (platformId === 'copy') {
        await navigator.clipboard.writeText(data.platformUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      } else {
        // Open platform share dialog in new window/tab
        const width = 600
        const height = 500
        const left = (window.innerWidth - width) / 2
        const top = (window.innerHeight - height) / 2

        window.open(
          data.platformUrl,
          `share-${platformId}`,
          `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
        )
      }
    } catch (err) {
      console.error(`Share to ${platformId} failed:`, err)
      // Fallback: copy the share URL
      const fallbackUrl = `${window.location.origin}/share/${taskId}`
      await navigator.clipboard.writeText(fallbackUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } finally {
      setSharingPlatform(null)
    }
  }, [taskId, taskTitle, completedBy, userId])

  const visiblePlatforms = showMore ? PLATFORMS : PLATFORMS.slice(0, 3)

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5 mb-1">
        <Share2 className="w-4 h-4 text-indigo-500" />
        <span className="text-sm font-semibold text-foreground">Share this achievement</span>
      </div>

      {/* Main platform buttons */}
      <div className="flex flex-wrap gap-2">
        {/* Native share (mobile) */}
        {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
          <button
            onClick={() => handleShare('native')}
            disabled={sharingPlatform === 'native'}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all shadow-sm hover:shadow-md active:scale-95 disabled:opacity-50"
          >
            {sharingPlatform === 'native' ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">Share</span>
          </button>
        )}

        {/* Platform buttons */}
        {visiblePlatforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => handleShare(platform.id)}
            disabled={sharingPlatform !== null}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl ${platform.color} ${platform.hoverColor} text-white text-sm font-semibold transition-all shadow-sm hover:shadow-md active:scale-95 disabled:opacity-50`}
            title={`Share to ${platform.label}`}
          >
            {sharingPlatform === platform.id ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              platform.icon
            )}
            <span className="hidden sm:inline text-xs">{platform.label}</span>
          </button>
        ))}

        {/* More / Less toggle */}
        {PLATFORMS.length > 3 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors"
            title={showMore ? 'Show fewer' : 'More options'}
          >
            <ExternalLink className={`w-4 h-4 transition-transform ${showMore ? 'rotate-180' : ''}`} />
          </button>
        )}

        {/* Copy link */}
        <button
          onClick={() => handleShare('copy')}
          disabled={sharingPlatform === 'copy'}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold transition-all active:scale-95 disabled:opacity-50"
          title="Copy share link"
        >
          {sharingPlatform === 'copy' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : copied ? (
            <Check className="w-4 h-4 text-emerald-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          <span className="text-xs">{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      {/* Share preview text */}
      <p className="text-xs text-muted-foreground/70 italic">
        Shared from {familyName || 'Nudge'} &middot; nudge-sigma-liart.vercel.app
      </p>
    </div>
  )
}
