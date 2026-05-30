import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        {/* Large 404 visual */}
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-teal-100 to-amber-100 flex items-center justify-center">
            <span className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-amber-500 bg-clip-text text-transparent">
              ?
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Lost in the swarm
        </h1>

        <p className="text-gray-500 mb-2 leading-relaxed">
          This agent doesn&apos;t exist yet. Maybe it&apos;s still leveling up, or it wandered off into the orbital void.
        </p>

        <p className="text-sm text-gray-400 mb-8">
          HTTP 404 — Page not found
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-amber-500 text-white font-medium text-sm hover:shadow-lg hover:shadow-teal-200/50 transition-all duration-200"
        >
          Return to the Forge
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>

        <div className="mt-8 text-xs text-gray-400">
          <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
          <span className="mx-2">·</span>
          <Link href="/pricing" className="hover:text-gray-600 transition-colors">Pricing</Link>
          <span className="mx-2">·</span>
          <Link href="/login" className="hover:text-gray-600 transition-colors">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
