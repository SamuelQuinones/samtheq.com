/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/contact",
        destination: "/",
        permanent: false,
      },
      {
        source: "/about",
        destination: "/",
        permanent: false,
      },
      {
        source: "/posts/:slug*",
        destination: "/blog/:slug*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
