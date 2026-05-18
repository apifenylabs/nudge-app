import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <span className="text-6xl block mb-4">🔍</span>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-gray-500 mb-6">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Link href="/" className="bg-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors">
        Go Home
      </Link>
    </div>
  );
}
