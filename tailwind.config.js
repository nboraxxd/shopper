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
    extend: {},
  },
  plugins: [],
}
