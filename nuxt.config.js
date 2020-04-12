require('dotenv').config()

module.exports = {
  mode: 'spa',
  server: {
    host: 'localhost'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Muli:wght@200;300;400;500;600;700&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  loadingIndicator: {
    name: 'wandering-cubes',
    color: '#14ffec',
    background: 'black'
  },
  /*
   ** Global CSS
   */
  css: [
    { src: '~assets/main.scss', lang: 'scss' },
    { src: '~assets/icofont.min.css' }
  ],
  /*s
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/datepicker', '~/plugins/bootstrap'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  vuetify: {
    /* module options */
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    options: {
      customProperties: true
    },
    defaultAssets: {
      icons: 'fa'
    },
    theme: {
      dark: true
    }
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'nuxt-client-init-module',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.FB_API_KEY,
          authDomain: process.env.FB_AUTH_DOMAIN,
          databaseURL: process.env.FB_DATABASE_URL,
          projectId: 'witless-todo',
          storageBucket: process.env.FB_STORAGE_BUCKET,
          messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
          appId: process.env.FB_APP_ID
        },
        services: {
          auth: {
            persistence: 'local',
            initialize: {
              onAuthStateChangedMutation: 'user/ON_AUTH_STATE_CHANGED_MUTATION',
              onAuthStateChangedAction: null
            }
          },
          firestore: true
        }
      }
    ]
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  pwa: {
    manifest: {
      name: 'Witless',
      short_name: 'Witless',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ],
      theme_color: '#0c0c0c',
      background_color: '#0c0c0c',
      display: 'standalone'
    }
  }
}
