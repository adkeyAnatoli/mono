if (!self.define) {
  let e,
    a = {};
  const i = (i, s) => (
    (i = new URL(i + '.js', s).href),
    a[i] ||
      new Promise((a) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = i), (e.onload = a), document.head.appendChild(e);
        } else (e = i), importScripts(i), a();
      }).then(() => {
        let e = a[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (s, c) => {
    const n =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (a[n]) return;
    let t = {};
    const d = (e) => i(e, n),
      r = { module: { uri: n }, exports: t, require: d };
    a[n] = Promise.all(s.map((e) => r[e] || d(e))).then((e) => (c(...e), t));
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
          revision: '2b828ba8f4b44ba5f6e3e7b6fb78e295',
        },
        {
          url: '/_next/static/862ggKHKthv0iuFZV0iQl/_buildManifest.js',
          revision: '508d300ddf0b80ff4c95e6d5bdfdaa7d',
        },
        {
          url: '/_next/static/862ggKHKthv0iuFZV0iQl/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
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
          url: '/_next/static/chunks/4bd1b696-b4e655f0c1905b1d.js',
          revision: '862ggKHKthv0iuFZV0iQl',
        },
        {
          url: '/_next/static/chunks/517-6d72348a234690cf.js',
          revision: '862ggKHKthv0iuFZV0iQl',
        },
        {
          url: '/_next/static/chunks/992-cade9cfab3e2ad95.js',
          revision: '862ggKHKthv0iuFZV0iQl',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-da87bc383ee185ee.js',
          revision: '862ggKHKthv0iuFZV0iQl',
        },
        {
          url: '/_next/static/chunks/app/casino/%5B...id%5D/page-7630cd25e42134f5.js',
          revision: '862ggKHKthv0iuFZV0iQl',
        },
        {
          url: '/_next/static/chunks/app/layout-65f259020577eae0.js',
          revision: '862ggKHKthv0iuFZV0iQl',
        },
        {
          url: '/_next/static/chunks/app/loading-509973002fe64250.js',
          revision: '862ggKHKthv0iuFZV0iQl',
        },
        {
          url: '/_next/static/chunks/app/not-found-ce87c56e17200103.js',
          revision: '862ggKHKthv0iuFZV0iQl',
        },
        {
          url: '/_next/static/chunks/app/page-2b45d48fa50fb25e.js',
          revision: '862ggKHKthv0iuFZV0iQl',
        },
        {
          url: '/_next/static/chunks/framework-6b27c2b7aa38af2d.js',
          revision: '862ggKHKthv0iuFZV0iQl',
        },
        {
          url: '/_next/static/chunks/main-98e6f18a2968b47a.js',
          revision: '862ggKHKthv0iuFZV0iQl',
        },
        {
          url: '/_next/static/chunks/main-app-fb7865f514e4ad2b.js',
          revision: '862ggKHKthv0iuFZV0iQl',
        },
        {
          url: '/_next/static/chunks/pages/_app-430fec730128923e.js',
          revision: '862ggKHKthv0iuFZV0iQl',
        },
        {
          url: '/_next/static/chunks/pages/_error-2d7241423c4a35ba.js',
          revision: '862ggKHKthv0iuFZV0iQl',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-4e75f00a04d66afe.js',
          revision: '862ggKHKthv0iuFZV0iQl',
        },
        {
          url: '/_next/static/css/3eb1df3141ce9d56.css',
          revision: '3eb1df3141ce9d56',
        },
        {
          url: '/_next/static/css/684f255411f987df.css',
          revision: '684f255411f987df',
        },
        {
          url: '/_next/static/media/021bc4481ed92ece-s.woff2',
          revision: '0f5cb8880dd308345f58cecdc5fc5041',
        },
        {
          url: '/_next/static/media/24c15609eaa28576-s.woff2',
          revision: 'be8ee93a8cf390eb9cb6e6aadf1a3bf0',
        },
        {
          url: '/_next/static/media/2c07349e02a7b712-s.woff2',
          revision: '399fb80a20ea7d2a53a1d6dc1e5f392a',
        },
        {
          url: '/_next/static/media/3f69592b2fe603c7-s.woff2',
          revision: '84568c0a37620328592a78e9ad069d77',
        },
        {
          url: '/_next/static/media/47cbc4e2adbc5db9-s.p.woff2',
          revision: '4746809ed1c17447d45d2a96c64796d4',
        },
        {
          url: '/_next/static/media/4f05ba3a6752a328-s.p.woff2',
          revision: 'ea21cc6e4b393851204d1a3160ad6abc',
        },
        {
          url: '/_next/static/media/627d916fd739a539-s.woff2',
          revision: 'c46f88e9518178fd56311db461452f8d',
        },
        {
          url: '/_next/static/media/6325a8417175c41d-s.woff2',
          revision: 'a3fd0c427e31c0cadb48607ee8c7876b',
        },
        {
          url: '/_next/static/media/74c003a2abab0c4f-s.woff2',
          revision: '99ebacc4dfd7bd21bf48d21306c0dd42',
        },
        {
          url: '/_next/static/media/84602850c8fd81c3-s.woff2',
          revision: 'bdf2a9a2d904dc21d9b593b82887af52',
        },
        {
          url: '/_next/static/media/90da053edc2b7de3-s.woff2',
          revision: '5489c188e786a745bd9ba1bc9fbf7f71',
        },
        {
          url: '/_next/static/media/99b7f73d5af7c3e2-s.woff2',
          revision: 'e94b5e20c27aefc321077e0493d637fa',
        },
        {
          url: '/_next/static/media/ac3b7908202f8517-s.woff2',
          revision: '9df032a6b99e0fce98ec4ad311b0fd7d',
        },
        {
          url: '/_next/static/media/b5ee789b512e4d1b-s.woff2',
          revision: '6f64aa964b323b9c0e5dbce214081225',
        },
        {
          url: '/_next/static/media/bb.d65aad7c.svg',
          revision: '523fcc3aad0df5259c8a34d43dcd908e',
        },
        {
          url: '/_next/static/media/bbC.6012791b.svg',
          revision: 'd06e0032598541a0db2da15dc4f3b247',
        },
        {
          url: '/_next/static/media/bit.1eee454c.svg',
          revision: '38c885a880d88ab54a5dddf02375a7cc',
        },
        {
          url: '/_next/static/media/bitC.a5615f7e.svg',
          revision: 'f77c7a7b7ae7834279adc70c0d919bae',
        },
        {
          url: '/_next/static/media/ec.1a8fac20.svg',
          revision: 'eeede46b13abc51a5181eda176e49b73',
        },
        {
          url: '/_next/static/media/ecC.3bd53f53.svg',
          revision: 'dbe8e4a43443b5f2da7985863dfe4b33',
        },
        {
          url: '/_next/static/media/eth.78dbfa16.svg',
          revision: '077678996d25360e65d487c3f975d401',
        },
        {
          url: '/_next/static/media/ethC.8e8e498c.svg',
          revision: 'f90f4f090619e1cae6598650859bfa2a',
        },
        {
          url: '/_next/static/media/gb.e1506925.svg',
          revision: '44d5fa75627aea32edee29ab80886698',
        },
        {
          url: '/_next/static/media/gbC.7ec3634a.svg',
          revision: '8f71817621c323623cd88d7879a0b093',
        },
        {
          url: '/_next/static/media/gc.fbe26f8b.svg',
          revision: '02ad30945bb4e5e8d8f5d4b34f041a73',
        },
        {
          url: '/_next/static/media/gcC.605de964.svg',
          revision: '8f9810106a9ca3fcda827d873fc5b029',
        },
        {
          url: '/_next/static/media/gp.42b75cbb.svg',
          revision: '646061749209f30dae1b74ce32889210',
        },
        {
          url: '/_next/static/media/gpC.b8876172.svg',
          revision: 'c102bcbb60361f88d765cf7ac51edbfe',
        },
        {
          url: '/_next/static/media/gt.b8ad74c3.svg',
          revision: '142ff73d2cb609353c6ca30f506c8a60',
        },
        {
          url: '/_next/static/media/gtC.b6da7e52.svg',
          revision: 'e1739ad51681172f579415ac41f668a1',
        },
        {
          url: '/_next/static/media/gw.0857e1b5.svg',
          revision: '8b7d2fe68fad016182a7f4cb91570127',
        },
        {
          url: '/_next/static/media/gwC.1c1c11ec.svg',
          revision: '10166c878f470f446bee4177bcd71580',
        },
        {
          url: '/_next/static/media/itl.4c792f22.svg',
          revision: '6dfa6fce4e6d45a907fce14bc3b400d5',
        },
        {
          url: '/_next/static/media/itlC.0b02dc25.svg',
          revision: '25c505c7dad867defefdfdc0bda230f0',
        },
        {
          url: '/_next/static/media/lit.64329068.svg',
          revision: 'b3f70c657180726387062972f12e72bd',
        },
        {
          url: '/_next/static/media/litC.21850bd9.svg',
          revision: 'a9842940b5b5e09355d6f8c786fe4f49',
        },
        {
          url: '/_next/static/media/logo.bc4412f8.svg',
          revision: '25d43826660abab28202774826ab05f0',
        },
        {
          url: '/_next/static/media/mas.ea16fac3.svg',
          revision: '52ab4c853726050b91a40c50955222ba',
        },
        {
          url: '/_next/static/media/masC.910ca681.svg',
          revision: '16acb209f66b013b39295844d1954b4b',
        },
        {
          url: '/_next/static/media/net.32f796ad.svg',
          revision: 'bf969aac2d36e862a95bbb8bfac64eb9',
        },
        {
          url: '/_next/static/media/netC.d77e55b4.svg',
          revision: '7249b4e5180630c3f9d6f41031920a49',
        },
        {
          url: '/_next/static/media/sk.a89e5dc0.svg',
          revision: 'aa285d180d2085e008a04bb29b5b5dfe',
        },
        {
          url: '/_next/static/media/skC.7224292d.svg',
          revision: '746dc0d7b3693d5babfd000a4418e18b',
        },
        {
          url: '/_next/static/media/slot1-mobile.26b9c93b.webp',
          revision: '26b9c93b',
        },
        {
          url: '/_next/static/media/slot1.3f74b210.webp',
          revision: '3f74b210',
        },
        {
          url: '/_next/static/media/v.07ed9ff9.svg',
          revision: '0fa83a251bba540e1156edb5605a2868',
        },
        {
          url: '/_next/static/media/vC.24cde5cb.svg',
          revision: '39d2f730ba82345268eb3f5d2113910f',
        },
        { url: '/appstore.png', revision: '9e9246fbe6460c49c96c948ba0f74a1d' },
        {
          url: '/googleplay.png',
          revision: '79b681accf12b8c43e0804d8fac840a4',
        },
        {
          url: '/icons/icon.png',
          revision: 'f390bfda490ab4ab66da9cac6dfc7dee',
        },
        {
          url: '/icons/icon114.png',
          revision: '8556329f5e0a84dccd4ab0b8ed2e740c',
        },
        {
          url: '/icons/icon120.png',
          revision: '5f1d2db14531805ad80f48e658e82346',
        },
        {
          url: '/icons/icon144.png',
          revision: 'edc3c45b83dea86eb149ce47b7234cb0',
        },
        {
          url: '/icons/icon152.png',
          revision: 'b1cde976b3bdf29dc5dc30e55b7bcf2a',
        },
        {
          url: '/icons/icon180.png',
          revision: '005e922811d28f8566002d708c4ab15a',
        },
        {
          url: '/icons/icon192.png',
          revision: 'd989ae990deb44b1db47db00b990eda5',
        },
        {
          url: '/icons/icon57.png',
          revision: '36861dc744b71a721548ab556a990ab5',
        },
        {
          url: '/icons/icon60.png',
          revision: 'e360dcef88a3ec2140eba999e8403098',
        },
        {
          url: '/icons/icon72.png',
          revision: 'c63f15ee99c2d5080d8a7071ba48b87e',
        },
        {
          url: '/icons/icon76.png',
          revision: '8a96cdba1f58fbf751cd1d161b2c0ef1',
        },
        { url: '/og-img.webp', revision: '7db0b5996150aaad287b41ec042fc42b' },
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
        {
          url: '/sectionImg/slot1-mobile.webp',
          revision: '892e595ed96e65e68f39bc989dabec54',
        },
        {
          url: '/sectionImg/slot1.webp',
          revision: 'bca3dca245560bf178d58eb564e9444b',
        },
        {
          url: '/sectionImg/slot2.webp',
          revision: '1f26320120ee08a65a4d644b1c3c277f',
        },
        {
          url: '/sectionImg/slot3.webp',
          revision: '57fdc06f875e1b16d1454bd80f634e36',
        },
        {
          url: '/sectionImg/slot4-mobile.webp',
          revision: '2a4ad16d8c3905582bc2d7120090a981',
        },
        {
          url: '/sectionImg/slot4.webp',
          revision: 'd19be84a3d4e1969e4cfefd2f4a70b01',
        },
        {
          url: '/sectionImg/slot5.webp',
          revision: 'b38bb0875320742fad34d9a18d29dec4',
        },
        {
          url: '/svg/icon-play.svg',
          revision: 'e9e2f8a9b1a4051f66a8ac1beaf4ab94',
        },
        { url: '/svg/icon.svg', revision: '47e603aff877bfe6a599225d4fa69eef' },
        { url: '/svg/info.svg', revision: '5d892ee28e691046cd31c1d2a083bb9e' },
        { url: '/svg/logo.svg', revision: '25d43826660abab28202774826ab05f0' },
        { url: '/svg/minus.svg', revision: '9d7544051fe47f005cc2ec2ec282bc76' },
        { url: '/svg/plus.svg', revision: '2adb4d142d15f99b9177e8ef35a1a7d7' },
        { url: '/svg/star.svg', revision: '5a5b47b254c06cb3dc8351df920ca7d3' },
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
              response: a,
              event: i,
              state: s,
            }) =>
              a && 'opaqueredirect' === a.type
                ? new Response(a.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: a.headers,
                  })
                : a,
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
        const a = e.pathname;
        return !a.startsWith('/api/auth/') && !!a.startsWith('/api/');
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
