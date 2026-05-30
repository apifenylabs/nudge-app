export default function Loading() {
 return (
 <div className="min-h-screen bg-tech-900 animate-pulse">
 {/* Hero */}
 <section className="relative overflow-hidden border-b border-tech-500/20">
 <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
 <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
 <div className="flex items-center gap-2 mb-4">
 <div className="w-5 h-5 bg-tech-600 rounded" />
 <div className="h-4 w-20 bg-tech-600 rounded" />
 </div>
 <div className="h-10 w-3/4 bg-tech-600 rounded mb-4 max-w-3xl" />
 <div className="h-10 w-1/2 bg-tech-600 rounded mb-4 max-w-2xl" />
 <div className="h-5 w-2/3 bg-tech-700 rounded mb-8 max-w-2xl" />
 <div className="flex gap-3">
 <div className="h-12 w-40 bg-tech-600 rounded-xl" />
 <div className="h-12 w-40 bg-tech-600 rounded-xl" />
 </div>
 </div>
 </section>

 {/* Section heading */}
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
 <div className="h-7 w-56 bg-tech-600 rounded mb-2" />
 <div className="h-4 w-72 bg-tech-700 rounded" />
 </div>

 {/* Tool cards grid */}
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
 {[1, 2, 3, 4, 5, 6].map((i) => (
 <div key={i} className="bg-tech-800/40 border border-tech-500/20 rounded-xl overflow-hidden">
 <div className="p-6 sm:p-8">
 <div className="flex flex-wrap gap-2 mb-4">
 <div className="h-5 w-16 bg-tech-600 rounded-full" />
 <div className="h-5 w-20 bg-tech-600 rounded-full" />
 </div>
 <div className="w-12 h-12 bg-tech-600 rounded-xl mb-4" />
 <div className="h-5 w-4/5 bg-tech-600 rounded mb-2" />
 <div className="h-4 w-full bg-tech-700 rounded mb-1" />
 <div className="h-4 w-full bg-tech-700 rounded mb-1" />
 <div className="h-4 w-2/3 bg-tech-700 rounded mb-4" />
 <div className="flex items-center gap-2">
 <div className="h-3 w-24 bg-tech-600 rounded" />
 <div className="h-3 w-16 bg-tech-700 rounded" />
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 );
}
