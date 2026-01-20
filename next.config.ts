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
      {
        protocol: "https",
        hostname: "example.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "assets.coingecko.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "pisces.bbystatic.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "slimages.macysassets.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
