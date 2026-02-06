/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.dummyjson.com'], // ✅ add your image host here
  },
};

module.exports = nextConfig;
