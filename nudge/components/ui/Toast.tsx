'use client'

import { useEffect, useState, createContext, useContext, useCallback } from 'react'
import { CheckCircle, AlertCircle, X, Info, Bell } from 'lucide-react'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

interface ToastContextType {
  show: (message: string, type?: Toast['type'], duration?: number) => void
  success: (message: string) => void
  error: (message: string) => void
  info: (message: string) => void
}

const ToastContext = createContext<ToastContextType>({
  show: () => {},
  success: () => {},
  error: () => {},
  info: () => {},
})

export function useToast() {
  return useContext(ToastContext)
}

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: Bell,
}

const colors = {
  success: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300',
  error: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800 text-red-800 dark:text-red-300',
  info: 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800 text-indigo-800 dark:text-indigo-300',
  warning: 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300',
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const show = useCallback((message: string, type: Toast['type'] = 'info', duration = 4000) => {
    const id = Math.random().toString(36).slice(2, 9)
    setToasts((prev) => [...prev, { id, message, type, duration }])
  }, [])

  const success = useCallback((message: string) => show(message, 'success'), [show])
  const error = useCallback((message: string) => show(message, 'error', 6000), [show])
  const info = useCallback((message: string) => show(message, 'info'), [show])

  return (
    <ToastContext.Provider value={{ show, success, error, info }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 w-[90vw] max-w-sm pointer-events-none">
        {toasts.map((toast) => {
          const Icon = icons[toast.type]
          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-sm animate-slide-up ${colors[toast.type]}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <p className="text-sm font-medium flex-1">{toast.message}</p>
              <button onClick={() => removeToast(toast.id)} className="shrink-0 opacity-60 hover:opacity-100 transition-opacity">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
