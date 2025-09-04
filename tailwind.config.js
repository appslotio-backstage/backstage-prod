export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
    './error.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#F06512',
        bg: '#1B1B1B',
        text: '#D4D4D4',
        subtext: '#8F8F8F',
      },
      fontFamily: {
        actay: ['Actay', 'sans-serif'],
        actayWide: ['Actay Wide', 'sans-serif'],
        display: ['Gilroy', 'sans-serif'],
      },
      borderRadius: {
        lg: '24px',
        xl: '30px',
        '2xl': '32px',
      },
    },
  },
  plugins: [],
}
