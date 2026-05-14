/** @type {import('next').NextConfig} */
// Custom domain (luxuryfamilytravelasia.com) DNS is not yet configured.
// Until DNS is set up, the Vercel app URL serves content directly.
// When DNS is ready, uncomment the vercel.app redirect to point to the custom domain.
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.luxuryfamilytravelasia.com' }],
        destination: 'https://luxuryfamilytravelasia.com/:path*',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig