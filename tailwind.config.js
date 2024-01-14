/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      cursor: {
        default: "url(assets/cursors/default.svg), default",
        pointer: "url(assets/cursors/pointer.svg), pointer",
        remove: "url(assets/cursors/remove.svg), default",
        add: "url(assets/cursors/add.svg), default",
      },
      colors: {
        /** https://coolors.co/002147-15325c-294371-3e5486-52649a-6781ae-7c9ec1-91bbd5-a5d7e8-dff1f7 **/
        lazuli: {
          900: "#002147ff",
          800: "#15325cff",
          700: "#294371ff",
          600: "#3e5486ff",
          500: "#52649aff",
          400: "#6781aeff",
          300: "#7c9ec1ff",
          200: "#91bbd5ff",
          100: "#a5d7e8ff",
          50: "#dff1f7f",
        },
      },
      boxShadow: {
        lazuli500: "0px 5px 0px #294371ff",
      },
    },
  },
  plugins: [],
};
