/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "cddcf181d53480901eb898996449d873"
  },
  {
    "url": "api/helpers.html",
    "revision": "b6b5b5fef9a8382a7d189ea70f8f6a0d"
  },
  {
    "url": "api/index.html",
    "revision": "037dbd55710f82f02c13820e07cbbfcb"
  },
  {
    "url": "api/suspense.html",
    "revision": "dfc241a667f215e2222c9289dce03eb3"
  },
  {
    "url": "assets/css/0.styles.50069be7.css",
    "revision": "c709f958be79b3ebd39e7a05f5aff9de"
  },
  {
    "url": "assets/img/observable-hooks.bbca1b76.png",
    "revision": "bbca1b76dcb3ad730120ee26cda5525f"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.d87a3d15.js",
    "revision": "173205b843f8e60bcfd4e2770500135c"
  },
  {
    "url": "assets/js/11.167dcea9.js",
    "revision": "602057328289aa35d1f0d5eb54de48ca"
  },
  {
    "url": "assets/js/12.8708eaac.js",
    "revision": "b4eee4e5cafbbcd1ae58c884d8830158"
  },
  {
    "url": "assets/js/13.d8c8df4a.js",
    "revision": "35dc71622bd7cb5437ed2b0bb2c16937"
  },
  {
    "url": "assets/js/14.5918bfa9.js",
    "revision": "022a50e121caf7e8f5122c14d1da4387"
  },
  {
    "url": "assets/js/15.bb8bfb1b.js",
    "revision": "ba7ff629c3005e384efdce1b305bdc48"
  },
  {
    "url": "assets/js/16.fb0217e8.js",
    "revision": "c0339256d0781a03808acd05bcf07e43"
  },
  {
    "url": "assets/js/17.9618772c.js",
    "revision": "03b5ca2acbbb5e4d0b63dcf0daeb06d7"
  },
  {
    "url": "assets/js/18.14f0072c.js",
    "revision": "e111bfe94c4f415f5e5753ff82f933a2"
  },
  {
    "url": "assets/js/19.7ef56f63.js",
    "revision": "4163bf382a9366659a5a5c6d4e0fe8a6"
  },
  {
    "url": "assets/js/3.c8cfc7ab.js",
    "revision": "cccab945469227bc534349ecbe4c5224"
  },
  {
    "url": "assets/js/4.ab8b6a84.js",
    "revision": "236756ae8a7c7d13e9ab82dd54421aea"
  },
  {
    "url": "assets/js/5.52e4f033.js",
    "revision": "5b1e17611e3115c7c341bb932f49831e"
  },
  {
    "url": "assets/js/6.043bf519.js",
    "revision": "9076dea94dbd47623abd36ef47be540d"
  },
  {
    "url": "assets/js/7.b2575579.js",
    "revision": "5eb11f95d8f34ddbb840acb3278ddd36"
  },
  {
    "url": "assets/js/8.528a034e.js",
    "revision": "4935c22f9cc3bc08993ca0e2d7aec51f"
  },
  {
    "url": "assets/js/9.1976d09d.js",
    "revision": "3c582fb910d7e12753ee37e22d68015a"
  },
  {
    "url": "assets/js/app.2600191b.js",
    "revision": "6320033e5733b78458027386718410dc"
  },
  {
    "url": "assets/js/vendors~docsearch.bffca74e.js",
    "revision": "6483143173b46c460b145566a67576b3"
  },
  {
    "url": "examples/index.html",
    "revision": "b3b0d9075e401fc05f50d6ad5f4406fd"
  },
  {
    "url": "examples/pomodoro-timer.html",
    "revision": "60964ee3a2b02924889620bb28496280"
  },
  {
    "url": "examples/suspense.html",
    "revision": "3c0b5f9bbd1dba472bac2b94e8af47c6"
  },
  {
    "url": "examples/typeahead.html",
    "revision": "a966032b721470425cdfa06fa0963d77"
  },
  {
    "url": "guide/core-concepts.html",
    "revision": "ca097de2589fb54bee9f2fedc2680114"
  },
  {
    "url": "guide/index.html",
    "revision": "67f2da5c2a265f1da069941111416b13"
  },
  {
    "url": "guide/motivation.html",
    "revision": "7742c3cc693fc20035d1f780a9cc1698"
  },
  {
    "url": "guide/render-as-you-fetch-suspense.html",
    "revision": "cceaf6f6204a6906071bb5a4beb02781"
  },
  {
    "url": "icons/android-icon-144x144.png",
    "revision": "7a7eab0e3303cfedb2004a2c4357e600"
  },
  {
    "url": "icons/android-icon-192x192.png",
    "revision": "3898bcb83183b6253f87eb9d5e5b9c00"
  },
  {
    "url": "icons/android-icon-36x36.png",
    "revision": "ab51839615e70a1a013c81cfd55e0fef"
  },
  {
    "url": "icons/android-icon-48x48.png",
    "revision": "c4a1001f60be27aca3ea1bb5f8895c52"
  },
  {
    "url": "icons/android-icon-72x72.png",
    "revision": "09e9640acece6fd035022a5c2379ba50"
  },
  {
    "url": "icons/android-icon-96x96.png",
    "revision": "25a11c9ce7d49494fc02b25418105f89"
  },
  {
    "url": "icons/apple-icon-114x114.png",
    "revision": "8b84d4594e44362d08469deca1dce944"
  },
  {
    "url": "icons/apple-icon-120x120.png",
    "revision": "19b9fb409fda2e028390a9f8e8984697"
  },
  {
    "url": "icons/apple-icon-144x144.png",
    "revision": "7a7eab0e3303cfedb2004a2c4357e600"
  },
  {
    "url": "icons/apple-icon-152x152.png",
    "revision": "3cc6c868e59ca7a433089b3ee766b858"
  },
  {
    "url": "icons/apple-icon-180x180.png",
    "revision": "a541b4572b31e5010483834f1f86aeb7"
  },
  {
    "url": "icons/apple-icon-57x57.png",
    "revision": "b073878d967c78c7c12959602f0d2f19"
  },
  {
    "url": "icons/apple-icon-60x60.png",
    "revision": "b63605624ed9101367684b2841eba5dc"
  },
  {
    "url": "icons/apple-icon-72x72.png",
    "revision": "09e9640acece6fd035022a5c2379ba50"
  },
  {
    "url": "icons/apple-icon-76x76.png",
    "revision": "85c6aaf71eba2d0d8752830d74189be7"
  },
  {
    "url": "icons/apple-icon-precomposed.png",
    "revision": "7b7c6956ee4bdc383ee85ea5a6d531ed"
  },
  {
    "url": "icons/apple-icon.png",
    "revision": "7b7c6956ee4bdc383ee85ea5a6d531ed"
  },
  {
    "url": "icons/favicon-16x16.png",
    "revision": "c34f5f522034bc1eb330d1b23460c0e1"
  },
  {
    "url": "icons/favicon-32x32.png",
    "revision": "da6fddb2d053d9b61aabb2364bda7c5a"
  },
  {
    "url": "icons/favicon-96x96.png",
    "revision": "25a11c9ce7d49494fc02b25418105f89"
  },
  {
    "url": "icons/ms-icon-144x144.png",
    "revision": "7a7eab0e3303cfedb2004a2c4357e600"
  },
  {
    "url": "icons/ms-icon-150x150.png",
    "revision": "b3defe28047ba8d1fa3ea46f30299313"
  },
  {
    "url": "icons/ms-icon-310x310.png",
    "revision": "5fa1c24701e48383678a584ecd65b949"
  },
  {
    "url": "icons/ms-icon-70x70.png",
    "revision": "fbbd99f625d130297e3b281b52bdc1dc"
  },
  {
    "url": "index.html",
    "revision": "424512300998e21ed6ccb099cf48e41f"
  },
  {
    "url": "logo.png",
    "revision": "62850ddbc13267344d89653ac2060d80"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
