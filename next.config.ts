import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.reloadly.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.giftcardpartners.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.mygiftcardsupply.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
