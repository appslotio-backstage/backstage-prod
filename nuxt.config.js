export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt',
    '@nuxt/fonts',
  ],

  fonts: {
    files: [
      { path: 'assets/fonts/Actay-Regular.woff2', weight: '400', style: 'normal', name: 'Actay' },
      { path: 'assets/fonts/Actay-Bold.woff2', weight: '700', style: 'normal', name: 'Actay' },
      {
        path: 'assets/fonts/ActayWide-Regular.woff2',
        weight: '400',
        style: 'normal',
        name: 'Actay Wide',
      },
      {
        path: 'assets/fonts/ActayWide-Bold.woff2',
        weight: '700',
        style: 'normal',
        name: 'Actay Wide',
      },
      { path: 'assets/fonts/Gilroy-Regular.woff2', weight: '400', style: 'normal', name: 'Gilroy' },
      { path: 'assets/fonts/Gilroy-Bold.woff2', weight: '700', style: 'normal', name: 'Gilroy' },
      { path: 'assets/fonts/Inter-Regular.woff2', weight: '400', style: 'normal', name: 'Inter' },
      { path: 'assets/fonts/Inter-Bold.woff2', weight: '700', style: 'normal', name: 'Inter' },
    ],
  },

  css: ['assets/css/index.css'],
})
