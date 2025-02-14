import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cazeus Casino',
    short_name: 'Cazeus',
    orientation: 'portrait',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/icons/icon57.png',
        sizes: '57x57',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon60.png',
        sizes: '60x60',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon76.png',
        sizes: '76x76',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon114.png',
        sizes: '114x114',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon120.png',
        sizes: '120x120',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon152.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon180.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
