'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { Download, Share2, Check, Loader2, X } from 'lucide-react'

interface ShareCardConfig {
  taskTitle: string
  taskDescription?: string
  completedBy: string
  completedAt: string
  familyName?: string
  priority?: 'low' | 'medium' | 'high' | 'urgent'
  assignee?: string
}

interface ShareCardProps {
  config: ShareCardConfig
  onClose?: () => void
}

/**
 * Polaroid-style shareable task completion card.
 * Renders to an SVG/Canvas element for download or sharing.
 */
export default function ShareCard({ config, onClose }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [svgDataUrl, setSvgDataUrl] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const {
    taskTitle,
    taskDescription,
    completedBy,
    completedAt,
    familyName,
    priority,
    assignee,
  } = config

  const formattedDate = formatDate(completedAt)
  const formattedTime = formatTime(completedAt)

  // Priority colors
  const priorityColors: Record<string, { bg: string; text: string; dot: string }> = {
    low: { bg: 'bg-blue-50 dark:bg-blue-950/30', text: 'text-blue-600 dark:text-blue-400', dot: '#3B82F6' },
    medium: { bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-600 dark:text-amber-400', dot: '#F59E0B' },
    high: { bg: 'bg-orange-50 dark:bg-orange-950/30', text: 'text-orange-600 dark:text-orange-400', dot: '#F97316' },
    urgent: { bg: 'bg-red-50 dark:bg-red-950/30', text: 'text-red-600 dark:text-red-400', dot: '#EF4444' },
  }

  const pc = priority ? priorityColors[priority] : null

  const handleDownload = useCallback(async () => {
    if (downloading) return
    setDownloading(true)
    try {
      const blob = await cardToBlob(cardRef.current)
      if (!blob) { setDownloading(false); return }
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `nudge-completed-${taskTitle.slice(0, 20).replace(/[^a-zA-Z0-9]/g, '_')}.png`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download failed:', err)
    } finally {
      setDownloading(false)
    }
  }, [taskTitle, downloading])

  const handleShareNative = useCallback(async () => {
    if (!navigator.share) {
      // Fallback: copy a text summary
      const text = [
        `✅ Task completed on Nudge!`,
        ``,
        `"${taskTitle}"`,
        taskDescription ? `${taskDescription}` : '',
        ``,
        `Completed by ${completedBy} ${formattedTime ? `at ${formattedTime}` : ''}`,
        familyName ? `Family: ${familyName}` : '',
        assignee ? `Assigned to: ${assignee}` : '',
        ``,
        `Track your family tasks with Nudge → https://nudge-sigma-liart.vercel.app`,
      ].filter(Boolean).join('\n')

      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
      return
    }

    try {
      const blob = await cardToBlob(cardRef.current)
      if (!blob) return
      const file = new File([blob], `nudge-${Date.now()}.png`, { type: 'image/png' })
      await navigator.share({
        title: 'Task Completed on Nudge!',
        text: `${completedBy} completed "${taskTitle}" on Nudge!`,
        files: [file],
      })
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.error('Share failed:', err)
      }
    }
  }, [config, taskTitle, formattedTime])

  return (
    <>
      {/* Card preview */}
      <div className="space-y-4">
        {/* Polaroid-style card */}
        <div
          ref={cardRef}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-elevated overflow-hidden border border-border/50 mx-auto"
          style={{
            width: '340px',
            aspectRatio: '4 / 5',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        >
          {/* Top accent bar */}
          <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          {/* Content */}
          <div className="p-6 flex flex-col h-[calc(100%-8px)]">
            {/* Nudge branding */}
            <div className="flex items-center gap-1.5 mb-4">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">N</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">Nudge</span>
            </div>

            {/* Checkmark */}
            <div className="mb-4 flex justify-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
                <Check className="w-7 h-7 text-emerald-600" strokeWidth={3} />
              </div>
            </div>

            {/* Task title */}
            <div className="text-center mb-3">
              <h2 className="text-lg font-bold text-gray-900 leading-tight line-clamp-3">
                {taskTitle}
              </h2>
            </div>

            {/* Description */}
            {taskDescription && (
              <p className="text-center text-xs text-gray-500 mb-4 line-clamp-2 px-2">
                {taskDescription}
              </p>
            )}

            {/* Divider */}
            <div className="border-t border-gray-100 my-auto" />

            {/* Metadata */}
            <div className="pt-3 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Completed</span>
                <span className="text-[11px] text-gray-500">{formattedDate}{formattedTime ? ` · ${formattedTime}` : ''}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">By</span>
                <span className="text-[11px] text-gray-700 font-medium">{completedBy}</span>
              </div>

              {assignee && (
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">For</span>
                  <span className="text-[11px] text-gray-700 font-medium">{assignee}</span>
                </div>
              )}

              {familyName && (
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Family</span>
                  <span className="text-[11px] text-gray-700 font-medium">{familyName}</span>
                </div>
              )}

              {pc && (
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Priority</span>
                  <span className={`text-[11px] font-medium ${pc.text}`}>
                    {priority?.charAt(0).toUpperCase()}{priority?.slice(1)}
                  </span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-auto pt-3 text-center">
              <span className="text-[8px] text-gray-300 uppercase tracking-[0.2em]">nudge-sigma-liart.vercel.app</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleShareNative}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-colors"
          >
            {copied ? (
              <><Check className="w-4 h-4" /> Copied!</>
            ) : (
              <><Share2 className="w-4 h-4" /> Share Card</>
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

        {/* Close */}
        {onClose && (
          <button
            onClick={onClose}
            className="w-full py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
          >
            Close
          </button>
        )}
      </div>
    </>
  )
}

/** Convert a DOM element to a PNG blob using html2canvas (inline fallback) */
async function cardToBlob(element: HTMLElement | null): Promise<Blob | null> {
  if (!element) return null

  // Try using canvas for best quality
  try {
    const html2canvas = (await import('html2canvas')).default
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: 340,
    })
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/png', 0.95)
    })
  } catch (err) {
    console.error('html2canvas failed, trying fallback:', err)
    return null
  }
}

/** Format date as "May 8, 2026" */
function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  } catch { return dateStr }
}

/** Format time as "2:30 PM" */
function formatTime(dateStr: string) {
  try {
    const d = new Date(dateStr)
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  } catch { return '' }
}
