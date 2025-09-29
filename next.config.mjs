/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.adkey-seo.com",
        port: "",
        pathname: "/storage/images/**",
      },
    ],
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: [
      "@reduxjs/toolkit",
      "axios",
      "react",
      "react-dom",
      "react-redux",
      "sharp",
    ],
  },
};

export default nextConfig;
