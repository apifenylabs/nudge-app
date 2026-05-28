'use client'

import { Sparkles, Mic, AlertCircle, HelpCircle } from 'lucide-react'

interface ConfidenceBadgeProps {
  /** Estimated quality: 0-1, or undefined if no estimate */
  quality?: number | null
  /** Size variant */
  size?: 'sm' | 'md'
}

/**
 * ConfidenceBadge — visual indicator of transcription quality.
 *
 * Shows a small badge next to transcribed text indicating how clear the
 * recording was, helping users decide if they need to re-record.
 */
export default function ConfidenceBadge({ quality, size = 'sm' }: ConfidenceBadgeProps) {
  if (quality === undefined || quality === null) {
    return null
  }

  const getConfig = () => {
    if (quality >= 0.85) return {
      label: 'Excellent',
      icon: Sparkles,
      bg: 'bg-emerald-100 dark:bg-emerald-900/30',
      text: 'text-emerald-700 dark:text-emerald-300',
      iconColor: 'text-emerald-500',
    }
    if (quality >= 0.65) return {
      label: 'Good',
      icon: Mic,
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-700 dark:text-blue-300',
      iconColor: 'text-blue-500',
    }
    if (quality >= 0.35) return {
      label: 'Fair',
      icon: HelpCircle,
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      text: 'text-amber-700 dark:text-amber-300',
      iconColor: 'text-amber-500',
    }
    return {
      label: 'Unclear',
      icon: AlertCircle,
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-700 dark:text-red-300',
      iconColor: 'text-red-500',
    }
  }

  const config = getConfig()
  const Icon = config.icon

  if (size === 'sm') {
    return (
      <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full ${config.bg} ${config.text} text-[10px] font-medium`}>
        <Icon className={`w-2.5 h-2.5 ${config.iconColor}`} />
        {config.label}
      </span>
    )
  }

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${config.bg}`}>
      <Icon className={`w-4 h-4 ${config.iconColor}`} />
      <div>
        <p className={`text-sm font-semibold ${config.text}`}>{config.label} clarity</p>
        <p className={`text-xs opacity-70 ${config.text}`}>
          {quality >= 0.85 ? 'Crisp and clear recording'
            : quality >= 0.65 ? 'Clear enough for accurate transcription'
            : quality >= 0.35 ? 'May contain errors — check before submitting'
            : 'Consider re-recording for better results'}
        </p>
      </div>
      {/* Visual meter */}
      <div className="ml-auto flex gap-0.5">
        {[0.2, 0.4, 0.6, 0.8, 1.0].map(threshold => (
          <div
            key={threshold}
            className={`w-1.5 h-6 rounded-full ${
              quality >= threshold
                ? quality >= 0.85 ? 'bg-emerald-500'
                  : quality >= 0.65 ? 'bg-blue-500'
                  : quality >= 0.35 ? 'bg-amber-500'
                  : 'bg-red-500'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
