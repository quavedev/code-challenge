/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './ui/*.js',
    './client/*.html',
    './ui/src/**/*.{js,jsx}',
    './ui/src/**/**/*.{js,jsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
