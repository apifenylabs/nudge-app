'use client';

import { useState, FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CATEGORIES, PRICING_TIERS } from '@/lib/types';

export default function SubmitToolForm() {
 const [name, setName] = useState('');
 const [tagline, setTagline] = useState('');
 const [websiteUrl, setWebsiteUrl] = useState('');
 const [category, setCategory] = useState('');
 const [pricingTier, setPricingTier] = useState('');
 const [description, setDescription] = useState('');
 const [submitted, setSubmitted] = useState(false);
 const [error, setError] = useState('');

 const handleSubmit = (e: FormEvent) => {
 e.preventDefault();
 setError('');

 if (!name.trim() || !websiteUrl.trim()) {
 setError('Name and website URL are required.');
 return;
 }

 try {
 new URL(websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`);
 } catch {
 setError('Please enter a valid URL.');
 return;
 }

 // Simulate submission
 setSubmitted(true);
 };

 if (submitted) {
 return (
 <div className="max-w-lg mx-auto text-center py-12 sm:py-16">
 <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
 <CheckCircle className="w-8 h-8 text-emerald-400" />
 </div>
 <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Tool Submitted!</h2>
 <p className="text-sm text-tech-200 mb-6 max-w-md mx-auto">
 Thanks for contributing to Apifeny AI! Our team will review your submission and get it
 added to the directory within 24-48 hours.
 </p>
 <button
 onClick={() => {
 setSubmitted(false);
 setName('');
 setTagline('');
 setWebsiteUrl('');
 setCategory('');
 setPricingTier('');
 setDescription('');
 }}
 className="px-6 py-2.5 rounded-lg border border-tech-500/30 text-sm text-tech-100 hover:text-white hover:border-neon/30 transition"
 >
 Submit Another Tool
 </button>
 </div>
 );
 }

 return (
 <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5">
 {/* Error */}
 {error && (
 <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
 <AlertCircle className="w-4 h-4 shrink-0" />
 {error}
 </div>
 )}

 {/* Name */}
 <div>
 <label className="block text-sm font-medium text-tech-100 mb-1.5">
 Tool Name <span className="text-red-400">*</span>
 </label>
 <input
 type="text"
 value={name}
 onChange={(e) => setName(e.target.value)}
 placeholder="e.g., ChatGPT, Midjourney"
 className="w-full bg-tech-800 border border-tech-500/50 rounded-lg px-4 py-3 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/20 transition"
 required
 />
 </div>

 {/* Tagline */}
 <div>
 <label className="block text-sm font-medium text-tech-100 mb-1.5">Tagline</label>
 <input
 type="text"
 value={tagline}
 onChange={(e) => setTagline(e.target.value)}
 placeholder="One-line description of the tool"
 className="w-full bg-tech-800 border border-tech-500/50 rounded-lg px-4 py-3 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/20 transition"
 />
 </div>

 {/* Website URL */}
 <div>
 <label className="block text-sm font-medium text-tech-100 mb-1.5">
 Website URL <span className="text-red-400">*</span>
 </label>
 <input
 type="url"
 value={websiteUrl}
 onChange={(e) => setWebsiteUrl(e.target.value)}
 placeholder="https://example.com"
 className="w-full bg-tech-800 border border-tech-500/50 rounded-lg px-4 py-3 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/20 transition"
 required
 />
 </div>

 {/* Category */}
 <div>
 <label className="block text-sm font-medium text-tech-100 mb-1.5">Category</label>
 <select
 value={category}
 onChange={(e) => setCategory(e.target.value)}
 className="w-full bg-tech-800 border border-tech-500/50 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/20 transition appearance-none"
 >
 <option value="">Select a category</option>
 {CATEGORIES.filter((c) => c !== 'All Categories').map((cat) => (
 <option key={cat} value={cat}>
 {cat}
 </option>
 ))}
 </select>
 </div>

 {/* Pricing Tier */}
 <div>
 <label className="block text-sm font-medium text-tech-100 mb-1.5">Pricing Tier</label>
 <select
 value={pricingTier}
 onChange={(e) => setPricingTier(e.target.value)}
 className="w-full bg-tech-800 border border-tech-500/50 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/20 transition appearance-none"
 >
 <option value="">Select pricing tier</option>
 {PRICING_TIERS.filter((p) => p !== 'All Pricing').map((tier) => (
 <option key={tier} value={tier}>
 {tier}
 </option>
 ))}
 </select>
 </div>

 {/* Description */}
 <div>
 <label className="block text-sm font-medium text-tech-100 mb-1.5">Description</label>
 <textarea
 value={description}
 onChange={(e) => setDescription(e.target.value)}
 rows={4}
 placeholder="Tell us about the tool and what makes it special..."
 className="w-full bg-tech-800 border border-tech-500/50 rounded-lg px-4 py-3 text-sm text-white placeholder:text-tech-300 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/20 transition resize-none"
 />
 </div>

 {/* Submit */}
 <button
 type="submit"
 className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-neon hover:bg-neon-dark text-white font-medium text-sm transition"
 >
 <Send className="w-4 h-4" />
 Submit for Review
 </button>
 </form>
 );
}
