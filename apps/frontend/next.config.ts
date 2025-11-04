import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["framer-motion"], // Add this if you get module errors
  /* config options here */
};

export default nextConfig;
