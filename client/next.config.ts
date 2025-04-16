import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "randomuser.me", "cdn-icons-png.flaticon.com"],
  },
  experimental: {
    reactRoot: true,
    suppressHydrationWarning: true,
  },
};

export default nextConfig;
