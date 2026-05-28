/**
 * Email configuration for Nudge notifications.
 * Uses Resend (resend.com) — free tier: 100 emails/day.
 * 
 * Design decision: Use Resend API over SendGrid/Mailgun for:
 * 1. Best-in-class React email components
 * 2. Generous free tier (100/day = 3000/mo covers launch)
 * 3. Simple API, no SMTP config
 * 4. Built-in analytics
 */

export const emailConfig = {
  /**
   * Resend API key from environment variable
   */
  apiKey: process.env.RESEND_API_KEY || '',

  /**
   * From address — must be verified in Resend
   */
  from: process.env.EMAIL_FROM || 'Nudge <noreply@nudge.family>',

  /**
   * Reply-to address
   */
  replyTo: process.env.EMAIL_REPLY_TO || 'hello@nudge.family',

  /**
   * Brand name used in email templates
   */
  brandName: 'Nudge',

  /**
   * Base URL for links in emails
   */
  baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://nudge-sigma-liart.vercel.app',

  /**
   * Enabled notification types
   */
  enabledNotifications: {
    taskReminder: true,
    taskOverdue: true,
    dailyDigest: true,
    weeklyScorecard: true,
    familyInvite: true,
    paymentConfirmation: true,
    paymentFailed: true,
    trialExpiring: true,
  },
}

/**
 * Get user's email notification preferences.
 * Returns all enabled by default — respects user config.
 */
export function getEmailPreferences(userSettings?: Record<string, boolean>) {
  if (!userSettings) return emailConfig.enabledNotifications

  return {
    taskReminder: userSettings.taskReminder ?? true,
    taskOverdue: userSettings.taskOverdue ?? true,
    dailyDigest: userSettings.dailyDigest ?? false,
    weeklyScorecard: userSettings.weeklyScorecard ?? true,
    familyInvite: userSettings.familyInvite ?? true,
    paymentConfirmation: userSettings.paymentConfirmation ?? true,
    paymentFailed: userSettings.paymentFailed ?? true,
    trialExpiring: userSettings.trialExpiring ?? true,
  }
}
