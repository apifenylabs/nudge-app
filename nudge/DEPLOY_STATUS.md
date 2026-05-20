# DEPLOY_STATUS.md

**Last deployed:** 2026-05-20 18:15 UTC (Phase 28)
**URL:** https://nudge-sigma-liart.vercel.app
**Build:** ✅ Passes

## Current Phase: 28 — Batch Task Operations

**Phase 28 adds full multi-select batch operations: bulk complete, delete, and reassign tasks — a table-stakes power-user feature that large families and power users need for daily workflow.**

### Changes

#### 🔲 Batch Selection Mode (`components/dashboard/BatchActionBar.tsx` — NEW)

A full sticky bottom action bar that appears when tasks are selected:

- **Select mode toggle**: Tap the `ListChecks` icon (next to "Smart Add") to enter select mode. Each pending task card shows a square checkbox instead of the completion circle.
- **Multi-select with visual feedback**: Tap to select/deselect. Selected cards get an indigo ring + highlight effect. Selection count badge at the bottom.
- **Select all / None**: Toggle selects all visible (filtered) tasks or clears selection.
- **Keyboard shortcuts**: `Ctrl+A` selects all visible tasks, `Escape` clears selection and exits select mode, `Ctrl+C` bulk completes, `Delete` bulk deletes.
- **Hint bar**: When select mode is active, a subtle info bar shows the available shortcuts.

#### ⚡ Batch Actions (3 operations)

| Action | Description | UX Flow |
|--------|-------------|---------|
| **Batch Complete** | Marks all selected tasks as done | One-click with success toast |
| **Batch Assign** | Reassigns all selected tasks to a family member | Dropdown picker with member avatars + "Unassign" option |
| **Batch Delete** | Soft-deletes all selected tasks | Confirmation dialog with count, then toast |

All operations include animated loading states, error handling, and success feedback via a floating toast.

#### 🗄️ Batch API (`app/api/tasks/batch/route.ts` — NEW)

A single POST endpoint that handles `complete`, `delete`, `assign`, `restore` actions:

- **Authorization check**: Verifies user is a member of all families whose tasks are affected.
- **Input validation**: Requires non-empty task ID arrays, valid action name.
- **Partial failure handling**: Reports task IDs that weren't found (e.g. already deleted).
- **Security**: Returns 403 if user doesn't belong to all involved families.
- **Notifications**: Fires a single `batch_completed` notification event for the family.
- **Soft-delete**: Uses `deleted_at` timestamp for undo capability.

#### 📦 TaskBoard Integration (`components/dashboard/TaskBoard.tsx` — MODIFIED)

- **Hotkey-select mode toggle** with visual state (indigo highlight when active).
- Each `TaskCard` shows a square **batch selection checkbox** in select mode instead of the completion circle.
- Selected cards get a distinct indigo ring + subtle background highlight.
- Edit/delete/menu buttons remain accessible in normal mode, hidden behind batch checkboxes in select mode.
- Smooth animation when entering/exiting select mode.

### What this means for users

- **Morning cleanup**: Select all overdue tasks from this week and complete them in one tap.
- **Bulk reassign**: Moving to a new chore chart? Reassign 10 tasks to your partner in 2 clicks.
- **Quick fixes**: Select 3-4 tasks that don't belong and batch-delete them with a single confirmation.
- **Power user delight**: Keyboard shortcuts make Nudge feel fast for daily power users.
- **Family manager workflow**: Start the week by bulk-assigning all unscheduled tasks to family members.

### What's next (Phase 29 candidates)
1. Voice input improvements (transcription quality, offline mode)
2. Mobile PWA polish (offline task creation via IndexedDB, install prompt)
3. Analytics dashboard (completion trends, member productivity, streak tracking)
4. Drag-and-drop task reordering with persisted sort order

## Previous Phases
- **Phase 27**: Automated Notification Engine Activation (daily digest, weekly scorecard, trial expiry, due-soon reminders)
- **Phase 26**: Polish Subscription Management UI + Family Sharing Activation
- **Phase 25**: Plan Enforcement Everywhere + Subscription Change APIs
- **Phase 23**: Telegram Deep Linking + Test Notification Button
- **Phase 22**: Email Notifications Wired into Real-Time Dispatch
- **Phase 21**: Visual Recurrence Picker with Day-of-Week/Month Selectors
- **Phase 20**: Notification Dispatch Respects User Preferences
- **Phase 18**: In-App Notifications persistence with inline migration
- **Phase 17**: Recurring task auto-creation engine
- **Phase 16**: Offline IndexedDB Task Queue + SyncStatus component
- **Phase 15.5**: In-App Notifications UI + What's Next suggestions
- **Phase 15**: Task editing UI + soft-delete endpoint
- **Phase 14**: Telegram inline mode, referral/gamification, onboarding polish, social sharing, subscription management
- **Phase 13**: Task completion endpoint, Telegram webhook improvements
- **Phase 12**: Billing/subscription (Stripe), email notifications
- **Phase 11**: Gamification, Telegram inline mode, social sharing

## Pending Env Vars (Vercel Production)

These need to be set via Vercel Dashboard > nudge > Settings > Environment Variables:
- `RESEND_API_KEY` — Resend API key for email sending
- `CRON_SECRET` — `2393889ea156fe53db3838886f3520ed5318841fa10e4690ace6a5fbe39cc7b9`

## Quick Reference
- **Build**: `npm run build` ✅
- **Deploy**: `git push` (Vercel auto-deploys main branch)
- **URL**: https://nudge-sigma-liart.vercel.app
- **Supabase**: https://supabase.com/dashboard/project/yrvnkepndpjmlrewecro
