'use client'

import dynamic from 'next/dynamic'

// Client component wrapper (no SSR for tour — avoids hydration issues with localStorage)
const DashboardTour = dynamic(() => import('@/components/onboarding/DashboardTour'), {
  ssr: false,
})

export default function DashboardTourWrapper() {
  return <DashboardTour onDismiss={() => {}} />
}
