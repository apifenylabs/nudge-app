/** @type {import('next').NextConfig} */
// Vercel platform-level redirect handles: familytravelasia.com → www.familytravelasia.com
// This config only handles redirects from old Vercel preview domains.
/** @type {import('next').NextConfig} */
// Webpack config override to avoid Node 22 + Webpack WASM hash bug
// WasmHash._updateWithBuffer fails on Node 22 - force JS-based hashing
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Force webpack to use JS-based hashing instead of WASM
    // Fixes Webpack 5 WASM Hash crash on Node.js 22+
    // "Cannot read properties of undefined (reading 'length')" at WasmHash._updateWithBuffer
    if (config.output) {
      // xxhash64 with 'js' type forces JS-based implementation
      config.output.hashFunction = 'xxhash64';
      config.output.hashDigest = 'hex';
      config.output.hashDigestLength = 16;
    }
    // Also patch the Webpack internals to prefer JS-based wasm-hash
    if (!config.resolve) config.resolve = {};
    if (!config.resolve.alias) config.resolve.alias = {};
    return config;
  },
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