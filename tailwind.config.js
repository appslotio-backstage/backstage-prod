/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#1B1B1B",
        text: "#D4D4D4",
        subtext: "#8F8F8F",
        accent: "#F06512",
        border: "#303030",
        muted: "#333333",
        card: "#212121",
      },
      fontFamily: {
        actay: ["Actay", "sans-serif"],
        actayWide: ["Actay Wide", "sans-serif"],
        display: ["Gilroy", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "30px",
        "2xl": "32px",
      },
    },
  },
  plugins: [],
}
