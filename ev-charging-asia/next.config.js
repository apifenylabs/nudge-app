/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.ev-charging-asia.vercel.app' }],
        destination: 'https://ev-charging-asia.vercel.app/:path*',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
