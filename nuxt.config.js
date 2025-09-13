export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'Backstage - Организация съемок под ключ',
    },
  },
  htmlAttrs: {
    lang: 'ru',
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt',
    '@nuxt/fonts',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],
  robots: {
    UserAgent: '*',
    Sitemap: 'https://backstage-ruddy.vercel.app/sitemap.xml',
  },
  site: {
    url: 'https://backstage-ruddy.vercel.app/',
  },
  fonts: {
    files: [
      // Actay (Regular)
      {
        path: 'assets/fonts/Actay/Actay-Regular.otf',
        weight: '400',
        style: 'normal',
        name: 'Actay',
      },
      {
        path: 'assets/fonts/Actay/Actay-RegularItalic.otf',
        weight: '400',
        style: 'italic',
        name: 'Actay',
      },
      // Actay Condensed (Thin)
      {
        path: 'assets/fonts/Actay/ActayCondensed-Thin.otf',
        weight: '100',
        style: 'normal',
        name: 'Actay Condensed',
      },
      {
        path: 'assets/fonts/Actay/ActayCondensed-ThinItalic.otf',
        weight: '100',
        style: 'italic',
        name: 'Actay Condensed',
      },
      // Actay Wide (Bold)
      {
        path: 'assets/fonts/Actay/ActayWide-Bold.otf',
        weight: '700',
        style: 'normal',
        name: 'Actay Wide',
      },
      {
        path: 'assets/fonts/Actay/ActayWide-BoldItalic.otf',
        weight: '700',
        style: 'italic',
        name: 'Actay Wide',
      },
      // Gilroy (Light / ExtraBold)
      {
        path: 'assets/fonts/Gilroy/Gilroy-Light.otf',
        weight: '300',
        style: 'normal',
        name: 'Gilroy',
      },
      {
        path: 'assets/fonts/Gilroy/Gilroy-ExtraBold.otf',
        weight: '800',
        style: 'normal',
        name: 'Gilroy',
      },
    ],
  },

  css: ['../assets/css/index.css'],
})
