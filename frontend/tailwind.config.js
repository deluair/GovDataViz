/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        government: {
          blue: '#0052cc',
          navy: '#1a365d',
          red: '#e53e3e',
          green: '#38a169'
        }
      }
    },
  },
  plugins: [],
} 