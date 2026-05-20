/**
 * Email sending utility.
 * Uses Resend with automatic fallback to console.log in dev
 * and provider-agnostic interface for easy switching.
 */

import { emailConfig } from './config'
import type { emailConfig as emailConfigType } from './config'

type EmailData = {
  to: string
  subject: string
  html: string
}

interface SendResult {
  success: boolean
  id?: string
  error?: string
}

/**
 * Send an email using the configured provider.
 * Currently uses Resend. To switch providers, swap this function's internals.
 */
export async function sendEmail(email: EmailData): Promise<SendResult> {
  const { to, subject, html } = email

  // Dev mode: log to console instead of sending
  if (process.env.NODE_ENV === 'development' || !emailConfig.apiKey) {
    console.log(`[Email Dev Mode] To: ${to}`)
    console.log(`[Email Dev Mode] Subject: ${subject}`)
    console.log(`[Email Dev Mode] Body length: ${html.length} chars`)
    return { success: true, id: 'dev-mode' }
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${emailConfig.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: emailConfig.from,
        to: [to],
        reply_to: emailConfig.replyTo,
        subject,
        html,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('[Email] Failed to send:', data)
      return { success: false, error: data.message || data.error || 'Unknown error' }
    }

    return { success: true, id: data.id }
  } catch (err: any) {
    console.error('[Email] Send error:', err.message)
    return { success: false, error: err.message }
  }
}

/**
 * Send batch emails (same content to multiple recipients).
 * Returns per-recipient results.
 */
export async function sendBatchEmail(
  emails: EmailData[]
): Promise<SendResult[]> {
  return Promise.all(emails.map(sendEmail))
}
