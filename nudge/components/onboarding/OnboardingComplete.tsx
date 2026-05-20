'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Sparkles, ArrowRight, Users, MessageSquare, ListChecks } from 'lucide-react'

export default function OnboardingComplete() {
  const router = useRouter()
  const [showContent, setShowContent] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animate: success check → confetti → content
    const t1 = setTimeout(() => setShowContent(true), 600)
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress((p) => Math.min(p + 33, 100))
    }, 400)

    return () => {
      clearTimeout(t1)
      clearInterval(interval)
    }
  }, [])

  const handleGoToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      {/* Success animation */}
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center animate-fade-in-up">
          <Check className="w-10 h-10 text-emerald-500 animate-fade-in" />
        </div>
        {/* Sparkle decorations */}
        <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-amber-400 animate-fade-in" />
      </div>

      <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-in-up">
        You&apos;re all set! 🎉
      </h1>
      <p className="text-muted-foreground mb-8 animate-fade-in-up">
        Your family command center is ready to go.
      </p>

      {/* Setup progress */}
      {showContent && (
        <div className="w-full max-w-sm mb-8 space-y-4 animate-fade-in-up">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Setup progress</span>
            <span className="font-semibold text-foreground">{progress}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Quick recap */}
          <div className="glass-card p-4 text-left space-y-2.5">
            <RecapItem icon={Users} text="Family created" done />
            <RecapItem icon={ListChecks} text="First task created" done={true} />
            <RecapItem icon={MessageSquare} text="Telegram connected" done={false} />
          </div>

          <button
            onClick={handleGoToDashboard}
            className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

function RecapItem({
  icon: Icon,
  text,
  done,
}: {
  icon: React.ComponentType<{ className?: string }>
  text: string
  done: boolean
}) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`w-6 h-6 rounded-lg flex items-center justify-center ${
          done
            ? 'bg-emerald-100 dark:bg-emerald-900/30'
            : 'bg-secondary'
        }`}
      >
        {done ? (
          <Check className="w-3.5 h-3.5 text-emerald-500" />
        ) : (
          <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        )}
      </div>
      <span className={`text-sm ${done ? 'text-foreground' : 'text-muted-foreground'}`}>
        {text}
      </span>
      {!done && (
        <span className="text-2xs text-indigo-500 ml-auto font-medium">Optional</span>
      )}
    </div>
  )
}
