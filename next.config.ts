import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'siemens-picture-file-dev.s3.us-east-2.amazonaws.com',
      },
    ],
  },
  output: 'export',
};

export default nextConfig;
