/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // output: "standalone", // Experiment with this
  async headers() {
    return [
      {
        source: "/:path*{/}?",
        headers: [
          {
            key: "X-Accel-Buffering",
            value: "no",
          },
        ],
      },
    ];
  },
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

export default nextConfig;
