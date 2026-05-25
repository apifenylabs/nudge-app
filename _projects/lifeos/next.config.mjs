/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  // Normal Vercel deployment — no static export needed for API routes
};

export default nextConfig;
