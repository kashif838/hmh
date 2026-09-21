import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    // Commerce routes never exist on this site (PRD §6).
    return ["/shop", "/cart", "/checkout", "/my-account"].map((source) => ({
      source,
      destination: "/",
      permanent: true,
    }));
  },
};

export default createNextIntlPlugin()(nextConfig);
