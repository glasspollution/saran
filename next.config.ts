import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance optimizations
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-accordion",
      "@radix-ui/react-label", 
      "@radix-ui/react-slot",
      "framer-motion"
    ],
    webpackBuildWorker: true,
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  },

  // Bundle optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Reduce bundle size by splitting chunks
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          animations: {
            test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
            name: 'animations',
            chunks: 'all',
          },
          ui: {
            test: /[\\/]node_modules[\\/](@radix-ui)[\\/]/,
            name: 'ui',
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Power optimizations
  poweredByHeader: false,
  
  // Compression
  compress: true,
};

export default nextConfig;
