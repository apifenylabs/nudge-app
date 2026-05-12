/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.apifeny.ai' }],
        destination: 'https://apifeny.ai/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'apifeny-ai.vercel.app' }],
        destination: 'https://apifeny.ai/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
