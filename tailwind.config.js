/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        rain: "url('../public/rain-gif.gif')",
      },
      fontFamily: {
        pressStart: "pressStart",
      },
    },
  },
  plugins: [],
};
