/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  trailingSlash: true,
  reactStrictMode: true,
  transpilePackages: ['firebase'],
}

module.exports = nextConfig
