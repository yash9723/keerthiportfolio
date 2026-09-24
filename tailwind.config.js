/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#dedbc8',
      },
      fontFamily: {
        sans: ['Almarai', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
      }
    },
  },
  plugins: [],
}
