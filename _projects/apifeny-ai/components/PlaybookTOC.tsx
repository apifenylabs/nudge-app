'use client';

import { BookOpen } from 'lucide-react';

interface PlaybookTOCProps {
 steps: { title: string; description: string; tip?: string }[];
}

export default function PlaybookTOC({ steps }: PlaybookTOCProps) {
 const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, index: number) => {
 e.preventDefault();
 const el = document.getElementById(`step-${index + 1}`);
 if (el) {
 el.scrollIntoView({ behavior: 'smooth', block: 'start' });
 }
 };

 if (steps.length === 0) return null;

 return (
 <div className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
 <h2 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
 <BookOpen className="w-4 h-4 text-blue-600" />
 Table of Contents
 </h2>
 <nav className="space-y-1.5">
 {steps.map((step, i) => (
 <a
 key={i}
 href={`#step-${i + 1}`}
 onClick={(e) => handleClick(e, i)}
 className="block text-xs text-gray-600 hover:text-blue-700 transition pl-3 border-l-2 border-gray-200 hover:border-blue-600 py-0.5 hover:scale-[1.02] origin-left"
 >
 Step {i + 1}: {step.title}
 </a>
 ))}
 </nav>
 </div>
 );
}
