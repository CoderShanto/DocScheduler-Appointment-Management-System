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
      },
    gridTemplateColumns: {
  'auto-fill': "repeat(auto-fill, minmax(200px, 1fr))",
}


    },
  },
  plugins: [],
}
