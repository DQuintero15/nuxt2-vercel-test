export default {
  server: {
    host: '0.0.0.0',       
    port: process.env.PORT || 3000
  },
  head: {
    title: process.env.npm_package_name || '',
    htmlAttrs: {
      lang: 'es',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // {
      //   name: 'google-site-verification',
      //   content: 'ce4pJPC3AEQoDU6jNkAEqV-Dwa1OUU8GxtRTR0d_MM8',
      // },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      {
        name: ' google',
        content: ' notranslate',
      },
    ],
  },
  loading: {
    color: 'grey',
    height: '3px',
  },
  css: ['element-ui/lib/theme-chalk/index.css', '@/assets/css/tailwind.css'],
  plugins: [
    '~/plugins/jsonld',
    '~/plugins/element',
    // '~/plugins/mixinCommonMethods',
    '~/plugins/material-icons',
    '~plugins/validate.js',
    // '~/plugins/FacebookPixel',
    { src: '~/plugins/i18n' },
    { src: '~/plugins/chatFacebook.js', ssr: false },
    { src: '~/plugins/vue-awesome-swiper.js', ssr: false },
    { src: '~plugins/ga.js', ssr: false },
    { src: '~/plugins/gtm', ssr: false },
    { src: '~/plugins/vueLazyLoad.js', ssr: false },
    { src: '~/plugins/elementTipTap', ssr: false },
    { src: '~/plugins/chatwoot.js', ssr: false },
  ],
  modules: [
    '@nuxtjs/gtm',
    '@nuxtjs/sitemap',
    'nuxt-facebook-pixel-module',
    ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 }],
  ],
  components: true,
  facebook: {
    pixelId: '671820736795254',
    autoPageView: true,
    // debug: true,
  },
  sitemap: {
    gzip: true,
    defaults: {
      priority: 1,
      lastmod: new Date(),
    },
    exclude: [
      '/template10',
      '/template11',
      '/template12',
      '/template13',
      '/template14',
      '/template15',
      '/template16',
      '/template5',
      '/template6',
      '/template7',
      '/template8',
      '/template9',
      '/template99',
      '/unicentro',
    ],
  },
  // debug: {
  //   enabled: true,
  // },
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },
    transpile: ['vee-validate/dist/rules'],
    optimizeCSS: true,
    parallel: true,
    splitChunks: {
      pages: true,
      vendor: true,
      commons: true,
      runtime: true,
      layouts: true,
    },
    optimization: {
      splitChunks: {
        name: false,
      },
    },
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.devtool = 'source-map'
      }
    },
  },
  router: {
    base: '/',
  },
}
