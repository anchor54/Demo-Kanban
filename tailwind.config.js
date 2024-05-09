/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto, sans-serif']
      },
      gridTemplateColumns: {
        '70/30': "70% 30%",
      },
      colors: {
        'bg-primary': '#20202B',
        'bg-secondary': '#2B2B36',
        'bg-purple': '#655fc2',
        'text-inactive': '#767983',
        'text-active': '#d0d1d9',
      }
    },
  },
  plugins: [],
}