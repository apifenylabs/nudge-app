'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ListChecks, ArrowRight, Sparkles, Bot, MessageSquare, Zap } from 'lucide-react'

interface EmptyStateProps {
  familyName?: string
  userName?: string
  familyId: string
  userId: string
  hasTelegram: boolean
}

export default function EmptyState({
  familyName,
  userName,
  familyId,
  userId,
  hasTelegram,
}: EmptyStateProps) {
  const router = useRouter()
  const [showHint, setShowHint] = useState<'create' | 'telegram'>('create')
  const [rotateHint, setRotateHint] = useState(false)

  // Rotate hints every 8 seconds
  useEffect(() => {
    if (!hasTelegram) return
    const interval = setInterval(() => {
      setRotateHint(true)
      setTimeout(() => {
        setShowHint((prev) => (prev === 'create' ? 'telegram' : 'create'))
        setRotateHint(false)
      }, 300)
    }, 8000)
    return () => clearInterval(interval)
  }, [hasTelegram])

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Empty state illustration */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center border border-indigo-200/50 dark:border-indigo-800/30">
          <ListChecks className="w-10 h-10 text-indigo-400 dark:text-indigo-500" />
        </div>
        <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-amber-400" />
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-2">
        {familyName ? `Welcome, ${familyName}!` : 'Welcome to Nudge!'}
      </h2>
      <p className="text-muted-foreground mb-8 max-w-sm mx-auto text-sm leading-relaxed">
        Start by creating your first task. Use natural language — just tell Nudge what needs to be done.
      </p>

      {/* Rotating hint cards */}
      <div className={`w-full max-w-sm transition-opacity duration-300 ${rotateHint ? 'opacity-0' : 'opacity-100'}`}>
        {showHint === 'create' && (
          <div className="glass-card p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/20">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="text-left flex-1">
                <p className="text-sm font-semibold text-foreground">Try Smart Task Creator</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Type &ldquo;@Jake buy milk at 5pm&rdquo; and Nudge sets the assignee, due date, and priority.
                </p>
              </div>
            </div>
          </div>
        )}

        {showHint === 'telegram' && hasTelegram && (
          <div className="glass-card p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div className="text-left flex-1">
                <p className="text-sm font-semibold text-foreground">Use Telegram</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Send a voice or text message to @NudgeFamilyBot on Telegram to add tasks on the go.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create first task CTA */}
      <button
        onClick={() => {
          // Scroll to the smart task creator or focus task input
          const taskInput = document.querySelector('[data-task-input]') as HTMLInputElement
          if (taskInput) {
            taskInput.focus()
            taskInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }}
        className="btn-primary flex items-center gap-2 mb-3"
      >
        <Zap className="w-4 h-4" />
        Create Your First Task
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Quick suggestion button */}
      <button
        onClick={() => {
          const taskInput = document.querySelector('[data-task-input]') as HTMLInputElement
          if (taskInput) {
            taskInput.value = '@me finish onboarding by tomorrow'
            taskInput.focus()
          }
        }}
        className="btn-ghost text-xs text-muted-foreground"
      >
        Or try a suggestion: &ldquo;@me finish onboarding by tomorrow&rdquo;
      </button>
    </div>
  )
}
