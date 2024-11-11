/** @type {import('next').NextConfig} */
// next.config.mjs
export default {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**', // Allows images from any secure hostname
            },
        ],
    },
}
