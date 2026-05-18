/** @type {import('next').NextConfig} */
// Custom domain (apifeny.ai) DNS is not yet configured.
// Until DNS is set up, the Vercel app URL serves content directly.
// When DNS is ready, uncomment the vercel.app redirect to point to apifeny.ai.
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
    ];
  },
};

module.exports = nextConfig;
