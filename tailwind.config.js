/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      colors: {
        'primary-50': '#FFE1EC',
        'primary-100': '#FFB3D1',
        'primary-200': '#FF80B6',
        'primary-300': '#FF4D9A',
        'primary-400': '#FF3388',
        'primary-500': '#FF55A5',
        'primary-600': '#FF1A7E',
        'primary-700': '#E6005C',
        'primary-800': '#D2004C',
        'primary-900': '#B8003F',

        'accent-50': '#48484F',
        'accent-100': '#3A3A42',
        'accent-200': '#313136',
        'accent-300': '#29292F',
        'accent-400': '#222227',
        'accent-500': '#2B2B31',
        'accent-600': '#23232A',
        'accent-700': '#1C1C22',
        'accent-800': '#141418',
        'accent-900': '#0D0D10',

        'warn-50': '#FFD1D8',
        'warn-100': '#FFB3B8',
        'warn-200': '#FF8A8E',
        'warn-300': '#FF666F',
        'warn-400': '#FF4D5C',
        'warn-500': '#FF5860',
        'warn-600': '#FF4C54',
        'warn-700': '#FF3F47',
        'warn-800': '#FF3141',
        'warn-900': '#FF1F2E',

        'light-gray': '#c7c7c7',
      },
    },
  },
  plugins: [],
}
