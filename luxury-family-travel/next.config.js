/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.luxuryfamilytravelasia.com' }],
        destination: 'https://luxuryfamilytravelasia.com/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'luxury-family-travel-asia.vercel.app' }],
        destination: 'https://luxuryfamilytravelasia.com/:path*',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig