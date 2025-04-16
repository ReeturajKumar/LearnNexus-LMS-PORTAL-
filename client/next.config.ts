/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "randomuser.me", "cdn-icons-png.flaticon.com"],
  },
  experimental: {
    suppressHydrationWarning: true,
  },
};

export default nextConfig;
