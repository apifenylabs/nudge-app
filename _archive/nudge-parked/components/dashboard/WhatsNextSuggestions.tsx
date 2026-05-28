'use client'

import { useState, useCallback, useEffect } from 'react'
import {
  Sparkles, X, ArrowRight, Lightbulb, Zap, ShoppingCart,
  MessageSquare, Calendar, Loader2, PartyPopper
} from 'lucide-react'

interface WhatsNextSuggestion {
  id: string
  icon: string
  title: string
  description: string
  suggestedText: string
  category?: string
}

interface WhatsNextSuggestionsProps {
  completedTaskTitle: string
  familyId: string
  userId: string
  members: { id: string; name: string }[]
  userName?: string
  onSelectSuggestion: (text: string) => void
  onDismiss: () => void
}

/**
 * Smart "What's next?" suggestions shown after completing a task.
 * Generates contextual suggestions based on the just-completed task.
 */
export default function WhatsNextSuggestions({
  completedTaskTitle,
  familyId,
  userId,
  members,
  userName,
  onSelectSuggestion,
  onDismiss,
}: WhatsNextSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<WhatsNextSuggestion[]>([])
  const [generating, setGenerating] = useState(true)
  const [dismissed, setDismissed] = useState(false)

  // Generate contextual suggestions based on the completed task
  useEffect(() => {
    const generateSuggestions = () => {
      setGenerating(true)

      // Build contextual suggestions based on keywords in the completed task
      const lowerTitle = completedTaskTitle.toLowerCase()
      const contextSuggestions: WhatsNextSuggestion[] = []

      // Household/chores context
      if (lowerTitle.includes('trash') || lowerTitle.includes('garbage') || lowerTitle.includes('recycle')) {
        contextSuggestions.push({
          id: 'takeout',
          icon: '🗑️',
          title: 'Take out recycling',
          description: 'Since you handled the trash',
          suggestedText: 'Take out recycling this week',
          category: 'chores',
        })
        contextSuggestions.push({
          id: 'kitchen',
          icon: '🧹',
          title: 'Wipe kitchen counters',
          description: 'Keep the kitchen fresh',
          suggestedText: 'Wipe down kitchen counters tonight',
          category: 'chores',
        })
      }

      if (lowerTitle.includes('clean') || lowerTitle.includes('tidy') || lowerTitle.includes('organize')) {
        contextSuggestions.push({
          id: 'declutter',
          icon: '📦',
          title: 'Declutter one drawer',
          description: 'Small win, big impact',
          suggestedText: 'Declutter one drawer or shelf for 10 minutes',
          category: 'chores',
        })
        contextSuggestions.push({
          id: 'vacuum',
          icon: '🧹',
          title: 'Vacuum living room',
          description: 'Keep the momentum going',
          suggestedText: 'Vacuum the living room floor',
          category: 'chores',
        })
      }

      // Shopping context
      if (lowerTitle.includes('grocer') || lowerTitle.includes('buy') || lowerTitle.includes('shop') || lowerTitle.includes('milk') || lowerTitle.includes('bread') || lowerTitle.includes('egg')) {
        contextSuggestions.push({
          id: 'mealplan',
          icon: '📋',
          title: 'Plan this week\'s meals',
          description: 'Save time and money',
          suggestedText: 'Plan meals for this week and make a shopping list',
          category: 'home',
        })
        contextSuggestions.push({
          id: 'coupons',
          icon: '💰',
          title: 'Check for deals',
          description: 'Check store apps for discounts',
          suggestedText: 'Check store apps for weekly deals before shopping',
          category: 'finance',
        })
      }

      // School/kids context
      if (lowerTitle.includes('homework') || lowerTitle.includes('school') || lowerTitle.includes('study') || lowerTitle.includes('read')) {
        contextSuggestions.push({
          id: 'reading',
          icon: '📚',
          title: 'Read for 15 minutes',
          description: 'Build the habit',
          suggestedText: 'Read for 15 minutes before bed',
          category: 'kids',
        })
        contextSuggestions.push({
          id: 'packbags',
          icon: '🎒',
          title: 'Pack school bags',
          description: 'Get ready for tomorrow',
          suggestedText: 'Pack school bags for tomorrow morning',
          category: 'kids',
        })
      }

      // Finance context
      if (lowerTitle.includes('bill') || lowerTitle.includes('pay') || lowerTitle.includes('invoice') || lowerTitle.includes('electric') || lowerTitle.includes('water')) {
        contextSuggestions.push({
          id: 'budget',
          icon: '📊',
          title: 'Review monthly budget',
          description: 'Stay on top of finances',
          suggestedText: 'Review monthly budget and track expenses',
          category: 'finance',
        })
        contextSuggestions.push({
          id: 'savings',
          icon: '🏦',
          title: 'Transfer to savings',
          description: 'A little every time adds up',
          suggestedText: 'Transfer savings to the family fund',
          category: 'finance',
        })
      }

      // General fallback suggestions
      if (contextSuggestions.length === 0) {
        contextSuggestions.push(
          {
            id: 'nexttask',
            icon: '✅',
            title: 'Complete another task',
            description: 'Keep the streak going!',
            suggestedText: 'Complete another pending task',
            category: undefined,
          },
          {
            id: 'thankyou',
            icon: '❤️',
            title: 'Thank your family',
            description: 'Send a quick appreciation message',
            suggestedText: `Tell the family "thanks for helping out today!"`,
            category: undefined,
          },
          {
            id: 'celebrate',
            icon: '🎉',
            title: 'Celebrate with your family',
            description: 'Share that you finished something',
            suggestedText: 'Share your completed task with the family',
            category: undefined,
          }
        )
      }

      // Add "message family" suggestion if there are members
      if (members.length > 1) {
        contextSuggestions.push({
          id: 'checkin',
          icon: '💬',
          title: 'Check in with family',
          description: `Ask how everyone is doing`,
          suggestedText: 'Quick check-in: how is everyone doing today?',
          category: undefined,
        })
      }

      setSuggestions(contextSuggestions.slice(0, 4))
      setGenerating(false)
    }

    generateSuggestions()
  }, [completedTaskTitle, members])

  const handleSuggestion = useCallback((suggestion: WhatsNextSuggestion) => {
    setDismissed(true)
    onSelectSuggestion(suggestion.suggestedText)
  }, [onSelectSuggestion])

  const handleDismiss = useCallback(() => {
    setDismissed(true)
    onDismiss()
  }, [onDismiss])

  if (dismissed) return null

  return (
    <div className="animate-fade-in-up px-4 pb-3">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/15 dark:to-purple-900/15 border border-indigo-200 dark:border-indigo-800/50 rounded-2xl p-4 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">
              What&apos;s next?
            </span>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 rounded-lg text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-200 hover:bg-indigo-100 dark:hover:bg-indigo-800/30 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {generating ? (
          <div className="flex items-center gap-2 py-2">
            <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
            <span className="text-xs text-indigo-400">Suggesting next steps...</span>
          </div>
        ) : (
          <>
            <p className="text-xs text-indigo-500/70 dark:text-indigo-400/70 mb-2.5">
              Since you completed &ldquo;{completedTaskTitle.length > 30
                ? completedTaskTitle.slice(0, 27) + '...'
                : completedTaskTitle}&rdquo;
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestion(suggestion)}
                  className="flex items-start gap-2.5 px-3 py-2.5 bg-white/70 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-indigo-200/50 dark:border-indigo-700/30 rounded-xl text-left transition-all hover:shadow-sm active:scale-[0.98] group"
                >
                  <span className="text-lg shrink-0">{suggestion.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {suggestion.title}
                    </p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">
                      {suggestion.description}
                    </p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 group-hover:text-indigo-400 shrink-0 mt-0.5 transition-colors" />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
