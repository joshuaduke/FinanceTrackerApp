/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#17255A",
        complement1: "#B07156",
        complement2: "#F5E2C8",
        bgPrimary: "#7E8287",
        success: "#17864B"
      },
    },
  },
  plugins: [],
}

