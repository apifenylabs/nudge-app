/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'senior-friendly-travel.vercel.app' }],
        destination: 'https://www.seniorfriendlytravelasia.com/:path*',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
