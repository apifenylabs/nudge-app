/** @type {import('next').NextConfig} */
// Vercel platform-level redirect handles: familytravelasia.com → www.familytravelasia.com
// This config only handles redirects from old Vercel preview domains.
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'family-travel-directory.vercel.app' }],
        destination: 'https://www.familytravelasia.com/:path*',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig