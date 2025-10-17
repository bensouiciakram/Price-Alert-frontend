import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dz.jumia.is",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
