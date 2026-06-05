// ════════════════════════════════════════════════════════════
// Email templates for Apifeny AI Playbook delivery
// Beautiful, reassuring, upsell-friendly
// ════════════════════════════════════════════════════════════

export interface FulfillmentEmail {
  subject: string
  html: string
}

export function buildPurchaseConfirmationEmail(params: {
  customerName: string
  productName: string
  productSlug: string
  downloadUrl: string
  ctaHook: string
  tier: 'starter' | 'bundle' | 'pro'
  allPlaybooksUrl?: string
}): FulfillmentEmail {
  const { customerName, productName, downloadUrl, ctaHook, tier, allPlaybooksUrl } = params

  // Pro users get the vault URL, starter users get an upsell
  const thankYouExtra = tier === 'pro'
    ? `<p style="color:#16a34a;font-weight:600;">🔥 As a Pro member, you have unlimited access to <strong>all 104+ playbooks</strong>. Your vault is below.</p>`
    : `<p style="color:#9333ea;">💡 Want <strong>all 104+ playbooks</strong> for $37/mo? <a href="${allPlaybooksUrl || 'https://apifeny-ai.vercel.app/pro'}" style="color:#7c3aed;font-weight:600;">Upgrade to Pro →</a></p>`

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f8fafc; margin: 0; padding: 0; }
    .container { max-width: 560px; margin: 0 auto; padding: 32px 24px; }
    .header { text-align: center; padding: 32px 0; background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%); border-radius: 16px 16px 0 0; }
    .header h1 { color: #fff; font-size: 28px; margin: 0; }
    .header p { color: #c4b5fd; font-size: 16px; margin: 8px 0 0; }
    .body-card { background: #fff; padding: 32px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    .checkmark { display: inline-block; width: 64px; height: 64px; background: #dcfce7; border-radius: 50%; line-height: 64px; text-align: center; font-size: 32px; margin: 0 auto 16px; }
    .btn { display: inline-block; background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%); color: #fff; padding: 16px 40px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 18px; margin: 20px 0; }
    .btn:hover { opacity: 0.9; }
    .features { background: #f1f5f9; border-radius: 12px; padding: 20px; margin: 24px 0; }
    .features li { margin-bottom: 8px; color: #334155; }
    .guarantee { text-align: center; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; margin: 24px 0; }
    .footer { text-align: center; color: #94a3b8; font-size: 12px; padding: 24px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Your Playbook is Ready!</h1>
      <p>${ctaHook}</p>
    </div>
    <div class="body-card">
      <div style="text-align:center;">
        <div class="checkmark">✅</div>
        <h2 style="margin:0 0 4px;">Thank you, ${customerName}!</h2>
        <p style="color:#64748b;margin:0 0 24px;">Your purchase of <strong>${productName}</strong> is confirmed.</p>
      </div>

      <div style="text-align:center;">
        <a href="${downloadUrl}" class="btn">📥 Download Your Playbook Now</a>
      </div>

      ${thankYouExtra}

      <div class="features">
        <h3 style="margin:0 0 12px;color:#1e293b;">What's Inside This Playbook:</h3>
        <ul style="padding-left:20px;">
          <li>✅ Step-by-step actionable workflows — not theory</li>
          <li>✅ Copy-paste AI prompts you can use today</li>
          <li>✅ Real-world examples from Apifeny Labs operations</li>
          <li>✅ Cost comparisons — exactly what to spend where</li>
        </ul>
      </div>

      <div class="guarantee">
        <p style="margin:0;font-size:14px;color:#64748b;">
          🛡️ <strong>7-Day Happiness Guarantee</strong><br>
          If this playbook doesn't save you 10x its cost within 7 days,<br>
          reply to this email and we'll refund you — no questions asked.
        </p>
      </div>

      <p style="color:#64748b;font-size:14px;text-align:center;">
        Your download link is unique and valid for 72 hours.<br>
        Need help? Just reply to this email — we're human (mostly).
      </p>
    </div>
    <div class="footer">
      <p>Apifeny Labs · AI Tools That Actually Move the Needle</p>
      <p><a href="https://apifeny-ai.vercel.app" style="color:#6366f1;">apifeny-ai.vercel.app</a></p>
    </div>
  </div>
</body>
</html>`

  return {
    subject: `🎉 Your ${productName} Playbook Is Ready — Download Inside`,
    html,
  }
}
