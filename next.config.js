/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Ensure proper asset prefix for Cloudflare Pages
  assetPrefix: '',
};

module.exports = nextConfig;
