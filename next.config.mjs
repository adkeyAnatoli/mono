import createNextIntlPlugin from 'next-intl/plugin';
import withPWA from 'next-pwa';

const withNextIntl = createNextIntlPlugin();

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
};

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.adkey-seo.com',
        port: '',
        pathname: '/storage/images/**',
      },
    ],
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'no-referrer',
          },
        ],
      },
    ];
  },
  experimental: {
    optimizePackageImports: [
      '@reduxjs/toolkit',
      'react',
      'react-dom',
      'react-redux',
      'sharp',
    ],
  },
};

export default withNextIntl(withPWA(pwaConfig)(nextConfig));
