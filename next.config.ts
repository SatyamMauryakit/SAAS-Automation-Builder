import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        
      },
      {
        protocol: 'https',
        hostname: '**.ucarecdn.com',
        
      },
      {
        protocol: 'https',
        hostname: 'ucarecdn.com',
        
      },
      {
        protocol: 'https',
        hostname: '**.ucarecdn.net',
        
      },
      {
        protocol: 'https',
        hostname: 'ucarecdn.net',
        
      },{
        protocol: "https",
        hostname: "64gc25v6oz.ucarecd.net", // 👈 allow your image host
      },
    ]
  /* config options here */
}
}

export default nextConfig;
