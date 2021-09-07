/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  /** By default Next.js will add the `x-powered-by` header. This will opt-out of it */
  poweredByHeader: false,
  /**
   * In a NextJS project Strict mode is disabled by default, this will enable it.
   * Strict mode is highly recommented as it will better prepare your application for the future of react.
   */
  reactStrictMode: true,
};
