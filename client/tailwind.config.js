/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBluePrimary: "rgb(31, 134, 241, 1)", // Twój niestandardowy kolor w formacie RGB
        BlackPrimary: "rgb(18,18,18)",
        lightBlue: "rgb(162,211,252)",
        mediumBlue: "rgb(86,160,221)",
      },
      width: {
        "clamp-200-50%": "clamp(200px, 50%, 400px)",
      },
    },
  },
  plugins: [],
};
