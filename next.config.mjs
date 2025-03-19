/** @type {import('next').NextConfig} */
// next.config.mjs
export default {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};
