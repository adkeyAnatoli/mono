import withPWA from 'next-pwa';

/**
 * @type {import('next-pwa').PWAConfig}
 */
const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
};

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'api.adkey-seo.com',
      },
    ],
    unoptimized: true,
  },
};

export default withPWA(pwaConfig)(nextConfig);
