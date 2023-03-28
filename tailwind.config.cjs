/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
    colors: {
      Red: '#b30000',
      DarkRed: '#7d0000',
      LightPink: '#ffbfbf',
      Pink: '#ff8080',
      WhiteSmoke: '#f4f4f4',
    },
    fontFamily: {
      alegreya: ['Alegreya', 'serif'],
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}