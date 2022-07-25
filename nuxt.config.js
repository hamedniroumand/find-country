export default {
  head: {
    title: 'Find Country',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '~/assets/styles/main.scss'
  ],

  plugins: [
    '~/plugins/directives',
    '~/plugins/filters'
  ],

  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  buildModules: [
    '@nuxt/typescript-build'
  ],

  modules: [
    '@nuxtjs/axios',
    ['nuxt-lazy-load', {
      directiveOnly: true,
      defaultImage: '/images/default-image.jpg'
    }]
  ],

  build: {},

  router: {
    base: '/countries'
  }
};
