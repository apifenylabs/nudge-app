'use client'

import { X, PartyPopper } from 'lucide-react'
import { useEffect, useState } from 'react'
import ShareCard from './ShareCard'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  config: {
    taskTitle: string
    taskDescription?: string
    completedBy: string
    completedAt: string
    familyName?: string
    priority?: 'low' | 'medium' | 'high' | 'urgent'
    assignee?: string
  } | null
}

/**
 * Full-screen share celebration modal.
 * Shows a confetti -> card flow for completed tasks.
 */
export default function ShareModal({ isOpen, onClose, config }: ShareModalProps) {
  const [showConfetti, setShowConfetti] = useState(true)
  const [showCard, setShowCard] = useState(false)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      setShowCard(false)

      // Auto-transition from confetti to card after 1.5s
      const timer = setTimeout(() => {
        setShowConfetti(false)
        setShowCard(true)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  if (!isOpen || !config) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => {
          if (showCard) onClose()
        }}
      />

      {/* Confetti phase */}
      {showConfetti && (
        <div className="relative z-10 text-center animate-fade-in-up px-4">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-elevated p-8 max-w-sm mx-auto">
            <div className="mb-4 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center shadow-lg animate-bounce">
                <PartyPopper className="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Task Complete! 🎉
            </h2>
            <p className="text-sm text-muted-foreground">
              &ldquo;{config.taskTitle}&rdquo;
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Share your accomplishment with the family
            </p>
          </div>
        </div>
      )}

      {/* Card phase */}
      {showCard && (
        <div className="relative z-10 animate-fade-in-up px-4 max-w-sm w-full">
          <ShareCard
            config={config}
            onClose={onClose}
          />
        </div>
      )}
    </div>
  )
}
