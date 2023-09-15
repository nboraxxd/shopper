/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    // disable container class trong tailwind
    container: false,
    // disable reset CSS trong tailwind
    preflight: false,
  },
  theme: {
    extend: {
      keyframes: {
        shine: {
          to: {
            'background-position-x': '-200%',
          },
        },
      },
      animation: {
        shine: '1.5s shine infinite',
      },
      backgroundImage: {
        skeleton: 'linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)',
      },
    },
  },
  plugins: [],
}
