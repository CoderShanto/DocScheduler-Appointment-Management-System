/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",      // HTML files
    "./src/**/*.{js,jsx,ts,tsx}", // All JS/JSX/TS/TSX files
  ],
  theme: {
    extend: {
      colors:{
        'primary':"#5f6FFF"
         ,50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb', // ← main brand blue
          700: '#1d4ed8',
      },
      
    gridTemplateColumns: {
  'auto-fill': "repeat(auto-fill, minmax(200px, 1fr))",
}
 ,accent: {
          500: '#0d9488', // healing teal (for CTAs, highlights)
        }

    },
  },
  plugins: [],
}
