/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['picsum.photos'], // Add picsum.photos to the list
    },
};

export default nextConfig;