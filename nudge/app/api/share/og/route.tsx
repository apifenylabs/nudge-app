import { NextRequest } from 'next/server'
import { ImageResponse } from 'next/og'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'edge'

/** Fallback OG image */
function fallbackOG() {
  return new ImageResponse(
    <div style={{
      backgroundColor: '#1e1b4b',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui',
    }}>
      <p style={{ color: '#818cf8', fontSize: 48, fontWeight: 700 }}>Nudge</p>
      <p style={{ color: '#94a3b8', fontSize: 24 }}>Family Task Manager</p>
    </div>,
    { width: 1200, height: 630 }
  )
}

/**
 * GET /api/share/og?taskId=xxx
 *
 * Dynamic OG image for shared task completion cards.
 * When someone shares a Nudge task to Twitter/Facebook/etc,
 * this generates a beautiful preview image with task details.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const taskId = searchParams.get('taskId')

    if (!taskId) {
      return fallbackOG()
    }

    const supabase = createClient()

    // Fetch full task data with joins
    const { data: task } = await supabase
      .from('tasks')
      .select(`
        id, title, description, status, priority, completed_at, created_at,
        created_by_user:users!tasks_created_by_fkey(full_name),
        assigned_to_user:users!tasks_assigned_to_fkey(full_name),
        family:families!tasks_family_id_fkey(name)
      `)
      .eq('id', taskId)
      .single()

    if (!task) {
      return fallbackOG()
    }

    // Supabase returns joined data as arrays
    const createdByUser = Array.isArray(task.created_by_user)
      ? task.created_by_user[0]
      : task.created_by_user
    const assignedToUser = Array.isArray(task.assigned_to_user)
      ? task.assigned_to_user[0]
      : task.assigned_to_user
    const familyInfo = Array.isArray(task.family)
      ? task.family[0]
      : task.family

    if (!task) {
      return new ImageResponse(
        <div style={{
          backgroundColor: '#1e1b4b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
        }}>
          <p style={{ color: '#f87171', fontSize: 48 }}>✕</p>
          <p style={{ color: '#94a3b8', fontSize: 28 }}>Task not found</p>
        </div>,
        { width: 1200, height: 630 }
      )
    }

    const creatorName = createdByUser?.full_name || 'Someone'
    const assigneeName = assignedToUser?.full_name || null
    const familyName = familyInfo?.name || 'My Family'
    const completedDate = task.completed_at
      ? new Date(task.completed_at).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })

    const isCompleted = task.status === 'completed'

    // Priority colors
    const priorityColors: Record<string, string> = {
      low: '#3B82F6',
      medium: '#6B7280',
      high: '#F97316',
      urgent: '#EF4444',
    }
    const priorityColor = priorityColors[task.priority] || '#6B7280'

    return new ImageResponse(
      (
        <div
          style={{
            backgroundColor: '#ffffff',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'system-ui',
          }}
        >
          {/* Gradient accent bar */}
          <div style={{
            height: 8,
            width: '100%',
            background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
          }} />

          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: '48px 56px',
            justifyContent: 'space-between',
          }}>
            {/* Top: Brand + icon */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ color: 'white', fontSize: 20, fontWeight: 800 }}>N</span>
              </div>
              <span style={{ color: '#9ca3af', fontSize: 16, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                Nudge
              </span>
              {isCompleted && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  marginLeft: 'auto',
                  backgroundColor: '#d1fae5',
                  padding: '6px 16px',
                  borderRadius: 999,
                }}>
                  <span style={{ fontSize: 18 }}>✓</span>
                  <span style={{ color: '#059669', fontSize: 14, fontWeight: 600 }}>Completed</span>
                </div>
              )}
            </div>

            {/* Center: Task info */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 8,
              maxWidth: '90%',
            }}>
              <h1 style={{
                fontSize: 48,
                fontWeight: 800,
                color: '#111827',
                margin: 0,
                lineHeight: 1.2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {task.title}
              </h1>

              {task.description && (
                <p style={{
                  fontSize: 22,
                  color: '#6b7280',
                  margin: 0,
                  lineHeight: 1.4,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxHeight: 64,
                }}>
                  {task.description}
                </p>
              )}
            </div>

            {/* Bottom: Metadata */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              paddingTop: 24,
              borderTop: '1px solid #e5e7eb',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ color: '#9ca3af', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Completed
                </span>
                <span style={{ color: '#374151', fontSize: 16, fontWeight: 500 }}>
                  {completedDate}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ color: '#9ca3af', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  By
                </span>
                <span style={{ color: '#374151', fontSize: 16, fontWeight: 500 }}>
                  {creatorName}
                </span>
              </div>

              {assigneeName && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ color: '#9ca3af', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    For
                  </span>
                  <span style={{ color: '#374151', fontSize: 16, fontWeight: 500 }}>
                    {assigneeName}
                  </span>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ color: '#9ca3af', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Family
                </span>
                <span style={{ color: '#374151', fontSize: 16, fontWeight: 500 }}>
                  {familyName}
                </span>
              </div>

              {/* Priority badge */}
              <div style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}>
                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: priorityColor,
                }} />
                <span style={{
                  color: priorityColor,
                  fontSize: 14,
                  fontWeight: 600,
                }}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (err) {
    console.error('OG image generation error:', err)
    return new ImageResponse(
      <div style={{
        backgroundColor: '#1e1b4b',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <p style={{ color: '#818cf8', fontSize: 48, fontWeight: 700 }}>Nudge</p>
        <p style={{ color: '#94a3b8', fontSize: 24 }}>Family Task Manager</p>
      </div>,
      { width: 1200, height: 630 }
    )
  }
}
