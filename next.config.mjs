/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // The supplied photography is a small fixed set of local JPEGs.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
