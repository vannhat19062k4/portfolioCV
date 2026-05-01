/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#000000",
        muted: "#555555",
      },
      fontFamily: {
        sans: ['"PP Neue Montreal"', 'system-ui', 'sans-serif'],
        serif: ['"PP Mondwest"', 'serif'],
      },
      letterSpacing: {
        tighter: '-0.05em',
      }
    },
  },
  plugins: [],
}