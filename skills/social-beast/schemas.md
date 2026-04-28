# Social Beast — Data Schemas

## DataSource Interface

Each project exposes a JSON endpoint (file or URL) that returns an array of these:

```typescript
interface DataSource {
  /** Unique identifier (project-specific) */
  id: string;
  /** Display title */
  title: string;
  /** Core description (1-3 paragraphs) */
  description: string;
  /** URL back to project page */
  url: string;
  /** Tags for format selection & SEO */
  tags: string[];
  /** Content type */
  type: 'destination' | 'feature' | 'review' | 'tip' | 'insight' | 'milestone';
  /** Image URLs (used as-is, image gen is Phase 2) */
  images: string[];
  /** Source project name */
  sourceProject: string;
  /** Extra metadata (project-specific, pass-through) */
  metadata?: Record<string, unknown>;
}
```

## ContentItem Interface

Output of every transform skill:

```typescript
interface ContentItem {
  /** Unique content hash (id + format + date) */
  id: string;
  /** Source item reference */
  sourceId: string;
  /** Source project */
  sourceProject: string;
  /** Format type */
  format: 'short-hook' | 'story-thread' | 'telegram-deep-dive' | 'linkedin-insight'
       | 'carousel-card' | 'tiktok-script' | 'build-in-public' | 'newsletter-blurb';
  /** Target platform(s) */
  platforms: string[];
  /** Formatted content */
  content: string;
  /** Thread support (array of tweets/posts) */
  thread?: string[];
  /** Image URLs (pass-through from source) */
  images: string[];
  /** Content hash for dedup */
  contentHash: string;
  /** Timestamp */
  createdAt: string;
  /** Status */
  status: 'pending' | 'approved' | 'skipped' | 'edited' | 'published' | 'failed';
}
```

## ApprovalQueue Interface

```typescript
interface ApprovalQueueItem {
  /** Unique ID */
  id: string;
  /** ContentItem reference */
  contentId: string;
  /** Formatted preview text (truncated if long) */
  preview: string;
  /** Full content ready for publish */
  content: ContentItem;
  /** Status */
  status: 'pending' | 'approved' | 'skipped' | 'edited';
  /** Approval timestamp */
  approvedAt?: string;
  /** Edit instructions (if status === 'edited') */
  editNotes?: string;
  /** Queue position */
  position: number;
}

interface ApprovalBatch {
  /** Batch date (YYYY-MM-DD) */
  date: string;
  /** Items in this batch */
  items: ApprovalQueueItem[];
  /** Batch status */
  status: 'awaiting-approval' | 'approved' | 'published' | 'partial';
}
```

## PublishLog Interface

```typescript
interface PublishLogEntry {
  /** Unique ID */
  id: string;
  /** Content ID */
  contentId: string;
  /** Platform */
  platform: 'twitter' | 'telegram' | 'linkedin' | 'instagram' | 'tiktok';
  /** Format */
  format: string;
  /** Source item */
  sourceId: string;
  /** Source project */
  sourceProject: string;
  /** Publish timestamp */
  publishedAt: string;
  /** Approval timestamp */
  approvedAt: string;
  /** Published URL (if available) */
  url?: string;
  /** Status */
  status: 'success' | 'failed';
  /** Error message (if failed) */
  error?: string;
  /** Engagement stats (placeholder for Phase 2) */
  engagement?: {
    likes?: number;
    shares?: number;
    comments?: number;
    impressions?: number;
  };
}
```

## ContentHash Generation

All transforms use this function to generate a deterministic hash:

```javascript
function contentHash(sourceId, format, date) {
  const str = `${sourceId}:${format}:${date}`;
  // Simple SHA-1 (Node built-in)
  return crypto.createHash('sha1').update(str).digest('hex').substring(0, 12);
}
```

## File Paths

```
workspace/social-beast-approvals/        # Approval queue files
  ├── pending-YYYY-MM-DD.json           # Today's pending approvals
  └── archive/                          # Historical approvals

workspace/social-beast-logs/             # Publish logs
  ├── log-YYYY-MM-DD.json               # Today's publish log
  └── archive/                          # Historical logs
```
