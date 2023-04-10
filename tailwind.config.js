/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bcpayment: {
          "green-1": "#196371",
          "green-2": "#2596AB",
          "green-3": "#83B8C1",
          "green-4": "#E7F1F2",
          "orange": "#F8A201",
          "gray-1": "#7D7D7D",
          "gray-2": "#C4C4C4",
        },
      },
      fontFamily: {
        'Montserrat': ['Montserrat', 'sans-serif']
      },
    },
  },
  plugins: [],
}

