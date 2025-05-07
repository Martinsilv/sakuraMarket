/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      boxShadow: {
        text: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Sombra suave para texto
      },
      colors: {
        primary: {
          DEFAULT: '#FEC8D8',
          light: '#FBE8E7',   
          dark: '#e290a1',
          pink: '#efb3c2', 
          violet: '#BB8FA9', 
          violerHover: '#d4b2c6',
        },
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Agrega el plugin de Forms
  ],
}

