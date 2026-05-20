'use client'

import { Check } from 'lucide-react'

export interface Step {
  number: number
  title: string
  subtitle: string
}

export default function OnboardingStepIndicator({
  steps,
  currentStep,
}: {
  steps: Step[]
  currentStep: number
}) {
  return (
    <div className="mb-10">
      {/* Step circles row */}
      <div className="flex items-center justify-between mb-4">
        {steps.map((s) => {
          const isActive = currentStep >= s.number
          const isComplete = currentStep > s.number
          return (
            <div key={s.number} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                  isComplete
                    ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20 scale-100'
                    : isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 scale-110 ring-2 ring-indigo-300/50'
                      : 'bg-secondary text-muted-foreground scale-95'
                }`}
              >
                {isComplete ? (
                  <Check className="w-5 h-5 animate-fade-in" />
                ) : (
                  <span className="text-sm font-bold">{s.number}</span>
                )}
              </div>
              <span
                className={`text-[11px] font-semibold tracking-wide uppercase transition-colors duration-300 ${
                  isActive ? 'text-foreground' : 'text-muted-foreground/60'
                }`}
              >
                {s.title}
              </span>
            </div>
          )
        })}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}
