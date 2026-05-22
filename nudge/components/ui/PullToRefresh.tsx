'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { Loader2, ArrowDown } from 'lucide-react'

interface PullToRefreshProps {
  /** Called when user pulls down past threshold */
  onRefresh: () => Promise<void> | void
  /** Threshold in pixels before refresh triggers (default 80) */
  threshold?: number
  /** Pull resistance (0-1), lower = harder to pull (default 0.4) */
  resistance?: number
  /** Children to render inside the container */
  children: React.ReactNode
}

type PullState = 'idle' | 'pulling' | 'ready' | 'refreshing'

export default function PullToRefresh({
  onRefresh,
  threshold = 80,
  resistance = 0.4,
  children,
}: PullToRefreshProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pullStartY = useRef(0)
  const pullOffset = useRef(0)
  const [pullState, setPullState] = useState<PullState>('idle')
  const [pullDistance, setPullDistance] = useState(0)

  const handleTouchStart = useCallback((e: TouchEvent) => {
    // Only activate when at the very top of the page
    if (window.scrollY > 0) return
    // Only with single finger
    if (e.touches.length !== 1) return
    // Don't interfere with scrollable elements inside
    const target = e.target as HTMLElement
    if (target.closest('[data-no-pull]')) return

    pullStartY.current = e.touches[0].clientY
    pullOffset.current = 0
    setPullState('pulling')
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (pullState !== 'pulling' && pullState !== 'ready') return

    const currentY = e.touches[0].clientY
    const diff = currentY - pullStartY.current

    if (diff < 0) {
      // Scrolling up — reset
      setPullDistance(0)
      setPullState('idle')
      return
    }

    const resisted = diff * resistance
    pullOffset.current = resisted
    setPullDistance(resisted)

    if (resisted >= threshold) {
      setPullState('ready')
    } else {
      setPullState('pulling')
    }
  }, [pullState, threshold, resistance])

  const handleTouchEnd = useCallback(async (e: TouchEvent) => {
    if (pullState === 'ready') {
      setPullState('refreshing')
      try {
        await onRefresh()
      } finally {
        setPullState('idle')
        setPullDistance(0)
        pullOffset.current = 0
      }
    } else {
      // Snap back
      setPullState('idle')
      setPullDistance(0)
      pullOffset.current = 0
    }
  }, [pullState, onRefresh])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  // Keyboard: pull-to-refresh via Ctrl+R on mobile-sized
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'r' && (e.ctrlKey || e.metaKey) && window.innerWidth < 768) {
        e.preventDefault()
        setPullState('refreshing')
        Promise.resolve(onRefresh()).finally(() => {
          setPullState('idle')
        })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onRefresh])

  // Determine indicator appearance
  const indicatorHeight = pullState === 'refreshing' ? 48 : Math.min(pullDistance, 80)

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Pull indicator */}
      <div
        className="flex items-center justify-center w-full transition-all duration-200 ease-out"
        style={{
          height: `${indicatorHeight}px`,
          opacity: pullState === 'refreshing' ? 1 : Math.min(pullDistance / threshold, 1),
        }}
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {pullState === 'refreshing' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
              <span>Refreshing...</span>
            </>
          ) : pullState === 'ready' ? (
            <>
              <ArrowDown className="w-4 h-4 text-indigo-500 animate-bounce" />
              <span className="font-medium text-indigo-600 dark:text-indigo-400">Release to refresh</span>
            </>
          ) : (
            <>
              <ArrowDown
                className="w-4 h-4 transition-transform"
                style={{
                  transform: `rotate(${Math.min(pullDistance / threshold, 1) * 180}deg)`,
                }}
              />
              <span>Pull to refresh</span>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        className="transition-transform duration-200 ease-out"
        style={{
          transform: `translateY(${pullState === 'refreshing' ? 48 : pullDistance}px)`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
