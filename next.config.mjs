const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "behfmqoilcgpyoobcuck.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
