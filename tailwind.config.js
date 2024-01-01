/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: '#0B2447',
        subbase: '#19376D',
        contrast: '#52649A',
        bright: '#A5D7E8'
      }
    },
  },
  plugins: [],
};
