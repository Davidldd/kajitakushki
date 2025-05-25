/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'kushki-blue': '#00A0E4',
        'kushki-dark-blue': '#0082B9',
        'kushki-light-blue': '#33B3E9',
      }
    },
  },
  plugins: [],
} 