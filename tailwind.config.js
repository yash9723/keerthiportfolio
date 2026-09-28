/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Only apply hover: styles on devices that can hover, so taps don't leave "stuck" hover states
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        primary: '#dedbc8',
      },
      fontFamily: {
        sans: ['Almarai', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
      },
      transitionTimingFunction: {
        // Strong ease-out for UI feedback; matches the Framer Motion curves used in components
        'out-strong': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
  plugins: [],
}
