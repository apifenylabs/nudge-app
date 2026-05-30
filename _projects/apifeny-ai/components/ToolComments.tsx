'use client';

import { useState, useEffect } from 'react';
import { Star, ThumbsUp, MessageSquare, Send, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Types ───

interface Comment {
 id: string;
 name: string;
 comment: string;
 rating: number;
 helpful: number;
 createdAt: string;
}

interface ToolCommentsProps {
 toolSlug: string;
 toolName: string;
}

// ─── Helpers ───

function getStorageKey(slug: string) {
 return `apifeny_comments_${slug}`;
}

function loadComments(slug: string): Comment[] {
 if (typeof window === 'undefined') return [];
 try {
 const data = localStorage.getItem(getStorageKey(slug));
 return data ? JSON.parse(data) : [];
 } catch {
 return [];
 }
}

function saveComments(slug: string, comments: Comment[]) {
 try {
 localStorage.setItem(getStorageKey(slug), JSON.stringify(comments));
 } catch {
 // Silently fail
 }
}

function StarInput({
 value,
 onChange,
 size = 'md',
}: {
 value: number;
 onChange: (v: number) => void;
 size?: 'sm' | 'md';
}) {
 return (
 <div className="flex items-center gap-0.5">
 {[1, 2, 3, 4, 5].map((star) => (
 <button
 key={star}
 type="button"
 onClick={() => onChange(star)}
 className={cn(
 'transition-colors',
 size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
 )}
 >
 <Star
 className={cn(
 'w-full h-full',
 star <= value
 ? 'fill-asia text-asia'
 : 'fill-none text-tech-400 hover:text-tech-300'
 )}
 />
 </button>
 ))}
 </div>
 );
}

// ─── Component ───

export default function ToolComments({ toolSlug, toolName }: ToolCommentsProps) {
 const [comments, setComments] = useState<Comment[]>([]);
 const [name, setName] = useState('');
 const [comment, setComment] = useState('');
 const [rating, setRating] = useState(0);
 const [tipMode, setTipMode] = useState(false);

 // Load comments on mount
 useEffect(() => {
 setComments(loadComments(toolSlug));
 }, [toolSlug]);

 const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 if (!name.trim() || !comment.trim() || rating === 0) return;

 const newComment: Comment = {
 id: Date.now().toString(),
 name: name.trim(),
 comment: comment.trim(),
 rating,
 helpful: 0,
 createdAt: new Date().toISOString(),
 };

 const updated = [newComment, ...comments];
 setComments(updated);
 saveComments(toolSlug, updated);

 // Reset form
 setName('');
 setComment('');
 setRating(0);
 setTipMode(false);
 };

 const handleHelpful = (commentId: string) => {
 const updated = comments.map((c) =>
 c.id === commentId ? { ...c, helpful: c.helpful + 1 } : c
 );
 setComments(updated);
 saveComments(toolSlug, updated);
 };

 const totalHelpful = comments.reduce((sum, c) => sum + c.helpful, 0);
 const avgRating =
 comments.length > 0
 ? (comments.reduce((sum, c) => sum + c.rating, 0) / comments.length).toFixed(1)
 : null;

 return (
 <div className="rounded-xl border border-tech-500/30 bg-tech-700/80 p-4 sm:p-6">
 {/* Header */}
 <div className="flex items-center justify-between mb-4">
 <div className="flex items-center gap-2">
 <MessageSquare className="w-4 h-4 text-neon-light" />
 <h3 className="text-sm font-semibold text-white">
 Community Feedback
 </h3>
 </div>
 {avgRating && (
 <div className="flex items-center gap-2 text-xs text-tech-200">
 <div className="flex items-center gap-1">
 <Star className="w-3.5 h-3.5 fill-asia text-asia" />
 <span className="font-semibold text-white">{avgRating}</span>
 </div>
 <span>
 {comments.length} review{comments.length !== 1 ? 's' : ''}
 </span>
 {totalHelpful > 0 && (
 <span className="text-tech-300">
 · {totalHelpful} found helpful
 </span>
 )}
 </div>
 )}
 </div>

 {/* Form */}
 <div className="mb-4 p-3 rounded-lg bg-tech-800/60 border border-tech-500/20">
 <div className="flex items-center justify-between mb-2">
 <button
 onClick={() => setTipMode(false)}
 className={cn(
 'text-xs font-medium transition px-2 py-1 rounded',
 !tipMode
 ? 'text-neon-light bg-neon/10'
 : 'text-tech-200 hover:text-white'
 )}
 >
 ✍️ Write a review
 </button>
 <button
 onClick={() => setTipMode(true)}
 className={cn(
 'text-xs font-medium transition px-2 py-1 rounded',
 tipMode
 ? 'text-neon-light bg-neon/10'
 : 'text-tech-200 hover:text-white'
 )}
 >
 💡 Share a tip
 </button>
 </div>
 <form onSubmit={handleSubmit} className="space-y-2">
 <div className="flex items-center gap-3">
 <input
 type="text"
 value={name}
 onChange={(e) => setName(e.target.value)}
 placeholder="Your name"
 className="flex-1 bg-tech-900 border border-tech-500/30 rounded-lg px-3 py-2 text-xs text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/50"
 required
 />
 <StarInput value={rating} onChange={setRating} size="sm" />
 </div>
 <textarea
 value={comment}
 onChange={(e) => setComment(e.target.value)}
 placeholder={
 tipMode
 ? `Know a better way to use ${toolName}? Share your tip…`
 : `What do you think about ${toolName}?`
 }
 rows={2}
 className="w-full bg-tech-900 border border-tech-500/30 rounded-lg px-3 py-2 text-xs text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/50 resize-none"
 required
 />
 <div className="flex items-center justify-between">
 <p className="text-[9px] text-tech-300">
 {tipMode
 ? 'Tips help other users get more from this tool.'
 : 'Reviews are saved locally (cloud sync coming soon).'}
 </p>
 <button
 type="submit"
 disabled={!name.trim() || !comment.trim() || rating === 0}
 className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neon hover:bg-neon-dark text-white text-xs font-medium transition disabled:opacity-30 disabled:pointer-events-none"
 >
 <Send className="w-3 h-3" />
 {tipMode ? 'Share Tip' : 'Submit Review'}
 </button>
 </div>
 </form>
 </div>

 {/* Comments list */}
 {comments.length > 0 ? (
 <div className="space-y-3">
 {comments.map((c) => (
 <div
 key={c.id}
 className="p-3 rounded-lg bg-tech-800/40 border border-tech-500/10"
 >
 <div className="flex items-start justify-between gap-2 mb-1">
 <div className="flex items-center gap-2">
 <div className="w-6 h-6 rounded-full bg-gradient-to-br from-tech-500 to-tech-600 flex items-center justify-center text-[9px] font-bold text-white shrink-0">
 {c.name[0].toUpperCase()}
 </div>
 <span className="text-xs font-medium text-white">{c.name}</span>
 <StarInput value={c.rating} onChange={() => {}} size="sm" />
 <span className="text-[10px] text-tech-300">
 {new Date(c.createdAt).toLocaleDateString()}
 </span>
 </div>
 <button
 onClick={() => handleHelpful(c.id)}
 className="flex items-center gap-1 text-[10px] text-tech-300 hover:text-neon-light transition"
 >
 <ThumbsUp className="w-3 h-3" />
 {c.helpful > 0 && <span>{c.helpful}</span>}
 </button>
 </div>
 <p className="text-xs text-tech-100 leading-relaxed ml-8">{c.comment}</p>
 </div>
 ))}
 </div>
 ) : (
 <div className="text-center py-6">
 <Heart className="w-8 h-8 text-tech-400 mx-auto mb-2" />
 <p className="text-xs text-tech-200">
 No reviews yet. Be the first to share your experience!
 </p>
 </div>
 )}
 </div>
 );
}
