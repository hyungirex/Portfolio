import type { NextConfig } from "next";

module.exports = {
  async rewrites() {
    return [
      { source: '/resume', destination: '/resume.pdf' },
    ];
  },
};

const nextConfig: NextConfig = {
  devIndicators: false,
};

export default nextConfig;