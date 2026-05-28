import { Inbox, Mic } from 'lucide-react'
import Link from 'next/link'

interface EmptyStateProps {
  title?: string
  message?: string
  icon?: 'inbox' | 'mic'
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
}

export default function EmptyState({
  title = 'No tasks yet',
  message = 'Tap the mic to add your first nudge!',
  icon = 'inbox',
  action,
}: EmptyStateProps) {
  const Icon = icon === 'mic' ? Mic : Inbox

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-indigo-400" />
      </div>
      <p className="text-base font-semibold text-foreground mb-1">{title}</p>
      <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-4">{message}</p>
      {action && (
        action.href ? (
          <Link
            href={action.href}
            className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors inline-flex items-center gap-1.5"
          >
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors inline-flex items-center gap-1.5"
          >
            {action.label}
          </button>
        )
      )}
    </div>
  )
}
