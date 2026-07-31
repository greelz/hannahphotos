import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://pub-23a50fc392ea42b7a563ffa264f030cf.r2.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },

  /* config options here */
};

export default nextConfig;
