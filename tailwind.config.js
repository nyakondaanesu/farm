// tailwind.config.js
const { heroui } = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // ✅ Include app directory
    "./components/**/*.{js,ts,jsx,tsx}", // ✅ Include components
    "./pages/**/*.{js,ts,jsx,tsx}", // ✅ Include pages if using /pages
    "./node_modules/@heroui/theme/dist/components/navbar.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/cows.jpg')", // Custom background
      },
      colors: {
        primary: "#3B7D3B",
        secondary: "#F59E0B",
        accent: "#6f9f29",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
