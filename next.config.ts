import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com"
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      },
      {
        protocol: "https",
        hostname: "utfs.io"
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      }
    ]
  }
}

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
