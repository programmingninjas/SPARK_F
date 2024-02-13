/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      colors: {
        'primary':'#6457c7',
        'secondary':'#b8b3e6',
        'accent':'#3f3399',
        'light':"#f4f4fb",
        'dark':"#0e0b22",
        'transparent':"#ffffff00",
        'white':"#ffffff",
        'error':"#f04343",
      },
      width: {
        '128': '32rem',
        '160': '40rem',
      },
      height: {
        '128': '32rem',
        '160': '40rem',
      }
    }
  },
  plugins: [],
}

