'use client'

import { useState } from 'react'
import { Home, ArrowRight, Sparkles } from 'lucide-react'

const FAMILY_EMOJIS = ['👨‍👩‍👧‍👦', '👨‍👩‍👧‍👧', '👩‍👩‍👧‍👦', '👨‍👨‍👧‍👦', '👪', '🏠', '🌟', '💪']
const SUGGESTED_NAMES = [
  'The Smiths',
  'The Johnson Crew',
  'Team Awesome',
  'Our Family',
  'The Fam',
  'Home Base',
]

export default function StepFamilyName({
  onComplete,
}: {
  onComplete: (name: string, emoji: string) => Promise<void>
}) {
  const [familyName, setFamilyName] = useState('')
  const [selectedEmoji, setSelectedEmoji] = useState('👨‍👩‍👧‍👦')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!familyName.trim()) return
    setLoading(true)
    setError('')
    try {
      await onComplete(familyName.trim(), selectedEmoji)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="animate-fade-in-up">
      {/* Emoji picker */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">
          Pick a family icon
        </label>
        <div className="flex gap-2 flex-wrap">
          {FAMILY_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setSelectedEmoji(emoji)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-200 ${
                selectedEmoji === emoji
                  ? 'bg-indigo-100 dark:bg-indigo-900/40 ring-2 ring-indigo-500 scale-110 shadow-md'
                  : 'bg-secondary hover:bg-secondary/80 hover:scale-105'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <h2 className="text-xl font-bold text-foreground mb-1">
        Name Your Family
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Give your household a name. Your family will see this in the app.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="relative mb-2">
          <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={familyName}
            onChange={(e) => setFamilyName(e.target.value)}
            className="input-field pl-10"
            placeholder="e.g., The Smiths, Johnson Crew"
            autoFocus
          />
        </div>

        {/* Suggested names */}
        {familyName.length === 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              <span className="text-xs text-muted-foreground">Suggestions</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {SUGGESTED_NAMES.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setFamilyName(name)}
                  className="px-3 py-1.5 text-xs rounded-lg bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400 animate-fade-in">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !familyName.trim()}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {loading ? 'Creating...' : 'Continue'}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  )
}
