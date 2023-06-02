/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBluePrimary: "rgb(31, 134, 241, 1)", // Twój niestandardowy kolor w formacie RGB
      },
    },
  },
  plugins: [],
};
