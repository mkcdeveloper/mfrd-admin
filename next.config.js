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
        hostname: 'mfrdapi.markazcity.in',
        port: ''
      }
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
