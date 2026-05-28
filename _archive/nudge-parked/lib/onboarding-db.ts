// Client-side onboarding state manager
// Tracks onboarding progress across sessions using localStorage + server sync

const ONBOARDING_STATE_KEY = 'nudge_onboarding_state'

export interface OnboardingState {
  completed?: boolean           // Full onboarding done
  skipped_at?: string | null    // ISO timestamp of last skip
  completed_steps?: number[]    // Steps completed (1-5)
  family_created?: boolean
  first_task_created?: boolean
  invites_sent?: number
  telegram_connected?: boolean
  seen_count?: number            // Times user viewed onboarding
  dismissed_count?: number       // Times user skipped/dismissed
  last_seen_at?: string | null   // ISO timestamp
}

export function getOnboardingState(): OnboardingState {
  if (typeof window === 'undefined') return {}
  try {
    const raw = localStorage.getItem(ONBOARDING_STATE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function updateOnboardingState(partial: Partial<OnboardingState>): OnboardingState {
  if (typeof window === 'undefined') return partial
  const current = getOnboardingState()
  const updated = { ...current, ...partial, last_seen_at: new Date().toISOString() }
  localStorage.setItem(ONBOARDING_STATE_KEY, JSON.stringify(updated))
  return updated
}

export function clearOnboardingState() {
  if (typeof window === 'undefined') return
  localStorage.removeItem(ONBOARDING_STATE_KEY)
}

// If user skipped onboarding -> show a condensed version on next visit
export function shouldShowCondensedOnboarding(): boolean {
  const state = getOnboardingState()
  if (state.completed) return false
  if (state.skipped_at && state.seen_count && state.seen_count > 1) {
    // Show condensed version after 2nd skip
    return true
  }
  return false
}

export function trackStepCompleted(step: number) {
  const state = getOnboardingState()
  const completedSteps = [...(state.completed_steps || [])]
  if (!completedSteps.includes(step)) {
    completedSteps.push(step)
  }
  updateOnboardingState({ completed_steps: completedSteps })
}

export function trackOnboardingSeen() {
  const state = getOnboardingState()
  updateOnboardingState({
    seen_count: (state.seen_count || 0) + 1,
  })
}
