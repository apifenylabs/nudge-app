'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Users, ArrowLeft, X, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { supabase as supabaseFn } from '@/lib/supabase'
import {
  updateOnboardingState,
  trackStepCompleted,
  trackOnboardingSeen,
  shouldShowCondensedOnboarding,
} from '@/lib/onboarding-db'
import OnboardingStepIndicator from '@/components/onboarding/OnboardingStepIndicator'
import StepFamilyName from '@/components/onboarding/StepFamilyName'
import StepCreateTask from '@/components/onboarding/StepCreateTask'
import StepInviteFamily from '@/components/onboarding/StepInviteFamily'
import StepConnectTelegram from '@/components/onboarding/StepConnectTelegram'
import OnboardingComplete from '@/components/onboarding/OnboardingComplete'

const FULL_STEPS = [
  { number: 1, title: 'Family', subtitle: 'Name your group' },
  { number: 2, title: 'First Task', subtitle: 'Create a nudge' },
  { number: 3, title: 'Invite', subtitle: 'Add family' },
  { number: 4, title: 'Telegram', subtitle: 'Connect' },
  { number: 5, title: 'Done', subtitle: 'All set' },
]

// Condensed steps for returning users who skipped
const CONDENSED_STEPS = [
  { number: 1, title: 'First Task', subtitle: 'Create a nudge' },
  { number: 2, title: 'Telegram', subtitle: 'Connect' },
  { number: 3, title: 'Done', subtitle: 'All set' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(true)
  const [familyId, setFamilyId] = useState<string | null>(null)
  const [familyEmoji, setFamilyEmoji] = useState('👨‍👩‍👧‍👦')
  const [inviteLink, setInviteLink] = useState<string | undefined>()
  const [userId, setUserId] = useState<string | null>(null)
  const [condensed, setCondensed] = useState(false)
  const [slideDir, setSlideDir] = useState<'forward' | 'backward'>('forward')
  const containerRef = useRef<HTMLDivElement>(null)

  // Track seen count
  useEffect(() => {
    trackOnboardingSeen()
  }, [])

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabaseFn().auth.getUser()
      if (!user) {
        router.push('/auth/login')
        return
      }
      setUserId(user.id)

      // Check if user already has a family
      const { data: membership } = await supabaseFn()
        .from('family_members')
        .select('family_id')
        .eq('user_id', user.id)
        .limit(1)
        .single()

      if (membership) {
        setFamilyId(membership.family_id)
        // Check if we should show condensed onboarding
        if (shouldShowCondensedOnboarding()) {
          setCondensed(true)
          setStep(1) // Skip family creation, go to task
        } else {
          setStep(2) // Family already exists — skip to task creation
        }
      }

      setLoading(false)
    }
    init()
  }, [router])

  const handleFamilyName = async (name: string, emoji: string) => {
    const { data: { user } } = await supabaseFn().auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { data: existing } = await supabaseFn()
      .from('family_members')
      .select('family_id')
      .eq('user_id', user.id)
      .limit(1)
      .single()

    if (existing) {
      setFamilyId(existing.family_id)
      trackStepCompleted(1)
      advanceStep()
      return
    }

    const { data: family, error: familyError } = await supabaseFn()
      .from('families')
      .insert({ name, owner_id: user.id })
      .select()
      .single()

    if (familyError) throw familyError

    const { error: memberError } = await supabaseFn()
      .from('family_members')
      .insert({ family_id: family.id, user_id: user.id, role: 'owner' })

    if (memberError) throw memberError

    setFamilyId(family.id)
    setFamilyEmoji(emoji)
    trackStepCompleted(1)

    // Sync to server
    await fetch('/api/onboarding/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'step', step: 1 }),
    }).catch(() => {})

    advanceStep()
  }

  const handleCreateTask = async (taskText: string) => {
    if (!taskText.trim() || !familyId) {
      trackStepCompleted(2)
      advanceStep()
      return
    }
    const { data: { user } } = await supabaseFn().auth.getUser()
    if (!user) return

    await supabaseFn().from('tasks').insert({
      family_id: familyId,
      title: taskText.trim(),
      created_by: user.id,
      status: 'pending',
      priority: 'medium',
    })

    trackStepCompleted(2)
    await fetch('/api/onboarding/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'step', step: 2 }),
    }).catch(() => {})

    advanceStep()
  }

  const handleSendInvite = async (email: string) => {
    if (!familyId) return

    // Generate invite code
    const { data: code, error: codeError } = await supabaseFn()
      .from('family_invite_codes')
      .insert({
        family_id: familyId,
        created_by: (await supabaseFn().auth.getUser()).data.user?.id,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      })
      .select('code')
      .single()

    if (codeError) throw codeError

    // Non-blocking email send
    await fetch('/api/family/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, familyId }),
    }).catch(() => {})
  }

  const advanceStep = () => {
    const maxStep = condensed ? 3 : 5
    setSlideDir('forward')
    setStep((s) => Math.min(s + 1, maxStep))
  }

  // Generate invite link when we have familyId and reach invite step
  useEffect(() => {
    if (familyId && step === (condensed ? 0 : 3)) {
      setInviteLink(`${window.location.origin}/join/${familyId}`)
    }
  }, [familyId, step, condensed])

  const handleBack = useCallback(() => {
    if (step > 1) {
      setSlideDir('backward')
      setStep((s) => s - 1)
    }
  }, [step])

  const handleSkip = useCallback(async () => {
    // Record skip
    updateOnboardingState({ skipped_at: new Date().toISOString() })
    await fetch('/api/onboarding/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'skip' }),
    }).catch(() => {})
    router.push('/dashboard')
  }, [router])

  const currentSteps = condensed ? CONDENSED_STEPS : FULL_STEPS
  const displayedSteps = currentSteps.filter((s) => s.number < (condensed ? 3 : 5))
  const maxStep = condensed ? 3 : 5

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Setting things up...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/30 flex items-center justify-center p-4">
      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="fixed top-4 right-4 z-50 btn-ghost text-xs text-muted-foreground flex items-center gap-1"
      >
        <X className="w-3.5 h-3.5" />
        Skip
      </button>

      {/* Back button */}
      {step > 1 && step < maxStep && (
        <button
          onClick={handleBack}
          className="fixed top-4 left-4 z-50 btn-ghost text-xs text-muted-foreground flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </button>
      )}

      {/* Logo */}
      <Link href="/" className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center shadow-md shadow-indigo-500/20">
          <Users className="w-4 h-4 text-white" />
        </div>
        <span className="text-lg font-bold text-foreground">Nudge</span>
      </Link>

      <div className="w-full max-w-lg mt-16">
        {/* Final step — celebration */}
        {step === maxStep ? (
          <div className={`transition-all duration-400 ${
            slideDir === 'forward' ? 'animate-fade-in-up' : ''
          }`}>
            <OnboardingComplete />
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-indigo-500/20">
                {step === 1 && !condensed ? (
                  familyEmoji ? (
                    <span className="text-2xl">{familyEmoji}</span>
                  ) : (
                    <Users className="w-7 h-7 text-white" />
                  )
                ) : step === (condensed ? 1 : 2) ? (
                  <span className="text-2xl">📋</span>
                ) : step === (condensed ? 2 : 3) ? (
                  <span className="text-2xl">👋</span>
                ) : (
                  <MessageSquare className="w-7 h-7 text-white" />
                )}
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {condensed ? 'Finish Setting Up' : 'Set Up Your Family'}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {condensed
                  ? 'A few quick steps to get started'
                  : 'A few steps to a calmer household'
                }
              </p>
            </div>

            {/* Progress indicator */}
            <OnboardingStepIndicator
              steps={displayedSteps}
              currentStep={step}
            />

            {/* Step content with slide animation */}
            <div
              ref={containerRef}
              className="glass-card rounded-2xl p-6 md:p-8 overflow-hidden"
              key={`step-${step}`}
            >
              {/* Family Name step */}
              {step === 1 && !condensed && (
                <StepFamilyName onComplete={handleFamilyName} />
              )}

              {/* Create Task — step 1 in condensed, step 2 in full */}
              {(step === 1 && condensed) || (step === 2 && !condensed) ? (
                <StepCreateTask onComplete={handleCreateTask} />
              ) : null}

              {/* Invite Family — only in full flow, step 3 */}
              {step === 3 && !condensed && (
                <StepInviteFamily
                  inviteLink={inviteLink}
                  onSkip={() => { trackStepCompleted(3); advanceStep() }}
                  onSendInvite={handleSendInvite}
                />
              )}

              {/* Connect Telegram — step 2 in condensed, step 4 in full */}
              {(step === 2 && condensed) || (step === 4 && !condensed) ? (
                <StepConnectTelegram
                  onComplete={() => {
                    trackStepCompleted(condensed ? 2 : 4)
                    advanceStep()
                  }}
                  userId={userId || undefined}
                />
              ) : null}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
