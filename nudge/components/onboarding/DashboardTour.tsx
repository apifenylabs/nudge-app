'use client'

import { useState, useEffect } from 'react'
import { X, ArrowLeft, ArrowRight, Mic, ListChecks, Users, Bell } from 'lucide-react'

interface TourStep {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  highlight?: string // CSS selector for element to highlight
}

const tourSteps: TourStep[] = [
  {
    title: 'Your Task Board',
    description: 'This is where all family tasks live. See what\'s due, who\'s responsible, and mark things done.',
    icon: ListChecks,
    color: 'from-indigo-600 to-indigo-400',
  },
  {
    title: 'Add Tasks with Voice',
    description: 'Tap the mic button or send a voice message to @NudgeFamilyBot on Telegram. Nudge parses it automatically.',
    icon: Mic,
    color: 'from-blue-500 to-blue-400',
  },
  {
    title: 'Family Members',
    description: 'Invite your family so everyone sees the same board. No more "Did you see my text?"',
    icon: Users,
    color: 'from-emerald-500 to-teal-400',
  },
  {
    title: 'Smart Reminders',
    description: 'Nudge sends reminders at the right time. Tasks escalate if they\'re not done. Weekly scorecards keep everyone motivated.',
    icon: Bell,
    color: 'from-amber-400 to-orange-400',
  },
]

export default function DashboardTour({ onDismiss }: { onDismiss: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Check localStorage for tour completion
    const seen = localStorage.getItem('nudge_tour_seen')
    if (!seen) {
      // Stagger entrance
      const timer = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    localStorage.setItem('nudge_tour_seen', 'true')
    setTimeout(() => onDismiss(), 300)
  }

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep((s) => s + 1)
    } else {
      handleDismiss()
    }
  }

  // If already seen tour, render nothing
  if (typeof window !== 'undefined' && localStorage.getItem('nudge_tour_seen')) {
    return null
  }

  if (dismissed) return null

  const step = tourSteps[currentStep]
  const Icon = step.icon
  const isLast = currentStep === tourSteps.length - 1

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 transition-all duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleDismiss}
      />

      {/* Tour card */}
      <div className="relative glass-card rounded-2xl p-6 max-w-sm w-full animate-fade-in-up shadow-elevated">
        {/* Close */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-secondary transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg`}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          {step.description}
        </p>

        {/* Progress and navigation */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {tourSteps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentStep
                    ? 'bg-indigo-500 w-6'
                    : i < currentStep
                      ? 'bg-indigo-300'
                      : 'bg-secondary'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {!isLast ? (
              <button
                onClick={handleDismiss}
                className="btn-ghost text-xs"
              >
                Skip
              </button>
            ) : null}
            <button
              onClick={handleNext}
              className="btn-primary text-sm px-5 py-2"
            >
              {isLast ? 'Got it!' : 'Next'}
              {!isLast && <ArrowRight className="w-3.5 h-3.5 ml-1 inline" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
