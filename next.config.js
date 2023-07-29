/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: "standalone", // Experiment with this
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
      {
        source: "/coding",
        destination: "/code",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
