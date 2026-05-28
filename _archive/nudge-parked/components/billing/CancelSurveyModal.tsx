'use client'

import { useState } from 'react'
import { X, AlertTriangle, Loader2, ChevronDown, ThumbsUp, ThumbsDown, MessageSquare, Send } from 'lucide-react'

export type CancelReason =
  | 'too_expensive'
  | 'missing_features'
  | 'not_using_enough'
  | 'too_complex'
  | 'switching_to_competitor'
  | 'technical_issues'
  | 'family_moved_away'
  | 'privacy_concerns'
  | 'temporary_pause'
  | 'other'

interface CancelSurveyModalProps {
  open: boolean
  loading: boolean
  onClose: () => void
  onBack: () => void
  onComplete: (surveyData: CancelSurveyData) => Promise<void>
}

export interface CancelSurveyData {
  primaryReason: CancelReason
  details: string
  feedback: string
  wouldRecommend: number | null
  alternative: string
}

const REASONS: { value: CancelReason; label: string; icon: string }[] = [
  { value: 'too_expensive',        label: 'Too expensive',              icon: '💰' },
  { value: 'missing_features',     label: 'Missing features I need',   icon: '🧩' },
  { value: 'not_using_enough',     label: 'Not using it enough',        icon: '😴' },
  { value: 'too_complex',          label: 'Too complex / confusing',    icon: '🤯' },
  { value: 'switching_to_competitor', label: 'Switching to another app', icon: '🏃' },
  { value: 'technical_issues',     label: 'Technical issues / bugs',   icon: '🐛' },
  { value: 'family_moved_away',    label: 'Family stopped using it',   icon: '👋' },
  { value: 'privacy_concerns',     label: 'Privacy concerns',          icon: '🔒' },
  { value: 'temporary_pause',      label: 'Just taking a break',       icon: '⏸️' },
  { value: 'other',                label: 'Other reason',               icon: '💬' },
]

export default function CancelSurveyModal({ open, loading, onClose, onBack, onComplete }: CancelSurveyModalProps) {
  const [step, setStep] = useState<'reason' | 'details' | 'feedback'>('reason')
  const [selectedReason, setSelectedReason] = useState<CancelReason | null>(null)
  const [details, setDetails] = useState('')
  const [feedback, setFeedback] = useState('')
  const [wouldRecommend, setWouldRecommend] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (!open) return null

  const handleReasonSelect = (reason: CancelReason) => {
    setSelectedReason(reason)
    setStep('details')
  }

  const handleDetailsNext = () => {
    setStep('feedback')
  }

  const handleSubmit = async () => {
    if (!selectedReason) return
    setSubmitting(true)
    try {
      await onComplete({
        primaryReason: selectedReason,
        details,
        feedback,
        wouldRecommend,
        alternative: '',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleSkip = async () => {
    if (!selectedReason) {
      selectedReason
    }
    setSubmitting(true)
    try {
      await onComplete({
        primaryReason: selectedReason || 'other',
        details,
        feedback,
        wouldRecommend: null,
        alternative: '',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-background border border-border/60 rounded-2xl shadow-elevated max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background z-10 px-6 pt-6 pb-3 border-b border-border/40">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={step === 'reason' ? onBack : () => setStep('reason')}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {step === 'reason' ? '← Back to subscription' : '← Change reason'}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
            <div>
              <h3 className="font-bold text-foreground">We're sorry to see you go</h3>
              <p className="text-xs text-muted-foreground">Help us improve — it only takes a moment</p>
            </div>
          </div>
          {/* Step indicator */}
          <div className="flex gap-1.5 mt-3">
            {['reason', 'details', 'feedback'].map((s, i) => (
              <div
                key={s}
                className={`h-1 rounded-full flex-1 transition-all ${
                  step === s ? 'bg-red-500' : ['reason', 'details', 'feedback'].indexOf(step) > i ? 'bg-red-300' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Primary Reason */}
        {step === 'reason' && (
          <div className="p-6 space-y-2">
            <p className="text-sm font-semibold text-foreground mb-3">What's the main reason you're leaving?</p>
            {REASONS.map((reason) => (
              <button
                key={reason.value}
                onClick={() => handleReasonSelect(reason.value)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left
                  ${selectedReason === reason.value
                    ? 'bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300'
                    : 'bg-secondary/50 hover:bg-secondary border-2 border-transparent text-foreground'
                  }`}
              >
                <span className="text-lg">{reason.icon}</span>
                <span>{reason.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Details */}
        {step === 'details' && (
          <div className="p-6 space-y-4">
            <p className="text-sm font-semibold text-foreground">
              Tell us more{selectedReason ? ` (you selected "${REASONS.find(r => r.value === selectedReason)?.label}")` : ''}
            </p>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="What could we have done better? Any specific issues?"
              className="input-field min-h-[100px] resize-none"
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground">{details.length}/1000</p>
            <div className="flex gap-3">
              <button
                onClick={() => setStep('reason')}
                className="flex-1 btn-secondary text-sm"
              >
                Back
              </button>
              <button
                onClick={handleDetailsNext}
                className="flex-1 btn-primary text-sm"
              >
                {details.trim() ? 'Next' : 'Skip & Next'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Feedback + NPS */}
        {step === 'feedback' && (
          <div className="p-6 space-y-5">
            {/* NPS */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-3">
                How likely would you be to recommend Nudge to a friend?
              </p>
              <div className="flex gap-1.5 justify-center">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <button
                    key={n}
                    onClick={() => setWouldRecommend(n)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                      wouldRecommend === n
                        ? n >= 9
                          ? 'bg-emerald-500 text-white scale-110'
                          : n >= 7
                            ? 'bg-amber-400 text-amber-950 scale-110'
                            : 'bg-red-500 text-white scale-110'
                        : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1 px-1">
                <span className="flex items-center gap-1"><ThumbsDown className="w-3 h-3" /> Not likely</span>
                <span className="flex items-center gap-1">Very likely <ThumbsUp className="w-3 h-3" /></span>
              </div>
            </div>

            {/* Open feedback */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                Any final thoughts?
              </p>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="What would bring you back? Features you'd love to see?"
                className="input-field min-h-[80px] resize-none"
                maxLength={500}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSkip}
                disabled={submitting || loading}
                className="flex-1 btn-secondary text-sm"
              >
                Skip feedback
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting || loading}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-3 px-4 rounded-xl transition-all active:scale-[0.97] flex items-center justify-center gap-2"
              >
                {submitting || loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                ) : (
                  <><Send className="w-4 h-4" /> Submit & Cancel</>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
