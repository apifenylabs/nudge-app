/**
 * Email template builders.
 * Each function returns { subject, html } for use with any email provider.
 * 
 * Templates are inline-styled HTML for maximum client compatibility.
 * They follow Nudge's warm, premium brand identity.
 */

import { emailConfig } from './config'

interface EmailData {
  to: string
  subject: string
  html: string
}

// ─── Shared styles ──────────────────────────────────────────

const styles = {
  container: `
    max-width:600px; margin:0 auto; padding:24px;
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
    background-color:#ffffff; color:#1a1a2e;
  `,
  header: `
    text-align:center; padding:32px 0 24px;
    border-bottom:1px solid #f0f0f5;
  `,
  logo: `font-size:24px; font-weight:800; color:#4f46e5;`,
  body: `padding:24px 0; line-height:1.6; color:#374151; font-size:15px;`,
  button: `
    display:inline-block; padding:12px 24px; border-radius:12px;
    background-color:#4f46e5; color:#ffffff !important;
    text-decoration:none; font-weight:600; font-size:14px;
    margin:16px 0;
  `,
  footer: `
    text-align:center; padding:24px 0 0; font-size:12px; color:#9ca3af;
    border-top:1px solid #f0f0f5;
  `,
  card: `
    background:#f9fafb; border-radius:12px; padding:16px;
    margin:12px 0;
  `,
  badge: `
    display:inline-block; padding:2px 10px; border-radius:9999px;
    font-size:12px; font-weight:600;
  `,
}

function wrap(content: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
<title>${emailConfig.brandName}</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:24px 16px;">
      <div style="${styles.container}">
        <div style="${styles.header}">
          <a href="${emailConfig.baseUrl}" style="${styles.logo}">${emailConfig.brandName}</a>
        </div>
        <div style="${styles.body}">
          ${content}
        </div>
        <div style="${styles.footer}">
          <p>${emailConfig.brandName} — Family task management, made simple.</p>
          <p>
            <a href="${emailConfig.baseUrl}/settings" style="color:#9ca3af;text-decoration:underline;">Notification Settings</a>
            &nbsp;·&nbsp;
            <a href="${emailConfig.baseUrl}/dashboard" style="color:#9ca3af;text-decoration:underline;">Dashboard</a>
          </p>
          <p style="margin-top:8px;">
            Sent with ❤️ from ${emailConfig.brandName}
          </p>
        </div>
      </div>
    </td></tr>
  </table>
</body>
</html>`
}

// ─── Templates ──────────────────────────────────────────────

export function taskReminderEmail(params: {
  to: string
  userName: string
  taskTitle: string
  taskId: string
  assignedBy: string
  dueDate?: string
  priority?: string
}): EmailData {
  const priorityColors: Record<string, string> = {
    urgent: '#ef4444', high: '#f97316', medium: '#6366f1', low: '#60a5fa',
  }

  return {
    to: params.to,
    subject: `⏰ Reminder: "${params.taskTitle}" — Nudge`,
    html: wrap(`
      <h2 style="margin:0 0 4px;font-size:20px;color:#1a1a2e;">
        Hi ${params.userName}! 👋
      </h2>
      <p style="margin:0 0 16px;color:#6b7280;">
        ${params.assignedBy} asked you to take care of something:
      </p>

      <div style="${styles.card}">
        <div style="display:flex;align-items:center;gap:12px;">
          <span style="${styles.badge};background-color:${priorityColors[params.priority || 'medium']}20;color:${priorityColors[params.priority || 'medium']}">
            ${(params.priority || 'medium').toUpperCase()}
          </span>
          <strong style="font-size:16px;color:#1a1a2e;">${params.taskTitle}</strong>
        </div>
        ${params.dueDate ? `<p style="margin:8px 0 0;color:#6b7280;font-size:13px;">Due: ${params.dueDate}</p>` : ''}
      </div>

      <div style="text-align:center;">
        <a href="${emailConfig.baseUrl}/dashboard" style="${styles.button}">
          View Task →
        </a>
      </div>
      <p style="text-align:center;font-size:12px;color:#9ca3af;">
        Mark it done and keep your family streak going! 🔥
      </p>
    `),
  }
}

export function taskOverdueEmail(params: {
  to: string
  userName: string
  taskTitle: string
  taskId: string
  daysOverdue: number
}): EmailData {
  return {
    to: params.to,
    subject: `⚠️ "${params.taskTitle}" is overdue — Nudge`,
    html: wrap(`
      <h2 style="margin:0 0 4px;font-size:20px;color:#1a1a2e;">
        Heads up, ${params.userName}! 🫣
      </h2>
      <p style="margin:0 0 16px;color:#6b7280;">
        This task is <strong style="color:#ef4444;">${params.daysOverdue} day${params.daysOverdue > 1 ? 's' : ''} overdue</strong>:
      </p>

      <div style="${styles.card}">
        <p style="margin:0 0 8px;font-size:16px;font-weight:600;color:#1a1a2e;">
          ${params.taskTitle}
        </p>
      </div>

      <div style="text-align:center;">
        <a href="${emailConfig.baseUrl}/dashboard" style="${styles.button}">
          Complete Now →
        </a>
      </div>
    `),
  }
}

export function familyInviteEmail(params: {
  to: string
  inviterName: string
  familyName: string
  inviteCode: string
  inviteLink: string
}): EmailData {
  return {
    to: params.to,
    subject: `📋 ${params.inviterName} invited you to "${params.familyName}" on Nudge`,
    html: wrap(`
      <h2 style="margin:0 0 4px;font-size:20px;color:#1a1a2e;">
        You're invited! 🎉
      </h2>
      <p style="margin:0 0 16px;color:#6b7280;">
        <strong>${params.inviterName}</strong> has invited you to join
        <strong>"${params.familyName}"</strong> on Nudge — the family task manager
        that helps everyone stay on track.
      </p>

      <div style="text-align:center;">
        <a href="${params.inviteLink}" style="${styles.button}">
          Accept Invitation →
        </a>
      </div>

      <p style="margin:16px 0 0;text-align:center;font-size:12px;color:#9ca3af;">
        Or enter code <strong>${params.inviteCode}</strong> in the app
      </p>
    `),
  }
}

export function dailyDigestEmail(params: {
  to: string
  userName: string
  completedToday: number
  pendingToday: number
  totalTasks: number
  overdueCount: number
  taskList: { title: string; priority: string; dueDate?: string }[]
}): EmailData {
  const completionPct = params.totalTasks > 0
    ? Math.round((params.completedToday / params.totalTasks) * 100)
    : 0

  return {
    to: params.to,
    subject: `📊 Your Daily Nudge — ${params.completedToday} tasks done`,
    html: wrap(`
      <h2 style="margin:0 0 4px;font-size:20px;color:#1a1a2e;">
        Daily Summary, ${params.userName}! 📊
      </h2>
      <p style="margin:0 0 16px;color:#6b7280;">
        Here's how your family did today:
      </p>

      <!-- Stats row -->
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td width="33%" style="padding:4px;text-align:center;">
            <div style="background:#f0fdf4;border-radius:10px;padding:12px;">
              <div style="font-size:20px;font-weight:700;color:#16a34a;">${params.completedToday}</div>
              <div style="font-size:11px;color:#6b7280;">Done</div>
            </div>
          </td>
          <td width="33%" style="padding:4px;text-align:center;">
            <div style="background:#fefce8;border-radius:10px;padding:12px;">
              <div style="font-size:20px;font-weight:700;color:#ca8a04;">${params.pendingToday}</div>
              <div style="font-size:11px;color:#6b7280;">Pending</div>
            </div>
          </td>
          <td width="33%" style="padding:4px;text-align:center;">
            <div style="background:#fef2f2;border-radius:10px;padding:12px;">
              <div style="font-size:20px;font-weight:700;color:#dc2626;">${params.overdueCount}</div>
              <div style="font-size:11px;color:#6b7280;">Overdue</div>
            </div>
          </td>
        </tr>
      </table>

      <p style="text-align:center;font-size:13px;color:#6b7280;margin:12px 0;">
        ${completionPct}% completion rate ${completionPct >= 80 ? '🔥' : '💪'}
      </p>

      ${params.taskList.length > 0 ? `
        <h3 style="font-size:14px;color:#1a1a2e;margin:16px 0 8px;">Active Tasks</h3>
        ${params.taskList.slice(0, 5).map(t => `
          <div style="${styles.card};padding:10px 16px;margin:4px 0;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:14px;color:#1a1a2e;">${t.title}</span>
              <span style="${styles.badge};background-color:${t.priority === 'urgent' ? '#fef2f2' : '#f9fafb'};color:#6b7280;font-size:10px;">
                ${t.priority}
              </span>
            </div>
          </div>
        `).join('')}
      ` : ''}

      <div style="text-align:center;margin-top:16px;">
        <a href="${emailConfig.baseUrl}/dashboard" style="${styles.button}">
          Go to Dashboard →
        </a>
      </div>
    `),
  }
}

export function weeklyScorecardEmail(params: {
  to: string
  userName: string
  familyName: string
  weekLabel: string
  tasksCompleted: number
  tasksCreated: number
  streak: number
  topMember: string
  topMemberTasks: number
  memberCount: number
  completionRate: number
}): EmailData {
  return {
    to: params.to,
    subject: `🥇 ${params.familyName}'s Weekly Scorecard — ${params.tasksCompleted} tasks completed!`,
    html: wrap(`
      <h2 style="margin:0 0 4px;font-size:20px;color:#1a1a2e;">
        Weekly Scorecard 🏆
      </h2>
      <p style="margin:0 0 4px;color:#6b7280;">
        ${params.familyName} · ${params.weekLabel}
      </p>
      <p style="margin:0 0 16px;color:#6b7280;">
        ${params.memberCount} members tracked this week
      </p>

      <div style="text-align:center;padding:24px 0;">
        <div style="font-size:48px;font-weight:800;color:#4f46e5;">${params.tasksCompleted}</div>
        <div style="font-size:14px;color:#6b7280;">tasks completed</div>
      </div>

      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin:16px 0;">
        <tr>
          <td width="33%" style="padding:4px;text-align:center;">
            <div style="background:#f9fafb;border-radius:10px;padding:12px;">
              <div style="font-size:18px;font-weight:700;color:#1a1a2e;">${params.tasksCreated}</div>
              <div style="font-size:11px;color:#6b7280;">Created</div>
            </div>
          </td>
          <td width="33%" style="padding:4px;text-align:center;">
            <div style="background:#f9fafb;border-radius:10px;padding:12px;">
              <div style="font-size:18px;font-weight:700;color:#1a1a2e;">${params.streak}d</div>
              <div style="font-size:11px;color:#6b7280;">Best Streak</div>
            </div>
          </td>
          <td width="33%" style="padding:4px;text-align:center;">
            <div style="background:#f9fafb;border-radius:10px;padding:12px;">
              <div style="font-size:18px;font-weight:700;color:#1a1a2e;">${params.completionRate}%</div>
              <div style="font-size:11px;color:#6b7280;">Rate</div>
            </div>
          </td>
        </tr>
      </table>

      <div style="${styles.card};text-align:center;">
        <p style="margin:0;font-size:13px;color:#6b7280;">🥇 MVP: <strong style="color:#1a1a2e;">${params.topMember}</strong> (${params.topMemberTasks} tasks)</p>
      </div>

      <div style="text-align:center;">
        <a href="${emailConfig.baseUrl}/dashboard/stats" style="${styles.button}">
          View Full Stats →
        </a>
      </div>
    `),
  }
}

export function paymentConfirmationEmail(params: {
  to: string
  userName: string
  planName: string
  amount: string
  nextBillingDate: string
  invoiceUrl?: string
}): EmailData {
  return {
    to: params.to,
    subject: `✅ Payment confirmed — ${params.planName} plan • Nudge`,
    html: wrap(`
      <h2 style="margin:0 0 4px;font-size:20px;color:#1a1a2e;">
        Payment Successful! ✅
      </h2>
      <p style="margin:0 0 16px;color:#6b7280;">
        Thank you, ${params.userName}! Your ${params.planName} plan is active.
      </p>

      <div style="${styles.card}">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="padding:4px 0;font-size:13px;color:#6b7280;">Plan</td>
            <td style="padding:4px 0;font-size:13px;color:#1a1a2e;font-weight:600;text-align:right;">${params.planName}</td>
          </tr>
          <tr>
            <td style="padding:4px 0;font-size:13px;color:#6b7280;">Amount</td>
            <td style="padding:4px 0;font-size:13px;color:#1a1a2e;font-weight:600;text-align:right;">${params.amount}</td>
          </tr>
          <tr>
            <td style="padding:4px 0;font-size:13px;color:#6b7280;">Next billing</td>
            <td style="padding:4px 0;font-size:13px;color:#1a1a2e;font-weight:600;text-align:right;">${params.nextBillingDate}</td>
          </tr>
        </table>
      </div>

      <div style="text-align:center;">
        <a href="${params.invoiceUrl || `${emailConfig.baseUrl}/dashboard/settings`}" style="${styles.button}">
          View Invoice →
        </a>
      </div>
    `),
  }
}

export function paymentFailedEmail(params: {
  to: string
  userName: string
  planName: string
  last4?: string
  retryUrl: string
}): EmailData {
  return {
    to: params.to,
    subject: `⚠️ Payment failed — Nudge ${params.planName} plan`,
    html: wrap(`
      <h2 style="margin:0 0 4px;font-size:20px;color:#1a1a2e;">
        Payment Failed ⚠️
      </h2>
      <p style="margin:0 0 16px;color:#6b7280;">
        Hi ${params.userName}, we couldn't process your latest payment for the
        <strong>${params.planName}</strong> plan.
      </p>

      <div style="${styles.card}">
        <p style="margin:0;font-size:13px;color:#6b7280;">
          ${params.last4 ? `Card ending in ····${params.last4}` : 'Your current payment method'}
          was declined. Don't worry — we'll retry automatically, but please
          update your payment method to avoid losing access.
        </p>
      </div>

      <div style="text-align:center;">
        <a href="${params.retryUrl}" style="${styles.button}">
          Update Payment Method →
        </a>
      </div>

      <p style="text-align:center;font-size:12px;color:#9ca3af;margin-top:16px;">
        Your access will continue for now, but please update soon!
      </p>
    `),
  }
}

export function trialExpiringEmail(params: {
  to: string
  userName: string
  planName: string
  daysRemaining: number
  subscribeUrl: string
}): EmailData {
  return {
    to: params.to,
    subject: `⏰ Trial ending ${params.daysRemaining === 1 ? 'tomorrow' : `in ${params.daysRemaining} days`} — Nudge`,
    html: wrap(`
      <h2 style="margin:0 0 4px;font-size:20px;color:#1a1a2e;">
        Your trial is ending soon ⏰
      </h2>
      <p style="margin:0 0 16px;color:#6b7280;">
        Hi ${params.userName}, your free trial of <strong>${params.planName}</strong>
        ${params.daysRemaining === 1 ? 'ends tomorrow' : `ends in ${params.daysRemaining} days`}.
      </p>

      <div style="text-align:center;padding:16px 0;">
        <div style="font-size:36px;font-weight:800;color:#4f46e5;">${params.daysRemaining}</div>
        <div style="font-size:14px;color:#6b7280;">days remaining</div>
      </div>

      <p style="color:#6b7280;">
        Keep your access to unlimited tasks, family sharing, SMS reminders, and more.
      </p>

      <div style="text-align:center;">
        <a href="${params.subscribeUrl}" style="${styles.button}">
          Continue My Plan →
        </a>
      </div>
    `),
  }
}
