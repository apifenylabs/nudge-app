'use client'

import { MessageSquare, Check, ArrowRight, Smartphone, Mic, Bell } from 'lucide-react'

export default function StepConnectTelegram({
  onComplete,
}: {
  onComplete: () => void
}) {
  const benefits = [
    { icon: Mic, text: 'Send tasks via voice or text messages' },
    { icon: Bell, text: 'Get reminders and notifications on the go' },
    { icon: Smartphone, text: 'Track completions from anywhere' },
  ]

  return (
    <div className="animate-fade-in-up">
      <h2 className="text-xl font-bold text-foreground mb-1">Connect Telegram</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Add tasks from anywhere. Just send a message to the bot.
      </p>

      {/* Bot card */}
      <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-2xl border border-blue-100/50 dark:border-blue-900/30 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold text-foreground">@NudgeFamilyBot</p>
          <p className="text-xs text-muted-foreground">Available on Telegram</p>
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-3 mb-6">
        {benefits.map((benefit, i) => {
          const Icon = benefit.icon
          return (
            <div key={i} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl animate-fade-in-up stagger-{i+1}">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-sm text-foreground">{benefit.text}</span>
            </div>
          )
        })}
      </div>

      {/* Quick connect hint */}
      <div className="p-4 bg-secondary rounded-xl mb-6">
        <p className="text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">Pro tip:</span> After connecting, just send
          &ldquo;Remind Jake to take out trash at 8pm&rdquo; to the bot. Nudge handles everything.
        </p>
      </div>

      <div className="space-y-3">
        <a
          href="https://t.me/NudgeFamilyBot"
          target="_blank"
          rel="noreferrer"
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4" />
          Connect to Telegram
        </a>

        <button
          onClick={onComplete}
          className="btn-ghost w-full text-sm text-muted-foreground"
        >
          Skip, I&rsquo;ll do it later
        </button>
      </div>
    </div>
  )
}
