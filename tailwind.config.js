/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        editor: {
          bg: {
            light: '#ffffff',
            dark: '#1e1e1e'
          },
          text: {
            light: '#000000',
            dark: '#ffffff'
          },
          border: {
            light: '#e5e7eb',
            dark: '#374151'
          },
          toolbar: {
            light: '#f9fafb',
            dark: '#2d2d2d'
          },
          hover: {
            light: '#f3f4f6',
            dark: '#3d3d3d'
          }
        }
      }
    },
  },
  plugins: [],
}

