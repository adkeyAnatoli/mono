if (!self.define) {
  let e,
    s = {};
  const a = (a, n) => (
    (a = new URL(a + '.js', n).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, i) => {
    const c =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[c]) return;
    let t = {};
    const r = (e) => a(e, c),
      f = { module: { uri: c }, exports: t, require: r };
    s[c] = Promise.all(n.map((e) => f[e] || r(e))).then((e) => (i(...e), t));
  };
}
define(['./workbox-1bb06f5e'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/app-build-manifest.json',
          revision: '2f75b73c8b58b198cbdecf3928f46938',
        },
        {
          url: '/_next/static/chunks/203.2b4c1ee4fbe3a7cf.js',
          revision: '2b4c1ee4fbe3a7cf',
        },
        {
          url: '/_next/static/chunks/218.57a830a2c55ba802.js',
          revision: '57a830a2c55ba802',
        },
        {
          url: '/_next/static/chunks/465-57e0c03c0660c567.js',
          revision: 'nnG3smLpP6b4J5eCa69l3',
        },
        {
          url: '/_next/static/chunks/4bd1b696-486f7335f7911bcf.js',
          revision: 'nnG3smLpP6b4J5eCa69l3',
        },
        {
          url: '/_next/static/chunks/517-8588ca55ccfaaca2.js',
          revision: 'nnG3smLpP6b4J5eCa69l3',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-f5fd36e479f8bab0.js',
          revision: 'nnG3smLpP6b4J5eCa69l3',
        },
        {
          url: '/_next/static/chunks/app/layout-374af450e2e6e8c6.js',
          revision: 'nnG3smLpP6b4J5eCa69l3',
        },
        {
          url: '/_next/static/chunks/app/page-a49376dc428aab00.js',
          revision: 'nnG3smLpP6b4J5eCa69l3',
        },
        {
          url: '/_next/static/chunks/framework-6b27c2b7aa38af2d.js',
          revision: 'nnG3smLpP6b4J5eCa69l3',
        },
        {
          url: '/_next/static/chunks/main-98e6f18a2968b47a.js',
          revision: 'nnG3smLpP6b4J5eCa69l3',
        },
        {
          url: '/_next/static/chunks/main-app-a9e350154f7c2c4f.js',
          revision: 'nnG3smLpP6b4J5eCa69l3',
        },
        {
          url: '/_next/static/chunks/pages/_app-430fec730128923e.js',
          revision: 'nnG3smLpP6b4J5eCa69l3',
        },
        {
          url: '/_next/static/chunks/pages/_error-2d7241423c4a35ba.js',
          revision: 'nnG3smLpP6b4J5eCa69l3',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-304ff6fa68ce9b8a.js',
          revision: 'nnG3smLpP6b4J5eCa69l3',
        },
        {
          url: '/_next/static/css/500b0772e87f61a6.css',
          revision: '500b0772e87f61a6',
        },
        {
          url: '/_next/static/css/a22f58d9e849559b.css',
          revision: 'a22f58d9e849559b',
        },
        {
          url: '/_next/static/media/06aa60d9335bb7b5-s.woff2',
          revision: 'a523645e855da3d79e840ceedeb490f6',
        },
        {
          url: '/_next/static/media/24c66e387ee021e3-s.p.woff2',
          revision: '1c90741ab702dbf9e43c3b8aff677212',
        },
        {
          url: '/_next/static/media/3064ca4f871fda7c-s.woff2',
          revision: '74d69db03e56c6dd835355df4b81e83b',
        },
        {
          url: '/_next/static/media/36f99cb59bd47834-s.woff2',
          revision: '85ce557d42556e535be0afc49697804e',
        },
        {
          url: '/_next/static/media/419a051b363af584-s.woff2',
          revision: '466574fd507089f8049c86c143d18c28',
        },
        {
          url: '/_next/static/media/778ce0abc5526d65-s.woff2',
          revision: '1e87ea5c616ab58db053ec21d2a65e68',
        },
        {
          url: '/_next/static/media/83442d006fdc0eaf-s.woff2',
          revision: '835a3c567855490929383903942116ea',
        },
        {
          url: '/_next/static/media/8d7c84a11f840916-s.woff2',
          revision: '0b3c81de3f814b09bef55249179c2034',
        },
        {
          url: '/_next/static/media/9798597226cbd355-s.woff2',
          revision: '689ab7151c6dc3ec2006d29dbbd33667',
        },
        {
          url: '/_next/static/media/a7dd9e1c353b059e-s.p.woff2',
          revision: 'db111694924a0289e670bc284052fd22',
        },
        {
          url: '/_next/static/media/b17f997f9ae7c671-s.woff2',
          revision: '4fd3717edcc89bff241efc2d554dfd72',
        },
        {
          url: '/_next/static/media/ddcfaf3c507de899-s.woff2',
          revision: '3400c61ad405d4b0453e57ffef4d5d1e',
        },
        { url: '/_next/static/media/slot1.be314778.png', revision: 'be314778' },
        {
          url: '/_next/static/nnG3smLpP6b4J5eCa69l3/_buildManifest.js',
          revision: '7424083b2a836c8616dbd4b0fc597b9a',
        },
        {
          url: '/_next/static/nnG3smLpP6b4J5eCa69l3/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/appstore.png', revision: '9e9246fbe6460c49c96c948ba0f74a1d' },
        {
          url: '/googleplay.png',
          revision: '79b681accf12b8c43e0804d8fac840a4',
        },
        { url: '/icon-play.svg', revision: '01230452bcbd67f4db05f5f0e79efa67' },
        { url: '/icon.svg', revision: '7a1fc11a2313e6b9f4f63d83bd996ed0' },
        { url: '/img-192.png', revision: '26f6f6d094dc26ce7deaf14f7e0d5712' },
        { url: '/img-512.png', revision: 'a406e7c663c3b26e170ef33905432d73' },
        { url: '/img.png', revision: 'b03ab3f2df1fbc15e96b3cf0e7d85529' },
        { url: '/info.svg', revision: 'eec978edcb7f04a72ec5336acd04ebe9' },
        { url: '/logo.svg', revision: '449a3ab640fcd31717771b1fc81a077f' },
        { url: '/minus.svg', revision: '1a33446ba6328a1ee6a6a1166afe5144' },
        {
          url: '/partners/bb.svg',
          revision: '523fcc3aad0df5259c8a34d43dcd908e',
        },
        {
          url: '/partners/bbC.svg',
          revision: 'd06e0032598541a0db2da15dc4f3b247',
        },
        {
          url: '/partners/ec.svg',
          revision: 'eeede46b13abc51a5181eda176e49b73',
        },
        {
          url: '/partners/ecC.svg',
          revision: 'dbe8e4a43443b5f2da7985863dfe4b33',
        },
        {
          url: '/partners/gb.svg',
          revision: '44d5fa75627aea32edee29ab80886698',
        },
        {
          url: '/partners/gbC.svg',
          revision: '8f71817621c323623cd88d7879a0b093',
        },
        {
          url: '/partners/gc.svg',
          revision: '02ad30945bb4e5e8d8f5d4b34f041a73',
        },
        {
          url: '/partners/gcC.svg',
          revision: '8f9810106a9ca3fcda827d873fc5b029',
        },
        {
          url: '/partners/gp.svg',
          revision: '646061749209f30dae1b74ce32889210',
        },
        {
          url: '/partners/gpC.svg',
          revision: 'c102bcbb60361f88d765cf7ac51edbfe',
        },
        {
          url: '/partners/gt.svg',
          revision: '142ff73d2cb609353c6ca30f506c8a60',
        },
        {
          url: '/partners/gtC.svg',
          revision: 'e1739ad51681172f579415ac41f668a1',
        },
        {
          url: '/partners/gw.svg',
          revision: '8b7d2fe68fad016182a7f4cb91570127',
        },
        {
          url: '/partners/gwC.svg',
          revision: '10166c878f470f446bee4177bcd71580',
        },
        {
          url: '/partners/itl.svg',
          revision: '6dfa6fce4e6d45a907fce14bc3b400d5',
        },
        {
          url: '/partners/itlC.svg',
          revision: '25c505c7dad867defefdfdc0bda230f0',
        },
        {
          url: '/payments/bit.svg',
          revision: '38c885a880d88ab54a5dddf02375a7cc',
        },
        {
          url: '/payments/bitC.svg',
          revision: 'f77c7a7b7ae7834279adc70c0d919bae',
        },
        {
          url: '/payments/eth.svg',
          revision: '077678996d25360e65d487c3f975d401',
        },
        {
          url: '/payments/ethC.svg',
          revision: 'f90f4f090619e1cae6598650859bfa2a',
        },
        {
          url: '/payments/lit.svg',
          revision: 'b3f70c657180726387062972f12e72bd',
        },
        {
          url: '/payments/litC.svg',
          revision: 'a9842940b5b5e09355d6f8c786fe4f49',
        },
        {
          url: '/payments/mas.svg',
          revision: '52ab4c853726050b91a40c50955222ba',
        },
        {
          url: '/payments/masC.svg',
          revision: '16acb209f66b013b39295844d1954b4b',
        },
        {
          url: '/payments/net.svg',
          revision: 'bf969aac2d36e862a95bbb8bfac64eb9',
        },
        {
          url: '/payments/netC.svg',
          revision: '7249b4e5180630c3f9d6f41031920a49',
        },
        {
          url: '/payments/sk.svg',
          revision: 'aa285d180d2085e008a04bb29b5b5dfe',
        },
        {
          url: '/payments/skC.svg',
          revision: '746dc0d7b3693d5babfd000a4418e18b',
        },
        {
          url: '/payments/v.svg',
          revision: '0fa83a251bba540e1156edb5605a2868',
        },
        {
          url: '/payments/vC.svg',
          revision: '39d2f730ba82345268eb3f5d2113910f',
        },
        { url: '/plus.svg', revision: '217a344d90b5616ef9ba6797cc14831e' },
        { url: '/slot1.png', revision: 'a406e7c663c3b26e170ef33905432d73' },
        { url: '/slot3.png', revision: 'c617b05bfd8664c504138a4c55c39c90' },
        { url: '/slot4.png', revision: '6052106bbbf919cbef6835f9cbaa6775' },
        { url: '/slot5.png', revision: '973fb75f06e870c58c31ec051c0c624a' },
        { url: '/star.svg', revision: '950d5c82116c51ce03ea2cc0fb0c5cd3' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: n,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    );
});
