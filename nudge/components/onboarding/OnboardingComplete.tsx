'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, Sparkles, ArrowRight, Users, MessageSquare, ListChecks, Zap, Mic } from 'lucide-react'

export default function OnboardingComplete() {
  const router = useRouter()
  const [phase, setPhase] = useState<'loading' | 'check' | 'content' | 'transitioning'>('loading')
  const [progress, setProgress] = useState(0)

  // Progressive reveal animation
  useEffect(() => {
    // Phase 1: Pause for loading feel
    const t0 = setTimeout(() => setPhase('check'), 500)

    // Phase 2: Success check appears
    const t1 = setTimeout(() => setPhase('content'), 1200)

    // Animate progress bar steadily
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return p + 5
      })
    }, 60)

    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
      clearInterval(interval)
    }
  }, [])

  const handleGoToDashboard = () => {
    setPhase('transitioning')
    // Brief pause for exit animation
    setTimeout(() => router.push('/dashboard'), 400)
  }

  const fadeClass = phase === 'transitioning'
    ? 'opacity-0 scale-95 transition-all duration-400'
    : 'opacity-100 scale-100 transition-all duration-500'

  return (
    <div className={`min-h-[65vh] flex flex-col items-center justify-center text-center px-4 ${fadeClass}`}>
      {/* Success animation */}
      <div className="relative mb-8">
        {phase === 'loading' && (
          <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center animate-pulse">
            <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {phase === 'check' && (
          <div className="w-20 h-20 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center animate-fade-in-up">
            <Check className="w-10 h-10 text-emerald-500 animate-fade-in" />
          </div>
        )}

        {phase === 'content' && (
          <>
            <div className="w-20 h-20 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center animate-fade-in-up">
              <Check className="w-10 h-10 text-emerald-500 animate-fade-in" />
            </div>
            {/* Sparkle decorations */}
            <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-amber-400 animate-fade-in" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4">
              <span className="text-sm animate-bounce inline-block">✨</span>
            </div>
          </>
        )}
      </div>

      {phase === 'content' && (
        <>
          <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-in-up">
            You&apos;re all set! 🎉
          </h1>
          <p className="text-muted-foreground mb-8 animate-fade-in-up">
            Your family command center is ready to go.
          </p>
        </>
      )}

      {/* Setup progress + recap */}
      {(phase === 'content' || phase === 'transitioning') && (
        <div className="w-full max-w-sm mb-8 space-y-4 animate-fade-in-up">
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Setup progress</span>
            <span className="font-semibold text-foreground">{Math.min(progress, 100)}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-indigo-500 to-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          {/* Quick recap */}
          <div className="glass-card p-4 text-left space-y-2.5">
            <RecapItem icon={Users} text="Family created" done delay={100} />
            <RecapItem icon={ListChecks} text="First task created" done delay={300} />
            <RecapItem icon={MessageSquare} text="Telegram connected" done={false} delay={500} />
          </div>

          {/* Feature highlights */}
          <div className="space-y-2 animate-fade-in-up">
            <QuickTip icon={Mic} text="Try voice recognition in the task creator" />
            <QuickTip icon={Zap} text="Set recurring tasks for daily routines" />
          </div>

          <button
            onClick={handleGoToDashboard}
            className="btn-primary w-full flex items-center justify-center gap-2 mt-4 animate-fade-in-up"
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Alternative: Dashboard tour trigger */}
          <p className="text-2xs text-center text-muted-foreground">
            A quick tour will show you around the dashboard
          </p>
        </div>
      )}
    </div>
  )
}

function RecapItem({
  icon: Icon,
  text,
  done,
  delay,
}: {
  icon: React.ComponentType<{ className?: string }>
  text: string
  done: boolean
  delay?: number
}) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay || 0)
    return () => clearTimeout(timer)
  }, [delay])

  if (!visible) return null

  return (
    <div className="flex items-center gap-2.5 animate-fade-in-up">
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

function QuickTip({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>
  text: string
}) {
  return (
    <div className="flex items-center gap-2 p-2.5 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl border border-indigo-100/30 dark:border-indigo-900/20">
      <div className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
        <Icon className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
      </div>
      <span className="text-xs text-muted-foreground">{text}</span>
    </div>
  )
}
