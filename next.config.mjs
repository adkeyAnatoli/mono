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
  redirects: async () => [
    { source: '/uk', destination: '/', permanent: true },
    { source: '/uk/:path*', destination: '/:path*', permanent: true },
    { source: '/fr', destination: '/', permanent: true },
    { source: '/fr/:path*', destination: '/:path*', permanent: true },
    { source: '/de', destination: '/', permanent: true },
    { source: '/de/:path*', destination: '/:path*', permanent: true },
    { source: '/about', destination: '/', permanent: true },
    { source: '/about/:path*', destination: '/', permanent: true },
    { source: '/bonuses', destination: '/', permanent: true },
    { source: '/registration', destination: '/', permanent: true },
    { source: '/games', destination: '/', permanent: true },
    { source: '/payments', destination: '/', permanent: true },
  ],
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

export default nextConfig;
