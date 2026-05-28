'use client'

import { useState } from 'react'
import { Send, Check, Loader2 } from 'lucide-react'

interface ShareToTelegramProps {
  taskTitle: string
  taskDescription?: string
  completedBy: string
  completedAt: string
  taskId: string
  telegramUsername?: string
}

/**
 * Share a completed task card directly to Telegram.
 * Falls back to copying a share URL if no Telegram connection.
 */
export default function ShareToTelegram({
  taskTitle,
  taskDescription,
  completedBy,
  completedAt,
  taskId,
  telegramUsername,
}: ShareToTelegramProps) {
  const [shared, setShared] = useState(false)
  const [sharing, setSharing] = useState(false)

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/share/${taskId}`
    : `https://nudge-sigma-liart.vercel.app/share/${taskId}`

  const formattedDate = new Date(completedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  const handleShare = async () => {
    setSharing(true)

    const text = [
      `✅ *Task completed on Nudge!*`,
      ``,
      `"${taskTitle}"`,
      taskDescription ? `${taskDescription}` : '',
      ``,
      `Completed by ${completedBy} on ${formattedDate}`,
      ``,
      `👉 ${shareUrl}`,
    ].filter(Boolean).join('\n')

    // If user has Telegram connected, open deep link
    if (telegramUsername) {
      // Use the Telegram deep link format
      const botUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME || 'NudgeFamilyBot'
      const tgUrl = `https://t.me/${botUsername}?start=share_${taskId}`
      window.open(tgUrl, '_blank')
    } else {
      // Fallback: copy text to clipboard
      await navigator.clipboard.writeText(text)
      setShared(true)
      setTimeout(() => setShared(false), 3000)
    }

    setSharing(false)
  }

  return (
    <button
      onClick={handleShare}
      disabled={sharing}
      className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold transition-colors disabled:opacity-50"
    >
      {sharing ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : shared ? (
        <Check className="w-4 h-4" />
      ) : (
        <Send className="w-4 h-4" />
      )}
      {shared ? 'Copied!' : 'Share to Telegram'}
    </button>
  )
}
