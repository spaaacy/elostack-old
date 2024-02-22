/** @type {import('next').NextConfig} */
const nextConfig = {
  // TODO: Change later
  // Allows all domains for development only
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
