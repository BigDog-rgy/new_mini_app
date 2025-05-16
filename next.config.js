/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Required for @vercel/og to work on edge runtime with app directory
    serverActions: true,
  },
  images: {
    // Not strictly required for OG generation, but good if you use next/image anywhere
    minimumCacheTTL: 0,
  },
  headers() {
    return [
      {
        source: "/api/image", // match your dynamic OG image route
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
