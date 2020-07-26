import {
  assemble,
  getData
} from './utils/data';
import BLOGCONFIG from './data/blog.config';

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: BLOGCONFIG.title || process.env.npm_package_name,
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: BLOGCONFIG.keywords || process.env.npm_package_description
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }, {
      rel: 'stylesheet',
      href: '/css/snackbar.css'
    }],
    script: [{
      src: "/js/google-analytics.js",
      type: "module"
    }, {
      src: "/js/baidu-analytics.js",
      type: "module"
    }, {
      src: "/js/snackbar.js"
    }, {
      src: "/js/sw-register.js",
    }],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '@/plugins/composition-api',
    {
      src: '@/plugins/vssue',
      mode: 'client'
    }
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [],
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: [
      '(@vssue|vssue)\/((?!\/node_modules\/).)*\.js$',
    ]
  },
  hooks: {
    'render:before': () => {
      assemble();
    },
    'build:before': () => {
      assemble();
    },
  },
  generate: {
    routes: getData().filter(
      (p) => p.filename !== "about.md" && p.filename !== "portfolid.md"
    ).map((p) => '/post/' + (p.meta.title && p.meta.title.replace(/ /g, '_')))
  }
}
