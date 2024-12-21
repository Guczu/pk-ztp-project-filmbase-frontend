/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-50': '#FDE7EF',
        'primary-100': '#FBC2D4',
        'primary-200': '#F99DB8',
        'primary-300': '#F6789D',
        'primary-400': '#F45E8A',
        'primary-500': '#E53981',
        'primary-600': '#D83376',
        'primary-700': '#C52966',
        'primary-800': '#B12055',
        'primary-900': '#8A1042',

        'accent-50': '#E1E1E3',
        'accent-100': '#C4C4C8',
        'accent-200': '#A5A5A8',
        'accent-300': '#858589',
        'accent-400': '#6B6B6F',
        'accent-500': '#2B2B31',
        'accent-600': '#1e1e21',
        'accent-700': '#0e0e0f',

        'warn-500': '#FF5860',
      },
    },
  },
  plugins: [],
}

