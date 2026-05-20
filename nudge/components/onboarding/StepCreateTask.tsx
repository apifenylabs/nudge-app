'use client'

import { useState } from 'react'
import { Mic, Check, ArrowRight, Sparkles } from 'lucide-react'

const QUICK_SUGGESTIONS = [
  'Remind Jake to take out trash tonight',
  'Pick up milk and eggs after work',
  'Sarah has soccer practice at 4pm tomorrow',
  'Mom — doctor appointment at 10am on Friday',
  'Water the plants every morning',
  'Vacuum the living room this weekend',
]

export default function StepCreateTask({
  onComplete,
}: {
  onComplete: (taskText: string) => Promise<void>
}) {
  const [taskText, setTaskText] = useState('')
  const [loading, setLoading] = useState(false)
  const [taskCreated, setTaskCreated] = useState(false)

  const handleCreate = async (text?: string) => {
    const content = text || taskText
    setLoading(true)
    try {
      await onComplete(content.trim() || '')
      setTaskCreated(true)
      setTimeout(() => onComplete(content.trim() || ''), 800)
    } catch {
      // If no task created (skip), just advance
      setTaskCreated(true)
      setTimeout(() => onComplete(content.trim() || ''), 300)
    }
    setLoading(false)
  }

  if (taskCreated) {
    return (
      <div className="text-center py-12 animate-fade-in-up">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-emerald-500" />
        </div>
        <p className="text-xl font-bold text-foreground mb-1">Task created! 🎉</p>
        <p className="text-sm text-muted-foreground">Moving to next step...</p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-xl font-bold text-foreground mb-1">Create Your First Nudge</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Type a task naturally. Nudge parses it and sets everything up.
      </p>

      {/* Voice input hint */}
      <div className="flex items-center gap-3 p-4 bg-indigo-50 dark:bg-indigo-950/30 rounded-2xl border border-indigo-100/50 dark:border-indigo-900/30 mb-6">
        <Mic className="w-5 h-5 text-indigo-500 shrink-0" />
        <div>
          <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
            Speak naturally
          </p>
          <p className="text-xs text-indigo-600/70 dark:text-indigo-400/70">
            &ldquo;Remind Jake to take out trash tonight&rdquo;
          </p>
        </div>
      </div>

      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="input-field mb-4"
        placeholder="What needs done?"
        autoFocus
        onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
      />

      {/* Quick suggestions */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 mb-2">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span className="text-xs text-muted-foreground">Quick examples</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {QUICK_SUGGESTIONS.slice(0, 4).map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                setTaskText(suggestion)
                handleCreate(suggestion)
              }}
              className="px-3 py-2 text-xs rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/30 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors text-left leading-relaxed max-w-full"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => handleCreate()}
          disabled={loading}
          className="btn-primary flex-1 flex items-center justify-center gap-2"
        >
          {loading ? 'Creating...' : taskText.trim() ? 'Create Task' : 'Skip'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
