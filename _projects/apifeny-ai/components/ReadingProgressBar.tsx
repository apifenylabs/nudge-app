'use client';

import { useState, useEffect } from 'react';

export default function ReadingProgressBar() {
 const [scrollProgress, setScrollProgress] = useState(0);

 useEffect(() => {
 const handleScroll = () => {
 const scrollTop = window.scrollY;
 const docHeight = document.documentElement.scrollHeight - window.innerHeight;
 const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
 setScrollProgress(Math.min(progress, 100));
 };
 window.addEventListener('scroll', handleScroll, { passive: true });
 return () => window.removeEventListener('scroll', handleScroll);
 }, []);

 return (
 <div
 className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-neon to-aqua z-50 transition-all duration-200"
 style={{ width: `${scrollProgress}%` }}
 />
 );
}
