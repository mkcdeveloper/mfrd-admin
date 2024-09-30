/**@type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  basePath: "",
  assetPrefix: "",
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000'
      },
      {
        protocol: 'https',
        hostname: 'backend.malaibar.org',
        port: ''
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
