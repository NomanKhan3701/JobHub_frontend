/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://web-varun-dhruv.cloud.okteto.net/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig
