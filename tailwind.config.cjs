/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  plugins: ['prettier-plugin-tailwindcss'],
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
        conversionText: '#38A1CF',
        placeholder: '#858688',
      },
    },
  },
};
