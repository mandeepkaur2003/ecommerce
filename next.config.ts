/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.dummyjson.com', 'cdn-icons-png.flaticon.com','localhost'], // add your image host here
  },
};

module.exports = nextConfig;
