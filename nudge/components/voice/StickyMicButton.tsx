'use client'

import { useState, useEffect } from 'react'
import { Mic, X } from 'lucide-react'
import VoiceRecorder from './VoiceRecorder'

// How many pending tasks are in localStorage to show on badge
function getPendingCount(): number {
  if (typeof window === 'undefined') return 0
  try {
    const raw = localStorage.getItem('nudge_voice_tasks')
    if (!raw) return 0
    const tasks = JSON.parse(raw)
    if (!Array.isArray(tasks)) return 0
    return tasks.filter((t: any) => t.status === 'pending' || t.status === undefined).length
  } catch {
    return 0
  }
}

export default function StickyMicButton() {
  const [open, setOpen] = useState(false)
  const [pendingCount, setPendingCount] = useState(0)

  // Refresh count on mount and periodically
  useEffect(() => {
    setPendingCount(getPendingCount())

    const interval = setInterval(() => {
      setPendingCount(getPendingCount())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Listen for storage events (other tabs)
  useEffect(() => {
    const handler = () => setPendingCount(getPendingCount())
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  const handleTranscribed = () => {
    setPendingCount(getPendingCount())
  }

  return (
    <>
      {/* Sticky mic FAB */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-400 text-white shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-200 animate-pulse-slow group"
        aria-label="Record a voice task"
      >
        <Mic size={28} className="group-hover:scale-110 transition-transform" />

        {/* Pending count badge */}
        {pendingCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full shadow-md">
            {pendingCount}
          </span>
        )}
      </button>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full sm:max-w-md bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl p-6 pb-10 shadow-2xl animate-slide-up">
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              New Voice Task
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Tap the mic and speak naturally. Nudge will create your task.
            </p>

            <VoiceRecorder
              onTranscribed={(text, taskCreated) => {
                handleTranscribed()
                if (taskCreated) {
                  setTimeout(() => setOpen(false), 2000)
                }
              }}
              mode="full"
              autoSubmit
              requireConfirmation={true}
              onCancel={() => setOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Custom animations */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.5); }
          50% { box-shadow: 0 0 0 12px rgba(34, 197, 94, 0); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2.5s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        @media (min-width: 640px) {
          @keyframes slide-up {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        }
      `}</style>
    </>
  )
}
