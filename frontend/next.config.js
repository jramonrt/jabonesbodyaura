/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  images: {
    domains: ['localhost'],
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    DOTNET_API_URL: process.env.DOTNET_API_URL || 'http://localhost:5000',
    PHP_API_URL: process.env.PHP_API_URL || 'http://localhost:8080',
  },
};

module.exports = nextConfig;
