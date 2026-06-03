'use client'

import { useEffect, useState } from 'react'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

interface ToastProps {
  message: string
  type?: ToastType
  duration?: number
  onClose: () => void
}

export default function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onClose, 300)
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const styles: Record<ToastType, { bg: string; border: string; icon: React.ReactNode; text: string }> = {
    success: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      icon: <CheckCircle size={18} className="text-emerald-500" />,
      text: 'text-emerald-800',
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: <AlertCircle size={18} className="text-red-500" />,
      text: 'text-red-800',
    },
    info: {
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      icon: <Info size={18} className="text-sky-500" />,
      text: 'text-sky-800',
    },
  }

  const s = styles[type]

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className={`flex items-center gap-3 px-5 py-3 rounded-xl border shadow-lg shadow-black/5 ${s.bg} ${s.bg}`}>
        {s.icon}
        <span className={`text-sm font-medium ${s.text}`}>{message}</span>
        <button onClick={() => { setVisible(false); setTimeout(onClose, 300) }} className={`ml-2 ${s.text} opacity-60 hover:opacity-100`}>
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null)

  const showToast = (message: string, type: ToastType = 'info') => {
    setToast({ message, type })
  }

  const ToastComponent = toast ? (
    <Toast
      message={toast.message}
      type={toast.type}
      onClose={() => setToast(null)}
    />
  ) : null

  return { showToast, ToastComponent }
}
