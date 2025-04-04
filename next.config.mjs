/** @type {import('next').NextConfig} */
// next.config.mjs
export default {
  reactStrictMode: false, // Disable React Strict Mode
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};
