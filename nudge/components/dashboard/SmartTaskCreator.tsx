'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import {
  Mic, Square, Loader2, CheckCircle, AlertCircle, Sparkles,
  User, Calendar, Flag, ArrowRight, X, RefreshCw, Tag, Clock,
  ChevronDown, ChevronUp
} from 'lucide-react'
import { DAYS_OF_WEEK, DayOfWeek, dayAbbreviation, dayLetter, recurrenceDescription, recurrenceLabel, RECURRENCE_OPTIONS } from '@/lib/recurrence'


interface ParsedTask {
  title: string
  description?: string
  assigned_to?: string | null
  due_date?: string | null
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category?: string
  is_recurring?: boolean
  recurrence_pattern?: string
  recurrence_config?: {
    days_of_week?: string[]
    day_of_month?: number
  } | null
}

interface FamilyMember {
  id: string
  name: string
}

interface SmartTaskCreatorProps {
  familyId: string
  userId: string
  userName?: string
  familyName?: string
  members: FamilyMember[]
  onTaskCreated: () => void
  initialText?: string
  autoOpen?: boolean
  onClose?: () => void
}

type CreatorStep = 'input' | 'parsing' | 'preview' | 'creating' | 'done' | 'error'

const PRIORITY_ICONS: Record<string, { icon: string; color: string; label: string }> = {
  low: { icon: '🟢', color: 'text-green-600 bg-green-50 dark:bg-green-900/20', label: 'Low' },
  medium: { icon: '🟡', color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20', label: 'Medium' },
  high: { icon: '🟠', color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20', label: 'High' },
  urgent: { icon: '🔴', color: 'text-red-600 bg-red-50 dark:bg-red-900/20', label: 'Urgent' },
}

const CATEGORY_OPTIONS = [
  { value: '', label: 'No category', icon: '📋' },
  { value: 'chores', label: 'Chores', icon: '🧹' },
  { value: 'shopping', label: 'Shopping', icon: '🛒' },
  { value: 'appointments', label: 'Appointments', icon: '📅' },
  { value: 'home', label: 'Home', icon: '🏠' },
  { value: 'kids', label: 'Kids', icon: '👶' },
  { value: 'pets', label: 'Pets', icon: '🐾' },
  { value: 'school', label: 'School', icon: '📚' },
  { value: 'health', label: 'Health', icon: '💪' },
  { value: 'finance', label: 'Finance', icon: '💰' },
  { value: 'social', label: 'Social', icon: '🎉' },
  { value: 'work', label: 'Work', icon: '💼' },
  { value: 'fitness', label: 'Fitness', icon: '🏃' },
]

const QUICK_SUGGESTIONS = [
  'Buy groceries: milk, eggs, bread',
  'Remind Jake to take out trash tonight',
  'Dad needs to call plumber tomorrow',
  'Clean garage this weekend',
  'Pay electricity bill before Friday',
]

const DATE_PRESETS = [
  { key: '', label: '📅 No date' },
  { key: 'today', label: '📅 Today' },
  { key: 'tomorrow', label: '📅 Tomorrow' },
  { key: 'weekend', label: '📅 This weekend' },
  { key: 'next-week', label: '📅 Next week' },
]

function getPresetDate(key: string): string {
  const now = new Date()
  const today = now.toISOString().split('T')[0]
  if (key === 'today') return today
  if (key === 'tomorrow') return new Date(now.getTime() + 86400000).toISOString().split('T')[0]
  if (key === 'weekend') {
    const sat = new Date(now)
    sat.setDate(sat.getDate() + ((6 - sat.getDay() + 7) % 7))
    return sat.toISOString().split('T')[0]
  }
  if (key === 'next-week') {
    const nw = new Date(now)
    nw.setDate(nw.getDate() + 7)
    return nw.toISOString().split('T')[0]
  }
  return ''
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    const today = new Date(); today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1)
    if (d.getTime() === today.getTime()) return 'Today'
    if (d.getTime() === tomorrow.getTime()) return 'Tomorrow'
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  } catch { return dateStr }
}

export default function SmartTaskCreator({
  familyId, userId, userName, familyName, members,
  onTaskCreated, initialText, autoOpen = false, onClose,
}: SmartTaskCreatorProps) {
  const [isOpen, setIsOpen] = useState(autoOpen || !!initialText)
  const [step, setStep] = useState<CreatorStep>('input')
  const [textInput, setTextInput] = useState(initialText || '')
  const [parsedTask, setParsedTask] = useState<ParsedTask | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editAssignee, setEditAssignee] = useState('')
  const [editDueDate, setEditDueDate] = useState('')
  const [editPriority, setEditPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('medium')
  const [editCategory, setEditCategory] = useState('')
  const [editRecurrence, setEditRecurrence] = useState('')
  const [editDaysOfWeek, setEditDaysOfWeek] = useState<DayOfWeek[]>([])
  const [editDayOfMonth, setEditDayOfMonth] = useState(new Date().getDate())
  const [recurrenceExpanded, setRecurrenceExpanded] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const close = useCallback(() => {
    setIsOpen(false)
    setStep('input')
    setTextInput('')
    setParsedTask(null)
    setErrorMsg('')
    onClose?.()
  }, [onClose])

  // NLP parse
  const parseTask = useCallback(async (text: string) => {
    if (!text.trim()) return
    setStep('parsing')
    try {
      const res = await fetch('/api/tasks/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim(), userId, familyId }),
      })
      if (!res.ok) throw new Error('Parse failed')
      const data = await res.json()
      const p = data.parsed
      setParsedTask(p)
      setEditTitle(p.title || '')
      setEditAssignee(p.assigned_to || '')
      setEditDueDate(p.due_date ? p.due_date.split('T')[0] : '')
      setEditPriority(p.priority || 'medium')
      setEditCategory(p.category || '')
      setStep('preview')
    } catch (err) {
      console.error('Parse error:', err)
      setErrorMsg('Could not parse task. Try being more specific.')
      setStep('error')
      setTimeout(() => { setStep('input'); setErrorMsg('') }, 3000)
    }
  }, [userId, familyId])

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault()
    if (textInput.trim()) parseTask(textInput.trim())
  }, [textInput, parseTask])

  const handleSuggestion = useCallback((s: string) => {
    setTextInput(s)
    parseTask(s)
  }, [parseTask])

  // Auto-parse initial text when component opens
  useEffect(() => {
    if (initialText && isOpen) {
      if (inputRef.current) {
        inputRef.current.focus()
      }
      if (initialText.trim()) {
        const timer = setTimeout(() => parseTask(initialText.trim()), 300)
        return () => clearTimeout(timer)
      }
    }
  }, [initialText, isOpen, parseTask])

  const handleVoiceTranscribed = useCallback((text: string) => {
    setTextInput(text)
    parseTask(text)
  }, [parseTask])

  const handleMicClick = useCallback(async () => {
    if (isRecording && mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4',
      })
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        stream.getTracks().forEach(track => track.stop())

        if (audioChunksRef.current.length === 0) return

        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })

        const formData = new FormData()
        formData.append('audio', audioBlob, 'recording.webm')

        try {
          const res = await fetch('/api/transcribe', { method: 'POST', body: formData })
          if (!res.ok) throw new Error('Transcription failed')
          const data = await res.json()
          if (data.text) {
            handleVoiceTranscribed(data.text)
          }
        } catch (err) {
          console.error('Transcription error:', err)
          setErrorMsg('Could not transcribe audio. Try typing instead.')
          setTimeout(() => setErrorMsg(''), 3000)
        }
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (err) {
      console.error('Mic access error:', err)
      setErrorMsg('Microphone access denied. Please allow microphone permissions.')
      setTimeout(() => setErrorMsg(''), 3000)
    }
  }, [isRecording, handleVoiceTranscribed])

  // Create task
  const handleCreate = useCallback(async () => {
    if (!parsedTask) return
    setStep('creating')
    try {
      const res = await fetch('/api/tasks/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textInput, userId, familyId,
          preParsed: {
            title: editTitle,
            description: parsedTask.description,
            assigned_to: editAssignee || null,
            due_date: editDueDate ? new Date(editDueDate).toISOString() : null,
            priority: editPriority,
            category: editCategory || undefined,
            recurrence: editRecurrence || undefined,
            is_recurring: editRecurrence ? true : false,
            recurrence_pattern: editRecurrence || undefined,
            recurrence_config: editRecurrence === 'weekly'
              ? { days_of_week: editDaysOfWeek }
              : editRecurrence === 'monthly'
                ? { day_of_month: editDayOfMonth }
                : editRecurrence === 'biweekly'
                  ? { days_of_week: editDaysOfWeek }
                  : undefined,
          },
          dueDate: editDueDate ? new Date(editDueDate).toISOString() : undefined,
          assignedTo: editAssignee || undefined,
        }),
      })
      if (!res.ok) throw new Error('Failed to create task')
      setStep('done')
      onTaskCreated()
      setTimeout(() => close(), 2000)
    } catch {
      setErrorMsg('Could not create task. Please try again.')
      setStep('error')
      setTimeout(() => setStep('preview'), 3000)
    }
  }, [parsedTask, textInput, userId, familyId, editTitle, editAssignee, editDueDate, editPriority, editCategory, editRecurrence, editDaysOfWeek, editDayOfMonth, onTaskCreated, close])

  const getMemberName = (id: string) => {
    if (id === userId) return userName || 'Me'
    return members.find(m => m.id === id)?.name || 'Unknown'
  }

  return (
    <>
      {/* Trigger button */}
      {!isOpen && !autoOpen && (
        <button onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg active:scale-[0.97] transition-all">
          <Sparkles className="w-4 h-4" />
          <span>Smart Add</span>
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={close} />

          <div className="relative w-full sm:max-w-lg bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-2xl animate-slide-up max-h-[90vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="shrink-0 flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" />
                {step === 'input' ? 'New Task' : step === 'parsing' ? 'Parsing...' : step === 'preview' ? 'Confirm Task' : step === 'creating' ? 'Creating...' : 'Done!'}
              </h2>
              <button onClick={close} className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* === INPUT STEP === */}
              {step === 'input' && (
                <>
                  <form onSubmit={handleSubmit}>
                    <div className="relative">
                      <input ref={inputRef} type="text" value={textInput}
                        onChange={e => setTextInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit() } }}
                        placeholder="e.g. Remind Jake to take out trash tonight"
                        className="w-full px-4 py-3.5 pr-12 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-0 outline-none transition-colors"
                        autoFocus />
                      <button type="submit" disabled={!textInput.trim()}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Press Enter to parse. Be as natural as you like.</p>
                  </form>

                  {/* Inline mic button */}
                  <div className="flex justify-center -mt-1">
                    <button onClick={handleMicClick}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                        isRecording
                          ? 'bg-red-50 dark:bg-red-900/20 text-red-500 border border-red-200 dark:border-red-800 animate-pulse'
                          : 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 hover:text-indigo-500'
                      }`}
                      title={isRecording ? 'Stop recording' : 'Start voice input'}>
                      {isRecording ? (
                        <><Square className="w-4 h-4" /> Recording... tap to stop</>
                      ) : (
                        <><Mic className="w-4 h-4" /> Speak your task</>
                      )}
                    </button>
                  </div>

                  {/* Quick suggestions */}
                  {!textInput && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Suggestions</p>
                      <div className="flex flex-wrap gap-2">
                        {QUICK_SUGGESTIONS.map((s, i) => (
                          <button key={i} onClick={() => handleSuggestion(s)}
                            className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border border-gray-200 dark:border-gray-700 rounded-lg text-xs text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            {s.length > 35 ? s.slice(0, 32) + '...' : s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* === PARSING STEP === */}
              {step === 'parsing' && (
                <div className="text-center py-12 space-y-4">
                  <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mx-auto" />
                  <p className="text-gray-700 dark:text-gray-300 font-medium">Understanding your task...</p>
                  <p className="text-sm text-gray-400">&ldquo;{textInput.slice(0, 60)}&rdquo;</p>
                  <div className="flex items-center justify-center gap-1">
                    {['Assignee', 'Title', 'Due date', 'Priority'].map((label, i) => (
                      <span key={label} className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-xs text-indigo-500 dark:text-indigo-300 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 200}ms` }}>
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* === PREVIEW STEP === */}
              {step === 'preview' && parsedTask && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 px-3 py-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-xs text-indigo-600 dark:text-indigo-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI parsed your task. Edit anything below before creating.
                    <button onClick={() => parseTask(textInput)}
                      className="ml-auto flex items-center gap-1 text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-200">
                      <RefreshCw className="w-3 h-3" /> Re-parse
                    </button>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">Task</label>
                    <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-900 dark:text-white focus:border-indigo-400 outline-none transition-colors" />
                  </div>

                  {/* Assignee */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <User className="w-3 h-3" /> Assign to
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => setEditAssignee(userId)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                          editAssignee === userId
                            ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                            : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'}`}>
                        👤 Me {userName ? `(${userName})` : ''}
                      </button>
                      {members.filter(m => m.id !== userId).map(member => (
                        <button key={member.id} onClick={() => setEditAssignee(member.id === editAssignee ? '' : member.id)}
                          className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                            editAssignee === member.id
                              ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                              : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'}`}>
                          👤 {member.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Due Date */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Due date
                    </label>
                    <div className="flex flex-wrap gap-2 items-center">
                      {DATE_PRESETS.map(dp => (
                        <button key={dp.key} onClick={() => setEditDueDate(dp.key ? getPresetDate(dp.key) : '')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            (dp.key === '' && !editDueDate) || (dp.key && editDueDate === getPresetDate(dp.key))
                              ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                              : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300'}`}>
                          {dp.label}
                        </button>
                      ))}
                      <input type="date" value={editDueDate} onChange={e => setEditDueDate(e.target.value)}
                        className="px-3 py-1.5 rounded-lg text-xs border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:border-indigo-400 outline-none" />
                    </div>
                    {editDueDate && <p className="text-xs text-indigo-500 mt-1">{formatDate(editDueDate)}</p>}
                  </div>

                  {/* Priority */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Flag className="w-3 h-3" /> Priority
                    </label>
                    <div className="flex gap-2">
                      {(['low', 'medium', 'high', 'urgent'] as const).map(p => (
                        <button key={p} onClick={() => setEditPriority(p)}
                          className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
                            editPriority === p
                              ? `${PRIORITY_ICONS[p].color} border-indigo-300 dark:border-indigo-700`
                              : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300'}`}>
                          {PRIORITY_ICONS[p].icon} {PRIORITY_ICONS[p].label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Tag className="w-3 h-3" /> Category
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {CATEGORY_OPTIONS.map(cat => (
                        <button key={cat.value} onClick={() => setEditCategory(cat.value)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            editCategory === cat.value
                              ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                              : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300'}`}>
                          {cat.icon} {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Recurrence — Visual Picker */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setRecurrenceExpanded(!recurrenceExpanded)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-indigo-500" />
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Repeats</span>
                        {editRecurrence && editRecurrence !== 'none' && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium">
                            {recurrenceDescription(editRecurrence, editDaysOfWeek, editDayOfMonth) || recurrenceLabel(editRecurrence)}
                          </span>
                        )}
                        {(!editRecurrence || editRecurrence === 'none') && (
                          <span className="text-xs text-gray-400">One-time task</span>
                        )}
                      </div>
                      {recurrenceExpanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </button>

                    {recurrenceExpanded && (
                      <div className="px-4 pb-4 pt-2 space-y-3">
                        {/* Pattern cards */}
                        <div className="grid grid-cols-5 gap-1.5">
                          {RECURRENCE_OPTIONS.map(opt => (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => {
                                setEditRecurrence(opt.value)
                                if (opt.value === 'none') setRecurrenceExpanded(false)
                              }}
                              className={`flex flex-col items-center gap-0.5 px-1 py-2 rounded-xl text-xs font-medium border transition-all ${
                                editRecurrence === opt.value
                                  ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                                  : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                              }`}
                            >
                              <span className="text-base">{opt.icon}</span>
                              <span className="text-[10px] leading-tight text-center">{opt.label}</span>
                            </button>
                          ))}
                        </div>

                        {/* Weekly: Day-of-week selector */}
                        {editRecurrence === 'weekly' && (
                          <div className="space-y-2 pt-1">
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-gray-500 dark:text-gray-400">Repeat on:</p>
                              {editDaysOfWeek.length === 0 && (
                                <p className="text-xs text-amber-500">Select at least one day</p>
                              )}
                            </div>
                            <div className="flex gap-1.5">
                              {DAYS_OF_WEEK.map((day) => {
                                const isSelected = editDaysOfWeek.includes(day)
                                return (
                                  <button
                                    key={day}
                                    type="button"
                                    onClick={() => {
                                      setEditDaysOfWeek(prev =>
                                        isSelected
                                          ? prev.filter(d => d !== day)
                                          : [...prev, day]
                                      )
                                    }}
                                    className={`flex-1 py-2.5 rounded-lg text-xs font-semibold border transition-all ${
                                      isSelected
                                        ? 'bg-indigo-100 dark:bg-indigo-900/40 border-indigo-400 dark:border-indigo-600 text-indigo-700 dark:text-indigo-300 shadow-sm'
                                        : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                    }`}
                                  >
                                    {dayLetter(day)}
                                    <span className="block text-[10px] font-normal mt-0.5">{dayAbbreviation(day)}</span>
                                  </button>
                                )
                              })}
                            </div>
                            {editDaysOfWeek.length > 0 && (
                              <p className="text-xs text-indigo-500 dark:text-indigo-400 font-medium text-center">
                                {recurrenceDescription('weekly', editDaysOfWeek)}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Monthly: Day-of-month picker */}
                        {editRecurrence === 'monthly' && (
                          <div className="space-y-2 pt-1">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Repeat on day:</p>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => setEditDayOfMonth(Math.max(1, editDayOfMonth - 1))}
                                disabled={editDayOfMonth <= 1}
                                className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                              >
                                −
                              </button>
                              <div className="flex-1">
                                <input
                                  type="range"
                                  min={1}
                                  max={31}
                                  value={editDayOfMonth}
                                  onChange={e => setEditDayOfMonth(parseInt(e.target.value))}
                                  className="w-full accent-indigo-500"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => setEditDayOfMonth(Math.min(31, editDayOfMonth + 1))}
                                disabled={editDayOfMonth >= 31}
                                className="w-8 h-8 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 disabled:opacity-30 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                              >
                                +
                              </button>
                              <span className="w-10 text-center text-sm font-bold text-indigo-600 dark:text-indigo-400">
                                {editDayOfMonth}
                              </span>
                            </div>
                            <p className="text-xs text-indigo-500 dark:text-indigo-400 font-medium text-center">
                              {recurrenceDescription('monthly', null, editDayOfMonth)}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* === CREATING === */}
              {step === 'creating' && (
                <div className="text-center py-12 space-y-4">
                  <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mx-auto" />
                  <p className="text-gray-700 dark:text-gray-300 font-medium">Creating your task...</p>
                  <p className="text-sm text-gray-400">&ldquo;{editTitle}&rdquo;</p>
                </div>
              )}

              {/* === DONE === */}
              {step === 'done' && (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-500" />
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">Task Created! 🎉</p>
                  <p className="text-sm text-gray-500">&ldquo;{editTitle}&rdquo;</p>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                    {editAssignee && <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 rounded-full">👤 {getMemberName(editAssignee)}</span>}
                    {editDueDate && <span className="px-2 py-1 bg-amber-50 dark:bg-amber-900/20 rounded-full">📅 {formatDate(editDueDate)}</span>}
                    <span className={`px-2 py-1 rounded-full ${PRIORITY_ICONS[editPriority]?.color || ''}`}>{PRIORITY_ICONS[editPriority]?.icon} {PRIORITY_ICONS[editPriority]?.label}</span>
                  </div>
                </div>
              )}

              {/* === ERROR === */}
              {step === 'error' && (
                <div className="text-center py-8 space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <AlertCircle className="w-7 h-7 text-red-500" />
                  </div>
                  <p className="text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
                  <button onClick={() => setStep('input')}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    Try again
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="shrink-0 px-5 py-4 border-t border-gray-100 dark:border-gray-800 flex gap-3">
              {step === 'preview' && (
                <>
                  <button onClick={close}
                    className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleCreate}
                    className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-xl text-sm font-medium shadow-md transition-all active:scale-[0.97]">
                    <Sparkles className="w-4 h-4 inline mr-1.5" />
                    Create Task
                  </button>
                </>
              )}
              {step === 'input' && (
                <button onClick={close} className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  Cancel
                </button>
              )}
              {step === 'done' && (
                <button onClick={close} className="w-full py-3 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-xl text-sm font-medium transition-colors">
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
