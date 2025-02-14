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
    domains: ['api.adkey-seo.com'],
  },
};

export default withPWA(pwaConfig)(nextConfig);
