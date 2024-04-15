/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        pathname: "/**",
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        pathname: "/**",
        protocol: "https",
        hostname: "aceternity.com",
        port: "",
      },
      {
        pathname: "/**",
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        pathname: "/**",
        protocol: "https",
        hostname: "swarnimpublication.com.np",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
