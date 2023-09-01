/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: [
    'prettier-plugin-tailwindcss',
    require('@neojp/tailwindcss-line-clamp-utilities'),
  ],
  theme: {
    fontFamily: {
      sans: 'Inter',
    },
    extend: {
      colors: {
        main: '#292e33',
        lighter: '#363b40',
        darker: '#1c2023',
        body: '#ced1d5',
        conversion: '#2E88B0',
        conversionHover: '#287090',
        conversionText: '#40B4E8',
        placeholder: '#858688',
      },
    },
  },
};
