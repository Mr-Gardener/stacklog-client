/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        screens: {
        xs: { max: "770px" }, // applies to 0–770px range
        },
      },
    },
    plugins: [],
  }
  