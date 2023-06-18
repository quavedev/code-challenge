/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./client/**/*.{js,jsx,ts,tsx}', './ui/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'secondary-dark-bg': '#2e2d2d',
      },
      fontSize: {
        sm: '1rem',
        bt: '1.5rem',
      },
      maxWidth: {
        '15rem': '150px',
        '86rem': '86rem',
      },
      width: {
        'w-45': '45%',
      },
      height: {
        'h-12': '12rem',
      },
      gridAutoRows: {
        'r-36': '36rem',
      },
      gridTemplateColumns: {
        'desk-card': 'repeat(auto-fill, minmax(280px, 1fr))',
      },
    },
  },
  plugins: [],
};
