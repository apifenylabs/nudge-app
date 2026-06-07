import { Metadata } from 'next';
import SubmitToolForm from '@/components/SubmitToolForm';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
 title: 'Submit an AI Tool',
 description: 'Submit your AI tool or agent to Apifeny AI. Get discovered by thousands of AI enthusiasts across Asia.',
};

export default function SubmitPage() {
 return (
 <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
 {/* Hero */}
 <div className="text-center mb-10 sm:mb-12">
 <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-neon to-aqua/80 mb-4 shadow-lg shadow-neon/20">
 <Sparkles className="w-7 h-7 text-white" />
 </div>
 <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
 Submit an AI Tool
 </h1>
 <p className="text-sm sm:text-base text-gray-700 max-w-lg mx-auto">
 Help us grow the largest AI tools directory for Asia. Submit your tool or a tool
 you love, and we&apos;ll review it for inclusion in our curated collection.
 </p>

 <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
 <span className="px-3 py-1 rounded-full text-xs font-medium bg-neon/10 text-neon-light border border-neon/20">
 Free listing
 </span>
 <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
 Reviewed within 48h
 </span>
 <span className="px-3 py-1 rounded-full text-xs font-medium bg-aqua/10 text-aqua border border-aqua/20">
 Asia-focused audience
 </span>
 </div>
 </div>

 {/* Form */}
 <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-6 sm:p-8">
 <SubmitToolForm />
 </div>
 </div>
 );
}
