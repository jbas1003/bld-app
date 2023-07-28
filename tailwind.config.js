/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    './src/**/*.{js,jsx,ts,tsx}',
    "./node_modules/flowbite/**/*.js",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
    colors: {
      Red: '#660000',
      DarkRed: '#3D0000',
      LightPink: '#ffbfbf',
      Pink: '#ff8080',
      WhiteSmoke: '#D7D3D9',
    },
    fontFamily: {
      alegreya: ['Alegreya', 'serif'],
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}