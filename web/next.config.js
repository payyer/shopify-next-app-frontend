/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // output: "export",
  trailingSlash: true,
  reactStrictMode: false,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_HOST: process.env.HOST,
    NEXT_PUBLIC_SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
  },
  experimental: {
    serverActions: {}, // nếu bạn đang dùng App Router
  },
};

module.exports = nextConfig;
