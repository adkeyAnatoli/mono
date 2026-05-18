import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

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
    unoptimized: true,
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

export default withNextIntl(nextConfig);
