/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.familytravelasia.com' }],
        destination: 'https://familytravelasia.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'family-travel-directory.vercel.app' }],
        destination: 'https://familytravelasia.com/:path*',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig