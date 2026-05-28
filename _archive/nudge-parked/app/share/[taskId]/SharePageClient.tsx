'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, Download, Share2, Check, Loader2, ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import SocialSharePanel from '@/components/sharing/SocialSharePanel'

interface TaskData {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  completed_at: string | null
  assigneeName: string | null
  creatorName: string
  completedByName: string
  familyName: string
}

export default function SharePageClient({ task }: { task: TaskData }) {
  // Extract userId from URL params if available (for share tracking)
  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    // Try to find userId from the URL search params
    const params = new URLSearchParams(window.location.search)
    const uid = params.get('userId') || params.get('ref') || ''
    setUserId(uid)
  }, [])
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const formattedDate = task.completed_at
    ? new Date(task.completed_at).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })

  const formattedTime = task.completed_at
    ? new Date(task.completed_at).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    : ''

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Task Completed on Nudge!',
          text: `${task.completedByName} completed "${task.title}" on Nudge! 🎉`,
          url: shareUrl,
        })
      } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const el = document.getElementById('share-card-content')
      if (!el) return
      const { default: html2canvas } = await import('html2canvas')
      const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: '#ffffff' })
      canvas.toBlob((blob) => {
        if (!blob) return
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `nudge-${task.title.slice(0, 20).replace(/[^a-zA-Z0-9]/g, '_')}.png`
        a.click()
        URL.revokeObjectURL(url)
      }, 'image/png', 0.95)
    } catch (err) {
      console.error('Download failed:', err)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 flex flex-col items-center justify-center p-4">
      {/* Back link */}
      <Link
        href="/"
        className="absolute top-4 left-4 flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Nudge Home
      </Link>

      {/* Share card */}
      <div className="w-full max-w-sm">
        {/* The renderable card */}
        <div
          id="share-card-content"
          className="bg-white rounded-2xl shadow-elevated overflow-hidden border border-border/50 mb-6"
          style={{ width: '100%', maxWidth: '340px', margin: '0 auto' }}
        >
          {/* Gradient accent */}
          <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          <div className="p-6">
            {/* Brand */}
            <div className="flex items-center gap-1.5 mb-4">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">N</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">Nudge</span>
            </div>

            {/* Check */}
            <div className="mb-4 flex justify-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-emerald-600" strokeWidth={2} />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-lg font-bold text-gray-900 text-center mb-1 line-clamp-3">
              {task.title}
            </h1>
            {task.description && (
              <p className="text-center text-xs text-gray-500 mb-4 line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Divider */}
            <div className="border-t border-gray-100 my-4" />

            {/* Details */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">Completed</span>
                <span className="text-gray-700">
                  {formattedDate}{formattedTime ? ` · ${formattedTime}` : ''}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">By</span>
                <span className="text-gray-800 font-semibold">{task.completedByName}</span>
              </div>
              {task.assigneeName && (
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">For</span>
                  <span className="text-gray-700">{task.assigneeName}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400 font-medium">Family</span>
                <span className="text-gray-700">{task.familyName}</span>
              </div>
              {task.priority && task.priority !== 'medium' && (
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Priority</span>
                  <span className={`font-semibold ${
                    task.priority === 'urgent' ? 'text-red-500' :
                    task.priority === 'high' ? 'text-orange-500' :
                    'text-blue-500'
                  }`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-6 text-center">
              <span className="text-[9px] text-gray-300 uppercase tracking-[0.2em]">
                nudge-sigma-liart.vercel.app
              </span>
            </div>
          </div>
        </div>

        {/* Social share panel */}
        <div className="max-w-[340px] mx-auto mb-4">
          <SocialSharePanel
            taskId={task.id}
            taskTitle={task.title}
            taskDescription={task.description || undefined}
            completedBy={task.completedByName}
            familyName={task.familyName}
            userId={userId || 'anonymous'}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 max-w-[340px] mx-auto">
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
          >
            {copied ? (
              <><Check className="w-4 h-4" /> Copied!</>
            ) : (
              <><Share2 className="w-4 h-4" /> Share</>
            )}
          </button>
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold transition-colors disabled:opacity-50"
          >
            {downloading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /></>
            ) : (
              <><Download className="w-4 h-4" /> Download</>
            )}
          </button>
        </div>
      </div>

      {/* Viral CTA for non-users */}
      <div className="mt-8 text-center max-w-sm mx-auto">
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-0.5">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-foreground mb-2">
              ✨ Get Nudge for Your Family
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              The family task manager that actually works. Natural language,
              Telegram integration, and smart reminders.
            </p>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors shadow-lg hover:shadow-xl"
            >
              Try Nudge Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-muted-foreground mt-3">
              Free plan includes 10 tasks/day · No credit card required
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
