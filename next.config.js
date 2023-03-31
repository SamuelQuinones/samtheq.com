/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/contact",
        destination: "/",
        permanent: false,
      },
      {
        source: "/l/:link*",
        destination: "/links/:link*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
