# Skill: approval-telegram

**Goal:** Send daily batch to Telegram for approval and collect responses via inline buttons.

**Input:**
- `batch` (ApprovalBatch): Batch of items awaiting approval
- `botToken` (string): Telegram bot token
- `chatId` (string): Chris's chat ID

**Steps:**
1. Send summary message: "📋 *{batch.date} — {count} posts ready for your approval*"
2. For each item, send a preview message with inline buttons:
   - ✅ Approve | ✏️ Edit | ❌ Skip
3. Store batch state in `workspace/social-beast-approvals/pending-{date}.json`
4. Listen for button responses via webhook or poll
5. On response:
   - ✅ Approve: Update status to `approved`
   - ✏️ Edit: Prompt for edit instructions, set status to `edited`
   - ❌ Skip: Update status to `skipped`
6. After all items are processed OR timeout at 08:30, finalize batch

**Output:**
- `batch` (ApprovalBatch): Updated batch with approval decisions

**Dependencies:**
- schemas.md (ApprovalBatch, ApprovalQueueItem interfaces)
