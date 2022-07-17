/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        jost: ['"Jost"', 'sans'],
      },
      colors: {
        primary: '#5E63AC',
      },
    },
  },
  plugins: [],
};
