'use client'

import { useRouter } from 'next/navigation'
import PullToRefresh from '@/components/ui/PullToRefresh'

export default function DashboardContent({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const handleRefresh = async () => {
    router.refresh()
    // Small delay to show the refresh indicator
    await new Promise(r => setTimeout(r, 400))
  }

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      {children}
    </PullToRefresh>
  )
}
