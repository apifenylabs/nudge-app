'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft, CheckCircle, Clock, AlertCircle,
  User, Calendar, Flag, Tag, Loader2, X,
  ChevronDown, ChevronRight, Edit2, Trash2, Share2, Home,
} from 'lucide-react'
import BottomNav from '@/components/layout/BottomNav'

// ── Types ──────────────────────────────────────────────────────

interface TaskDetailData {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  dueDate: string | null
  createdAt: string
  completedAt: string | null
  recurrence: string | null
  assignedTo: string | null
  createdBy: string | null
  familyId: string | null
}

interface UserBrief {
  id: string
  name: string
}

interface FamilyBrief {
  id: string
  name: string
}

interface TaskDetailClientProps {
  task: TaskDetailData
  assignee: UserBrief | null
  creator: UserBrief | null
  family: FamilyBrief | null
  currentUserId: string
}

// ── Helpers ────────────────────────────────────────────────────

const PRIORITY_CONFIG: Record<string, { label: string; color: string; icon: string }> = {
  urgent: { label: 'Urgent', color: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800', icon: '🔴' },
  high:   { label: 'High',   color: 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800', icon: '🟠' },
  medium: { label: 'Medium', color: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800', icon: '🟡' },
  low:    { label: 'Low',    color: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800', icon: '🟢' },
}

const STATUS_CONFIG: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  pending:     { label: 'Pending',     icon: Clock,       color: 'text-amber-600 dark:text-amber-400' },
  in_progress: { label: 'In Progress', icon: AlertCircle,  color: 'text-blue-600 dark:text-blue-400' },
  completed:   { label: 'Completed',   icon: CheckCircle,  color: 'text-green-600 dark:text-green-400' },
  cancelled:   { label: 'Cancelled',   icon: X,             color: 'text-muted-foreground' },
}

function formatDate(iso: string | null): string {
  if (!iso) return 'No date set'
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatRelativeDate(iso: string | null): string {
  if (!iso) return ''
  const now = new Date()
  const date = new Date(iso)
  const diffMs = date.getTime() - now.getTime()
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 0) return `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''}`
  if (diffDays === 0) return 'Due today'
  if (diffDays === 1) return 'Due tomorrow'
  if (diffDays <= 7) return `Due in ${diffDays} days`
  return `Due in ${Math.round(diffDays / 7)} week${Math.round(diffDays / 7) !== 1 ? 's' : ''}`
}

// ── Component ──────────────────────────────────────────────────

export default function TaskDetailClient({
  task,
  assignee,
  creator,
  family,
  currentUserId,
}: TaskDetailClientProps) {
  const router = useRouter()
  const [completing, setCompleting] = useState(false)
  const [completeError, setCompleteError] = useState('')
  const [isCompleted, setIsCompleted] = useState(task.status === 'completed')

  const isAssignee = task.assignedTo === currentUserId
  const isCreator = task.createdBy === currentUserId

  const priorityInfo = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium
  const StatusIcon = STATUS_CONFIG[task.status]?.icon || Clock
  const statusColor = STATUS_CONFIG[task.status]?.color || ''

  // ── Complete task ────────────────────────────────────────────
  const handleComplete = useCallback(async () => {
    setCompleting(true)
    setCompleteError('')
    try {
      const res = await fetch('/api/tasks/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId: task.id }),
      })
      const data = await res.json()
      if (data.success) {
        setIsCompleted(true)
      } else {
        setCompleteError(data.error || 'Failed to complete task')
      }
    } catch (err: any) {
      setCompleteError(err.message || 'Failed to complete task')
    } finally {
      setCompleting(false)
    }
  }, [task.id])

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="flex items-center justify-between px-4 h-12">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <div className="flex items-center gap-1">
            {/* Share button */}
            <button
              onClick={() => {
                const url = `${window.location.origin}/share/${task.id}`
                navigator.clipboard?.writeText(url)
                // Could open a share modal here
              }}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              title="Share task"
            >
              <Share2 className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Title + Status */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-xl font-bold text-foreground leading-tight">
              {task.title}
            </h1>
            {isCompleted ? (
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-medium border border-green-200 dark:border-green-800 shrink-0">
                <CheckCircle className="w-3 h-3" /> Done
              </span>
            ) : (
              <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border shrink-0 ${priorityInfo.color}`}>
                <span>{priorityInfo.icon}</span>
                {priorityInfo.label}
              </span>
            )}
          </div>

          {task.description && (
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {task.description}
            </p>
          )}
        </div>

        {/* Completed action */}
        {!isCompleted && isAssignee && (
          <button
            onClick={handleComplete}
            disabled={completing}
            className="w-full py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {completing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle className="w-4 h-4" />
            )}
            {completing ? 'Marking as done...' : '✅ Mark as Done'}
          </button>
        )}

        {completeError && (
          <p className="text-xs text-red-500 text-center">{completeError}</p>
        )}

        {/* Detail cards */}
        <div className="glass-card rounded-2xl divide-y divide-border/40 overflow-hidden">
          {/* Status */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <StatusIcon className="w-4 h-4" />
              Status
            </span>
            <span className={`text-sm font-medium ${statusColor}`}>
              {STATUS_CONFIG[task.status]?.label || task.status}
            </span>
          </div>

          {/* Priority */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Flag className="w-4 h-4" />
              Priority
            </span>
            <span className="text-sm font-medium">
              {priorityInfo.icon} {priorityInfo.label}
            </span>
          </div>

          {/* Due date */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Due date
            </span>
            <span className="text-sm font-medium text-right">
              {formatDate(task.dueDate)}
            </span>
          </div>

          {/* Relative due */}
          {task.dueDate && (
            <div className="flex items-center justify-between px-4 py-3">
              <span />
              <span className={`text-xs font-medium ${
                new Date(task.dueDate) < new Date() && task.status !== 'completed'
                  ? 'text-red-500'
                  : 'text-muted-foreground'
              }`}>
                {formatRelativeDate(task.dueDate)}
              </span>
            </div>
          )}

          {/* Assignee */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <User className="w-4 h-4" />
              Assigned to
            </span>
            <span className="text-sm font-medium">
              {assignee ? (
                <span className={assignee.id === currentUserId ? 'text-indigo-500' : ''}>
                  {assignee.name} {assignee.id === currentUserId ? '(you)' : ''}
                </span>
              ) : (
                <span className="text-muted-foreground">Unassigned</span>
              )}
            </span>
          </div>

          {/* Creator */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <User className="w-4 h-4" />
              Created by
            </span>
            <span className="text-sm font-medium">
              {creator ? (
                <span>{creator.name} {creator.id === currentUserId ? '(you)' : ''}</span>
              ) : (
                <span className="text-muted-foreground">Unknown</span>
              )}
            </span>
          </div>

          {/* Family */}
          {family && (
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Home className="w-4 h-4" />
                Family
              </span>
              <span className="text-sm font-medium">
                {family.name}
              </span>
            </div>
          )}

          {/* Recurrence */}
          {task.recurrence && (
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Repeats
              </span>
              <span className="text-sm font-medium capitalize">
                {task.recurrence.replace(/_/g, ' ')}
              </span>
            </div>
          )}

          {/* Created */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Created
            </span>
            <span className="text-sm text-muted-foreground">
              {formatDate(task.createdAt)}
            </span>
          </div>

          {/* Completed */}
          {task.completedAt && (
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Completed
              </span>
              <span className="text-sm text-muted-foreground">
                {formatDate(task.completedAt)}
              </span>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
