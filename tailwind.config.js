/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#0B2447",
        subbase: "#19376D",
        contrast: "#52649A",
        contrastDark: "#2F4471",
        contrastLight: "#6A8EAD",
        bright: "#A5D7E8",
      },
      boxShadow: {
        blue: "0px 5px 0px #2a497e",
      },
    },
  },
  plugins: [],
};
