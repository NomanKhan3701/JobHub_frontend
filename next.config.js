/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Accept-CH",
            value: "Sec-CH-UA-Mobile, Sec-CH-UA-Platform, Sec-CH-UA",
          },
        ],
      },
    ]
  }
}

module.exports = nextConfig
