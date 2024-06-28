/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-bg": "rgba(var(--custom-bg))",
        "custom-bg-header": "rgba(var(--custom-bg-header))",
        "custom-text": "rgba(var(--custom-text))"
      }
    },
  },
  plugins: [],
}