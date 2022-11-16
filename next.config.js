const withContentLayer = require("next-contentlayer").withContentlayer;

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
      {
        source: "/tags/:tag*",
        destination: "/blog/tags/:tag*",
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

module.exports = withContentLayer(nextConfig);
