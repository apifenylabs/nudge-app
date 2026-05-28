'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { Home, ArrowRight, Sparkles, Check, AlertCircle } from 'lucide-react'

const FAMILY_EMOJIS = ['👨‍👩‍👧‍👦', '👨‍👩‍👧‍👧', '👩‍👩‍👧‍👦', '👨‍👨‍👧‍👦', '👪', '🏠', '🌟', '💪']
const SUGGESTED_NAMES = [
  'The Smiths',
  'The Johnson Crew',
  'Team Awesome',
  'Our Family',
  'The Fam',
  'Home Base',
]

const EMOJI_BY_LETTER: Record<string, string> = {
  s: '👨‍👩‍👧‍👦', t: '🌟', o: '👪', j: '💪', a: '🏠', h: '🏠', f: '👨‍👩‍👧‍👧',
}

function suggestEmoji(name: string): string {
  const first = name.toLowerCase().trim()[0]
  return EMOJI_BY_LETTER[first] || '👨‍👩‍👧‍👦'
}

export default function StepFamilyName({
  onComplete,
}: {
  onComplete: (name: string, emoji: string) => Promise<void>
}) {
  const [familyName, setFamilyName] = useState('')
  const [selectedEmoji, setSelectedEmoji] = useState('👨‍👩‍👧‍👦')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [validationError, setValidationError] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-focus input on mount
  useEffect(() => {
    // Small delay for animation to finish
    const timer = setTimeout(() => inputRef.current?.focus(), 400)
    return () => clearTimeout(timer)
  }, [])

  const validateName = useCallback((name: string): string | null => {
    const trimmed = name.trim()
    if (trimmed.length === 0) return null // No error, just empty
    if (trimmed.length < 2) return 'Family name needs at least 2 characters'
    if (trimmed.length > 50) return 'Family name is too long (max 50 characters)'
    if (!/^[a-zA-Z0-9\s'\-&]+$/.test(trimmed)) {
      return 'Use letters, numbers, spaces, hyphens, or ampersands'
    }
    return null
  }, [])

  // Debounced validation
  useEffect(() => {
    const timer = setTimeout(() => {
      setValidationError(validateName(familyName) || '')
    }, 300)
    return () => clearTimeout(timer)
  }, [familyName, validateName])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = familyName.trim()
    const err = validateName(trimmed)
    if (err) {
      setValidationError(err)
      return
    }
    setLoading(true)
    setError('')
    try {
      await onComplete(trimmed, selectedEmoji)
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFamilyName(value)
    // Auto-select emoji based on first letter of name
    if (value.trim().length === 1) {
      const suggested = suggestEmoji(value)
      setSelectedEmoji(suggested)
    }
  }

  const handleSuggestionClick = (name: string) => {
    setFamilyName(name)
    setShowSuggestions(false)
    const suggested = suggestEmoji(name)
    setSelectedEmoji(suggested)

    // Quick-select first emoji suggestion
    const matchingEmoji = FAMILY_EMOJIS.find(e =>
      e === suggested || e.codePointAt(0) === suggested.codePointAt(0)
    )
    if (matchingEmoji) setSelectedEmoji(matchingEmoji)
  }

  const isValid = familyName.trim().length >= 2 && familyName.trim().length <= 50

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
              aria-label={`Select icon ${emoji}`}
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

      <form onSubmit={handleSubmit} noValidate>
        <div className="relative mb-2">
          <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={familyName}
            onChange={handleNameChange}
            maxLength={50}
            className={`input-field pl-10 pr-10 ${
              validationError ? 'ring-2 ring-destructive/50' : ''
            }`}
            placeholder="e.g., The Smiths, Johnson Crew"
            autoComplete="off"
            enterKeyHint="go"
            inputMode="text"
          />
          {familyName.trim().length >= 2 && !validationError && (
            <Check className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
          )}
        </div>

        {/* Character count */}
        <div className="flex justify-end mb-1">
          <span className={`text-2xs ${familyName.length > 45 ? 'text-amber-500' : 'text-muted-foreground'}`}>
            {familyName.length}/50
          </span>
        </div>

        {/* Validation error */}
        {validationError && (
          <div className="flex items-center gap-1.5 mb-3 text-xs text-destructive animate-fade-in">
            <AlertCircle className="w-3 h-3" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Suggested names */}
        {familyName.length === 0 && showSuggestions && (
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
                  onClick={() => handleSuggestionClick(name)}
                  className="px-3 py-1.5 text-xs rounded-lg bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Keyboard-friendly hint on mobile */}
        <div className="mb-4 p-2.5 rounded-xl bg-secondary/50 border border-border/30">
          <p className="text-xs text-muted-foreground flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-background rounded text-2xs font-mono border border-border/60">Enter</kbd>
            <span>to continue</span>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400 animate-fade-in">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !isValid}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating...
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
